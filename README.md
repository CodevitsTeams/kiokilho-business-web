<div align="center">
  <img src="public/favicon.svg" alt="Kiokilho Logo" width="80" height="80" />
  <h1 align="center">Kiokilho — Aura Artisans</h1>
  <p align="center">
    <strong>Elevating natural burlap into timeless masterpieces.</strong>
    <br />
    A luxury eco-fashion marketplace featuring generative AI shopping assistance.
  </p>
</div>

<hr />

## ✦ The Vision
**Kiokilho** is not just a marketplace; it is a digital boutique crafted for the modern eco-conscious individual. By merging the rustic authenticity of natural burlap with high-end digital aesthetics, we present a seamless, sophisticated shopping experience.

## ✦ Key Features

- **Generative AI Assistant:** An intelligent, context-aware virtual assistant powered by Gemini 3.1 Flash Lite. Features real-time **Generative UI**, rendering interactive product micro-cards instantly within the chat stream.
- **Cinematic User Experience:** Liquid-smooth scrolling powered by Lenis, accompanied by hardware-accelerated micro-animations and parallax effects via Framer Motion.
- **Bespoke Aesthetics:** A meticulously curated design system utilizing `Playfair Display` for elegant serif headings and `Outfit` for pristine modern legibility. Employs deep charcoals, champagne gold accents, and subtle glassmorphism.
- **High-Fidelity Product Showcase:** Immersive galleries featuring the Classic Tote, Urban Sling, and Explorer Pack with seamless cart integration and WhatsApp conversion funnels.

## ✦ Technology Stack

| Architecture | Technologies |
| --- | --- |
| **Core** | React 18, Vite |
| **Styling** | Vanilla CSS3, Custom Properties |
| **Motion & UX** | Framer Motion, Lenis Smooth Scroll |
| **AI Engine** | Google Generative AI (Gemini 3.1 Flash Lite) |
| **Iconography** | Lucide React |

## ✦ Architecture & Scalability

**Why React?**
React is chosen for its component-based architecture, which allows for highly reusable, maintainable, and declarative UI development. It pairs perfectly with Framer Motion to deliver the hardware-accelerated, cinematic animations required for a luxury brand experience without sacrificing performance.

**Serverless Design & Deployment**
This project is built with a **Serverless** architecture (frontend on Vercel/Netlify, backend on Supabase), making it extremely cost-effective and highly available. However, **we highly recommend using containerized deployments via Docker or Kubernetes if self-hosting on a VPS or Cloud infrastructure, especially as the system scales to handle enterprise-level traffic.**

**Future Scalability**
This repository is designed as a foundational stepping stone. It can be seriously expanded into a full-fledged enterprise system with the addition of:
- **Payment Gateway Integration** (Midtrans, Xendit, Stripe, PayPal)
- **Real-Time Order Tracking** (Live logistics and automated courier API integrations)
- **Comprehensive Admin & Analytics Dashboard** (Complete order management, inventory/stock control, and sales forecasting)
- **Advanced AI Capabilities** (Personalized product recommendations, visual search, and automated customer support pipelines)
- **Headless CMS Integration** (Sanity, Strapi, or Contentful for dynamic marketing content and blogs)
- **Omnichannel Marketing CRM** (Automated email campaigns, WhatsApp API broadcasts, and push notifications)
- **Loyalty & Membership Programs** (Tiered customer rewards, VIP points, and exclusive early access)
- **Multi-language & Localization** (Dynamic currency switching and i18n support for a global audience)
- **B2B / Wholesale Portal** (Custom pricing tiers and bulk ordering interfaces for business partners)

## ✦ Luxury Brand Aesthetic
The UI/UX of this project is meticulously crafted to emulate **high-end luxury brands** (e.g., Louis Vuitton, Gucci, Hermès). It utilizes a bespoke design system featuring elegant serif typography (`Playfair Display`), deep charcoals, champagne gold accents, subtle glassmorphism, and hardware-accelerated smooth scrolling. This ensures a premium, "million-dollar" feel while remaining entirely lightweight and free to host.

## ✦ Open Source & Cloning Guide
This is a **public, open-source repository**. Developers, designers, and students are highly encouraged to clone, modify, and use this codebase as a template or reference for their own projects. 

Whether you want to build a luxury e-commerce site, learn about Generative UI with Gemini AI, or study Framer Motion animations, you are free to fork and experiment!

> **⚠️ Attribution Requirement:** If you clone, fork, or heavily modify this repository for public or commercial use, you **must** provide appropriate credit by linking back to this original repository (`https://github.com/CodevitsTeams/kiokilho-business-web`).

### Quick Start:
```bash
# 1. Clone the public repository
git clone https://github.com/CodevitsTeams/kiokilho-business-web.git

# 2. Navigate to the project directory
cd kiokilho-business-web

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# (Don't forget to fill in your Supabase & Gemini API keys in the .env file)

# 5. Start the development server
npm run dev
```

## ✦ Custom Development / Hire Us
Are you looking to build a high-end, luxury website like this for your own products, brand, or business? 

We offer professional, end-to-end custom web development services tailored to your specific aesthetic and technical needs. 
- **Contact Us:** [business@codevits.com](mailto:business@codevits.com)
- **Turnaround Time:** Minimum of 2 days (duration varies depending on feature complexity, custom requests, and database integrations).

Let's collaborate to elevate your digital presence to the next level.

## ✦ Legal & Brand Identity
The **Kiokilho** brand name, logos, and physical product details belong exclusively to the original business based in Prambanan, Sleman, Yogyakarta. However, the **source code, UI components, and architectural logic** of this repository are open for public learning and modification.

<hr />
<div align="center">
  <small>Developed by PT Codevits Innovation Indonesia | © 2026</small>
</div>
