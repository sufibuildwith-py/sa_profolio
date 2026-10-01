export interface SiteConfig {
  name: string;
  tagline: string;
  positioning: string;
  metaDescription: string;
  established: string;
  headquarters: {
    city: string;
    state: string;
    country: string;
    hub: string;
    address: string;
    coordinates: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    dispatchDesk: string;
  };
  social: {
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  descriptors: string[];
}

export const siteConfig: SiteConfig = {
  name: "SA PRODUCTION",
  tagline: "Built for the moments that cannot go wrong.",
  positioning: "A production company that turns complex events into controlled experiences.",
  metaDescription: "SA Production delivers sound, lighting, stage, LED, camera and complete event production for weddings, corporate events, live music, conferences and large-scale productions.",
  established: "KANPUR · PAN-INDIA",
  headquarters: {
    city: "Kanpur",
    state: "Uttar Pradesh",
    country: "India",
    hub: "Headquarters & Central Tech Depot",
    address: "Central Operations Depot, Panki Industrial Area, Kanpur, UP 208022",
    coordinates: "26.4499° N, 80.3319° E",
  },
  contact: {
    phone: "+91 90000 10001",
    whatsapp: "+91 90000 10001",
    email: "production@saproduction.in",
    dispatchDesk: "ops@saproduction.in",
  },
  social: {
    instagram: "https://instagram.com/saproduction",
    youtube: "https://youtube.com/@saproduction",
    linkedin: "https://linkedin.com/company/sa-production",
  },
  descriptors: [
    "SOUND",
    "LIGHT",
    "STAGE",
    "VISUALS",
    "CAMERA",
    "LIVE EXECUTION"
  ]
};
