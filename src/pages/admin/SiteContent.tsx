import React, { useState } from "react";
import { Save, CheckCircle2, Megaphone, LayoutTemplate, Phone, Mail, MapPin, Upload } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export const SiteContent: React.FC = () => {
  const { siteContent, mediaLibrary, updateSiteContent, addMediaItem } = useData();
  const [success, setSuccess] = useState(false);

  // Local State
  const [announcementActive, setAnnouncementActive] = useState(siteContent.announcementBar.isActive);
  const [announcementMsg, setAnnouncementMsg] = useState(siteContent.announcementBar.message);
  const [announcementCta, setAnnouncementCta] = useState(siteContent.announcementBar.ctaText);
  const [announcementLink, setAnnouncementLink] = useState(siteContent.announcementBar.ctaLink);

  const [slides, setSlides] = useState(siteContent.heroSlides);
  const [contactEmail, setContactEmail] = useState(siteContent.contactEmail);
  const [contactPhone, setContactPhone] = useState(siteContent.contactPhone);
  const [contactAddress, setContactAddress] = useState(siteContent.contactAddress);

  const handleSlideChange = (index: number, field: string, value: string) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSlideImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      const newMedia = addMediaItem({
        filename: file.name,
        url: base64Url,
        type: file.type,
        dimensions: "Personnalisé",
        fileSize: `${Math.round(file.size / 1024)} KB`,
        usedBy: [`Slide ${index + 1}`],
      });
      handleSlideChange(index, "image", newMedia.url);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent({
      announcementBar: {
        isActive: announcementActive,
        message: announcementMsg,
        ctaText: announcementCta,
        ctaLink: announcementLink,
      },
      heroSlides: slides,
      contactEmail,
      contactPhone,
      contactAddress,
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex justify-between items-center border-b border-[#E3ECE6] pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
            Gestion des Contenus du Site
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Administrez le bandeau promotionnel supérieur, les 3 slides du Hero et les coordonnées
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
        >
          <Save size={14} />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-2xl flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          <span className="font-bold">Contenu du site mis à jour et synchronisé avec succès !</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* MODULE BANDEAU PROMOTIONNEL DÉFILANT */}
        <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49] flex items-center gap-2">
              <Megaphone size={16} />
              <span>Bandeau d'Annonce Supérieur (Top Bar)</span>
            </h2>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1E3A2B]">
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="rounded text-[#3B8A49]"
              />
              <span>Bandeau activé en haut du site</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
              Message textuel défilant *
            </label>
            <textarea
              value={announcementMsg}
              onChange={(e) => setAnnouncementMsg(e.target.value)}
              rows={2}
              required
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs leading-relaxed outline-hidden"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Texte du bouton d'action (CTA)
              </label>
              <input
                type="text"
                value={announcementCta}
                onChange={(e) => setAnnouncementCta(e.target.value)}
                placeholder="Ex: CRÉER MON COMPTE"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Lien de redirection (Route ou URL)
              </label>
              <input
                type="text"
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                placeholder="Ex: /auth?tab=register"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-mono outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* MODULE SLIDER HERO */}
        <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49] flex items-center gap-2">
            <LayoutTemplate size={16} />
            <span>Hero Slider d'Accueil (3 Slides Cinématographiques)</span>
          </h2>

          <div className="space-y-6 divide-y divide-[#E3ECE6]">
            {slides.map((slide, index) => (
              <div key={slide.id} className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-sm text-[#1E3A2B]">
                    Slide {slide.number} ({slide.position === "left" ? "Texte à Gauche" : "Texte à Droite"})
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold">
                    Durée 5s
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                      Titre de l'affiche
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                      Description sous le titre
                    </label>
                    <textarea
                      value={slide.description}
                      onChange={(e) => handleSlideChange(index, "description", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                      Image d'arrière-plan
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        {slide.image && (
                          <img src={slide.image} alt="Aperçu" className="w-16 h-16 rounded-xl object-cover border border-[#E3ECE6]" />
                        )}
                        <div className="flex-1 space-y-2">
                          <select
                            value={slide.image}
                            onChange={(e) => handleSlideChange(index, "image", e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-mono outline-hidden cursor-pointer"
                          >
                            {mediaLibrary.map((m) => (
                              <option key={m.id} value={m.url}>
                                {m.filename}
                              </option>
                            ))}
                          </select>
                          <label className="w-full py-2 px-3 rounded-xl bg-[#EBF4EE] hover:bg-[#d8eadd] text-[#3B8A49] font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer">
                            <Upload size={14} />
                            <span>Téléverser une image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleSlideImageUpload(index, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                      Texte CTA Principal
                    </label>
                    <input
                      type="text"
                      value={slide.ctaPrimaryText}
                      onChange={(e) => handleSlideChange(index, "ctaPrimaryText", e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COORDONNÉES */}
        <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
            Coordonnées & Contact
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                E-mail de contact
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Téléphone service client
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Adresse physique
              </label>
              <input
                type="text"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteContent;
