import { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Phone, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  Compass, 
  Sparkles,
  Truck
} from "lucide-react";
import { 
  Establishment, 
  getMainEstablishment, 
  getMapsSearchUrl, 
  getMapsDirectionsUrl, 
  getMapsEmbedUrl 
} from "../data/establishments";

interface GoogleMapLocationProps {
  establishment?: Establishment;
  showDetails?: boolean;
  className?: string;
  ratio?: "16/9" | "16/10" | "4/3" | "auto";
  title?: string;
  subtitle?: string;
}

export const GoogleMapLocation = ({
  establishment = getMainEstablishment(),
  showDetails = true,
  className = "",
  ratio = "16/9",
  title = "Notre Localisation",
  subtitle = "Retrouvez-nous facilement à la Pharmacie Kotto, Douala.",
}: GoogleMapLocationProps) => {
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const mapsSearchUrl = getMapsSearchUrl(establishment.mapsSearchQuery);
  const mapsEmbedUrl = getMapsEmbedUrl(establishment.mapsSearchQuery);

  const handleCalculateRoute = () => {
    setIsLocating(true);
    setGeoError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const { latitude, longitude } = position.coords;
          const url = getMapsDirectionsUrl(establishment.mapsSearchQuery, {
            lat: latitude,
            lng: longitude,
          });
          window.open(url, "_blank", "noopener,noreferrer");
        },
        (error) => {
          setIsLocating(false);
          // Fallback : ouverture de l'itinéraire classique avec destination préremplie
          const fallbackUrl = getMapsDirectionsUrl(establishment.mapsSearchQuery);
          window.open(fallbackUrl, "_blank", "noopener,noreferrer");
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false);
      const fallbackUrl = getMapsDirectionsUrl(establishment.mapsSearchQuery);
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    }
  };

  const getAspectRatioClass = () => {
    switch (ratio) {
      case "16/9":
        return "aspect-16/9";
      case "16/10":
        return "aspect-16/10";
      case "4/3":
        return "aspect-4/3";
      default:
        return "h-[340px] sm:h-[420px]";
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. CONTENEUR CARTE GOOGLE MAPS INTERACTIVE */}
      <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-secondary/30 shadow-card hover:shadow-xl transition-all duration-300 group">
        {/* Badge Flottant d'Établissement sur la carte */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 dark:bg-[#1E3A2B]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-border/60 flex items-center gap-2.5 max-w-[90%]">
          <div className="w-8 h-8 rounded-xl bg-[#D96B43] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MapPin size={17} className="animate-bounce" />
          </div>
          <div className="min-w-0">
            <h4 className="font-display font-black text-xs sm:text-sm text-[#1E3A2B] dark:text-white truncate">
              {establishment.name}
            </h4>
            <p className="text-[10px] text-muted-foreground truncate flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Ouvert • Click & Collect & Livraison</span>
            </p>
          </div>
        </div>

        {/* Iframe Interactive Google Maps */}
        <div className={`w-full ${getAspectRatioClass()} min-h-[300px]`}>
          <iframe
            title={`Carte interactive Google Maps — ${establishment.name}`}
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter contrast-[1.02] opacity-95 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Bandeau d'action rapide sous la carte */}
        <div className="p-4 sm:p-5 bg-card/95 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={15} className="text-[#D96B43] shrink-0" />
            <span className="font-medium">{establishment.address}, {establishment.city}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* BOUTON 1 : VOIR SUR GOOGLE MAPS */}
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-foreground border border-border px-4 py-2.5 rounded-full text-xs font-bold transition shadow-2xs hover:border-[#1E3A2B]"
              title="Ouvrir la fiche dans Google Maps"
            >
              <ExternalLink size={13} className="text-[#D96B43]" />
              <span>Voir sur Google Maps</span>
            </a>

            {/* BOUTON 2 : CALCULER MON ITINÉRAIRE */}
            <button
              onClick={handleCalculateRoute}
              disabled={isLocating}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#1E3A2B] hover:bg-[#162a1f] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-soft cursor-pointer disabled:opacity-75"
              title="Calculer l'itinéraire jusqu'à YAMOOH"
            >
              <Navigation size={13} className={isLocating ? "animate-spin text-[#F2B705]" : "text-[#F2B705]"} />
              <span>{isLocating ? "Calcul en cours..." : "Calculer mon itinéraire"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DÉTAILS PRATIQUES & SERVICES (Optionnel si activé) */}
      {showDetails && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {/* Horaires */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <strong className="block text-xs font-bold text-foreground uppercase tracking-wider">Horaires de Retrait</strong>
              <p className="text-xs text-muted-foreground mt-0.5">{establishment.hours.days}</p>
              <p className="text-xs font-bold text-[#1E3A2B] dark:text-[#F2B705]">{establishment.hours.time}</p>
            </div>
          </div>

          {/* Téléphone & Guidage WhatsApp */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <strong className="block text-xs font-bold text-foreground uppercase tracking-wider">Contact & Guidage</strong>
              <p className="text-xs text-muted-foreground mt-0.5">{establishment.phone}</p>
              <a
                href={`https://wa.me/${establishment.whatsapp}?text=${encodeURIComponent("Bonjour YAMOOH, je souhaite des indications pour me rendre à la Pharmacie Kotto.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#25D366] hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>Guidage par WhatsApp</span>
                <MessageCircle size={11} />
              </a>
            </div>
          </div>

          {/* Livraison Douala Express */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-[#D96B43]/10 text-[#D96B43] flex items-center justify-center shrink-0">
              <Truck size={18} />
            </div>
            <div>
              <strong className="block text-xs font-bold text-foreground uppercase tracking-wider">Zones Livrées</strong>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                Akwa, Bonanjo, Bonapriso, Kotto, Makepe, Bali, Denver, Deido et tout Douala.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapLocation;
