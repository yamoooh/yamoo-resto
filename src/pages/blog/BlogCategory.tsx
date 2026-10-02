import { Link, useLocation } from "react-router-dom";
import { blogPosts } from "../../data/blog";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const BlogCategory = () => {
  const location = useLocation();
  const path = location.pathname;

  let categoryName = "ACTUALITÉS";
  let title = "Actualités YAMOOH";
  let desc = "Les dernières nouvelles et actualités de notre restaurant et bar à salades à Douala.";

  if (path.includes("conseils-astuces")) {
    categoryName = "CONSEILS & ASTUCES";
    title = "Conseils & Astuces";
    desc = "Idées, astuces nutritionnelles et conseils pratiques pour manger frais et sain à Douala.";
  } else if (path.includes("recettes-inspirations")) {
    categoryName = "RECETTES & INSPIRATIONS";
    title = "Recettes & Inspirations";
    desc = "Secrets d'assaisonnements, accords de saveurs et inspirations gourmandes du Chef.";
  } else if (path.includes("evenements")) {
    categoryName = "ÉVÉNEMENTS";
    title = "Événements & Traiteur";
    desc = "Conseils pour organiser vos déjeuners d'affaires, réunions et réceptions à Douala.";
  }

  const posts = blogPosts.filter((p) => p.category === categoryName);

  return (
    <>
      <title>{title} | Blog YAMOOH Douala</title>
      <meta name="description" content={desc} />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Blog", to: "/blog" },
                { label: title },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light">
            {desc}
          </p>
        </div>
      </section>

      {/* GRILLE */}
      <section className="container-tight py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground mb-3">
                  <span className="bg-[#FAF0D8] text-[#D96B43] px-2.5 py-0.5 rounded-full uppercase">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-display font-bold text-foreground mb-3 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B] hover:text-[#D96B43] transition"
                >
                  <span>LIRE L'ARTICLE</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogCategory;
