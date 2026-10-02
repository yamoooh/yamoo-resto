import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 text-xs text-muted-foreground">
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="hover:text-foreground flex items-center gap-1 transition">
            <Home size={13} className="shrink-0" />
            <span>Accueil</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-muted-foreground/60 shrink-0" />
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-foreground transition">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
