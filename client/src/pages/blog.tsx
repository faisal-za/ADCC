import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, ArrowRight, User } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Sample blog posts data
const getBlogPosts = (t: any) => [
  {
    id: 1,
    title: t('modernConstructionTitle'),
    slug: "modern-construction-techniques",
    excerpt: t('modernConstructionExcerpt'),
    content: "",
    author: "ADCC Team",
    category: t('construction'),
    tags: [t('construction'), t('innovation'), t('technology')],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: "2024-01-15",
    readTime: "5 min"
  },
  {
    id: 2,
    title: t('sustainableDesignTitle'),
    slug: "sustainable-design-practices",
    excerpt: t('sustainableDesignExcerpt'),
    content: "",
    author: "ADCC Team", 
    category: t('design'),
    tags: [t('sustainability'), t('design'), t('environment')],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: "2024-01-10",
    readTime: "7 min"
  },
  {
    id: 3,
    title: t('interiorTrendsTitle'),
    slug: "interior-design-trends-2024",
    excerpt: t('interiorTrendsExcerpt'),
    content: "",
    author: "ADCC Team",
    category: t('interior'),
    tags: [t('interior'), t('trends'), "2024"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: "2024-01-05",
    readTime: "6 min"
  },
  {
    id: 4,
    title: t('renovationTipsTitle'),
    slug: "home-renovation-tips",
    excerpt: t('renovationTipsExcerpt'),
    content: "",
    author: "ADCC Team",
    category: t('renovation'),
    tags: [t('renovation'), t('tips'), t('homeImprovement')],
    image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    publishedAt: "2024-01-01",
    readTime: "8 min"
  }
];

const getCategories = (t: any) => [
  { id: "all", label: t('allCategories') },
  { id: "construction", label: t('construction') },
  { id: "design", label: t('design') },
  { id: "interior", label: t('interior') },
  { id: "renovation", label: t('renovation') }
];

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const blogPosts = getBlogPosts(t);
  const categories = getCategories(t);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === t(selectedCategory);
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`px-4 py-2 rounded-lg font-medium transition-all btn-hover ${
                    selectedCategory === category.id
                      ? "bg-primary-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 btn-hover">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${post.image}')` }}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="secondary"
                    className="project-tag bg-primary-100 text-primary-800"
                  >
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href={`/blog/${post.slug}`}>
                  <Button 
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                  >
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