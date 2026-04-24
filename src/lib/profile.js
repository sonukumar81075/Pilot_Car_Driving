"use client";

const REQUIRED_PROFILE_FIELDS = [
  "name",
  "email",
  "contactInfo",
  "dob",
  "gender",
];

function findStringValueByKey(obj, matcher) {
  if (!obj || typeof obj !== "object") return "";
  const queue = [obj];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || typeof current !== "object") continue;

    for (const [key, value] of Object.entries(current)) {
      if (typeof value === "string" && matcher(key, value) && value.trim()) {
        return value.trim();
      }
      if (value && typeof value === "object") {
        queue.push(value);
      }
    }
  }

  return "";
}

function parseLanguageIds(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item == null) return "";
        if (typeof item === "number" || typeof item === "string") return String(item).trim();
        if (typeof item === "object") {
          return String(item.languageID || item.languageId || item.id || "").trim();
        }
        return "";
      })
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      return parseLanguageIds(parsed);
    } catch {
      return trimmed
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
    }
  }

  return [];
}

export function getStoredAuthContext() {
  const rawUser = sessionStorage.getItem("pilotUser") || localStorage.getItem("pilotUser");
  let parsedUser = null;
  if (rawUser) {
    try {
      parsedUser = JSON.parse(rawUser);
    } catch {
      parsedUser = null;
    }
  }

  const directTokenKeys = ["token", "accessToken", "authToken", "pilotToken"];
  let token = "";
  for (const key of directTokenKeys) {
    const fromStorage = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (typeof fromStorage === "string" && fromStorage.trim()) {
      token = fromStorage.trim();
      break;
    }
  }

  if (!token && parsedUser) {
    token = findStringValueByKey(parsedUser, (key) => key.toLowerCase().includes("token"));
  }

  const learnerID = parsedUser
    ? findStringValueByKey(
        parsedUser,
        (key) => key.toLowerCase() === "learnerid" || key.toLowerCase() === "learner_id"
      )
    : "";

  return { token, learnerID, parsedUser };
}

export function normalizeLearnerProfile(source) {
  const payload = source?.data ?? source?.user ?? source ?? {};
  const dob = String(payload?.dob || payload?.date_of_birth || "").trim();
  const gender = String(payload?.gender || "").trim();

  return {
    name: String(payload?.name || "").trim(),
    email: String(payload?.email || "").trim(),
    contactInfo: String(payload?.contactInfo || payload?.contact || payload?.mobile || "").trim(),
    altContactInfo: String(payload?.altContactInfo || payload?.altContact || "").trim(),
    dob: dob ? dob.slice(0, 10) : "",
    gender,
    address: String(payload?.address || "").trim(),
    zoneID: String(payload?.zoneID || payload?.zoneId || payload?.zone_id || "").trim(),
    idProofType: String(payload?.idProofType || "").trim(),
    idProofNo: String(payload?.idProofNo || "").trim(),
    licenseType: String(payload?.licenseType || "").trim(),
    languages: parseLanguageIds(payload?.languages),
  };
}

export function isProfileComplete(profileValues) {
  return REQUIRED_PROFILE_FIELDS.every((key) => {
    const value = profileValues?.[key];
    return typeof value === "string" ? Boolean(value.trim()) : Boolean(value);
  });
}
