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

export type Service = { title: string; description: string; price?: string; icon: "shield" | "radar" | "search" };

export const services: Service[] = [
  {
    title: "Cybersecurity Consulting",
    description: "Expert assessment and hardening of your organization's security posture.",
    price: "$2,000 USD",
    icon: "shield",
  },
  {
    title: "AI Intrusion Detection & Prevention",
    description: "Our flagship AI system that detects and blocks attacks in real time.",
    price: "$5,000–$15,000 USD",
    icon: "radar",
  },
  {
    title: "Digital Forensics",
    description: "Investigation and evidence recovery after a security incident.",
    icon: "search",
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
  { name: "Wayne Mureverwi", role: "Digital Forensic Scientist & Software Developer", photo: "/team/wayne.jpg" },
  { name: "Tarbaby Banda", role: "Senior Software Engineer", photo: "/team/tarbaby.jpg" },
];

export const contact = {
  email: "alexandrawabbs@gmail.com",
  phone: "+263 77 112 7760",
  phoneHref: "+263771127760",
  location: "Harare, Zimbabwe",
};
