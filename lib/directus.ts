import { createDirectus, graphql, rest, authentication } from '@directus/sdk';
import { generateGraphqlOperation } from './generated/runtime';
import type { Query, Mutation } from './generated/schema';
import { generateQueryOp } from './generated';

// Define the Directus instance URL
const DIRECTUS_URL = 'https://admin.adcc.sa';

// Create the Directus client with GraphQL and REST capabilities
export const directus = createDirectus(DIRECTUS_URL)
  .with(graphql())
  .with(rest())
  .with(authentication('json', { autoRefresh: true }));

/**
 * Execute a GraphQL query using GenQL-generated types
 * This combines Directus SDK with GenQL for type-safe queries
 */
export async function graphqlQuery<T = any>(
  query: any,
  options?: { 
    variables?: Record<string, any>;
    operationName?: string;
  }
) {
  // Generate the GraphQL query string and variables using GenQL
  const { query: queryString, variables } = generateGraphqlOperation('query', query);
  
  // Execute the query using Directus SDK's GraphQL client
  const result = await directus.query<T>(queryString, variables || options?.variables);
  
  return result;
}

/**
 * Execute a GraphQL mutation using GenQL-generated types
 */
export async function graphqlMutation<T = any>(
  mutation: any,
  options?: { 
    variables?: Record<string, any>;
    operationName?: string;
  }
) {
  // Generate the GraphQL mutation string and variables using GenQL
  const { query: mutationString, variables } = generateGraphqlOperation('mutation', mutation);
  
  // Execute the mutation using Directus SDK's GraphQL client
  const result = await directus.query<T>(mutationString, variables || options?.variables);
  
  return result;
}

/**
 * Helper function to build typed queries using GenQL
 * This provides full TypeScript support for your Directus schema
 */
export function buildQuery<T extends keyof Query>(
  field: T,
  selection: any
): Record<T, any> {
  return { [field]: selection } as Record<T, any>;
}

/**
 * Helper function to build typed mutations using GenQL
 */
export function buildMutation<T extends keyof Mutation>(
  field: T,
  selection: any
): Record<T, any> {
  return { [field]: selection } as Record<T, any>;
}

// Export types from generated schema for use in components
export type { 
  Query, 
  Mutation,
  blog,
  blog_translations,
  project,
  project_translations,
  service,
  service_translations,
  categories,
  categories_translations,
  testimonials,
  testimonials_translations,
  languages
} from './generated/schema';