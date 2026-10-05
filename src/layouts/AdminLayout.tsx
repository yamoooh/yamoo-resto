import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  Image as ImageIcon,
  Sparkles,
  Layers,
  ChefHat,
  Sliders,
  FileText,
  Users,
  Megaphone,
  Shield,
  History,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  CheckCircle2
} from "lucide-react";
import { useAdminAuth } from "../contexts/AdminAuthContext";

export const AdminLayout: React.FC = () => {
  const { currentAdmin, logout, needsInitialSetup } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (needsInitialSetup) {
    return <NavigateToSetup />;
  }

  if (!currentAdmin) {
    return <NavigateToLogin />;
  }

  const navItems = [
    { label: "Tableau de bord", to: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Tous les produits", to: "/admin/products", icon: Utensils },
    { label: "Catégories", to: "/admin/categories", icon: FolderTree },
    { label: "Formules", to: "/admin/formulas", icon: Layers },
    { label: "Signatures", to: "/admin/signatures", icon: ChefHat },
    { label: "Ingrédients & Options", to: "/admin/ingredients", icon: Sliders },
    { label: "Collections du Moment", to: "/admin/collections", icon: Sparkles },
    { label: "Médiathèque", to: "/admin/media", icon: ImageIcon },
    { label: "Contenu du Site", to: "/admin/content", icon: FileText },
    { label: "Clients", to: "/admin/customers", icon: Users },
    { label: "Marketing & Promos", to: "/admin/marketing", icon: Megaphone },
    { label: "Administrateurs", to: "/admin/admins", icon: Shield },
    { label: "Journal d'activité", to: "/admin/logs", icon: History },
  ];

  const SidebarContent = () => (
    <>
      {/* Nav items — scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain custom-admin-scrollbar p-4 space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
          Gestion de Contenu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                isActive
                  ? "bg-[#3B8A49] text-white shadow-xs"
                  : "text-[#2F4F3E] hover:bg-[#EBF4EE] hover:text-[#1E3A2B]"
              }`}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-[#3B8A49]"} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer sidebar — fixed height, no scroll */}
      <div className="shrink-0 p-4 border-t border-[#E3ECE6] bg-[#FAF8F5]/80">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#3B8A49]">
          <span className="w-2 h-2 rounded-full bg-[#3B8A49] animate-pulse" />
          <span>Synchronisation Site Actif</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          Les modifications sont instantanément appliquées sur le site public.
        </p>
      </div>
    </>
  );

  return (
    /* ROOT — occupe exactement la hauteur de l'écran, pas de scroll global */
    <div className="h-screen max-h-screen overflow-hidden bg-[#F8FAF9] text-[#1E3A2B] flex flex-col antialiased">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="shrink-0 z-40 bg-white border-b border-[#E3ECE6] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="flex items-center gap-4">
          {/* Bouton hamburger mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#EBF4EE] transition cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-2">
            <img
              src="/assets/logo-yamooh-official.png"
              alt="YAMOOH Logo"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 bg-[#EBF4EE] text-[#3B8A49] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#3B8A49]/20">
            <CheckCircle2 size={12} />
            Back-Office Admin
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#3B8A49] transition"
          >
            <ExternalLink size={14} />
            Voir le site
          </a>

          <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-[#EBF4EE] transition cursor-pointer relative">
            <Bell size={16} />
          </button>

          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-xs font-bold text-[#1E3A2B]">{currentAdmin.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-mono">{currentAdmin.role}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#3B8A49] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {currentAdmin.name.charAt(0)}
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
            title="Déconnexion"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* ── CORPS : SIDEBAR + MAIN ─────────────────────────────── */}
      {/*
        flex-1 min-h-0 : prend tout l'espace restant (après le header de 4rem)
        overflow-hidden : empêche le corps entier de scroller
        Les deux enfants scrollent indépendamment grâce à overflow-y-auto
      */}
      <div className="flex-1 min-h-0 flex overflow-hidden relative">

        {/* ── SIDEBAR DESKTOP ──────────────────────────────────── */}
        {/*
          h-full : occupe toute la hauteur du corps (calc(100vh - 4rem))
          overflow-hidden sur l'aside puis flex flex-col
          L'intérieur scrollable est géré par SidebarContent
        */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 h-full bg-white border-r border-[#E3ECE6] overflow-hidden">
          <SidebarContent />
        </aside>

        {/* ── DRAWER MOBILE ────────────────────────────────────── */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
            />
            {/* Drawer panel — scroll indépendant, bloqué derrière le backdrop */}
            <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#E3ECE6] flex flex-col h-full overflow-hidden shadow-2xl lg:hidden">
              <div className="shrink-0 h-16 flex items-center px-4 border-b border-[#E3ECE6]">
                <img
                  src="/assets/logo-yamooh-official.png"
                  alt="YAMOOH Logo"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <SidebarContent />
            </aside>
          </>
        )}

        {/* ── ZONE PRINCIPALE ──────────────────────────────────── */}
        {/*
          flex-1 min-w-0 : prend tout l'espace horizontal restant
          h-full         : hauteur complète du corps
          overflow-y-auto : scroll INDÉPENDANT de la sidebar
          overscroll-contain : empêche le bounce de scroller la page parente
        */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto overscroll-contain custom-admin-scrollbar">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// Petits composants de redirection
const NavigateToSetup = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/admin/setup");
  }, [navigate]);
  return null;
};

const NavigateToLogin = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/admin/login");
  }, [navigate]);
  return null;
};

export default AdminLayout;
