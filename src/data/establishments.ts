export interface Establishment {
  id: string;
  name: string;
  shortName: string;
  tag: string;
  badge: string;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsSearchQuery: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    days: string;
    time: string;
    sunday?: string;
  };
  services: string[];
  description: string;
  isMain: boolean;
}

export const ESTABLISHMENTS: Establishment[] = [
  {
    id: "kotto-douala",
    name: "YAMOOH Douala — Pharmacie Kotto",
    shortName: "YAMOOH Kotto",
    tag: "Cuisine Centrale & Point de Retrait",
    badge: "Établissement Principal",
    address: "Pharmacie Kotto, Rond-Point Kotto",
    city: "Douala (5ème Arrondissement)",
    country: "Cameroun",
    coordinates: {
      lat: 4.0927,
      lng: 9.7561,
    },
    mapsSearchQuery: "Pharmacie Kotto, Douala, Cameroon",
    phone: "+237 658 254 509",
    whatsapp: "237658254509",
    email: "tchokonte@gmail.com",
    hours: {
      days: "Lundi au Samedi",
      time: "10h00 – 21h00 sans interruption",
      sunday: "Dimanche : Sur réservation traiteur",
    },
    services: [
      "Click & Collect sans attente",
      "Livraison Express tout Douala (Akwa, Bonanjo, Bonapriso, Kotto, Makepe, Bali...)",
      "Atelier Traiteur d'Affaires & Salades Signatures",
      "Paiement Cash, Orange Money & MTN MoMo",
    ],
    description:
      "Notre point névralgique à Douala. Situé au niveau de la Pharmacie Kotto, cet établissement abrite nos cuisines de préparation du matin, notre bar à salades et notre comptoir de retrait rapide.",
    isMain: true,
  },
];

export const YAMOOH_ESTABLISHMENTS = ESTABLISHMENTS;

export function getMainEstablishment(): Establishment {
  return ESTABLISHMENTS.find((e) => e.isMain) || ESTABLISHMENTS[0];
}

export function getMapsSearchUrl(query: string = "Pharmacie Kotto, Douala, Cameroon"): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getMapsDirectionsUrl(
  destination: string = "Pharmacie Kotto, Douala, Cameroon",
  origin?: { lat: number; lng: number }
): string {
  if (origin) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${encodeURIComponent(destination)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function getMapsEmbedUrl(query: string = "Pharmacie Kotto, Douala, Cameroon"): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
}
