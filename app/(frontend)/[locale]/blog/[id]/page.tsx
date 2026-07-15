import { RichText } from "@payloadcms/richtext-lexical/react";
import { Card, CardContent } from "@/components/ui/card";
import ShareButton from "@/components/share-button";
import { getBlogPost } from "@/lib/cms";
import { parseCMSLocale, type PostDetailView } from "@/lib/cms-types";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const cmsLocale = parseCMSLocale(locale);
  let blogPost: PostDetailView | null = null;

  try {
    blogPost = await getBlogPost(id, cmsLocale);
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    notFound();
  }

  if (!blogPost) notFound();

  const imageURL = blogPost.image?.value?.url;
  const backgroundImage = imageURL
    ? `url("${imageURL}")`
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  const description = blogPost.description || "";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                {locale === "ar" ? (
                  <div className="flex flex-row items-center gap-2">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    <p>العودة للمدونة</p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <p>Back to Blog</p>
                  </div>
                )}
              </Link>

              {blogPost.categories.some((category) => category.value) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {blogPost.categories.map((category) =>
                    category.value ? (
                      <span
                        key={category.id}
                        className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category.value?.title}
                      </span>
                    ) : null
                  )}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {blogPost.title}
              </h1>

              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  ADCC Team
                </div>
                <span>
                  {locale === "ar"
                    ? `${blogPost.readTime} دقائق قراءة`
                    : `${blogPost.readTime} min read`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <p className="text-xl text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>
            <ShareButton title={blogPost.title} text={description} />
          </div>

          <RichText
            className="prose prose-slate prose-lg max-w-none mt-8"
            data={blogPost.content}
          />
        </div>

        <Card className="mt-12 bg-primary-50 border-primary-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {locale === "ar" ? "جاهز لبدء مشروعك؟" : "Ready to Start Your Project?"}
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              {locale === "ar"
                ? "تواصل معنا اليوم لمناقشة احتياجات البناء أو التصميم الخاصة بك."
                : "Contact us today to discuss your construction or design needs."}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
