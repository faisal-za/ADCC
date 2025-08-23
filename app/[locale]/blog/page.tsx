import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { generateQueryOp } from "../../../lib/generated";
import { directus } from "../../../lib/directus";
import BlogPageClient from "../../../components/blog-page-client";

export default async function BlogPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const directusLocale = locale === 'ar' ? 'ar-SA' : 'en-US';
  
  // Fetch initial page of blog data and total count
  let blogData: any[] = [];
  let categoriesData: any[] = [];
  let totalBlogCount = 0;
  const initialPageSize = 6;
  
  try {
    // First get a full count by querying without limit
    const { query: countQuery, variables: countVariables } = generateQueryOp({
      blog: {
        id: true
      }
    });
    
    const countResult = await directus.query(countQuery, countVariables);
    totalBlogCount = countResult.blog?.length || 0;
    
    // Then get the initial page of data
    const { query, variables } = generateQueryOp({
      blog: {
        __args: {
          sort: ["-date_created"],
          limit: initialPageSize
        },
        id: true,
        image: {
          id: true
        },
        read_time: true,
        date_created: true,
        categories: {
          id: true,
          categories: {
            id: true,
            translations: {
              __args: {
                filter: {
                  languages_code: { 
                    code: { _eq: directusLocale }
                  }
                }
              },
              title: true,
              languages_code: {
                code: true
              }
            }
          }
        },
        translations: {
          __args: {
            filter: {
              languages_code: { 
                code: { _eq: directusLocale }
              }
            }
          },
          title: true,
          description: true,
          content: true,
          languages_code: {
            code: true
          }
        }
      },
      categories: {
        id: true,
        translations: {
          __args: {
            filter: {
              languages_code: { 
                code: { _eq: directusLocale }
              }
            }
          },
          title: true,
          languages_code: {
            code: true
          }
        }
      }
    });

    const result = await directus.query(query, variables);
    blogData = result.blog || [];
    categoriesData = result.categories || [];
    console.log('Server-side data:', { blogCount: blogData.length, totalCount: totalBlogCount, categoriesCount: categoriesData.length });
  } catch (error) {
    console.error('Error fetching data server-side:', error);
  }

  return <BlogPageClient 
    locale={locale} 
    initialBlogData={blogData} 
    categoriesData={categoriesData} 
    totalBlogCount={totalBlogCount}
    pageSize={initialPageSize}
  />;
}
