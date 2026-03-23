import { notFound } from "next/navigation";
import { PackageDetailsClient } from "@/components/packages/PackageDetailsClient";
import { Container } from "@/components/ui/Container";

const API_URL = "https://devapi.pilotadmin.site/packages/get-packages";

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
  const discount = toNumber(pkg?.discounted_base_price);
  const finalPrice = Math.max(base - discount, 0);
  return finalPrice > 0 ? finalPrice : base;
}

function normalizeAddon(raw, index) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id || raw.addon_id || raw.name || `addon-${index}`);
  const title = String(raw.title || raw.name || `Add-on ${index + 1}`);
  const description = raw.description ? String(raw.description) : "";
  const price = toNumber(raw.price || raw.amount || raw.addon_price);
  return { id, title, description, price };
}

function extractAddons(input) {
  const candidates = [input?.addons, input?.add_ons, input?.package_addons];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      const parsed = candidate.map((item, index) => normalizeAddon(item, index)).filter(Boolean);
      if (parsed.length > 0) return parsed;
    }
  }
  return [
    {
      id: "mock-driving-test",
      title: "Mock Driving Test",
      description: "Practice under exam conditions with a certified examiner.",
      price: 45,
    },
    {
      id: "defensive-driving",
      title: "Defensive Driving Module",
      description: "Advanced techniques for emergency situation management.",
      price: 80,
    },
    {
      id: "highway-practice",
      title: "Highway Practice",
      description: "Master merging, lane changes, and high-speed safety on major highways.",
      price: 50,
    },
  ];
}

async function fetchPackagesById(packageId) {
  const url = `${API_URL}?package_id=${packageId}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch package (${res.status})`);
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

async function fetchAllPackages() {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch packages (${res.status})`);
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

export default async function PackageDetailsPage({ params }) {
  const { id } = await params;
  const packageId = Number(id);
  if (!Number.isFinite(packageId)) notFound();

  const selectedMatches = await fetchPackagesById(packageId);
  const selectedRaw = selectedMatches.find((pkg) => toNumber(pkg?.package_id) === packageId);
  if (!selectedRaw) notFound();

  const selected = toPackageOption(selectedRaw);
  const selectedDrivingType = String(selectedMatches[0]?.driving_type || "");
  const all = await fetchAllPackages();

  const sameTypePackages = all
    .filter(
      (pkg) =>
        String(pkg?.driving_type || "").toLowerCase() === selectedDrivingType.toLowerCase() &&
        String(pkg?.status || "").toUpperCase() === "AC"
    )
    .map(toPackageOption);

  // Keep 2 cards, but always include the clicked/selected package id.
  const isTwoPlanType = ["car", "bike"].includes(String(selectedDrivingType).toLowerCase());
  let packageOptions = [{ ...selected }];

  if (isTwoPlanType) {
    const uniqueSameType = Array.from(
      new Map(sameTypePackages.map((pkg) => [pkg.package_id, pkg])).values()
    );
    const selectedFromType =
      uniqueSameType.find((pkg) => pkg.package_id === selected.package_id) || selected;

    const byPrice = [...uniqueSameType].sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    const basic = byPrice[0];
    const premium = byPrice.length > 1 ? byPrice[byPrice.length - 1] : byPrice[0];

    let twoPlans;
    const selectedIsEdge =
      selectedFromType?.package_id === basic?.package_id ||
      selectedFromType?.package_id === premium?.package_id;

    if (selectedIsEdge) {
      twoPlans = [basic, premium].filter(Boolean);
    } else {
      const counterpart = getFinalPrice(selectedFromType) >= getFinalPrice(premium) ? basic : premium;
      twoPlans = [selectedFromType, counterpart].filter(Boolean);
    }

    const byDisplayedPrice = [...twoPlans].sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    packageOptions = byDisplayedPrice.map((pkg, index) => ({
      ...pkg,
      uiTier: index === 0 ? "Basic Training" : "Premium Training",
      uiBadge: index === 0 ? "Essentials" : "Advanced",
      uiMostPopular: index === 1,
    }));
  } else {
    packageOptions = [
      {
        ...selected,
        uiTier: selected.name || "Selected Package",
        uiBadge: "Essentials",
        uiMostPopular: false,
      },
    ];
  }

  const initialPackageId = selected.package_id;
  const addons = extractAddons(selectedRaw);
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
