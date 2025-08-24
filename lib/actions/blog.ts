'use server';

import { generateQueryOp } from '../generated';
import { directus } from '../directus';

export async function loadMoreBlogPosts(offset: number, limit: number, locale: string) {
  try {
    const directusLocale = locale === 'ar' ? 'ar-SA' : 'en-US';
    
    const { query, variables } = generateQueryOp({
      blog: {
        __args: { 
          sort: ["-date_created"], 
          limit,
          offset 
        },
        id: true,
        image: { id: true },
        read_time: true,
        date_created: true,
        categories: {
          id: true,
          categories: {
            id: true,
            translations: {
              __args: { filter: { languages_code: { code: { _eq: directusLocale } } } },
              title: true,
              languages_code: { code: true }
            }
          }
        },
        translations: {
          __args: { filter: { languages_code: { code: { _eq: directusLocale } } } },
          title: true,
          description: true,
          content: true,
          languages_code: { code: true }
        }
      }
    });

    const result = await directus.query(query, variables);
    return {
      data: result.blog || [],
      hasMore: (result.blog || []).length === limit
    };
  } catch (error) {
    console.error('Error loading more blog posts:', error);
    throw new Error('Failed to load more posts');
  }
}