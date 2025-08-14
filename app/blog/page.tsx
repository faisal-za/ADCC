"use client"

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, ArrowRight, User } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Sample blog posts data
const generateBlogPosts = (t: any) => [
  {
    id: "modern-construction-techniques",
    title: t('blogPost1Title'),
    excerpt: t('blogPost1Excerpt'),
    content: t('blogPost1Content'),
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: t('technologyCategory'),
    author: t('authorName'),
    date: "2024-01-15",
    readTime: "5 min",
    tags: [t('constructionTag'), t('technologyTag'), t('innovationTag')]
  },
  {
    id: "sustainable-building-practices",
    title: t('blogPost2Title'),
    excerpt: t('blogPost2Excerpt'),
    content: t('blogPost2Content'),
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: t('sustainabilityCategory'),
    author: t('authorName'),
    date: "2024-01-10",
    readTime: "7 min",
    tags: [t('sustainabilityTag'), t('ecoFriendlyTag'), t('greenBuildingTag')]
  },
  {
    id: "design-trends-2024",
    title: t('blogPost3Title'),
    excerpt: t('blogPost3Excerpt'),
    content: t('blogPost3Content'),
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: t('designCategory'),
    author: t('authorName'),
    date: "2024-01-05",
    readTime: "6 min",
    tags: [t('designTag'), t('trendsTag'), t('architectureTag')]
  },
  {
    id: "renovation-tips",
    title: t('blogPost4Title'),
    excerpt: t('blogPost4Excerpt'),
    content: t('blogPost4Content'),
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: t('tipsCategory'),
    author: t('authorName'),
    date: "2024-01-01",
    readTime: "4 min",
    tags: [t('renovationTag'), t('tipsTag'), t('improvementTag')]
  }
];

export default function BlogPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = generateBlogPosts(t);
  const categories = ["all", t('technologyCategory'), t('sustainabilityCategory'), t('designCategory'), t('tipsCategory')];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('blogTitle')}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('blogDescription')}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`${
                      selectedCategory === category
                        ? "bg-primary-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {category === "all" ? t('allCategories') : category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary-600 text-white">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/blog/${post.id}`}>
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                      {t('readMore')}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {t('noResultsFound')}
              </h3>
              <p className="text-slate-600 mb-6">
                {t('tryDifferentSearch')}
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                {t('clearFilters')}
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}