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

