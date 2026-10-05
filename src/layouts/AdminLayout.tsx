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

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#1E3A2B] flex flex-col antialiased">
      {/* HEADER TOP BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E3ECE6] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[#1E3A2B] hover:bg-[#EBF4EE] cursor-pointer"
            aria-label="Menu Mobile"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3B8A49] flex items-center justify-center text-white font-black text-lg shadow-sm">
              Y
            </div>
            <div>
              <span className="font-display font-black text-lg text-[#1E3A2B] tracking-tight">YAMOOH</span>
              <span className="ml-2 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold">
                CMS Back-Office
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* LIEN VERS SITE PUBLIC */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF4EE] hover:bg-[#d8eadd] text-[#3B8A49] text-xs font-bold transition shadow-2xs"
            title="Voir le site public en direct"
          >
            <span className="hidden sm:inline">Voir le site public</span>
            <ExternalLink size={13} />
          </Link>

          {/* PROFIL ADMIN */}
          <div className="flex items-center gap-3 pl-3 border-l border-[#E3ECE6]">
            <div className="hidden sm:flex flex-col text-right">
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
        </div>
      </header>

      {/* CORPS PRINCIPAL : SIDEBAR FIXE + CONTENU */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR DESKTOP */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#E3ECE6] pt-16 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
            mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
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

          {/* FOOTER SIDEBAR AVEC SYNCHRONISATION LIVE */}
          <div className="p-4 border-t border-[#E3ECE6] bg-[#FAF8F5]/80">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#3B8A49]">
              <span className="w-2 h-2 rounded-full bg-[#3B8A49] animate-pulse" />
              <span>Synchronisation Site Actif</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Les modifications sont instantanément appliquées sur le site public.
            </p>
          </div>
        </aside>

        {/* OVERLAY MOBILE */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* CONTENU PRINCIPAL DÉFILANT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
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
