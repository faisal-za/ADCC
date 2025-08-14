"use client"

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Sample blog post content
const generateBlogPost = (slug: string, t: any) => {
  const posts: { [key: string]: any } = {
    "modern-construction-techniques": {
      id: "modern-construction-techniques",
      title: t('blogPost1Title'),
      excerpt: t('blogPost1Excerpt'),
      content: t('blogPost1Content'),
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: t('technologyCategory'),
      author: t('authorName'),
      date: "2024-01-15",
      readTime: "5 min",
      tags: [t('constructionTag'), t('technologyTag'), t('innovationTag')]
    },
    "sustainable-building-practices": {
      id: "sustainable-building-practices",
      title: t('blogPost2Title'),
      excerpt: t('blogPost2Excerpt'),
      content: t('blogPost2Content'),
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: t('sustainabilityCategory'),
      author: t('authorName'),
      date: "2024-01-10",
      readTime: "7 min",
      tags: [t('sustainabilityTag'), t('ecoFriendlyTag'), t('greenBuildingTag')]
    },
    "design-trends-2024": {
      id: "design-trends-2024",
      title: t('blogPost3Title'),
      excerpt: t('blogPost3Excerpt'),
      content: t('blogPost3Content'),
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: t('designCategory'),
      author: t('authorName'),
      date: "2024-01-05",
      readTime: "6 min",
      tags: [t('designTag'), t('trendsTag'), t('architectureTag')]
    },
    "renovation-tips": {
      id: "renovation-tips",
      title: t('blogPost4Title'),
      excerpt: t('blogPost4Excerpt'),
      content: t('blogPost4Content'),
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: t('tipsCategory'),
      author: t('authorName'),
      date: "2024-01-01",
      readTime: "4 min",
      tags: [t('renovationTag'), t('tipsTag'), t('improvementTag')]
    }
  };

  return posts[slug] || null;
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useTranslation();
  
  const post = generateBlogPost(slug, t);

  if (!post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              {t('postNotFound')}
            </h1>
            <p className="text-slate-600 mb-8">
              {t('postNotFoundDescription')}
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
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <Badge className="bg-primary-600 text-white mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
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
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToBlog')}
              </Button>
            </Link>
          </div>

          {/* Article Meta */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-slate-600 hover:text-slate-900"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {t('share')}
              </Button>
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