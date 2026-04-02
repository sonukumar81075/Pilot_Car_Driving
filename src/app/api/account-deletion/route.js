export const runtime = "nodejs";

const BASE_URL = "https://api.pilotadmin.site";
const ENDPOINTS = {
  instructor: "/auth/delete-pilot-req",
  learner: "/auth/delete-learner-req",
};

// Prefer env var. Fallback token is for local testing only.
const AUTH_TOKEN =
  process.env.PILOT_DELETE_AUTH_TOKEN ||
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbG90MkBnbWFpbC5jb20iLCJuYW1lIjoiUGlsb3QgMiIsInJvbGUiOiJQaWxvdCIsInBpbG90SUQiOjIsImlhdCI6MTc2MDMzNTk2NSwiZXhwIjoxNzYyOTI3OTY1fQ.5jpZpZq0FqaQP3kwTlz5bKxxPK0DMxbYzOwwnLcX2NU";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const accountType = String(body?.accountType || "").trim().toLowerCase();
    const endpoint = ENDPOINTS[accountType];

    if (!endpoint) {
      return jsonResponse({ ok: false, message: "Invalid account type." }, 400);
    }

    const feedback = String(body?.feedback || "").trim();
    const email = String(body?.email || "").trim();
    const contactInfo = String(body?.contactInfo || "").trim();

    if (!feedback || feedback.length < 10) {
      return jsonResponse({ ok: false, message: "Feedback must be at least 10 characters." }, 400);
    }
    if (!contactInfo) {
      return jsonResponse({ ok: false, message: "Contact info is required." }, 400);
    }

    const params = new URLSearchParams();
    params.set("feedback", feedback);
    params.set("email", email);
    params.set("contactInfo", contactInfo);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const upstream = await fetch(`${BASE_URL}${endpoint}`, {
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

    if (!upstream.ok) {
      return jsonResponse(
        {
          ok: false,
          message: data?.message || "Failed to submit deletion request.",
          status: upstream.status,
          data,
        },
        upstream.status
      );
    }

    return jsonResponse(
      {
        ok: true,
        message: data?.message || "Deletion request submitted successfully.",
        data,
      },
      200
    );
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
