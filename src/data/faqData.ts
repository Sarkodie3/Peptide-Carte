// Verified FAQ Data
export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    "category": "Shipping & Fulfillment",
    "question": "Do you ship directly from Canada?",
    "answer": "Yes. All orders ship directly from our domestic Canadian fulfillment facilities. This ensures expedited transit times, reliable tracking, and eliminates any international customs inspections or import delays for Canadian researchers."
  },
  {
    "category": "Shipping & Fulfillment",
    "question": "Do you offer same-day shipping?",
    "answer": "Yes. Research orders verified before 1:00 PM EST on standard business days (Monday through Friday) are generally processed and dispatched the same day via Express tracked delivery."
  },
  {
    "category": "Shipping & Fulfillment",
    "question": "What is the typical transit time?",
    "answer": "Standard Express Shipping within Canada typically takes 2 to 5 business days depending on province. Major metropolitan centers often receive deliveries in 2 business days."
  },
  {
    "category": "Product Quality & Verification",
    "question": "How are your peptides tested for purity?",
    "answer": "Every individual batch is subjected to independent third-party analytical evaluation by HYTE Research Division using High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (LC-MS). Full Certificates of Analysis (COA) specifying purity (typically exceeding 99%) are openly cataloged on our Lab Results page."
  },
  {
    "category": "Product Quality & Verification",
    "question": "How should lyophilized peptides be stored upon receipt?",
    "answer": "Unopened, lyophilized peptide vials should be stored frozen at -20\u00b0C in a dry, dark environment to maintain maximal stability for up to 24-36 months. Once reconstituted with bacteriostatic water, vials should be refrigerated at 2\u00b0C to 8\u00b0C and utilized within the recommended stability period."
  },
  {
    "category": "Product Quality & Verification",
    "question": "Do you offer a satisfaction guarantee?",
    "answer": "We back our purity claims with a 50-day quality guarantee. If an independent laboratory analysis of an unopened batch demonstrates substandard purity compared to published COA specifications, our support team will provide an immediate resolution."
  },
  {
    "category": "Orders & Inquiries",
    "question": "Are these compounds intended for human use?",
    "answer": "Strictly no. All compounds cataloged on Peptide Cart are exclusively formulated and sold for in-vitro laboratory research, cellular assays, and biochemical investigations. They are strictly not for human or animal application, diagnosis, or clinical therapy."
  },
  {
    "category": "Orders & Inquiries",
    "question": "Do you offer wholesale and bulk research pricing?",
    "answer": "Yes. We accommodate volume research laboratories, universities, and private research institutes with tiered volume discounts starting at 10+ vials. Visit our Wholesale & Bulk Orders page to review discount schedules and submit a custom quote request."
  }
];
