import React from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  FolderTree,
  Image as ImageIcon,
  Sparkles,
  Layers,
  ChefHat,
  Users,
  History,
  ArrowRight,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  FileEdit,
  Video
} from "lucide-react";
import { useData } from "../../contexts/DataContext";

export const Dashboard: React.FC = () => {
  const {
    products,
    categories,
    formulas,
    signatures,
    collections,
    mediaLibrary,
    customers,
    activityLogs,
  } = useData();

  const publishedProducts = products.filter((p) => p.status === "published" || !p.status);
  const draftProducts = products.filter((p) => p.status === "draft" || p.status === "hidden");
  const activeCustomers = customers.filter((c) => c.status === "active");

  return (
    <div className="space-y-8">
      {/* BANNIÈRE DE BIENVENUE */}
      <div className="bg-gradient-to-r from-[#1E3A2B] to-[#2F6F3B] rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B8A49] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#F2B705] font-bold">
              YAMOOH Live CMS & Catalogue
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            Gérez facilement l'ensemble des produits, fiches de prix, formules, visuels de la médiathèque et contenus du site public.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            <Plus size={15} />
            <span>Nouveau Produit</span>
          </Link>
          <Link
            to="/admin/media"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition border border-white/20"
          >
            <ImageIcon size={15} />
            <span>Médiathèque</span>
          </Link>
        </div>
      </div>

      {/* SECTION STATS CONTENU DU SITE */}
      <div>
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
          <Utensils size={14} className="text-[#3B8A49]" />
          <span>Contenu & Catalogue du Site</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/admin/products"
            className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-card hover:border-[#3B8A49] transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Produits Publiés</span>
              <div className="w-8 h-8 rounded-xl bg-[#EBF4EE] text-[#3B8A49] flex items-center justify-center group-hover:bg-[#3B8A49] group-hover:text-white transition">
                <Utensils size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              {publishedProducts.length}
            </div>
            <span className="text-[11px] text-green-700 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 size={12} /> Visibles sur le site
            </span>
          </Link>

          <Link
            to="/admin/products?status=draft"
            className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-card hover:border-[#3B8A49] transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Brouillons / Masqués</span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#D96B43] flex items-center justify-center group-hover:bg-[#D96B43] group-hover:text-white transition">
                <FileEdit size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              {draftProducts.length}
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold mt-1 block">
              En préparation
            </span>
          </Link>

          <Link
            to="/admin/categories"
            className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-card hover:border-[#3B8A49] transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Catégories</span>
              <div className="w-8 h-8 rounded-xl bg-[#EBF4EE] text-[#3B8A49] flex items-center justify-center group-hover:bg-[#3B8A49] group-hover:text-white transition">
                <FolderTree size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              {categories.length}
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold mt-1 block">
              Rayons & Cartes
            </span>
          </Link>

          <Link
            to="/admin/signatures"
            className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-card hover:border-[#3B8A49] transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Signatures Chef</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#F2B705] flex items-center justify-center group-hover:bg-[#F2B705] group-hover:text-white transition">
                <ChefHat size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              {signatures.length}
            </div>
            <span className="text-[11px] text-[#3B8A49] font-semibold mt-1 block">
              Recettes officielles
            </span>
          </Link>

          <Link
            to="/admin/formulas"
            className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-card hover:border-[#3B8A49] transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Formules & Menus</span>
              <div className="w-8 h-8 rounded-xl bg-[#EBF4EE] text-[#3B8A49] flex items-center justify-center group-hover:bg-[#3B8A49] group-hover:text-white transition">
                <Layers size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              {formulas.length}
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold mt-1 block">
              Packs & Menus
            </span>
          </Link>

          <Link
            to="/admin/collections"
            className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-card hover:border-[#3B8A49] transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Collections</span>
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition">
                <Sparkles size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              {collections.length}
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold mt-1 block">
              Saisonnières
            </span>
          </Link>

          <Link
            to="/admin/media"
            className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-card hover:border-[#3B8A49] transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Médiathèque</span>
              <div className="w-8 h-8 rounded-xl bg-[#EBF4EE] text-[#3B8A49] flex items-center justify-center group-hover:bg-[#3B8A49] group-hover:text-white transition">
                <ImageIcon size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              {mediaLibrary.length}
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold mt-1 block">
              Images HD en ligne
            </span>
          </Link>

          <div className="bg-white border border-[#E3ECE6] rounded-2xl p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Vidéos</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Video size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-[#1E3A2B]">
              3
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold mt-1 block">
              Séquences d'ambiance
            </span>
          </div>
        </div>
      </div>

      {/* SECTION CLIENTS & ACTIVITÉ RÉCENTE */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* CLIENTS */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Users size={14} className="text-[#3B8A49]" />
              <span>Comptes Clients</span>
            </h2>
            <Link to="/admin/customers" className="text-xs text-[#3B8A49] hover:underline font-bold">
              Voir tout ({customers.length})
            </Link>
          </div>

          <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3ECE6]">
              <div>
                <span className="text-xs text-muted-foreground">Total Inscrits</span>
                <div className="text-2xl font-black text-[#1E3A2B]">{customers.length}</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Comptes Actifs</span>
                <div className="text-2xl font-black text-[#3B8A49]">{activeCustomers.length}</div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                Derniers Clients
              </span>
              {customers.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs py-1.5">
                  <div>
                    <div className="font-bold text-[#1E3A2B]">{c.fullName}</div>
                    <div className="text-[10px] text-muted-foreground">{c.district} • {c.phone}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold text-[10px]">
                    {c.ordersCount} cdes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIVITÉ RÉCENTE DU JOURNAL D'AUDIT */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <History size={14} className="text-[#3B8A49]" />
              <span>Activité Récente du Back-Office</span>
            </h2>
            <Link to="/admin/logs" className="text-xs text-[#3B8A49] hover:underline font-bold flex items-center gap-1">
              <span>Journal complet</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 shadow-2xs overflow-hidden">
            <div className="divide-y divide-[#E3ECE6]">
              {activityLogs.slice(0, 6).map((log) => (
                <div key={log.id} className="py-3.5 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1E3A2B]">{log.targetEntity}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold uppercase">
                        {log.actionType}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {log.details}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {log.timestamp}
                    </span>
                    <span className="text-[10px] font-bold text-[#2F4F3E] block mt-0.5">
                      {log.adminName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
