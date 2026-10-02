import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts, BlogPost } from "../../data/blog";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const BlogHub = () => {
  const [selectedCat, setSelectedCat] = useState<string>("TOUS");

  const categories = [
    "TOUS",
    "ACTUALITÉS",
    "CONSEILS & ASTUCES",
    "RECETTES & INSPIRATIONS",
    "ÉVÉNEMENTS",
  ];

  const filtered = selectedCat === "TOUS" 
    ? blogPosts 
    : blogPosts.filter((p) => p.category === selectedCat);

  return (
    <>
      <title>Blog YAMMOH | Recettes, conseils, nutrition et inspirations</title>
      <meta
        name="description"
        content="Découvrez le blog YAMMOH : recettes, conseils, idées autour de l'alimentation, de la fraîcheur, du bien-être et de l'univers de la marque."
      />
      <link rel="canonical" href="https://yamooh.com/blog" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Blog" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Le Journal de la Fraîcheur
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-4">
            Le journal YAMMOH
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light">
            Conseils, inspirations, recettes et actualités autour de la fraîcheur, de l'alimentation et de l'univers YAMMOH.
          </p>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* CONTENU */}
      <section className="container-tight py-12 lg:py-16">
        {/* FILTRES CATÉGORIES */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCat === cat
                  ? "bg-[#1E3A2B] text-white shadow-soft"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLE D'ARTICLES */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              {post.image && (
                <div className="relative aspect-16/9 overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground mb-3">
                  <span className="text-[#D96B43] font-bold uppercase">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-display font-bold text-foreground group-hover:text-[#D96B43] transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>
                </Link>

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

export default BlogHub;
