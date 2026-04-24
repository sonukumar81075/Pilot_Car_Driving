export const runtime = "nodejs";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL ;
// Upstream endpoint for package catalog retrieval.
const UPSTREAM_URL = `${BACKEND_BASE_URL}/packages/get-packages`;

// Standard JSON response helper for this route.
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET() {
  try {
    // Abort upstream call if it exceeds timeout budget.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const upstream = await fetch(UPSTREAM_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    // Parse upstream payload defensively in case of invalid JSON.
    const text = await upstream.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { success: false, status: "error", message: "Invalid JSON from upstream.", raw: text };
    }

    // Convert upstream failures to a consistent gateway-style response.
    if (!upstream.ok) {
      return jsonResponse(
        {
          success: false,
          status: "error",
          message: data?.message || "Upstream packages API failed.",
          upstreamStatus: upstream.status,
          data: Array.isArray(data?.data) ? data.data : [],
        },
        502
      );
    }

    // Pass through successful upstream payload.
    return jsonResponse(data, 200);
  } catch (err) {
    const isAbort = err?.name === "AbortError";
    // Return uniform error shape for network/timeout failures.
    return jsonResponse(
      {
        success: false,
        status: "error",
        message: isAbort ? "Packages request timed out." : "Failed to fetch packages.",
        data: [],
      },
      isAbort ? 504 : 500
    );
  }
}
