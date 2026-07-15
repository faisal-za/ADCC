"use client";

import { useCallback, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { User, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "../hooks/use-translation";
import { useQueryClient } from "@tanstack/react-query";
import { loadMoreBlogPosts } from "../lib/actions/blog";
import type {
  BlogPageResult,
  CategoryView,
  CMSLocale,
  PostCardView,
} from "@/lib/cms-types";

interface BlogPageClientProps {
  locale: CMSLocale;
  initialResult: BlogPageResult;
  categories: CategoryView[];
  pageSize: number;
}

export default function BlogPageClient({
  locale,
  initialResult,
  categories,
  pageSize,
}: BlogPageClientProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const requestSequence = useRef(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [blogData, setBlogData] = useState<PostCardView[]>(initialResult.docs);
  const [currentPage, setCurrentPage] = useState(initialResult.page);
  const [totalDocs, setTotalDocs] = useState(initialResult.totalDocs);
  const [hasMore, setHasMore] = useState(initialResult.hasNextPage);
  const [loading, setLoading] = useState(false);

  const loadPage = useCallback(async (
    category: string,
    page: number,
    replace: boolean,
  ) => {
    const requestID = ++requestSequence.current;
    const categoryId = category === "all" ? undefined : category;
    setLoading(true);

    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["blog-posts", locale, category, page, pageSize],
        queryFn: () => loadMoreBlogPosts({
          page,
          limit: pageSize,
          locale,
          categoryId,
        }),
        staleTime: 0,
      });

      if (requestID !== requestSequence.current) return;

      setBlogData((previous) => {
        if (replace) return result.docs;

        const existingIDs = new Set(previous.map((post) => post.id));
        return [...previous, ...result.docs.filter((post) => !existingIDs.has(post.id))];
      });
      setCurrentPage(result.page);
      setTotalDocs(result.totalDocs);
      setHasMore(result.hasNextPage);
    } catch (error) {
      if (requestID === requestSequence.current) {
        console.error("Failed to load blog posts:", error);
        setHasMore(false);
      }
    } finally {
      if (requestID === requestSequence.current) {
        setLoading(false);
      }
    }
  }, [locale, pageSize, queryClient]);

  const availableCategories = [
    { id: "all", title: t("allCategories") || "All" },
    ...categories,
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setBlogData([]);
    setCurrentPage(0);
    setTotalDocs(0);
    setHasMore(false);
    void loadPage(categoryId, 1, true);
  };

  const handleLoadMore = () => {
    void loadPage(selectedCategory, currentPage + 1, false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            {locale === "ar" ? (
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              disabled={loading && selectedCategory === category.id}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogData.map((post) => {
            const imageURL = post.image?.value?.url;
            const hasResolvedCategory = post.categories.some((category) => category.value);

            return (
              <Link key={post.id} href={`/${locale}/blog/${post.id}`} className="group">
                <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1">
                  <div className="relative">
                    <div
                      className="h-48 bg-cover bg-center bg-gray-200"
                      style={{
                        backgroundImage: imageURL
                          ? `url("${imageURL}")`
                          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {hasResolvedCategory ? post.categories.map((category) =>
                        category.value ? (
                          <Badge
                            key={category.id}
                            variant="default"
                            className="bg-white/90 text-slate-700 text-xs font-medium hover:bg-white"
                          >
                            {category.value?.title}
                          </Badge>
                        ) : null
                      ) : (
                        <Badge
                          variant="default"
                          className="bg-white/90 text-slate-700 text-xs font-medium hover:bg-white"
                        >
                          General
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
                      {post.description || ""}
                    </p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <div className="flex items-center justify-between text-sm text-slate-500 w-full">
                      <div className="flex flex-row items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>ADCC Team</span>
                      </div>
                      <span>
                        {locale === "ar"
                          ? `${post.readTime} ${t("minRead") || "دقائق قراءة"}`
                          : `${post.readTime} ${t("minRead") || "min read"}`}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>

        {hasMore && blogData.length < totalDocs && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
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
                    className={`w-4 h-4 transition-transform ${locale === "ar" ? "mr-2 rotate-180" : "ml-2"}`}
                  />
                </>
              )}
            </button>
          </div>
        )}

        {!loading && blogData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              {selectedCategory === "all"
                ? (t("noBlogPosts") || "No blog posts available yet. Check back soon!")
                : (t("noPostsInCategory") || "No posts found in this category.")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
