export const runtime = "nodejs";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || "https://devapi.pilotadmin.site";
const GET_LEARNERS_PATH = process.env.BACKEND_GET_LEARNERS_PATH || "/users/get-learners";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return jsonResponse({ success: false, message: "Authorization header is required." }, 401);
    }

    const { searchParams } = new URL(req.url);
    const learnerID = String(searchParams.get("learnerID") || "").trim();
    if (!learnerID) {
      return jsonResponse({ success: false, message: "learnerID is required." }, 400);
    }

    const upstream = await fetch(
      `${BACKEND_BASE_URL}${GET_LEARNERS_PATH}?learnerID=${encodeURIComponent(learnerID)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: authHeader,
        },
        cache: "no-store",
      }
    );

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
      { success: false, message: error?.message || "Failed to fetch learner profile." },
      500
    );
  }
}
