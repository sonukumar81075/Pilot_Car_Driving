import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function readJsonFile(filename) {
  const filePath = path.join(process.cwd(), "data", filename);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
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
  const pricing = await readJsonFile("car-pricing.json");
  return { pricing };
}

export async function getBikeTrainingPricingData() {
  const pricing = await readJsonFile("bike-pricing.json");
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