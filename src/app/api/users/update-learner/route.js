export const runtime = "nodejs";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL ;
const UPDATE_LEARNER_PATH = process.env.BACKEND_UPDATE_LEARNER_PATH || "/users/update-learner";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function PATCH(req) {
  try {
    const incomingAuth = req.headers.get("authorization");
    if (!incomingAuth) {
      return jsonResponse({ ok: false, message: "Authorization header is required." }, 401);
    }

    const contentType = req.headers.get("content-type") || "";
    const isSupportedContentType =
      contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded");
    if (!isSupportedContentType) {
      return jsonResponse(
        {
          ok: false,
          message:
            'Content-Type was not one of "multipart/form-data" or "application/x-www-form-urlencoded".',
        },
        415
      );
    }

    const incomingFormData = await req.formData();
    const hasLearnerID = String(incomingFormData.get("learnerID") || "").trim();
    if (!hasLearnerID) {
      return jsonResponse({ ok: false, message: "learnerID is required." }, 400);
    }

    // Clone all fields/files exactly to preserve multipart payload shape.
    const outgoingFormData = new FormData();
    for (const [key, value] of incomingFormData.entries()) {
      if (value == null) continue;
      outgoingFormData.append(key, value);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const upstream = await fetch(`${BACKEND_BASE_URL}${UPDATE_LEARNER_PATH}`, {
      method: "PATCH",
      headers: {
        Authorization: incomingAuth,
      },
      body: outgoingFormData,
      signal: controller.signal,
      cache: "no-store",
    }).finally(() => clearTimeout(timeout));

    const text = await upstream.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { ok: upstream.ok, message: text || "Unexpected server response." };
    }

    return jsonResponse(data, upstream.status);
  } catch (error) {
    const isAbort = error?.name === "AbortError";
    return jsonResponse(
      {
        ok: false,
        message: isAbort ? "Update request timed out." : error?.message || "Failed to update learner profile.",
      },
      isAbort ? 504 : 500
    );
  }
}
