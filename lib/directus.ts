import 'server-only'

import { createDirectus, rest, staticToken } from '@directus/sdk'

export type PrimaryKey = string | number
export type Relation<T> = PrimaryKey | T

export interface DirectusFile {
  id: string
}

export interface Language {
  code: string
  name: string | null
  direction: string | null
}

export interface ServiceTranslation {
  id: PrimaryKey
  service_id: Relation<Service> | null
  languages_code: Relation<Language> | null
  title: string | null
  description: string | null
}

export interface Service {
  id: string
  date_created: string | null
  date_updated: string | null
  icon: string | null
  image: Relation<DirectusFile> | null
  translations: ServiceTranslation[]
}

export interface CategoryTranslation {
  id: PrimaryKey
  categories_id: Relation<Category> | null
  languages_code: Relation<Language> | null
  title: string | null
  slug: string | null
  description: string | null
}

export interface Category {
  id: string
  translations: CategoryTranslation[]
}

export interface ProjectTranslation {
  id: PrimaryKey
  project_id: Relation<Project> | null
  languages_code: Relation<Language> | null
  title: string | null
  description: string | null
}

export interface ProjectFile {
  id: PrimaryKey
  project_id: Relation<Project> | null
  directus_files_id: Relation<DirectusFile> | null
}

export interface ProjectCategory {
  id: PrimaryKey
  project: Relation<Project> | null
  categories: Relation<Category> | null
}

export interface Project {
  id: string
  date_created: string | null
  date_updated: string | null
  translations: ProjectTranslation[]
  images: ProjectFile[]
  categories: ProjectCategory[]
}

export interface BlogTranslation {
  id: PrimaryKey
  blog_id: Relation<Blog> | null
  languages_code: Relation<Language> | null
  title: string | null
  description: string | null
  content: string | null
}

export interface BlogCategory {
  id: PrimaryKey
  blog: Relation<Blog> | null
  categories: Relation<Category> | null
}

export interface Blog {
  id: string
  date_created: string | null
  date_updated: string | null
  image: Relation<DirectusFile> | null
  read_time: string | null
  translations: BlogTranslation[]
  categories: BlogCategory[]
}

export interface TestimonialTranslation {
  id: PrimaryKey
  testimonials_id: Relation<Testimonial> | null
  languages_code: Relation<Language> | null
  text: string | null
  client: string | null
  name: string | null
}

export interface Testimonial {
  id: string
  date_created: string | null
  translations: TestimonialTranslation[]
}

export interface Client {
  id: string
  name: string | null
  logo: Relation<DirectusFile> | null
}

export interface ContactUs {
  id?: string | null
  name: string
  email?: string | null
  phone_number: string
  service_type?: string | null
  description?: string | null
}

export interface Schema {
  directus_files: DirectusFile[]
  languages: Language[]
  service: Service[]
  service_translations: ServiceTranslation[]
  categories: Category[]
  categories_translations: CategoryTranslation[]
  project: Project[]
  project_translations: ProjectTranslation[]
  project_files: ProjectFile[]
  project_categories_1: ProjectCategory[]
  blog: Blog[]
  blog_translations: BlogTranslation[]
  blog_categories: BlogCategory[]
  testimonials: Testimonial[]
  testimonials_translations: TestimonialTranslation[]
  clients: Client[]
  contact_us: ContactUs[]
}

// These projection types match this application's explicit expanded REST fields.
// The exported collection types above retain Directus's scalar-or-expanded relation shape.
type ExpandedServiceTranslation = Omit<ServiceTranslation, 'service_id' | 'languages_code'> & {
  service_id: ExpandedService | null
  languages_code: Language | null
}
type ExpandedService = Omit<Service, 'image' | 'translations'> & {
  image: DirectusFile | null
  translations: ExpandedServiceTranslation[]
}
type ExpandedCategoryTranslation = Omit<CategoryTranslation, 'categories_id' | 'languages_code'> & {
  categories_id: ExpandedCategory | null
  languages_code: Language | null
}
type ExpandedCategory = Omit<Category, 'translations'> & {
  translations: ExpandedCategoryTranslation[]
}
type ExpandedProjectTranslation = Omit<ProjectTranslation, 'project_id' | 'languages_code'> & {
  project_id: ExpandedProject | null
  languages_code: Language | null
}
type ExpandedProjectFile = Omit<ProjectFile, 'project_id' | 'directus_files_id'> & {
  project_id: ExpandedProject | null
  directus_files_id: DirectusFile | null
}
type ExpandedProjectCategory = Omit<ProjectCategory, 'project' | 'categories'> & {
  project: ExpandedProject | null
  categories: ExpandedCategory | null
}
type ExpandedProject = Omit<Project, 'translations' | 'images' | 'categories'> & {
  translations: ExpandedProjectTranslation[]
  images: ExpandedProjectFile[]
  categories: ExpandedProjectCategory[]
}
type ExpandedBlogTranslation = Omit<BlogTranslation, 'blog_id' | 'languages_code'> & {
  blog_id: ExpandedBlog | null
  languages_code: Language | null
}
type ExpandedBlogCategory = Omit<BlogCategory, 'blog' | 'categories'> & {
  blog: ExpandedBlog | null
  categories: ExpandedCategory | null
}
type ExpandedBlog = Omit<Blog, 'image' | 'translations' | 'categories'> & {
  image: DirectusFile | null
  translations: ExpandedBlogTranslation[]
  categories: ExpandedBlogCategory[]
}
type ExpandedTestimonialTranslation = Omit<TestimonialTranslation, 'testimonials_id' | 'languages_code'> & {
  testimonials_id: ExpandedTestimonial | null
  languages_code: Language | null
}
type ExpandedTestimonial = Omit<Testimonial, 'translations'> & {
  translations: ExpandedTestimonialTranslation[]
}
type ExpandedClient = Omit<Client, 'logo'> & {
  logo: DirectusFile | null
}

interface ExpandedSchema {
  directus_files: DirectusFile[]
  languages: Language[]
  service: ExpandedService[]
  service_translations: ExpandedServiceTranslation[]
  categories: ExpandedCategory[]
  categories_translations: ExpandedCategoryTranslation[]
  project: ExpandedProject[]
  project_translations: ExpandedProjectTranslation[]
  project_files: ExpandedProjectFile[]
  project_categories_1: ExpandedProjectCategory[]
  blog: ExpandedBlog[]
  blog_translations: ExpandedBlogTranslation[]
  blog_categories: ExpandedBlogCategory[]
  testimonials: ExpandedTestimonial[]
  testimonials_translations: ExpandedTestimonialTranslation[]
  clients: ExpandedClient[]
  contact_us: ContactUs[]
}

const directusUrl = process.env.DIRECTUS_URL ?? 'https://admin.adcc.sa'
const directusToken = process.env.DIRECTUS_TOKEN

if (process.env.VERCEL === '1' && !directusToken) {
  throw new Error('DIRECTUS_TOKEN is required for Vercel deployments')
}

export const directus = createDirectus<ExpandedSchema>(directusUrl)
  .with(staticToken(directusToken ?? ''))
  .with(rest())
