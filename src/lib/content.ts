export const siteMeta = {
  name: "ATW Technologies and Forensics",
  shortName: "ATW",
  tagline: "You got it solved!",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "AI-POWERED CYBERSECURITY · HARARE, ZIMBABWE",
  headline: "Stop intrusions before they strike.",
  tagline: siteMeta.tagline,
  body:
    "ATW Technologies and Forensics builds AI-driven intrusion detection, cybersecurity consulting, and digital forensics for institutions across Zimbabwe.",
};

export type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export const problemStats: Stat[] = [
  { value: 96, suffix: "%", label: "of financial transactions are now conducted online." },
  {
    value: 24,
    prefix: "$",
    suffix: "M",
    label:
      "lost by the Harare Institute of Technology after its payment system was breached by an insider developer.",
  },
];

export const solution = {
  eyebrow: "OUR SOLUTION",
  title: "An AI that watches, alerts, and blocks.",
  body:
    "Our intrusion detection and prevention system uses artificial intelligence to spot suspicious activity, raise instant alerts, and stop intrusions before they cause damage.",
};

export type ProductIcon = "radar" | "hardhat" | "fraud";
export type Product = { title: string; blurb: string; bullets: string[]; icon: ProductIcon };

export const products: Product[] = [
  {
    title: "AI Intrusion Detection & Prevention",
    blurb:
      "Our flagship system watches your network, spots suspicious activity, raises instant alerts, and blocks intrusions before they cause damage.",
    bullets: [
      "Real-time detection and automatic blocking",
      "Resistant to obfuscation, fragmentation, and DoS evasion",
      "Live alerts and a single monitoring dashboard",
    ],
    icon: "radar",
  },
  {
    title: "AI Mining Safety System",
    blurb:
      "AI monitoring built for mining operations — it flags hazardous conditions on site and protects workers in real time.",
    bullets: [
      "Continuous hazard and anomaly monitoring",
      "Instant alerts to supervisors on the ground",
      "Built for remote and high-risk environments",
    ],
    icon: "hardhat",
  },
  {
    title: "AI Fraud Detection",
    blurb:
      "Detects fraudulent transactions and anomalous behaviour across financial systems the moment they happen.",
    bullets: [
      "Transaction-level anomaly scoring",
      "Catches insider and account-takeover patterns",
      "Reduces losses before money leaves the system",
    ],
    icon: "fraud",
  },
];

export type Service = { title: string; description: string; icon: "shield" | "radar" | "search" };

export const services: Service[] = [
  {
    title: "Forensic investigation services",
    description: "Investigation and evidence recovery after a security incident or dispute.",
    icon: "search",
  },
  {
    title: "Cyber security awareness training",
    description: "Hands-on training that turns your staff into your first line of defense.",
    icon: "shield",
  },
  {
    title: "Installation of security applications & systems",
    description: "Deployment and configuration of the tools that keep your organization protected.",
    icon: "shield",
  },
  {
    title: "Cyber security consultancy",
    description: "Expert assessment and hardening of your organization's security posture.",
    icon: "shield",
  },
  {
    title: "Software development",
    description: "Custom, secure software built around how your organization actually works.",
    icon: "radar",
  },
  {
    title: "Digital forensics & cyber security certifications",
    description: "Accredited training and certification in digital forensics and cyber security.",
    icon: "search",
  },
];

export type PricingTier = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
};

export const pricing: PricingTier[] = [
  {
    name: "Cybersecurity Consulting",
    price: "$2,000",
    blurb: "Assessment and hardening of your security posture.",
    features: ["Full posture assessment", "Risk and gap report", "Remediation roadmap"],
  },
  {
    name: "AI Intrusion Detection & Prevention",
    price: "$5,000–$15,000",
    blurb: "Our flagship AI system, deployed for your organization.",
    features: [
      "Real-time detection and blocking",
      "Evasion-resistant AI engine",
      "Alerting and dashboards",
      "Local, hands-on support",
    ],
    highlight: true,
  },
  {
    name: "Digital Forensics",
    price: "Contact for quote",
    blurb: "Investigation and evidence recovery after an incident.",
    features: ["Incident investigation", "Evidence recovery", "Expert reporting"],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What makes your AI intrusion detection different?",
    a: "It's built to defeat the evasion techniques attackers actually use — obfuscation, IP fragmentation, denial-of-service, and account hijacking — not just known signatures.",
  },
  {
    q: "Do you support institutions outside Harare?",
    a: "Yes. We're based in Harare for fast, hands-on support, and we work with institutions across Zimbabwe, including remote and under-resourced areas.",
  },
  {
    q: "Do you offer discounts for schools and clinics?",
    a: "We offer significant discounts for schools, universities, and healthcare institutions in remote and under-resourced areas.",
  },
  {
    q: "What happens after a security incident?",
    a: "Our digital forensics team investigates the breach, recovers evidence, and delivers an expert report you can act on or take to court.",
  },
];

export const whyATW = {
  eyebrow: "WHY ATW",
  title: "Security built for how attacks really happen.",
  features: [
    {
      title: "AI that defeats evasion",
      body:
        "Stops obfuscation, IP fragmentation, denial-of-service, and application & account hijacking — the techniques attackers use to slip past traditional controls.",
    },
    {
      title: "Local support you can reach",
      body: "Based in Harare for fast, hands-on troubleshooting whenever you need it.",
    },
    {
      title: "Accessible to everyone",
      body:
        "Significant discounts for schools, universities, and healthcare institutions in remote and under-resourced areas.",
    },
  ],
};

export const team = [
  { name: "Alexandra Wabatagore", role: "CEO & Founder · Digital Forensic Scientist", photo: "/team/alexandra.jpg" },
];

export const contact = {
  email: "alexandrawabbs@gmail.com",
  phone: "+263 77 112 7760",
  phoneHref: "+263771127760",
  whatsappHref: "https://wa.me/263771127760",
  address: "Stand 233 Charlotte Brooke, Borrowdale, Harare",
  location: "Harare, Zimbabwe",
};

export type SocialIconName = "facebook" | "linkedin" | "tiktok" | "whatsapp";
export type Social = { label: string; href: string; icon: SocialIconName };

export const socials: Social[] = [
  { label: "Facebook", href: "https://www.facebook.com/alexandra.wabatagore", icon: "facebook" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexandra-wabatagore-0169a1224",
    icon: "linkedin",
  },
  { label: "TikTok", href: "https://vm.tiktok.com/ZS966pSLVNYpF-xSdMC/", icon: "tiktok" },
  { label: "WhatsApp", href: "https://wa.me/263771127760", icon: "whatsapp" },
];

export const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];
