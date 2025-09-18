import { Card, CardContent } from "../../../../components/ui/card";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { generateQueryOp } from "../../../../lib/generated";
import { directus } from "../../../../lib/directus";
import { notFound } from "next/navigation";
import ShareButton from "../../../../components/share-button";

// Helper function to get blog post data
async function getBlogPost(id: string, locale: string) {
  const directusLocale = locale === 'ar' ? 'ar-SA' : 'en-US';
  
  const { query, variables } = generateQueryOp({
    blog_by_id: {
      __args: { id },
      id: true,
      image: { id: true },
      read_time: true,
      categories: {
        id: true,
        categories: {
          id: true,
          translations: {
            __args: {
              filter: {
                languages_code: { code: { _eq: directusLocale } }
              }
            },
            title: true,
            languages_code: { code: true }
          }
        }
      },
      translations: {
        __args: {
          filter: {
            languages_code: { code: { _eq: directusLocale } }
          }
        },
        title: true,
        description: true,
        content: true,
        languages_code: { code: true }
      }
    }
  });

  const result = await directus.query(query, variables);
  return result.blog_by_id;
}

// Force dynamic rendering - fresh data on every request
export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}) {
  const { locale, id } = await params;
  
  let blogPost: any = null;
  
  try {
    blogPost = await getBlogPost(id, locale);
    
    if (!blogPost?.translations?.length) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  const translation = blogPost.translations[0];
  const category = blogPost.categories?.[0]?.categories?.translations?.[0];
  const hasImage = blogPost.image?.id;
  const readTime = blogPost.read_time || '5';
  
  const getReadTimeText = () => {
    return locale === 'ar' ? `${readTime} دقائق قراءة` : `${readTime} min read`;
  };

  const getImageUrl = () => {
    return hasImage 
      ? `url('https://admin.adcc.sa/assets/${blogPost.image.id}')`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: getImageUrl() }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                {locale === 'ar' ? (
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
              
              {category && (
                <div className="mb-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {category.title}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {translation.title}
              </h1>

              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  ADCC Team
                </div>
                <span>{getReadTimeText()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Article Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <p className="text-xl text-slate-600 leading-relaxed">
                {translation.description}
              </p>
            </div>
            <ShareButton
              title={translation.title}
              text={translation.description}
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-slate prose-lg max-w-none mt-8">
            <div dangerouslySetInnerHTML={{ __html: translation.content }} />
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-primary-50 border-primary-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {locale === 'ar' ? 'جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?'}
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              {locale === 'ar' 
                ? 'تواصل معنا اليوم لمناقشة احتياجات البناء أو التصميم الخاصة بك.'
                : 'Contact us today to discuss your construction or design needs.'
              }
            </p>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}