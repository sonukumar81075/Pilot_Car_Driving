export const runtime = "nodejs";

// Backend host used by this proxy route.
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || "https://devapi.pilotadmin.site";
const BACKEND_SEND_OTP_PATH = process.env.BACKEND_SEND_OTP_PATH || "/auth/update-otp";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function PATCH(req) {
  try {
    const body = await req.json();

    // Forward only required fields expected by backend.
    const payload = {
      contactInfo: String(body?.contactInfo || "").trim(),
      type: String(body?.type || "").trim(),
      purpose: String(body?.purpose || "").trim(),
    };

    if (!payload.contactInfo || !payload.type || !payload.purpose) {
      return jsonResponse({ message: "contactInfo, type and purpose are required." }, 400);
    }

    const upstream = await fetch(`${BACKEND_BASE_URL}${BACKEND_SEND_OTP_PATH}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await upstream.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text || "Invalid server response." };
    }

    return jsonResponse(data, upstream.status);
  } catch (error) {
    return jsonResponse({ message: error?.message || "Server error." }, 500);
  }
}
