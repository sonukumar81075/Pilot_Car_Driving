export const runtime = "nodejs";

const UPSTREAM_URL = "https://api.pilotadmin.site/zones/zones-list";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const upstream = await fetch(UPSTREAM_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const text = await upstream.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { success: false, status: "error", message: "Invalid JSON from upstream.", raw: text };
    }

    if (!upstream.ok) {
      return jsonResponse(
        {
          success: false,
          status: "error",
          message: data?.message || "Upstream zones API failed.",
          upstreamStatus: upstream.status,
          data: Array.isArray(data?.data) ? data.data : [],
        },
        502
      );
    }

    return jsonResponse(data, 200);
  } catch (err) {
    const isAbort = err?.name === "AbortError";
    return jsonResponse(
      {
        success: false,
        status: "error",
        message: isAbort ? "Zones request timed out." : "Failed to fetch zones.",
        data: [],
      },
      isAbort ? 504 : 500
    );
  }
}
