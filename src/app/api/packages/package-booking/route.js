export const runtime = "nodejs";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || "https://devapi.pilotadmin.site";
const PACKAGE_BOOKING_PATH = process.env.BACKEND_PACKAGE_BOOKING_PATH || "/packages/package-booking";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return jsonResponse({ success: false, message: "Authorization header is required." }, 401);
    }

    const body = await req.json();
    const learnerID = String(body?.learnerID || "").trim();
    const packageId = String(body?.package_id || "").trim();
    if (!learnerID || !packageId) {
      return jsonResponse({ success: false, message: "learnerID and package_id are required." }, 400);
    }

    const params = new URLSearchParams();
    Object.entries(body || {}).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      params.append(key, String(value));
    });

    const upstream = await fetch(`${BACKEND_BASE_URL}${PACKAGE_BOOKING_PATH}`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });

    const text = await upstream.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { success: upstream.ok, message: text || "Unexpected server response." };
    }

    return jsonResponse(data, upstream.status);
  } catch (error) {
    return jsonResponse(
      { success: false, message: error?.message || "Failed to create package booking." },
      500
    );
  }
}
