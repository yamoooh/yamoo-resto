import { useParams, Link, useNavigate } from "react-router-dom";
import { blogPosts } from "../../data/blog";
import { ArrowLeft, Clock, Calendar, Share2, MessageCircle, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="container-tight py-20 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Article introuvable</h1>
        <p className="text-muted-foreground text-sm mb-6">L'article demandé n'existe pas ou a été déplacé.</p>
        <Link to="/blog" className="bg-[#1E3A2B] text-white px-6 py-2.5 rounded-full text-xs font-bold">
          Retour au blog
        </Link>
      </section>
    );
  }

  const similarPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  return (
    <>
      <title>{post.title} | Blog YAMOOH Douala</title>
      <meta name="description" content={post.excerpt} />
      <link rel="canonical" href={`https://yamooh.com/blog/${post.slug}`} />

      {/* ARTICLE HEADER */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 max-w-3xl mx-auto">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: "Blog", to: "/blog" },
                { label: post.title },
              ]}
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-[#F2B705] mb-4">
            <span className="bg-white/10 px-3 py-1 rounded-full uppercase border border-white/15">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-white/80">
              <Calendar size={13} /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-white/80">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* CORPS DE L'ARTICLE */}
      <article className="container-tight py-12 lg:py-16 max-w-3xl mx-auto">
        {/* Image principale de l'article */}
        {post.image && (
          <div className="rounded-3xl overflow-hidden shadow-card mb-10 aspect-16/9 bg-gray-100">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Intro */}
        <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-border rounded-3xl mb-10 text-base sm:text-lg text-foreground font-medium leading-relaxed">
          {post.content.intro}
        </div>

        {/* Sections */}
        <div className="space-y-8 text-muted-foreground text-sm sm:text-base leading-relaxed">
          {post.content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {sec.heading}
              </h2>
              <p>{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-10 p-6 sm:p-8 bg-card border border-border rounded-3xl text-sm leading-relaxed space-y-2">
          <h3 className="font-display font-bold text-lg text-[#1E3A2B]">En résumé</h3>
          <p className="text-muted-foreground">{post.content.conclusion}</p>
        </div>

        {/* Barre de partage */}
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition cursor-pointer"
          >
            <ArrowLeft size={16} /> Retour aux articles
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-[#1E3A2B] hover:bg-[#162B20] text-white text-xs font-bold px-4 py-2 rounded-full transition cursor-pointer"
          >
            <Share2 size={14} /> Partager l'article
          </button>
        </div>

        {/* ARTICLES SIMILAIRES */}
        {similarPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Articles similaires
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {similarPosts.map((sp) => (
                <div key={sp.slug} className="bg-card border border-border rounded-3xl p-6 shadow-card flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-[#FAF0D8] text-[#D96B43] px-2 py-0.5 rounded-full mb-2 inline-block">
                      {sp.category}
                    </span>
                    <h4 className="text-lg font-display font-bold text-foreground mb-2 leading-snug">
                      {sp.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{sp.excerpt}</p>
                  </div>
                  <Link
                    to={`/blog/${sp.slug}`}
                    className="text-xs font-bold text-[#1E3A2B] hover:text-[#D96B43] inline-flex items-center gap-1 transition"
                  >
                    <span>Lire</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default BlogPostDetail;
