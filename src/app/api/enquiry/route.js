export const runtime = "nodejs";

// Upstream endpoint for learner enquiries.
const ENDPOINT = "https://api.pilotadmin.site/users/learner-enquiry";

// Uses env token in production; fallback is only for local continuity.
const AUTH_TOKEN =
    process.env.PILOTADMIN_AUTH_TOKEN ||
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlrYW50YXNpdmEyOEBnbWFpbC5jb20iLCJuYW1lIjoibWFuaWthbnRhIiwicm9sZSI6IlBpbG90IiwicGlsb3RJRCI6MSwiaWF0IjoxNzQ3MzgxNzI3LCJleHAiOjE3NDk5NzM3Mjd9.Zl_hzUtCHFpFn6C-MMk2owKfWcOKYjoYi6sDjaOaL4Y";

// Standard JSON response helper for this route.
function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "content-type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const body = await req.json();

        // Normalize incoming values to avoid undefined/null handling downstream.
        const fullName = (body?.fullName ?? "").toString().trim();
        const phoneNumber = (body?.phoneNumber ?? body?.phone ?? "").toString().trim();
        const zone = (body?.zone ?? "").toString().trim();

        // Minimum fields required by the upstream API contract.
        if (!phoneNumber || !zone || zone === "Choose a zone") {
            return jsonResponse(
                { ok: false, message: "phoneNumber (phone) and zone are required." },
                400
            );
        }

        // Build x-www-form-urlencoded payload expected by upstream service.
        const params = new URLSearchParams();
        params.set("enquiryType", "Learner");
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
        // Source is enum-like upstream and must remain a valid value.
        params.set("source", "Web");

        // Guard against slow upstream responses.  
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

        // Parse response defensively: upstream may occasionally return non-JSON.
        const text = await upstream.text();
        let data;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = { raw: text };
        }

        // Treat upstream HTTP failures and explicit success=false as request failures.
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

        // Return normalized success payload to frontend consumers.
        return jsonResponse({ ok: true, data }, 200);
    } catch (err) {
        const isAbort = err?.name === "AbortError";
        // Surface timeout explicitly for better client-side messaging.
        return jsonResponse(
            {
                ok: false,
                message: isAbort ? "Request timed out." : "Server error.",
            },
            isAbort ? 504 : 500
        );
    }
}

