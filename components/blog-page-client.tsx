"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { User, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "../hooks/use-translation";
import { useQuery } from "@tanstack/react-query";
import { loadMoreBlogPosts } from "../lib/actions/blog";

interface BlogPageClientProps {
  locale: string;
  initialBlogData: any[];
  categoriesData: any[];
  totalBlogCount: number;
  pageSize: number;
}

export default function BlogPageClient({ 
  locale, 
  initialBlogData, 
  categoriesData, 
  totalBlogCount, 
  pageSize 
}: BlogPageClientProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [blogData, setBlogData] = useState(initialBlogData);
  const [currentOffset, setCurrentOffset] = useState(initialBlogData.length);
  const [hasMore, setHasMore] = useState(initialBlogData.length < totalBlogCount);

  // TanStack Query for loading more posts
  const {
    data: morePostsData,
    refetch: loadMorePosts,
    isLoading: loading,
    isSuccess
  } = useQuery({
    queryKey: ['blog-load-more', locale, currentOffset],
    queryFn: async () => {
      return await loadMoreBlogPosts(currentOffset, pageSize, locale);
    },
    enabled: false // Only run when manually triggered
  });

  // Handle successful load more response
  useEffect(() => {
    if (isSuccess && morePostsData) {
      const newPosts = morePostsData.data || [];
      setBlogData(prev => [...prev, ...newPosts]);
      setCurrentOffset(prev => prev + newPosts.length);
      setHasMore(morePostsData.hasMore && (blogData.length + newPosts.length < totalBlogCount));
    }
  }, [isSuccess, morePostsData, blogData.length, totalBlogCount]);

  // Get unique categories from the actual data
  const allCategories = categoriesData.map(cat => ({
    id: cat.id,
    title: cat.translations?.[0]?.title || 'Unknown'
  }));
  
  const availableCategories = [
    { id: "all", title: t("allCategories") || "All" },
    ...allCategories
  ];

  const filteredPosts = selectedCategory === "all" 
    ? blogData 
    : blogData.filter((post: any) => {
        const postCategoryId = post.categories?.[0]?.categories?.id;
        return postCategoryId === selectedCategory;
      });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setBlogData(initialBlogData);
      setCurrentOffset(initialBlogData.length);
      setHasMore(initialBlogData.length < totalBlogCount);
    } else {
      // For category filtering, we reset to show all posts and filter client-side
      setBlogData(initialBlogData);
      setCurrentOffset(initialBlogData.length);
      setHasMore(false); // Disable load more for category filtering for now
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            {locale === 'ar' ? (
              <div className="flex flex-row items-center gap-2">
                <ArrowRight className="h-4 w-4 mr-2" />
                <p>{t("home")}</p>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <p>{t("home")}</p>
              </div>
            )}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t("blogTitle") || "Blog"}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            {t("blogDescription") ||
              "Stay updated with the latest insights, trends, and innovations in construction and design."}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-primary-600 text-white shadow-lg scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-primary-200 hover:shadow-md"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts && filteredPosts.map((post: any) => (
            <Link key={post.id} href={`/${locale}/blog/${post.id}`} className="group">
              <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1">
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center bg-gray-200"
                    style={{ 
                      backgroundImage: post.image?.id 
                        ? `url('https://admin.adcc.sa/assets/${post.image.id}')` 
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="default"
                      className="bg-white/90 text-slate-700 text-xs font-medium hover:bg-white"
                    >
                      {post.categories?.[0]?.categories?.translations?.[0]?.title || 'General'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {post.translations?.[0]?.title || 'Untitled'}
                  </h3>

                  <p className="text-slate-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
                    {post.translations?.[0]?.description || ''}
                  </p>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <div className="flex items-center justify-between text-sm text-slate-500 w-full">
                    <div className="flex flex-row items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>ADCC Team</span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <span>
                        {locale === 'ar' 
                          ? `${post.read_time || '3'} ${t("minRead") || "دقائق قراءة"}`
                          : `${post.read_time || '3'} ${t("minRead") || "min read"}`
                        }
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && selectedCategory === "all" && (
          <div className="text-center mt-12">
            <button
              onClick={() => loadMorePosts()}
              disabled={loading}
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  {t("loadingMore") || "Loading more..."}
                </>
              ) : (
                <>
                  {t("loadMore") || "Load More Posts"}
                  <ArrowLeft 
                    className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`}
                  />
                </>
              )}
            </button>
          </div>
        )}

        {/* No Posts State */}
        {(!filteredPosts || filteredPosts.length === 0) && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              {selectedCategory === "all" 
                ? (t("noBlogPosts") || "No blog posts available yet. Check back soon!")
                : (t("noPostsInCategory") || "No posts found in this category.")
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}