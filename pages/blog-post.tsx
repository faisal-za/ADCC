import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Sample blog post content
const getBlogPost = (slug: string, t: any) => {
  const posts = {
    "modern-construction-techniques": {
      id: 1,
      title: t('modernConstructionTitle'),
      excerpt: t('modernConstructionExcerpt'),
      content: `
        <h2>Introduction</h2>
        <p>Modern construction techniques are revolutionizing the building industry. At ADCC, we embrace innovative approaches that enhance efficiency, sustainability, and quality in every project we undertake.</p>
        
        <h2>Key Modern Techniques</h2>
        <h3>1. Prefabricated Construction</h3>
        <p>Prefabricated construction allows for faster project completion while maintaining high quality standards. Components are manufactured in controlled environments and assembled on-site.</p>
        
        <h3>2. Smart Building Integration</h3>
        <p>We incorporate smart technology systems that optimize energy consumption, enhance security, and improve occupant comfort through automated controls and monitoring systems.</p>
        
        <h3>3. Sustainable Materials</h3>
        <p>Using eco-friendly materials like recycled steel, sustainable concrete alternatives, and energy-efficient insulation materials reduces environmental impact while maintaining structural integrity.</p>
        
        <h2>Benefits for Our Clients</h2>
        <ul>
          <li>Reduced construction time by up to 30%</li>
          <li>Enhanced quality control through factory manufacturing</li>
          <li>Lower long-term operational costs</li>
          <li>Improved energy efficiency</li>
          <li>Reduced construction waste</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>By adopting these modern construction techniques, ADCC continues to deliver exceptional results that exceed client expectations while contributing to a more sustainable future in construction.</p>
      `,
      author: "ADCC Team",
      category: t('construction'),
      tags: [t('construction'), t('innovation'), t('technology')],
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      publishedAt: "2024-01-15",
      readTime: "5 min"
    }
  };
  
  return posts[slug as keyof typeof posts] || null;
};

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const { t } = useTranslation();
  const slug = params?.slug || "";
  const post = getBlogPost(slug, t);

  if (!post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            {t('postNotFound')}
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            {t('postNotFoundDesc')}
          </p>
          <Link href="/blog">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToBlog')}
            </Button>
          </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
      <div 
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${post.image}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <Badge 
              variant="secondary"
              className="project-tag bg-primary-600 text-white mb-4"
            >
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-xl opacity-90">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToBlog')}
            </Button>
          </Link>
        </div>

        {/* Post Meta */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="bg-white hover:bg-slate-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              {t('share')}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-primary-600 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Call to Action */}
        <div className="bg-primary-600 rounded-lg p-8 mt-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            {t('readyToStart')}
          </h3>
          <p className="text-primary-100 mb-6">
            {t('contactForProject')}
          </p>
          <Link href="/#contact">
            <Button className="bg-white text-primary-600 hover:bg-slate-100">
              {t('contactUs')}
            </Button>
          </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}