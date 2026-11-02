# Peptide Cart — Premium Research Peptides & Laboratory Platform

Official web platform and laboratory catalog for **Peptide Cart**, a premier Canadian provider of analytical-grade research peptides, GLP multi-agonists, and biochemical reconstitution reagents.

---

## 🔬 Platform Architecture & Highlights

### 1. High-Purity In-Vitro Research Catalog
- **56 Analytical Reference Compounds**: Comprehensive product inventory encompassing GLP-1 sequences (*Tirzepatide, Semaglutide, Retatrutide, Cagrilintide*), cellular & tissue repair peptides (*BPC-157, TB-500, GLOW, KLOW, GHK-Cu, NAD+, Epithalon, MOTS-c*), and sterile reconstitution supplies (*Bacteriostatic Water*).
- **Quality & Specifications**: Detailed molecular mass, physical form, appearance, storage conditions (-20°C dry), lot numbers, and HPLC verification standards (≥ 99.0% purity).
- **Domestic & International Logistics**: Dispatched from Canadian distribution hubs with express 2–5 business day delivery across all Canadian provinces, alongside expedited worldwide international courier shipping (DHL Express / FedEx Priority) to the United States, Europe, Australia, and select global research destinations.

### 2. Interactive Peptide Reconstitution Calculator
- **Laboratory Calibration Engine**: Computes exact diluent ratios, solution concentrations (mcg/mL and mg/mL), and syringe units.
- **Visual Syringe Simulation**:
  - `1.0 mL (100 Units)` — Standard U-100 Syringe
  - `0.5 mL (50 Units)` — Low Dose U-100 Syringe
  - `0.3 mL (30 Units)` — Micro Dose U-100 Syringe
- **Instant Presets**: Pre-calibrated presets for common sequence assays including Tirzepatide, Semaglutide, BPC-157, and GHK-Cu.
- **Aseptic Protocols**: Step-by-step laboratory guidance for diluent addition, gentle reconstitution swirling, and cold storage parameters.

### 3. Independent Laboratory Analytical Registry (COAs)
- **37 Third-Party HPLC Reports**: Direct access to verified Certificates of Analysis tested independently by **HYTE Research Division**.
- **Chromatographic Transparency**: Search by compound or lot batch identifier (e.g. `PE2#00004`, `PE2#00007`) to verify purity percentages (99.1% – 99.84%) and inspect official analytical certificates.

### 4. Shopping Cart & Minimum Order Engine ($150 CAD)
- **Interactive Cart Drawer**: Real-time slide-out cart with quantity controls, product previews, and instant subtotal calculation.
- **Enforced Minimum Order Threshold**: Automatic validation enforcing a minimum purchase subtotal of **$150.00 CAD** before checkout access is permitted, featuring an interactive progress bar and dynamic shortfall calculation.
- **Discount & Logistics Calculator**: Integrated promotional coupon engine (e.g. `RESEARCH10` for 10% off, `BULK15` for 10+ items) and automated free domestic Canadian shipping on orders exceeding $200 CAD.

### 5. Multi-Region Checkout Architecture (Canada & International Sections)
- **Dedicated Canadian Shipping Section**: Specialized province selector (13 provinces & territories) with domestic postal code validation and local courier tracking (Canada Post Xpresspost / Purolator Express).
- **Dedicated International Shipping Section**: Worldwide destination country routing (United States, UK, EU, Australia, etc.) with international customs declarations and thermal vacuum air transport.
- **Adaptive Courier & Settlement Channels**: Standard vs. Priority cold-chain overnight options, Interac e-Transfer for Canadian bank holders, global cryptocurrency (5% discount), and international SWIFT wire transfers.
- **Itemized Confirmation Receipts**: Automated order identifier generation (e.g. `#PC-89241`) with itemized invoices and destination-specific dispatch guides.

### 6. Institutional Ordering & Wholesale Workflow
- **Tiered Volume Savings**: Programmatic discounts for academic institutions and research laboratories:
  - **Tier 1 (10–24 Vials)**: 15% Savings with free express shipping.
  - **Tier 2 (25–49 Vials)**: 25% Savings with dedicated account coordination.
  - **Tier 3 (50+ Vials / Custom Synthesis)**: Direct enterprise batch reservations.
- **Institutional Invoicing**: Automated request-for-quotation workflow supporting university purchase orders, Interac e-Transfer, and bank wire.

### 5. Regulatory & Compliance Framework
- Built strictly as an informational and educational research catalog with quotation processing in compliance with North American chemical distribution standards.
- Integrated researcher qualification verification confirming visitor age (21+) and laboratory research credentials.
- Prominent disclaimers regarding *in-vitro* analytical research use only.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, TypeScript (Strict Typing)
- **Build System**: Vite 6 (Fast HMR & Optimized Production Bundler)
- **Styling**: Tailwind CSS with custom clinical color palette (`Imperial Violet #4E2A84`, `Champagne Gold #C9A962`)
- **Typography**: Google Fonts — `Jost`
- **Iconography**: Lucide React
- **Code Quality**: Zero runtime dependencies bloat, 100% accessible navigation, full mobile/tablet/desktop responsive design.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.0.0` or higher (Tested on Node `v24.16.0`)
- npm `9.0.0` or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/Sarkodie3/Peptide-Carte.git

# Navigate into the project directory
cd Peptide-Carte

# Install dependencies
npm install
```

### Local Development
```bash
# Start the local development server with hot module replacement
npm run dev
```
Visit `http://localhost:3000` in your web browser.

### Production Build
```bash
# Type-check and build optimized distribution bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Repository Structure

```
├── index.html                   # Entry HTML with Jost typography & SEO meta
├── package.json                 # Dependencies & project scripts
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Custom Tailwind design tokens
├── postcss.config.js            # PostCSS processing
├── src/
│   ├── main.tsx                 # React DOM root entry
│   ├── App.tsx                  # Root application router & state manager
│   ├── index.css                # Global CSS styles & glassmorphism utilities
│   ├── types/
│   │   ├── product.ts           # Product data interface
│   │   ├── labResult.ts         # COA laboratory report interface
│   │   └── navigation.ts        # Navigation routing types
│   ├── data/
│   │   ├── productsData.ts      # 56 verified research compounds
│   │   ├── labResultsData.ts    # 37 independent HPLC test records
│   │   ├── faqData.ts           # Frequently asked questions
│   │   └── wholesaleData.ts     # Institutional tiers & purchasing process
│   ├── components/
│   │   ├── layout/              # Header, TopBanner, Footer, MobileNav, ComplianceModal
│   │   ├── common/              # ProductCard, SearchModal, QuoteModal, COATable
│   │   └── calculator/          # PeptideCalculator, SyringeCanvas, Calculations
│   ├── pages/                   # Home, Shop, ProductDetail, Calculator, LabResults,
│   │                            # Wholesale, FAQ, About, Contact, Shipping, Terms
│   └── utils/
│       ├── calculator.ts        # Dilution & syringe unit mathematical engine
│       └── formatters.ts        # CAD currency & purity formatting
```

---

## ⚖️ Legal & Research Disclaimer
All substances cataloged by Peptide Cart are strictly prepared for *in-vitro* laboratory research, biochemical calibration, and educational analysis. Products are not intended for human or animal application, diagnosis, clinical therapy, or cosmetic use.

---

## 📬 Support & Inquiries
- **Email**: `support@peptidecart.is`
- **Hours**: Monday – Friday, 9:00 AM – 6:00 PM EST
- **Location**: Canadian Fulfillment Facilities (Ontario & British Columbia)
