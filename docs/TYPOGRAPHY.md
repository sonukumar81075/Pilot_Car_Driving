# Typography & UI consistency

## Design tokens (`src/lib/typography.js`)

| Role | Token | Classes |
|------|--------|---------|
| Legal page shell | `typo.pageLegal` | `pt-28 md:pt-32 xl:pt-40`, Lexend |
| Legal card | `typo.legalCard` | rounded-3xl, border, shadow |
| Legal section H2 | `typo.legalH2` | `text-2xl font-bold text-slate-900` |
| Legal body / list | `typo.legalBody`, `typo.legalListItem` | `text-base font-medium text-slate-600 leading-relaxed` |
| Legal meta links | `typo.legalMetaLink` | `text-sm font-semibold text-blue-600` |

## What was inconsistent (audit)

1. **Legal pages**: Mixed `text-[20px]` (T&C) vs `text-[24px]` (others) for the same H2 role → unified to **`text-2xl`**.
2. **Body copy**: Mixed `text-[17px]`, `#4c4c4c`, `font-[500]` → unified to **`text-base font-medium text-slate-600`**.
3. **Contact rows**: Mixed `text-[15px]` / `font-[600]` → **`text-sm font-semibold`** for labels + links.
4. **SectionHeading**: Duplicate `mx-auto`, hex grays → **slate** palette + single max-width on description.
5. **Cookies contact**: Address block was not shown (only generic email/phone) → **`contactVariant: "address"`** in JSON + parser in `LegalDocumentSections`.

## Legal JSON flags

- `isList` + `listOutro: true` — first line intro, middle lines bullets, **last line** plain paragraph (e.g. Privacy verification / sharing).
- `contactVariant: "address"` — intro + address lines + `Phone:` / `Email:` parsed to links.
- Titles **`9. Contact Us`** / **`20. Contact Information`** — email + website block.

## Maintaining consistency

1. **New policy pages**: Use `<LegalDocumentSections sections={...} />` + `typo.pageLegal`; do not copy-paste card markup.
2. **Marketing sections**: Prefer `SectionHeading`; keep card titles at **`text-xl`–`text-2xl font-semibold text-slate-900`** for sub-sections.
3. **ESLint**: Consider `eslint-plugin-tailwindcss` with `classnames-order` and a shared allowlist for arbitrary values.
