export const runtime = "nodejs";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL ;
const LANGUAGES_PATH = process.env.BACKEND_LANGUAGES_PATH || "/languages/languages-list";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET() {
  try {
    const upstream = await fetch(`${BACKEND_BASE_URL}${LANGUAGES_PATH}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const text = await upstream.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: "Invalid JSON from upstream languages API." };
    }

    return jsonResponse(data, upstream.status);
  } catch (error) {
    return jsonResponse(
      { success: false, message: error?.message || "Failed to load languages.", data: [] },
      500
    );
  }
}
