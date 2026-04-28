# AGENTS.md — wilver-opencode

## What this project is

**Product catalog website** for **Industria Colombia E&M** (client: Michael Esteban Montaña Parra), developed by **Jeisson Steven Fonseca Medina (JStevenfm)**. The authoritative scope is in `docs/Contrato_Pagina_Web_Industria E&M.pdf`.

### Critical distinction: this is NOT an ecommerce

The site is a **catalog with WhatsApp-based ordering**. There is NO shopping cart, NO payment gateway, and NO checkout flow. Any feature request that adds ecommerce functionality is out of contract scope and requires a separate quotation.

### Included features (contract scope)

- Product catalog: category listing + detail pages, 100% responsive custom design
- Internal search by product name and category
- WhatsApp ordering flow: users can add multiple products to a "pedido" before sending — the pre-filled message includes greeting + all selected items with quantities
- CMS admin panel: manage products, categories, images
- SEO: Schema.org (Product, Organization), sitemap, robots.txt, llms.txt en raíz
- Analytics (PostHog) + error monitoring (Sentry)
- Domain registration + SSL (first year) — domain via Porkbun (`industriacolombiaem.com`)
- 2 corporate email accounts on Zoho Mail: `info@[dominio]` and `michael@[dominio]`
- Production deployment with custom domain
- CMS usage guide + 1-hour training session
- Initial load: 10 sample products (client handles full catalog via CMS)

### Explicit exclusions (do NOT build these)

- Logo design / visual identity development
- Copywriting, product descriptions, or content creation
- Product photography or image editing
- Payment gateway (PSE, credit cards, or any electronic payment)
- Blog, news section, or editorial content module
- Social media integration beyond footer links
- User authentication or customer accounts
- Order management panel or purchase history
- External email client configuration (Outlook, Apple Mail, etc.)
- Content migration from previous platforms

### Contract constraints agents must respect

- Maximum **2 rounds of minor adjustments** included — changes beyond that need a new quote
- "Minor adjustments" = colors, typography, spacing, text, image replacement, section/category reordering only
- Everything else (new features, additional pages, CMS data structure changes, new integrations) requires a written additional quote

## Tech stack

| Layer | Choice | Hosting |
|-------|--------|---------|
| Frontend | Next.js 16, App Router, Tailwind CSS | Vercel |
| CMS | Strapi v5 (headless, admin on `cms.[dominio]`) | Railway |
| Image storage | Cloudinary (free tier, Strapi v5 provider) | Cloudinary CDN |
| Analytics | PostHog | PostHog Cloud |
| Error monitoring | Sentry | Sentry Cloud |
| Domain | Porkbun | — |
| Email | Zoho Mail (2 accounts) | — |
| Design source | Google Stitch (mockups completos por pantalla) | — |

- Next.js 16 uses `cacheComponents: true` — PPR with static shell + dynamic islands is the rendering strategy.
- Strapi is consumed exclusively via API (REST). The admin panel is never public-facing.
- Railway has ephemeral filesystem — all image uploads go through Cloudinary provider, NOT local disk.
- Domain/DNS/SMTP config is the last phase, not the first.

## Repository structure

- `docs/` — business documents only (contracts, quotations). Never put source code here.
- `web/` — Next.js 16 project root (to be created during bootstrap).

## Project state

Greenfield. Next step: bootstrap `web/` with Next.js 16 + Tailwind, then configure Strapi v5 project structure.

## Contract reference values

- Total value: $950,000 COP (50% upfront, 50% within 30 days of delivery)
- Development timeline: 15 business days (from deposit + materials received)
- Warranty: 6 months from production deployment
- Annual retention from year 2: ~$320,000 COP (infrastructure renewal + passive monitoring + 1 review session)
