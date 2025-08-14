"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { useTranslation } from "../../hooks/use-translation";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import Navigation from "../../components/navigation";
import Footer from "../../components/footer";

// Mock data generator for infinite scroll
const generateBlogPost = (id: number) => {
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

  return {
    id,
    title: `Blog Post ${id}: ${category} Insights`,
    excerpt: `This is a sample excerpt for blog post ${id}. It provides a brief overview of the content that would be available in a real blog post about ${category.toLowerCase()}.`,
    content: `This would be the full content of blog post ${id} about ${category}...`,
    author: `Author ${Math.floor(Math.random() * 5) + 1}`,
    date: new Date(2024, 0, Math.floor(Math.random() * 30) + 1)
      .toISOString()
      .split("T")[0],
    image,
    category,
  };
};

// Mock API function - replace with real API call
const fetchBlogPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const pageSize = 6;
  const posts = Array.from({ length: pageSize }, (_, index) =>
    generateBlogPost((pageParam - 1) * pageSize + index + 1),
  );

  return {
    posts,
    nextCursor: pageParam < 10 ? pageParam + 1 : undefined, // Simulate 10 pages max
    hasNextPage: pageParam < 10,
  };
};

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryKeys = [
    "all",
    "construction",
    "sustainability",
    "interior",
    "architecture",
  ] as const;

  // TODO: Replace with real API endpoint
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["blog-posts", selectedCategory],
    queryFn: fetchBlogPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];
  const filteredPosts =
    selectedCategory === "all"
      ? allPosts
      : allPosts.filter(
          (post) =>
            post.category.toLowerCase() ===
            selectedCategory.replace("interior", "interior design"),
        );

  const getCategoryDisplayName = (categoryKey: string) => {
    switch (categoryKey) {
      case "all":
        return t("allCategories") || "All";
      case "construction":
        return t("construction") || "Construction";
      case "sustainability":
        return t("sustainability") || "Sustainability";
      case "interior":
        return t("interior") || "Interior Design";
      case "architecture":
        return t("architecture") || "Architecture";
      default:
        return categoryKey;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow-sm pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("home")}
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
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryKeys.map((categoryKey) => (
            <button
              key={categoryKey}
              onClick={() => setSelectedCategory(categoryKey)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === categoryKey
                  ? "bg-primary-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border"
              }`}
            >
              {getCategoryDisplayName(categoryKey)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              Error loading blog posts. Please try again.
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center gap-4 text-sm text-slate-500 w-full">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && !isError && hasNextPage && (
          <div className="text-center mt-12">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center gap-2 mx-auto"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Posts"
              )}
            </button>
          </div>
        )}

        {/* No Posts State */}
        {!isLoading && !isError && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              No blog posts found for the selected category.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
