import { notFound } from "next/navigation";
import { PackageDetailsClient } from "@/components/packages/PackageDetailsClient";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL ;
const API_URL = `${BACKEND_BASE_URL}/packages/get-packages`;
const ADDON_API_URL = `${BACKEND_BASE_URL}/packages/get-add-ons`;

async function safeFetchJson(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    }).finally(() => clearTimeout(timeout));
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function toPackageOption(input) {
  return {
    package_id: toNumber(input?.package_id),
    name: String(input?.name || "Untitled Package"),
    description: String(input?.description || ""),
    base_price: toNumber(input?.base_price),
    discounted_base_price: toNumber(input?.discounted_base_price),
    recommended: Boolean(input?.recommended),
    duration: toNumber(input?.duration),
    trialSessions: Boolean(input?.trialSessions),
    trialSessionsCount: toNumber(input?.trialSessionsCount),
    allowLicenseAddOns: Boolean(input?.allowLicenseAddOns),
    secondOnly: Boolean(input?.secondOnly),
    show_order: toNumber(input?.show_order),
  };
}

function getFinalPrice(pkg) {
  const base = toNumber(pkg?.base_price);
  const discounted = toNumber(pkg?.discounted_base_price);
  return discounted > 0 ? discounted : base;
}

function normalizeAddon(raw, index) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id || raw.add_on_id || raw.addon_id || raw.name || `addon-${index}`);
  const title = String(raw.title || raw.name || `Add-on ${index + 1}`);
  const description = raw.description ? String(raw.description) : "";
  const base = toNumber(raw.base_price || raw.price || raw.amount || raw.addon_price);
  const discounted = toNumber(raw.discounted_base_price);
  const price = discounted > 0 ? discounted : base;
  return {
    id,
    title,
    description,
    price,
    base_price: base,
    discounted_base_price: discounted,
  };
}

function mapDrivingTypeToAddonType(drivingType) {
  const key = String(drivingType || "").toLowerCase().trim();
  if (key === "bike") return "BikeLicense";
  if (key === "car") return "License";
  if (key === "license") return "License";
  return "";
}

async function fetchAddonsByType(drivingType) {
  const type = mapDrivingTypeToAddonType(drivingType);
  const withTypeUrl = `${ADDON_API_URL}?status=AC${type ? `&type=${encodeURIComponent(type)}` : ""}`;

  const withTypeJson = await safeFetchJson(withTypeUrl);
  const withTypeData = Array.isArray(withTypeJson?.data) ? withTypeJson.data : [];

  // If filter returns data, use it. Otherwise retry with status-only for safer compatibility.
  if (withTypeData.length > 0 || !type) {
    return withTypeData.map(normalizeAddon).filter(Boolean);
  }

  const fallbackJson = await safeFetchJson(`${ADDON_API_URL}?status=AC`);
  const fallbackData = Array.isArray(fallbackJson?.data) ? fallbackJson.data : [];
  return fallbackData.map(normalizeAddon).filter(Boolean);
}

async function fetchPackagesById(packageId) {
  const url = `${API_URL}?package_id=${packageId}`;
  const json = await safeFetchJson(url);
  return Array.isArray(json?.data) ? json.data : [];
}

async function fetchAllPackages() {
  const json = await safeFetchJson(API_URL);
  return Array.isArray(json?.data) ? json.data : [];
}

export default async function PackageDetailsPage({ params }) {
  const { id } = await params;
  const packageId = Number(id);
  if (!Number.isFinite(packageId)) notFound();

  const selectedMatches = await fetchPackagesById(packageId);
  const all = await fetchAllPackages();
  const selectedRaw =
    selectedMatches.find((pkg) => toNumber(pkg?.package_id) === packageId) ||
    all.find((pkg) => toNumber(pkg?.package_id) === packageId);
  if (!selectedRaw) notFound();
  if (String(selectedRaw?.status || "").toUpperCase() !== "AC") notFound();

  const selected = toPackageOption(selectedRaw);
  const selectedDrivingType = String(selectedRaw?.driving_type || "");

  const sameTypePackages = all
    .filter(
      (pkg) =>
        String(pkg?.driving_type || "").toLowerCase() === selectedDrivingType.toLowerCase() &&
        String(pkg?.status || "").toUpperCase() === "AC"
    )
    .map(toPackageOption);

  // Show only the selected package on package details page.
  const packageOptions = [{ ...selected }];

  const initialPackageId = selected.package_id;
  const isLicenseType = String(selectedDrivingType || "").toLowerCase().includes("license");
  const addons = isLicenseType ? [] : await fetchAddonsByType(selectedDrivingType);
  const packageTypeLabel = selectedDrivingType || "Car";

  return (
    <section className="md:pt-40 pt-32 pb-24 bg-gradient-to-b from-white to-[var(--brand-muted)] font-lexend">
      {/* <Container>  */}
      <PackageDetailsClient
        packageOptions={packageOptions}
        initialPackageId={initialPackageId}
        packageTypeLabel={packageTypeLabel}
        addons={addons}
      />
      {/* </Container> */}
    </section>
  );
}
