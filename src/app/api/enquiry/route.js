export const runtime = "nodejs";

const ENDPOINT = "https://devapi.pilotadmin.site/users/pilot-enquiry";

// Prefer env var; fallback keeps current behavior.
// IMPORTANT: do not commit real tokens long-term.
const AUTH_TOKEN =
    process.env.PILOTADMIN_AUTH_TOKEN ||
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlrYW50YXNpdmEyOEBnbWFpbC5jb20iLCJuYW1lIjoibWFuaWthbnRhIiwicm9sZSI6IlBpbG90IiwicGlsb3RJRCI6MSwiaWF0IjoxNzQ3MzgxNzI3LCJleHAiOjE3NDk5NzM3Mjd9.Zl_hzUtCHFpFn6C-MMk2owKfWcOKYjoYi6sDjaOaL4Y";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "content-type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const body = await req.json();

        const fullName = (body?.fullName ?? "").toString().trim();
        const phoneNumber = (body?.phoneNumber ?? body?.phone ?? "").toString().trim();
        const zone = (body?.zone ?? "").toString().trim();

        // Postman requires at least: phone, zone, service, message, source
        // (fullName/email/enquiryType are accepted by the API but may be optional)
        if (!phoneNumber || !zone || zone === "Choose a zone") {
            return jsonResponse(
                { ok: false, message: "phoneNumber (phone) and zone are required." },
                400
            );
        }

        // Map to upstream expected fields (x-www-form-urlencoded):
        // enquiryType: 'Pilot' | 'Learner'
        // fullName, email, phone, zone, service, message, source: 'Web' | 'App' | ...
        const params = new URLSearchParams();
        params.set("enquiryType", "Pilot");
        if (fullName) params.set("fullName", fullName);
        const email = (body?.email ?? "").toString().trim();
        if (email) params.set("email", email);
        params.set("phone", phoneNumber);
        params.set("zone", zone);
        params.set("service", (body?.service ?? "Driving Training").toString().trim());
        params.set(
            "message",
            (body?.message ?? "Interested in joining as pilot").toString().trim()
        );
        // IMPORTANT: backend column is enum-like; must be one of: Web/App/Phone/Other
        params.set("source", "Web");

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const upstream = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization: AUTH_TOKEN,
            },
            body: params.toString(),
            signal: controller.signal,
            cache: "no-store",
        }).finally(() => clearTimeout(timeout));

        const text = await upstream.text();
        let data;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = { raw: text };
        }

        if (!upstream.ok || data?.success === false) {
            return jsonResponse(
                {
                    ok: false,
                    message:
                        data?.message ||
                        "Upstream enquiry API error.",
                    status: upstream.status,
                    data,
                },
                upstream.status
            );
        }

        return jsonResponse({ ok: true, data }, 200);
    } catch (err) {
        const isAbort = err?.name === "AbortError";
        return jsonResponse(
            {
                ok: false,
                message: isAbort ? "Request timed out." : "Server error.",
            },
            isAbort ? 504 : 500
        );
    }
}

