"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Calendar, User, ArrowLeft, Share2, Loader2 } from "lucide-react";
import { useTranslation } from "../../../../hooks/use-translation";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navigation from "../../../../components/navigation";
import Footer from "../../../../components/footer";
import { useLanguage } from "../../../../contexts/language-context";

// Mock data generator for blog post detail
const generateBlogPostDetail = (id: number) => {
  const categories = [
    "Construction",
    "Sustainability", 
    "Interior Design",
    "Architecture",
  ];
  const images = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  ];

  const category = categories[id % categories.length];
  const image = images[id % images.length];

  const content = `
    <p class="mb-6">This is a comprehensive article about ${category.toLowerCase()} in the construction industry. Our expertise in this field has helped countless clients achieve their project goals with exceptional quality and attention to detail.</p>
    
    <h2 class="text-2xl font-bold mb-4 text-slate-800">Key Insights</h2>
    <p class="mb-6">The construction industry is constantly evolving, and staying ahead of the latest trends and techniques is crucial for success. Our team at ADCC brings years of experience and innovative approaches to every project we undertake.</p>
    
    <h3 class="text-xl font-semibold mb-3 text-slate-700">Best Practices</h3>
    <ul class="list-disc list-inside mb-6 space-y-2">
      <li>Quality materials selection and sourcing</li>
      <li>Advanced construction techniques and methodologies</li>
      <li>Sustainable and environmentally conscious practices</li>
      <li>Timeline management and project coordination</li>
      <li>Client communication and satisfaction</li>
    </ul>
    
    <p class="mb-6">At ADCC, we understand that each project is unique and requires a tailored approach. Our commitment to excellence ensures that every detail is carefully considered and executed to the highest standards.</p>
    
    <h3 class="text-xl font-semibold mb-3 text-slate-700">Our Approach</h3>
    <p class="mb-6">We believe in a collaborative approach that involves our clients throughout the entire process. From initial consultation to project completion, we maintain open communication and provide regular updates to ensure your vision becomes reality.</p>
    
    <p class="mb-6">Whether you're planning a new construction project, renovation, or interior design makeover, our team has the expertise and dedication to deliver exceptional results that exceed your expectations.</p>
  `;

  return {
    id,
    title: `${category} Excellence: Building Tomorrow Today`,
    excerpt: `Discover how our expertise in ${category.toLowerCase()} can transform your construction project with innovative solutions and superior craftsmanship.`,
    content,
    author: `ADCC Expert Team`,
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toISOString()
      .split("T")[0],
    image,
    category,
    readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
    tags: ["Construction", "Quality", "Innovation", category],
  };
};

// Mock API function - replace with real API call
const fetchBlogPost = async (id: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const postId = parseInt(id);
  if (isNaN(postId) || postId < 1) {
    return null;
  }
  
  return generateBlogPostDetail(postId);
};

export default function BlogPostPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const params = useParams();
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        const post = await fetchBlogPost(params.id as string);
        if (post) {
          setBlogPost(post);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadBlogPost();
    }
  }, [params.id]);

  const handleShare = () => {
    if (navigator.share && blogPost) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  if (notFound || !blogPost) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {t("postNotFound") || "Blog Post Not Found"}
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              {t("postNotFoundDesc") || "The blog post you're looking for doesn't exist."}
            </p>
            <Link
              href={`/${language}/blog`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToBlog") || "Back to Blog"}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${blogPost.image}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <Link
                href={`/${language}/blog`}
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("backToBlog") || "Back to Blog"}
              </Link>
              
              <div className="mb-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {blogPost.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {blogPost.title}
              </h1>

              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {blogPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(blogPost.date).toLocaleDateString()}
                </div>
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Article Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                {blogPost.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {blogPost.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="ml-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title={t("share") || "Share"}
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-primary-50 border-primary-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t("readyToStart") || "Ready to Start Your Project?"}
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              {t("contactForProject") || "Contact us today to discuss your construction or design needs."}
            </p>
            <Link
              href={`/${language}#contact`}
              className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t("contactUs") || "Contact Us"}
            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}