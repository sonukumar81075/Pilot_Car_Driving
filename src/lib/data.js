import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function readJsonFile(filename) {
  const filePath = path.join(process.cwd(), "data", filename);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function packagesToPricingData(packages, { headline, subtitle, icon } = {}) {
  return {
    headline: headline || "Training Packages",
    subtitle:
      subtitle ||
      "Choose the right training program. We provide structured lessons, certified instructors, and complete test preparation.",
    plans: (packages || []).map((p) => {
      const duration =
        typeof p.duration === "number" && p.duration > 0 ? `${p.duration} days` : null;
      const trial =
        p.trialSessions && p.trialSessionsCount
          ? `${p.trialSessionsCount} trial session${p.trialSessionsCount > 1 ? "s" : ""}`
          : null;

      const features = [duration, trial, p.allowLicenseAddOns ? "License add-ons available" : null]
        .filter(Boolean);

      return {
        title: p.name,
        description: p.description || "",
        price: p.discounted_base_price ?? p.base_price ?? 0,
        isPopular: Boolean(p.recommended),
        icon: icon || (p.driving_type || "").toLowerCase(),
        features: features.length ? features : ["Certified instructors", "Structured lessons"],
        package_id: p.package_id,
        driving_type: p.driving_type,
      };
    }),
  };
}

export async function getPackages({ drivingType } = {}) {
  const res = await fetch("https://devapi.pilotadmin.site/packages/get-packages", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch packages (${res.status})`);
  }
  const json = await res.json();
  const all = json?.data || [];
  const filtered = all
    // driving_type filter (Bike/Car/License)
    .filter((p) =>
      drivingType
        ? String(p.driving_type).toLowerCase() === String(drivingType).toLowerCase()
        : true
    )
    // show only active packages
    .filter((p) => String(p.status || "").toUpperCase() === "AC")
    // ignore obvious test/demo packages
    .filter((p) => !/test/i.test(String(p.name || "")));

  return filtered.sort((a, b) => (a.show_order ?? 999) - (b.show_order ?? 999));
}


export async function getLandingData() {
  const [hero, stats, services, steps, testimonials, faq, footer, pricing, leadModal] =
    await Promise.all([
      readJsonFile("hero.json"),
      readJsonFile("stats.json"),
      readJsonFile("services.json"),
      readJsonFile("steps.json"),
      readJsonFile("testimonials.json"),
      readJsonFile("faq.json"),
      readJsonFile("footer.json"),
      readJsonFile("pricing.json"),
      readJsonFile("leadModal.json"),

    ]);

  return { hero, stats, services, steps, testimonials, faq, footer, pricing, leadModal };
}

export async function getCarTrainingPricingData() {
  const pkgs = await getPackages({ drivingType: "Car" });
  const pricing = packagesToPricingData(pkgs, {
    headline: "Car Training Packages",
    subtitle:
      "Choose the right car training program. We provide structured lessons, certified instructors, and complete test preparation.",
    icon: "car",
  });
  return { pricing };
}

export async function getBikeTrainingPricingData() {
  const pkgs = await getPackages({ drivingType: "Bike" });
  const pricing = packagesToPricingData(pkgs, {
    headline: "Bike Training Packages",
    subtitle:
      "Choose the right bike training program. Learn safe riding techniques with certified instructors and real-road practice.",
    icon: "bike",
  });
  return { pricing };
}

export async function getLicensePricingData() {
  const pkgs = await getPackages({ drivingType: "License" });
  const pricing = packagesToPricingData(pkgs, {
    headline: "License Packages",
    subtitle:
      "Choose the right license assistance package. We provide documentation support, slot booking, and test preparation guidance.",
    icon: "license",
  });
  return { pricing };
}

export async function getLegalData() {
  const [terms, privacy] = await Promise.all([
    readJsonFile("terms.json"),
    readJsonFile("privacy.json"),
  ]);

  return { terms, privacy };
}

export async function getInsurancePolicyData() {
  const insurance = await readJsonFile("insurance.json");
  return { insurance };
}

export async function getInsuranceTermsData() {
  const insuranceTerms = await readJsonFile("insurance-terms.json");
  return { insuranceTerms };
}

export async function getCookiesPolicyData() {
  const cookies = await readJsonFile("cookies-policy.json");
  return { cookies };
}

export async function getPaymentsDisclosureData() {
  const paymentsDisclosure = await readJsonFile("b&P-disclosure.json");
  return { paymentsDisclosure };
}

export async function getCancellationRefundPolicyData() {
  const cancellationRefundPolicy = await readJsonFile("cancellation-refund-policy.json");
  return { cancellationRefundPolicy };
}