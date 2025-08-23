// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
    Int: number,
    JSON: any,
    Date: any,
    GraphQLStringOrFloat: any,
    Float: number,
}

export interface Query {
    languages: languages[]
    languages_by_id: (languages | null)
    languages_aggregated: languages_aggregated[]
    languages_by_version: (version_languages | null)
    service_translations: service_translations[]
    service_translations_by_id: (service_translations | null)
    service_translations_aggregated: service_translations_aggregated[]
    service_translations_by_version: (version_service_translations | null)
    service: service[]
    service_by_id: (service | null)
    service_aggregated: service_aggregated[]
    service_by_version: (version_service | null)
    categories: categories[]
    categories_by_id: (categories | null)
    categories_aggregated: categories_aggregated[]
    categories_by_version: (version_categories | null)
    categories_translations: categories_translations[]
    categories_translations_by_id: (categories_translations | null)
    categories_translations_aggregated: categories_translations_aggregated[]
    categories_translations_by_version: (version_categories_translations | null)
    blog: blog[]
    blog_by_id: (blog | null)
    blog_aggregated: blog_aggregated[]
    blog_by_version: (version_blog | null)
    testimonials: testimonials[]
    testimonials_by_id: (testimonials | null)
    testimonials_aggregated: testimonials_aggregated[]
    testimonials_by_version: (version_testimonials | null)
    project: project[]
    project_by_id: (project | null)
    project_aggregated: project_aggregated[]
    project_by_version: (version_project | null)
    project_categories_1: project_categories_1[]
    project_categories_1_by_id: (project_categories_1 | null)
    project_categories_1_aggregated: project_categories_1_aggregated[]
    project_categories_1_by_version: (version_project_categories_1 | null)
    project_files: project_files[]
    project_files_by_id: (project_files | null)
    project_files_aggregated: project_files_aggregated[]
    project_files_by_version: (version_project_files | null)
    project_translations: project_translations[]
    project_translations_by_id: (project_translations | null)
    project_translations_aggregated: project_translations_aggregated[]
    project_translations_by_version: (version_project_translations | null)
    blog_translations: blog_translations[]
    blog_translations_by_id: (blog_translations | null)
    blog_translations_aggregated: blog_translations_aggregated[]
    blog_translations_by_version: (version_blog_translations | null)
    blog_categories: blog_categories[]
    blog_categories_by_id: (blog_categories | null)
    blog_categories_aggregated: blog_categories_aggregated[]
    blog_categories_by_version: (version_blog_categories | null)
    testimonials_translations: testimonials_translations[]
    testimonials_translations_by_id: (testimonials_translations | null)
    testimonials_translations_aggregated: testimonials_translations_aggregated[]
    testimonials_translations_by_version: (version_testimonials_translations | null)
    __typename: 'Query'
}

export interface languages {
    code: Scalars['ID']
    name: (Scalars['String'] | null)
    direction: (Scalars['String'] | null)
    __typename: 'languages'
}

export interface languages_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (languages_aggregated_count | null)
    countDistinct: (languages_aggregated_count | null)
    __typename: 'languages_aggregated'
}

export interface languages_aggregated_count {
    code: (Scalars['Int'] | null)
    name: (Scalars['Int'] | null)
    direction: (Scalars['Int'] | null)
    __typename: 'languages_aggregated_count'
}

export interface version_languages {
    code: Scalars['ID']
    name: (Scalars['String'] | null)
    direction: (Scalars['String'] | null)
    __typename: 'version_languages'
}

export interface service_translations {
    id: Scalars['ID']
    service_id: (service | null)
    languages_code: (languages | null)
    title: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    __typename: 'service_translations'
}

export interface service {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    image: (directus_files | null)
    icon: (Scalars['String'] | null)
    translations: ((service_translations | null)[] | null)
    translations_func: (count_functions | null)
    __typename: 'service'
}

export interface datetime_functions {
    year: (Scalars['Int'] | null)
    month: (Scalars['Int'] | null)
    week: (Scalars['Int'] | null)
    day: (Scalars['Int'] | null)
    weekday: (Scalars['Int'] | null)
    hour: (Scalars['Int'] | null)
    minute: (Scalars['Int'] | null)
    second: (Scalars['Int'] | null)
    __typename: 'datetime_functions'
}

export interface directus_files {
    id: Scalars['ID']
    __typename: 'directus_files'
}

export interface count_functions {
    count: (Scalars['Int'] | null)
    __typename: 'count_functions'
}

export interface service_translations_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (service_translations_aggregated_count | null)
    countDistinct: (service_translations_aggregated_count | null)
    avg: (service_translations_aggregated_fields | null)
    sum: (service_translations_aggregated_fields | null)
    avgDistinct: (service_translations_aggregated_fields | null)
    sumDistinct: (service_translations_aggregated_fields | null)
    min: (service_translations_aggregated_fields | null)
    max: (service_translations_aggregated_fields | null)
    __typename: 'service_translations_aggregated'
}

export interface service_translations_aggregated_count {
    id: (Scalars['Int'] | null)
    service_id: (Scalars['Int'] | null)
    languages_code: (Scalars['Int'] | null)
    title: (Scalars['Int'] | null)
    description: (Scalars['Int'] | null)
    __typename: 'service_translations_aggregated_count'
}

export interface service_translations_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'service_translations_aggregated_fields'
}

export interface version_service_translations {
    id: Scalars['ID']
    service_id: (Scalars['JSON'] | null)
    languages_code: (Scalars['JSON'] | null)
    title: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    __typename: 'version_service_translations'
}

export interface service_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (service_aggregated_count | null)
    countDistinct: (service_aggregated_count | null)
    __typename: 'service_aggregated'
}

export interface service_aggregated_count {
    id: (Scalars['Int'] | null)
    user_created: (Scalars['Int'] | null)
    date_created: (Scalars['Int'] | null)
    user_updated: (Scalars['Int'] | null)
    date_updated: (Scalars['Int'] | null)
    image: (Scalars['Int'] | null)
    icon: (Scalars['Int'] | null)
    translations: (Scalars['Int'] | null)
    __typename: 'service_aggregated_count'
}

export interface version_service {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    image: (Scalars['JSON'] | null)
    icon: (Scalars['String'] | null)
    translations: (Scalars['JSON'] | null)
    translations_func: (count_functions | null)
    __typename: 'version_service'
}

export interface categories {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    projects: (project | null)
    blogs: (blog | null)
    translations: ((categories_translations | null)[] | null)
    translations_func: (count_functions | null)
    __typename: 'categories'
}

export interface project {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    translations: ((project_translations | null)[] | null)
    translations_func: (count_functions | null)
    images: ((project_files | null)[] | null)
    images_func: (count_functions | null)
    categories: ((project_categories_1 | null)[] | null)
    categories_func: (count_functions | null)
    __typename: 'project'
}

export interface project_translations {
    id: Scalars['ID']
    project_id: (project | null)
    languages_code: (languages | null)
    title: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    __typename: 'project_translations'
}

export interface project_files {
    id: Scalars['ID']
    project_id: (project | null)
    directus_files_id: (directus_files | null)
    __typename: 'project_files'
}

export interface project_categories_1 {
    id: Scalars['ID']
    project: (project | null)
    categories: (categories | null)
    __typename: 'project_categories_1'
}

export interface blog {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    image: (directus_files | null)
    read_time: (Scalars['String'] | null)
    translations: ((blog_translations | null)[] | null)
    translations_func: (count_functions | null)
    categories: ((blog_categories | null)[] | null)
    categories_func: (count_functions | null)
    __typename: 'blog'
}

export interface blog_translations {
    id: Scalars['ID']
    blog_id: (blog | null)
    languages_code: (languages | null)
    title: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    content: (Scalars['String'] | null)
    __typename: 'blog_translations'
}

export interface blog_categories {
    id: Scalars['ID']
    blog: (blog | null)
    categories: (categories | null)
    __typename: 'blog_categories'
}

export interface categories_translations {
    id: Scalars['ID']
    categories_id: (categories | null)
    languages_code: (languages | null)
    title: (Scalars['String'] | null)
    slug: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    __typename: 'categories_translations'
}

export interface categories_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (categories_aggregated_count | null)
    countDistinct: (categories_aggregated_count | null)
    __typename: 'categories_aggregated'
}

export interface categories_aggregated_count {
    id: (Scalars['Int'] | null)
    user_created: (Scalars['Int'] | null)
    date_created: (Scalars['Int'] | null)
    user_updated: (Scalars['Int'] | null)
    date_updated: (Scalars['Int'] | null)
    projects: (Scalars['Int'] | null)
    blogs: (Scalars['Int'] | null)
    translations: (Scalars['Int'] | null)
    __typename: 'categories_aggregated_count'
}

export interface version_categories {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    projects: (Scalars['JSON'] | null)
    blogs: (Scalars['JSON'] | null)
    translations: (Scalars['JSON'] | null)
    translations_func: (count_functions | null)
    __typename: 'version_categories'
}

export interface categories_translations_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (categories_translations_aggregated_count | null)
    countDistinct: (categories_translations_aggregated_count | null)
    avg: (categories_translations_aggregated_fields | null)
    sum: (categories_translations_aggregated_fields | null)
    avgDistinct: (categories_translations_aggregated_fields | null)
    sumDistinct: (categories_translations_aggregated_fields | null)
    min: (categories_translations_aggregated_fields | null)
    max: (categories_translations_aggregated_fields | null)
    __typename: 'categories_translations_aggregated'
}

export interface categories_translations_aggregated_count {
    id: (Scalars['Int'] | null)
    categories_id: (Scalars['Int'] | null)
    languages_code: (Scalars['Int'] | null)
    title: (Scalars['Int'] | null)
    slug: (Scalars['Int'] | null)
    description: (Scalars['Int'] | null)
    __typename: 'categories_translations_aggregated_count'
}

export interface categories_translations_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'categories_translations_aggregated_fields'
}

export interface version_categories_translations {
    id: Scalars['ID']
    categories_id: (Scalars['JSON'] | null)
    languages_code: (Scalars['JSON'] | null)
    title: (Scalars['String'] | null)
    slug: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    __typename: 'version_categories_translations'
}

export interface blog_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (blog_aggregated_count | null)
    countDistinct: (blog_aggregated_count | null)
    __typename: 'blog_aggregated'
}

export interface blog_aggregated_count {
    id: (Scalars['Int'] | null)
    user_created: (Scalars['Int'] | null)
    date_created: (Scalars['Int'] | null)
    user_updated: (Scalars['Int'] | null)
    date_updated: (Scalars['Int'] | null)
    image: (Scalars['Int'] | null)
    read_time: (Scalars['Int'] | null)
    translations: (Scalars['Int'] | null)
    categories: (Scalars['Int'] | null)
    __typename: 'blog_aggregated_count'
}

export interface version_blog {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    image: (Scalars['JSON'] | null)
    read_time: (Scalars['String'] | null)
    translations: (Scalars['JSON'] | null)
    translations_func: (count_functions | null)
    categories: (Scalars['JSON'] | null)
    categories_func: (count_functions | null)
    __typename: 'version_blog'
}

export interface testimonials {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    translations: ((testimonials_translations | null)[] | null)
    translations_func: (count_functions | null)
    __typename: 'testimonials'
}

export interface testimonials_translations {
    id: Scalars['ID']
    testimonials_id: (testimonials | null)
    languages_code: (languages | null)
    text: (Scalars['String'] | null)
    client: (Scalars['String'] | null)
    name: (Scalars['String'] | null)
    __typename: 'testimonials_translations'
}

export interface testimonials_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (testimonials_aggregated_count | null)
    countDistinct: (testimonials_aggregated_count | null)
    __typename: 'testimonials_aggregated'
}

export interface testimonials_aggregated_count {
    id: (Scalars['Int'] | null)
    user_created: (Scalars['Int'] | null)
    date_created: (Scalars['Int'] | null)
    translations: (Scalars['Int'] | null)
    __typename: 'testimonials_aggregated_count'
}

export interface version_testimonials {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    translations: (Scalars['JSON'] | null)
    translations_func: (count_functions | null)
    __typename: 'version_testimonials'
}

export interface project_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (project_aggregated_count | null)
    countDistinct: (project_aggregated_count | null)
    __typename: 'project_aggregated'
}

export interface project_aggregated_count {
    id: (Scalars['Int'] | null)
    user_created: (Scalars['Int'] | null)
    date_created: (Scalars['Int'] | null)
    user_updated: (Scalars['Int'] | null)
    date_updated: (Scalars['Int'] | null)
    translations: (Scalars['Int'] | null)
    images: (Scalars['Int'] | null)
    categories: (Scalars['Int'] | null)
    __typename: 'project_aggregated_count'
}

export interface version_project {
    id: Scalars['ID']
    user_created: (Scalars['ID'] | null)
    date_created: (Scalars['Date'] | null)
    date_created_func: (datetime_functions | null)
    user_updated: (Scalars['ID'] | null)
    date_updated: (Scalars['Date'] | null)
    date_updated_func: (datetime_functions | null)
    translations: (Scalars['JSON'] | null)
    translations_func: (count_functions | null)
    images: (Scalars['JSON'] | null)
    images_func: (count_functions | null)
    categories: (Scalars['JSON'] | null)
    categories_func: (count_functions | null)
    __typename: 'version_project'
}

export interface project_categories_1_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (project_categories_1_aggregated_count | null)
    countDistinct: (project_categories_1_aggregated_count | null)
    avg: (project_categories_1_aggregated_fields | null)
    sum: (project_categories_1_aggregated_fields | null)
    avgDistinct: (project_categories_1_aggregated_fields | null)
    sumDistinct: (project_categories_1_aggregated_fields | null)
    min: (project_categories_1_aggregated_fields | null)
    max: (project_categories_1_aggregated_fields | null)
    __typename: 'project_categories_1_aggregated'
}

export interface project_categories_1_aggregated_count {
    id: (Scalars['Int'] | null)
    project: (Scalars['Int'] | null)
    categories: (Scalars['Int'] | null)
    __typename: 'project_categories_1_aggregated_count'
}

export interface project_categories_1_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'project_categories_1_aggregated_fields'
}

export interface version_project_categories_1 {
    id: Scalars['ID']
    project: (Scalars['JSON'] | null)
    categories: (Scalars['JSON'] | null)
    __typename: 'version_project_categories_1'
}

export interface project_files_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (project_files_aggregated_count | null)
    countDistinct: (project_files_aggregated_count | null)
    avg: (project_files_aggregated_fields | null)
    sum: (project_files_aggregated_fields | null)
    avgDistinct: (project_files_aggregated_fields | null)
    sumDistinct: (project_files_aggregated_fields | null)
    min: (project_files_aggregated_fields | null)
    max: (project_files_aggregated_fields | null)
    __typename: 'project_files_aggregated'
}

export interface project_files_aggregated_count {
    id: (Scalars['Int'] | null)
    project_id: (Scalars['Int'] | null)
    directus_files_id: (Scalars['Int'] | null)
    __typename: 'project_files_aggregated_count'
}

export interface project_files_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'project_files_aggregated_fields'
}

export interface version_project_files {
    id: Scalars['ID']
    project_id: (Scalars['JSON'] | null)
    directus_files_id: (Scalars['JSON'] | null)
    __typename: 'version_project_files'
}

export interface project_translations_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (project_translations_aggregated_count | null)
    countDistinct: (project_translations_aggregated_count | null)
    avg: (project_translations_aggregated_fields | null)
    sum: (project_translations_aggregated_fields | null)
    avgDistinct: (project_translations_aggregated_fields | null)
    sumDistinct: (project_translations_aggregated_fields | null)
    min: (project_translations_aggregated_fields | null)
    max: (project_translations_aggregated_fields | null)
    __typename: 'project_translations_aggregated'
}

export interface project_translations_aggregated_count {
    id: (Scalars['Int'] | null)
    project_id: (Scalars['Int'] | null)
    languages_code: (Scalars['Int'] | null)
    title: (Scalars['Int'] | null)
    description: (Scalars['Int'] | null)
    __typename: 'project_translations_aggregated_count'
}

export interface project_translations_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'project_translations_aggregated_fields'
}

export interface version_project_translations {
    id: Scalars['ID']
    project_id: (Scalars['JSON'] | null)
    languages_code: (Scalars['JSON'] | null)
    title: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    __typename: 'version_project_translations'
}

export interface blog_translations_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (blog_translations_aggregated_count | null)
    countDistinct: (blog_translations_aggregated_count | null)
    avg: (blog_translations_aggregated_fields | null)
    sum: (blog_translations_aggregated_fields | null)
    avgDistinct: (blog_translations_aggregated_fields | null)
    sumDistinct: (blog_translations_aggregated_fields | null)
    min: (blog_translations_aggregated_fields | null)
    max: (blog_translations_aggregated_fields | null)
    __typename: 'blog_translations_aggregated'
}

export interface blog_translations_aggregated_count {
    id: (Scalars['Int'] | null)
    blog_id: (Scalars['Int'] | null)
    languages_code: (Scalars['Int'] | null)
    title: (Scalars['Int'] | null)
    description: (Scalars['Int'] | null)
    content: (Scalars['Int'] | null)
    __typename: 'blog_translations_aggregated_count'
}

export interface blog_translations_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'blog_translations_aggregated_fields'
}

export interface version_blog_translations {
    id: Scalars['ID']
    blog_id: (Scalars['JSON'] | null)
    languages_code: (Scalars['JSON'] | null)
    title: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    content: (Scalars['String'] | null)
    __typename: 'version_blog_translations'
}

export interface blog_categories_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (blog_categories_aggregated_count | null)
    countDistinct: (blog_categories_aggregated_count | null)
    avg: (blog_categories_aggregated_fields | null)
    sum: (blog_categories_aggregated_fields | null)
    avgDistinct: (blog_categories_aggregated_fields | null)
    sumDistinct: (blog_categories_aggregated_fields | null)
    min: (blog_categories_aggregated_fields | null)
    max: (blog_categories_aggregated_fields | null)
    __typename: 'blog_categories_aggregated'
}

export interface blog_categories_aggregated_count {
    id: (Scalars['Int'] | null)
    blog: (Scalars['Int'] | null)
    categories: (Scalars['Int'] | null)
    __typename: 'blog_categories_aggregated_count'
}

export interface blog_categories_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'blog_categories_aggregated_fields'
}

export interface version_blog_categories {
    id: Scalars['ID']
    blog: (Scalars['JSON'] | null)
    categories: (Scalars['JSON'] | null)
    __typename: 'version_blog_categories'
}

export interface testimonials_translations_aggregated {
    group: (Scalars['JSON'] | null)
    countAll: (Scalars['Int'] | null)
    count: (testimonials_translations_aggregated_count | null)
    countDistinct: (testimonials_translations_aggregated_count | null)
    avg: (testimonials_translations_aggregated_fields | null)
    sum: (testimonials_translations_aggregated_fields | null)
    avgDistinct: (testimonials_translations_aggregated_fields | null)
    sumDistinct: (testimonials_translations_aggregated_fields | null)
    min: (testimonials_translations_aggregated_fields | null)
    max: (testimonials_translations_aggregated_fields | null)
    __typename: 'testimonials_translations_aggregated'
}

export interface testimonials_translations_aggregated_count {
    id: (Scalars['Int'] | null)
    testimonials_id: (Scalars['Int'] | null)
    languages_code: (Scalars['Int'] | null)
    text: (Scalars['Int'] | null)
    client: (Scalars['Int'] | null)
    name: (Scalars['Int'] | null)
    __typename: 'testimonials_translations_aggregated_count'
}

export interface testimonials_translations_aggregated_fields {
    id: (Scalars['Float'] | null)
    __typename: 'testimonials_translations_aggregated_fields'
}

export interface version_testimonials_translations {
    id: Scalars['ID']
    testimonials_id: (Scalars['JSON'] | null)
    languages_code: (Scalars['JSON'] | null)
    text: (Scalars['String'] | null)
    client: (Scalars['String'] | null)
    name: (Scalars['String'] | null)
    __typename: 'version_testimonials_translations'
}

export interface Mutation {
    create_contact_us_items: (Scalars['Boolean'] | null)
    create_contact_us_item: (Scalars['Boolean'] | null)
    __typename: 'Mutation'
}

export interface Subscription {
    directus_files_mutated: (directus_files_mutated | null)
    languages_mutated: (languages_mutated | null)
    service_translations_mutated: (service_translations_mutated | null)
    service_mutated: (service_mutated | null)
    categories_mutated: (categories_mutated | null)
    categories_translations_mutated: (categories_translations_mutated | null)
    blog_mutated: (blog_mutated | null)
    testimonials_mutated: (testimonials_mutated | null)
    project_mutated: (project_mutated | null)
    project_categories_1_mutated: (project_categories_1_mutated | null)
    project_files_mutated: (project_files_mutated | null)
    project_translations_mutated: (project_translations_mutated | null)
    blog_translations_mutated: (blog_translations_mutated | null)
    blog_categories_mutated: (blog_categories_mutated | null)
    testimonials_translations_mutated: (testimonials_translations_mutated | null)
    __typename: 'Subscription'
}

export interface directus_files_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (directus_files | null)
    __typename: 'directus_files_mutated'
}

export type EventEnum = 'create' | 'update' | 'delete'

export interface languages_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (languages | null)
    __typename: 'languages_mutated'
}

export interface service_translations_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (service_translations | null)
    __typename: 'service_translations_mutated'
}

export interface service_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (service | null)
    __typename: 'service_mutated'
}

export interface categories_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (categories | null)
    __typename: 'categories_mutated'
}

export interface categories_translations_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (categories_translations | null)
    __typename: 'categories_translations_mutated'
}

export interface blog_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (blog | null)
    __typename: 'blog_mutated'
}

export interface testimonials_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (testimonials | null)
    __typename: 'testimonials_mutated'
}

export interface project_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (project | null)
    __typename: 'project_mutated'
}

export interface project_categories_1_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (project_categories_1 | null)
    __typename: 'project_categories_1_mutated'
}

export interface project_files_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (project_files | null)
    __typename: 'project_files_mutated'
}

export interface project_translations_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (project_translations | null)
    __typename: 'project_translations_mutated'
}

export interface blog_translations_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (blog_translations | null)
    __typename: 'blog_translations_mutated'
}

export interface blog_categories_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (blog_categories | null)
    __typename: 'blog_categories_mutated'
}

export interface testimonials_translations_mutated {
    key: Scalars['ID']
    event: (EventEnum | null)
    data: (testimonials_translations | null)
    __typename: 'testimonials_translations_mutated'
}

export interface QueryGenqlSelection{
    languages?: (languagesGenqlSelection & { __args?: {filter?: (languages_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    languages_by_id?: (languagesGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    languages_aggregated?: (languages_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (languages_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    languages_by_version?: (version_languagesGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    service_translations?: (service_translationsGenqlSelection & { __args?: {filter?: (service_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    service_translations_by_id?: (service_translationsGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    service_translations_aggregated?: (service_translations_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (service_translations_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    service_translations_by_version?: (version_service_translationsGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    service?: (serviceGenqlSelection & { __args?: {filter?: (service_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    service_by_id?: (serviceGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    service_aggregated?: (service_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (service_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    service_by_version?: (version_serviceGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    categories?: (categoriesGenqlSelection & { __args?: {filter?: (categories_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    categories_by_id?: (categoriesGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    categories_aggregated?: (categories_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (categories_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    categories_by_version?: (version_categoriesGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    categories_translations?: (categories_translationsGenqlSelection & { __args?: {filter?: (categories_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    categories_translations_by_id?: (categories_translationsGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    categories_translations_aggregated?: (categories_translations_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (categories_translations_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    categories_translations_by_version?: (version_categories_translationsGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    blog?: (blogGenqlSelection & { __args?: {filter?: (blog_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    blog_by_id?: (blogGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    blog_aggregated?: (blog_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (blog_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    blog_by_version?: (version_blogGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    testimonials?: (testimonialsGenqlSelection & { __args?: {filter?: (testimonials_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    testimonials_by_id?: (testimonialsGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    testimonials_aggregated?: (testimonials_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (testimonials_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    testimonials_by_version?: (version_testimonialsGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    project?: (projectGenqlSelection & { __args?: {filter?: (project_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    project_by_id?: (projectGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    project_aggregated?: (project_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (project_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    project_by_version?: (version_projectGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    project_categories_1?: (project_categories_1GenqlSelection & { __args?: {filter?: (project_categories_1_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    project_categories_1_by_id?: (project_categories_1GenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    project_categories_1_aggregated?: (project_categories_1_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (project_categories_1_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    project_categories_1_by_version?: (version_project_categories_1GenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    project_files?: (project_filesGenqlSelection & { __args?: {filter?: (project_files_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    project_files_by_id?: (project_filesGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    project_files_aggregated?: (project_files_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (project_files_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    project_files_by_version?: (version_project_filesGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    project_translations?: (project_translationsGenqlSelection & { __args?: {filter?: (project_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    project_translations_by_id?: (project_translationsGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    project_translations_aggregated?: (project_translations_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (project_translations_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    project_translations_by_version?: (version_project_translationsGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    blog_translations?: (blog_translationsGenqlSelection & { __args?: {filter?: (blog_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    blog_translations_by_id?: (blog_translationsGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    blog_translations_aggregated?: (blog_translations_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (blog_translations_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    blog_translations_by_version?: (version_blog_translationsGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    blog_categories?: (blog_categoriesGenqlSelection & { __args?: {filter?: (blog_categories_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    blog_categories_by_id?: (blog_categoriesGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    blog_categories_aggregated?: (blog_categories_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (blog_categories_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    blog_categories_by_version?: (version_blog_categoriesGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    testimonials_translations?: (testimonials_translationsGenqlSelection & { __args?: {filter?: (testimonials_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    testimonials_translations_by_id?: (testimonials_translationsGenqlSelection & { __args: {id: Scalars['ID'], version?: (Scalars['String'] | null)} })
    testimonials_translations_aggregated?: (testimonials_translations_aggregatedGenqlSelection & { __args?: {groupBy?: ((Scalars['String'] | null)[] | null), filter?: (testimonials_translations_filter | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null), sort?: ((Scalars['String'] | null)[] | null)} })
    testimonials_translations_by_version?: (version_testimonials_translationsGenqlSelection & { __args: {version: Scalars['String'], id: Scalars['ID']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface languagesGenqlSelection{
    code?: boolean | number
    name?: boolean | number
    direction?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface languages_filter {code?: (string_filter_operators | null),name?: (string_filter_operators | null),direction?: (string_filter_operators | null),_and?: ((languages_filter | null)[] | null),_or?: ((languages_filter | null)[] | null)}

export interface string_filter_operators {_eq?: (Scalars['String'] | null),_neq?: (Scalars['String'] | null),_contains?: (Scalars['String'] | null),_icontains?: (Scalars['String'] | null),_ncontains?: (Scalars['String'] | null),_starts_with?: (Scalars['String'] | null),_nstarts_with?: (Scalars['String'] | null),_istarts_with?: (Scalars['String'] | null),_nistarts_with?: (Scalars['String'] | null),_ends_with?: (Scalars['String'] | null),_nends_with?: (Scalars['String'] | null),_iends_with?: (Scalars['String'] | null),_niends_with?: (Scalars['String'] | null),_in?: ((Scalars['String'] | null)[] | null),_nin?: ((Scalars['String'] | null)[] | null),_null?: (Scalars['Boolean'] | null),_nnull?: (Scalars['Boolean'] | null),_empty?: (Scalars['Boolean'] | null),_nempty?: (Scalars['Boolean'] | null)}

export interface languages_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: languages_aggregated_countGenqlSelection
    countDistinct?: languages_aggregated_countGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface languages_aggregated_countGenqlSelection{
    code?: boolean | number
    name?: boolean | number
    direction?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_languagesGenqlSelection{
    code?: boolean | number
    name?: boolean | number
    direction?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_translationsGenqlSelection{
    id?: boolean | number
    service_id?: (serviceGenqlSelection & { __args?: {filter?: (service_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    languages_code?: (languagesGenqlSelection & { __args?: {filter?: (languages_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    title?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface serviceGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    image?: (directus_filesGenqlSelection & { __args?: {filter?: (directus_files_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    icon?: boolean | number
    translations?: (service_translationsGenqlSelection & { __args?: {filter?: (service_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    translations_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface datetime_functionsGenqlSelection{
    year?: boolean | number
    month?: boolean | number
    week?: boolean | number
    day?: boolean | number
    weekday?: boolean | number
    hour?: boolean | number
    minute?: boolean | number
    second?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface directus_filesGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface directus_files_filter {id?: (id_filter_operators | null),_and?: ((directus_files_filter | null)[] | null),_or?: ((directus_files_filter | null)[] | null)}

export interface id_filter_operators {_eq?: (Scalars['ID'] | null),_neq?: (Scalars['ID'] | null),_contains?: (Scalars['ID'] | null),_icontains?: (Scalars['ID'] | null),_ncontains?: (Scalars['ID'] | null),_starts_with?: (Scalars['ID'] | null),_nstarts_with?: (Scalars['ID'] | null),_istarts_with?: (Scalars['ID'] | null),_nistarts_with?: (Scalars['ID'] | null),_ends_with?: (Scalars['ID'] | null),_nends_with?: (Scalars['ID'] | null),_iends_with?: (Scalars['ID'] | null),_niends_with?: (Scalars['ID'] | null),_in?: ((Scalars['ID'] | null)[] | null),_nin?: ((Scalars['ID'] | null)[] | null),_null?: (Scalars['Boolean'] | null),_nnull?: (Scalars['Boolean'] | null),_empty?: (Scalars['Boolean'] | null),_nempty?: (Scalars['Boolean'] | null)}

export interface service_translations_filter {id?: (number_filter_operators | null),service_id?: (service_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),description?: (string_filter_operators | null),_and?: ((service_translations_filter | null)[] | null),_or?: ((service_translations_filter | null)[] | null)}

export interface number_filter_operators {_eq?: (Scalars['GraphQLStringOrFloat'] | null),_neq?: (Scalars['GraphQLStringOrFloat'] | null),_in?: ((Scalars['GraphQLStringOrFloat'] | null)[] | null),_nin?: ((Scalars['GraphQLStringOrFloat'] | null)[] | null),_gt?: (Scalars['GraphQLStringOrFloat'] | null),_gte?: (Scalars['GraphQLStringOrFloat'] | null),_lt?: (Scalars['GraphQLStringOrFloat'] | null),_lte?: (Scalars['GraphQLStringOrFloat'] | null),_null?: (Scalars['Boolean'] | null),_nnull?: (Scalars['Boolean'] | null),_between?: ((Scalars['GraphQLStringOrFloat'] | null)[] | null),_nbetween?: ((Scalars['GraphQLStringOrFloat'] | null)[] | null)}

export interface service_filter {id?: (id_filter_operators | null),user_created?: (id_filter_operators | null),date_created?: (date_filter_operators | null),date_created_func?: (datetime_function_filter_operators | null),user_updated?: (id_filter_operators | null),date_updated?: (date_filter_operators | null),date_updated_func?: (datetime_function_filter_operators | null),image?: (directus_files_filter | null),icon?: (string_filter_operators | null),translations?: (service_translations_quantifier_filter | null),translations_func?: (count_function_filter_operators | null),_and?: ((service_filter | null)[] | null),_or?: ((service_filter | null)[] | null)}

export interface date_filter_operators {_eq?: (Scalars['String'] | null),_neq?: (Scalars['String'] | null),_gt?: (Scalars['String'] | null),_gte?: (Scalars['String'] | null),_lt?: (Scalars['String'] | null),_lte?: (Scalars['String'] | null),_null?: (Scalars['Boolean'] | null),_nnull?: (Scalars['Boolean'] | null),_in?: ((Scalars['String'] | null)[] | null),_nin?: ((Scalars['String'] | null)[] | null),_between?: ((Scalars['GraphQLStringOrFloat'] | null)[] | null),_nbetween?: ((Scalars['GraphQLStringOrFloat'] | null)[] | null)}

export interface datetime_function_filter_operators {year?: (number_filter_operators | null),month?: (number_filter_operators | null),week?: (number_filter_operators | null),day?: (number_filter_operators | null),weekday?: (number_filter_operators | null),hour?: (number_filter_operators | null),minute?: (number_filter_operators | null),second?: (number_filter_operators | null)}

export interface service_translations_quantifier_filter {id?: (number_filter_operators | null),service_id?: (service_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),description?: (string_filter_operators | null),_and?: ((service_translations_filter | null)[] | null),_or?: ((service_translations_filter | null)[] | null),_some?: (service_translations_filter | null),_none?: (service_translations_filter | null)}

export interface count_function_filter_operators {count?: (number_filter_operators | null)}

export interface count_functionsGenqlSelection{
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_translations_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: service_translations_aggregated_countGenqlSelection
    countDistinct?: service_translations_aggregated_countGenqlSelection
    avg?: service_translations_aggregated_fieldsGenqlSelection
    sum?: service_translations_aggregated_fieldsGenqlSelection
    avgDistinct?: service_translations_aggregated_fieldsGenqlSelection
    sumDistinct?: service_translations_aggregated_fieldsGenqlSelection
    min?: service_translations_aggregated_fieldsGenqlSelection
    max?: service_translations_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_translations_aggregated_countGenqlSelection{
    id?: boolean | number
    service_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_translations_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_service_translationsGenqlSelection{
    id?: boolean | number
    service_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: service_aggregated_countGenqlSelection
    countDistinct?: service_aggregated_countGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_aggregated_countGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    user_updated?: boolean | number
    date_updated?: boolean | number
    image?: boolean | number
    icon?: boolean | number
    translations?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_serviceGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    image?: boolean | number
    icon?: boolean | number
    translations?: boolean | number
    translations_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categoriesGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    projects?: (projectGenqlSelection & { __args?: {filter?: (project_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    blogs?: (blogGenqlSelection & { __args?: {filter?: (blog_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    translations?: (categories_translationsGenqlSelection & { __args?: {filter?: (categories_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    translations_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface projectGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    translations?: (project_translationsGenqlSelection & { __args?: {filter?: (project_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    translations_func?: count_functionsGenqlSelection
    images?: (project_filesGenqlSelection & { __args?: {filter?: (project_files_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    images_func?: count_functionsGenqlSelection
    categories?: (project_categories_1GenqlSelection & { __args?: {filter?: (project_categories_1_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    categories_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_translationsGenqlSelection{
    id?: boolean | number
    project_id?: (projectGenqlSelection & { __args?: {filter?: (project_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    languages_code?: (languagesGenqlSelection & { __args?: {filter?: (languages_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    title?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_filter {id?: (id_filter_operators | null),user_created?: (id_filter_operators | null),date_created?: (date_filter_operators | null),date_created_func?: (datetime_function_filter_operators | null),user_updated?: (id_filter_operators | null),date_updated?: (date_filter_operators | null),date_updated_func?: (datetime_function_filter_operators | null),translations?: (project_translations_quantifier_filter | null),translations_func?: (count_function_filter_operators | null),images?: (project_files_quantifier_filter | null),images_func?: (count_function_filter_operators | null),categories?: (project_categories_1_quantifier_filter | null),categories_func?: (count_function_filter_operators | null),_and?: ((project_filter | null)[] | null),_or?: ((project_filter | null)[] | null)}

export interface project_translations_quantifier_filter {id?: (number_filter_operators | null),project_id?: (project_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),description?: (string_filter_operators | null),_and?: ((project_translations_filter | null)[] | null),_or?: ((project_translations_filter | null)[] | null),_some?: (project_translations_filter | null),_none?: (project_translations_filter | null)}

export interface project_translations_filter {id?: (number_filter_operators | null),project_id?: (project_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),description?: (string_filter_operators | null),_and?: ((project_translations_filter | null)[] | null),_or?: ((project_translations_filter | null)[] | null)}

export interface project_files_quantifier_filter {id?: (number_filter_operators | null),project_id?: (project_filter | null),directus_files_id?: (directus_files_filter | null),_and?: ((project_files_filter | null)[] | null),_or?: ((project_files_filter | null)[] | null),_some?: (project_files_filter | null),_none?: (project_files_filter | null)}

export interface project_files_filter {id?: (number_filter_operators | null),project_id?: (project_filter | null),directus_files_id?: (directus_files_filter | null),_and?: ((project_files_filter | null)[] | null),_or?: ((project_files_filter | null)[] | null)}

export interface project_categories_1_quantifier_filter {id?: (number_filter_operators | null),project?: (project_filter | null),categories?: (categories_filter | null),_and?: ((project_categories_1_filter | null)[] | null),_or?: ((project_categories_1_filter | null)[] | null),_some?: (project_categories_1_filter | null),_none?: (project_categories_1_filter | null)}

export interface categories_filter {id?: (id_filter_operators | null),user_created?: (id_filter_operators | null),date_created?: (date_filter_operators | null),date_created_func?: (datetime_function_filter_operators | null),user_updated?: (id_filter_operators | null),date_updated?: (date_filter_operators | null),date_updated_func?: (datetime_function_filter_operators | null),projects?: (project_filter | null),blogs?: (blog_filter | null),translations?: (categories_translations_quantifier_filter | null),translations_func?: (count_function_filter_operators | null),_and?: ((categories_filter | null)[] | null),_or?: ((categories_filter | null)[] | null)}

export interface blog_filter {id?: (id_filter_operators | null),user_created?: (id_filter_operators | null),date_created?: (date_filter_operators | null),date_created_func?: (datetime_function_filter_operators | null),user_updated?: (id_filter_operators | null),date_updated?: (date_filter_operators | null),date_updated_func?: (datetime_function_filter_operators | null),image?: (directus_files_filter | null),read_time?: (string_filter_operators | null),translations?: (blog_translations_quantifier_filter | null),translations_func?: (count_function_filter_operators | null),categories?: (blog_categories_quantifier_filter | null),categories_func?: (count_function_filter_operators | null),_and?: ((blog_filter | null)[] | null),_or?: ((blog_filter | null)[] | null)}

export interface blog_translations_quantifier_filter {id?: (number_filter_operators | null),blog_id?: (blog_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),description?: (string_filter_operators | null),content?: (string_filter_operators | null),_and?: ((blog_translations_filter | null)[] | null),_or?: ((blog_translations_filter | null)[] | null),_some?: (blog_translations_filter | null),_none?: (blog_translations_filter | null)}

export interface blog_translations_filter {id?: (number_filter_operators | null),blog_id?: (blog_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),description?: (string_filter_operators | null),content?: (string_filter_operators | null),_and?: ((blog_translations_filter | null)[] | null),_or?: ((blog_translations_filter | null)[] | null)}

export interface blog_categories_quantifier_filter {id?: (number_filter_operators | null),blog?: (blog_filter | null),categories?: (categories_filter | null),_and?: ((blog_categories_filter | null)[] | null),_or?: ((blog_categories_filter | null)[] | null),_some?: (blog_categories_filter | null),_none?: (blog_categories_filter | null)}

export interface blog_categories_filter {id?: (number_filter_operators | null),blog?: (blog_filter | null),categories?: (categories_filter | null),_and?: ((blog_categories_filter | null)[] | null),_or?: ((blog_categories_filter | null)[] | null)}

export interface categories_translations_quantifier_filter {id?: (number_filter_operators | null),categories_id?: (categories_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),slug?: (string_filter_operators | null),description?: (string_filter_operators | null),_and?: ((categories_translations_filter | null)[] | null),_or?: ((categories_translations_filter | null)[] | null),_some?: (categories_translations_filter | null),_none?: (categories_translations_filter | null)}

export interface categories_translations_filter {id?: (number_filter_operators | null),categories_id?: (categories_filter | null),languages_code?: (languages_filter | null),title?: (string_filter_operators | null),slug?: (string_filter_operators | null),description?: (string_filter_operators | null),_and?: ((categories_translations_filter | null)[] | null),_or?: ((categories_translations_filter | null)[] | null)}

export interface project_categories_1_filter {id?: (number_filter_operators | null),project?: (project_filter | null),categories?: (categories_filter | null),_and?: ((project_categories_1_filter | null)[] | null),_or?: ((project_categories_1_filter | null)[] | null)}

export interface project_filesGenqlSelection{
    id?: boolean | number
    project_id?: (projectGenqlSelection & { __args?: {filter?: (project_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    directus_files_id?: (directus_filesGenqlSelection & { __args?: {filter?: (directus_files_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_categories_1GenqlSelection{
    id?: boolean | number
    project?: (projectGenqlSelection & { __args?: {filter?: (project_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    categories?: (categoriesGenqlSelection & { __args?: {filter?: (categories_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blogGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    image?: (directus_filesGenqlSelection & { __args?: {filter?: (directus_files_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    read_time?: boolean | number
    translations?: (blog_translationsGenqlSelection & { __args?: {filter?: (blog_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    translations_func?: count_functionsGenqlSelection
    categories?: (blog_categoriesGenqlSelection & { __args?: {filter?: (blog_categories_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    categories_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_translationsGenqlSelection{
    id?: boolean | number
    blog_id?: (blogGenqlSelection & { __args?: {filter?: (blog_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    languages_code?: (languagesGenqlSelection & { __args?: {filter?: (languages_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    title?: boolean | number
    description?: boolean | number
    content?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_categoriesGenqlSelection{
    id?: boolean | number
    blog?: (blogGenqlSelection & { __args?: {filter?: (blog_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    categories?: (categoriesGenqlSelection & { __args?: {filter?: (categories_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_translationsGenqlSelection{
    id?: boolean | number
    categories_id?: (categoriesGenqlSelection & { __args?: {filter?: (categories_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    languages_code?: (languagesGenqlSelection & { __args?: {filter?: (languages_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    title?: boolean | number
    slug?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: categories_aggregated_countGenqlSelection
    countDistinct?: categories_aggregated_countGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_aggregated_countGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    user_updated?: boolean | number
    date_updated?: boolean | number
    projects?: boolean | number
    blogs?: boolean | number
    translations?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_categoriesGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    projects?: boolean | number
    blogs?: boolean | number
    translations?: boolean | number
    translations_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_translations_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: categories_translations_aggregated_countGenqlSelection
    countDistinct?: categories_translations_aggregated_countGenqlSelection
    avg?: categories_translations_aggregated_fieldsGenqlSelection
    sum?: categories_translations_aggregated_fieldsGenqlSelection
    avgDistinct?: categories_translations_aggregated_fieldsGenqlSelection
    sumDistinct?: categories_translations_aggregated_fieldsGenqlSelection
    min?: categories_translations_aggregated_fieldsGenqlSelection
    max?: categories_translations_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_translations_aggregated_countGenqlSelection{
    id?: boolean | number
    categories_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    slug?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_translations_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_categories_translationsGenqlSelection{
    id?: boolean | number
    categories_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    slug?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: blog_aggregated_countGenqlSelection
    countDistinct?: blog_aggregated_countGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_aggregated_countGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    user_updated?: boolean | number
    date_updated?: boolean | number
    image?: boolean | number
    read_time?: boolean | number
    translations?: boolean | number
    categories?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_blogGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    image?: boolean | number
    read_time?: boolean | number
    translations?: boolean | number
    translations_func?: count_functionsGenqlSelection
    categories?: boolean | number
    categories_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonialsGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    translations?: (testimonials_translationsGenqlSelection & { __args?: {filter?: (testimonials_translations_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    translations_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_translationsGenqlSelection{
    id?: boolean | number
    testimonials_id?: (testimonialsGenqlSelection & { __args?: {filter?: (testimonials_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    languages_code?: (languagesGenqlSelection & { __args?: {filter?: (languages_filter | null), sort?: ((Scalars['String'] | null)[] | null), limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), page?: (Scalars['Int'] | null), search?: (Scalars['String'] | null)} })
    text?: boolean | number
    client?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_filter {id?: (id_filter_operators | null),user_created?: (id_filter_operators | null),date_created?: (date_filter_operators | null),date_created_func?: (datetime_function_filter_operators | null),translations?: (testimonials_translations_quantifier_filter | null),translations_func?: (count_function_filter_operators | null),_and?: ((testimonials_filter | null)[] | null),_or?: ((testimonials_filter | null)[] | null)}

export interface testimonials_translations_quantifier_filter {id?: (number_filter_operators | null),testimonials_id?: (testimonials_filter | null),languages_code?: (languages_filter | null),text?: (string_filter_operators | null),client?: (string_filter_operators | null),name?: (string_filter_operators | null),_and?: ((testimonials_translations_filter | null)[] | null),_or?: ((testimonials_translations_filter | null)[] | null),_some?: (testimonials_translations_filter | null),_none?: (testimonials_translations_filter | null)}

export interface testimonials_translations_filter {id?: (number_filter_operators | null),testimonials_id?: (testimonials_filter | null),languages_code?: (languages_filter | null),text?: (string_filter_operators | null),client?: (string_filter_operators | null),name?: (string_filter_operators | null),_and?: ((testimonials_translations_filter | null)[] | null),_or?: ((testimonials_translations_filter | null)[] | null)}

export interface testimonials_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: testimonials_aggregated_countGenqlSelection
    countDistinct?: testimonials_aggregated_countGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_aggregated_countGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    translations?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_testimonialsGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    translations?: boolean | number
    translations_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: project_aggregated_countGenqlSelection
    countDistinct?: project_aggregated_countGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_aggregated_countGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    user_updated?: boolean | number
    date_updated?: boolean | number
    translations?: boolean | number
    images?: boolean | number
    categories?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_projectGenqlSelection{
    id?: boolean | number
    user_created?: boolean | number
    date_created?: boolean | number
    date_created_func?: datetime_functionsGenqlSelection
    user_updated?: boolean | number
    date_updated?: boolean | number
    date_updated_func?: datetime_functionsGenqlSelection
    translations?: boolean | number
    translations_func?: count_functionsGenqlSelection
    images?: boolean | number
    images_func?: count_functionsGenqlSelection
    categories?: boolean | number
    categories_func?: count_functionsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_categories_1_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: project_categories_1_aggregated_countGenqlSelection
    countDistinct?: project_categories_1_aggregated_countGenqlSelection
    avg?: project_categories_1_aggregated_fieldsGenqlSelection
    sum?: project_categories_1_aggregated_fieldsGenqlSelection
    avgDistinct?: project_categories_1_aggregated_fieldsGenqlSelection
    sumDistinct?: project_categories_1_aggregated_fieldsGenqlSelection
    min?: project_categories_1_aggregated_fieldsGenqlSelection
    max?: project_categories_1_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_categories_1_aggregated_countGenqlSelection{
    id?: boolean | number
    project?: boolean | number
    categories?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_categories_1_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_project_categories_1GenqlSelection{
    id?: boolean | number
    project?: boolean | number
    categories?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_files_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: project_files_aggregated_countGenqlSelection
    countDistinct?: project_files_aggregated_countGenqlSelection
    avg?: project_files_aggregated_fieldsGenqlSelection
    sum?: project_files_aggregated_fieldsGenqlSelection
    avgDistinct?: project_files_aggregated_fieldsGenqlSelection
    sumDistinct?: project_files_aggregated_fieldsGenqlSelection
    min?: project_files_aggregated_fieldsGenqlSelection
    max?: project_files_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_files_aggregated_countGenqlSelection{
    id?: boolean | number
    project_id?: boolean | number
    directus_files_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_files_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_project_filesGenqlSelection{
    id?: boolean | number
    project_id?: boolean | number
    directus_files_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_translations_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: project_translations_aggregated_countGenqlSelection
    countDistinct?: project_translations_aggregated_countGenqlSelection
    avg?: project_translations_aggregated_fieldsGenqlSelection
    sum?: project_translations_aggregated_fieldsGenqlSelection
    avgDistinct?: project_translations_aggregated_fieldsGenqlSelection
    sumDistinct?: project_translations_aggregated_fieldsGenqlSelection
    min?: project_translations_aggregated_fieldsGenqlSelection
    max?: project_translations_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_translations_aggregated_countGenqlSelection{
    id?: boolean | number
    project_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_translations_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_project_translationsGenqlSelection{
    id?: boolean | number
    project_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_translations_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: blog_translations_aggregated_countGenqlSelection
    countDistinct?: blog_translations_aggregated_countGenqlSelection
    avg?: blog_translations_aggregated_fieldsGenqlSelection
    sum?: blog_translations_aggregated_fieldsGenqlSelection
    avgDistinct?: blog_translations_aggregated_fieldsGenqlSelection
    sumDistinct?: blog_translations_aggregated_fieldsGenqlSelection
    min?: blog_translations_aggregated_fieldsGenqlSelection
    max?: blog_translations_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_translations_aggregated_countGenqlSelection{
    id?: boolean | number
    blog_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    description?: boolean | number
    content?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_translations_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_blog_translationsGenqlSelection{
    id?: boolean | number
    blog_id?: boolean | number
    languages_code?: boolean | number
    title?: boolean | number
    description?: boolean | number
    content?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_categories_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: blog_categories_aggregated_countGenqlSelection
    countDistinct?: blog_categories_aggregated_countGenqlSelection
    avg?: blog_categories_aggregated_fieldsGenqlSelection
    sum?: blog_categories_aggregated_fieldsGenqlSelection
    avgDistinct?: blog_categories_aggregated_fieldsGenqlSelection
    sumDistinct?: blog_categories_aggregated_fieldsGenqlSelection
    min?: blog_categories_aggregated_fieldsGenqlSelection
    max?: blog_categories_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_categories_aggregated_countGenqlSelection{
    id?: boolean | number
    blog?: boolean | number
    categories?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_categories_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_blog_categoriesGenqlSelection{
    id?: boolean | number
    blog?: boolean | number
    categories?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_translations_aggregatedGenqlSelection{
    group?: boolean | number
    countAll?: boolean | number
    count?: testimonials_translations_aggregated_countGenqlSelection
    countDistinct?: testimonials_translations_aggregated_countGenqlSelection
    avg?: testimonials_translations_aggregated_fieldsGenqlSelection
    sum?: testimonials_translations_aggregated_fieldsGenqlSelection
    avgDistinct?: testimonials_translations_aggregated_fieldsGenqlSelection
    sumDistinct?: testimonials_translations_aggregated_fieldsGenqlSelection
    min?: testimonials_translations_aggregated_fieldsGenqlSelection
    max?: testimonials_translations_aggregated_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_translations_aggregated_countGenqlSelection{
    id?: boolean | number
    testimonials_id?: boolean | number
    languages_code?: boolean | number
    text?: boolean | number
    client?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_translations_aggregated_fieldsGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface version_testimonials_translationsGenqlSelection{
    id?: boolean | number
    testimonials_id?: boolean | number
    languages_code?: boolean | number
    text?: boolean | number
    client?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    create_contact_us_items?: { __args: {data?: (create_contact_us_input[] | null)} } | boolean | number
    create_contact_us_item?: { __args: {data: create_contact_us_input} }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface create_contact_us_input {id?: (Scalars['ID'] | null),user_created?: (Scalars['ID'] | null),date_created?: (Scalars['Date'] | null),user_updated?: (Scalars['ID'] | null),date_updated?: (Scalars['Date'] | null),name?: (Scalars['String'] | null),email?: (Scalars['String'] | null),phone_number?: (Scalars['String'] | null),service_type?: (Scalars['String'] | null),description?: (Scalars['String'] | null)}

export interface SubscriptionGenqlSelection{
    directus_files_mutated?: (directus_files_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    languages_mutated?: (languages_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    service_translations_mutated?: (service_translations_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    service_mutated?: (service_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    categories_mutated?: (categories_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    categories_translations_mutated?: (categories_translations_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    blog_mutated?: (blog_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    testimonials_mutated?: (testimonials_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    project_mutated?: (project_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    project_categories_1_mutated?: (project_categories_1_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    project_files_mutated?: (project_files_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    project_translations_mutated?: (project_translations_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    blog_translations_mutated?: (blog_translations_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    blog_categories_mutated?: (blog_categories_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    testimonials_translations_mutated?: (testimonials_translations_mutatedGenqlSelection & { __args?: {event?: (EventEnum | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface directus_files_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: directus_filesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface languages_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: languagesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_translations_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: service_translationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface service_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: serviceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: categoriesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface categories_translations_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: categories_translationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: blogGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: testimonialsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: projectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_categories_1_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: project_categories_1GenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_files_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: project_filesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface project_translations_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: project_translationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_translations_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: blog_translationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface blog_categories_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: blog_categoriesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface testimonials_translations_mutatedGenqlSelection{
    key?: boolean | number
    event?: boolean | number
    data?: testimonials_translationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const languages_possibleTypes: string[] = ['languages']
    export const islanguages = (obj?: { __typename?: any } | null): obj is languages => {
      if (!obj?.__typename) throw new Error('__typename is missing in "islanguages"')
      return languages_possibleTypes.includes(obj.__typename)
    }
    


    const languages_aggregated_possibleTypes: string[] = ['languages_aggregated']
    export const islanguages_aggregated = (obj?: { __typename?: any } | null): obj is languages_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "islanguages_aggregated"')
      return languages_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const languages_aggregated_count_possibleTypes: string[] = ['languages_aggregated_count']
    export const islanguages_aggregated_count = (obj?: { __typename?: any } | null): obj is languages_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "islanguages_aggregated_count"')
      return languages_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const version_languages_possibleTypes: string[] = ['version_languages']
    export const isversion_languages = (obj?: { __typename?: any } | null): obj is version_languages => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_languages"')
      return version_languages_possibleTypes.includes(obj.__typename)
    }
    


    const service_translations_possibleTypes: string[] = ['service_translations']
    export const isservice_translations = (obj?: { __typename?: any } | null): obj is service_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_translations"')
      return service_translations_possibleTypes.includes(obj.__typename)
    }
    


    const service_possibleTypes: string[] = ['service']
    export const isservice = (obj?: { __typename?: any } | null): obj is service => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice"')
      return service_possibleTypes.includes(obj.__typename)
    }
    


    const datetime_functions_possibleTypes: string[] = ['datetime_functions']
    export const isdatetime_functions = (obj?: { __typename?: any } | null): obj is datetime_functions => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdatetime_functions"')
      return datetime_functions_possibleTypes.includes(obj.__typename)
    }
    


    const directus_files_possibleTypes: string[] = ['directus_files']
    export const isdirectus_files = (obj?: { __typename?: any } | null): obj is directus_files => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdirectus_files"')
      return directus_files_possibleTypes.includes(obj.__typename)
    }
    


    const count_functions_possibleTypes: string[] = ['count_functions']
    export const iscount_functions = (obj?: { __typename?: any } | null): obj is count_functions => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscount_functions"')
      return count_functions_possibleTypes.includes(obj.__typename)
    }
    


    const service_translations_aggregated_possibleTypes: string[] = ['service_translations_aggregated']
    export const isservice_translations_aggregated = (obj?: { __typename?: any } | null): obj is service_translations_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_translations_aggregated"')
      return service_translations_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const service_translations_aggregated_count_possibleTypes: string[] = ['service_translations_aggregated_count']
    export const isservice_translations_aggregated_count = (obj?: { __typename?: any } | null): obj is service_translations_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_translations_aggregated_count"')
      return service_translations_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const service_translations_aggregated_fields_possibleTypes: string[] = ['service_translations_aggregated_fields']
    export const isservice_translations_aggregated_fields = (obj?: { __typename?: any } | null): obj is service_translations_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_translations_aggregated_fields"')
      return service_translations_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_service_translations_possibleTypes: string[] = ['version_service_translations']
    export const isversion_service_translations = (obj?: { __typename?: any } | null): obj is version_service_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_service_translations"')
      return version_service_translations_possibleTypes.includes(obj.__typename)
    }
    


    const service_aggregated_possibleTypes: string[] = ['service_aggregated']
    export const isservice_aggregated = (obj?: { __typename?: any } | null): obj is service_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_aggregated"')
      return service_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const service_aggregated_count_possibleTypes: string[] = ['service_aggregated_count']
    export const isservice_aggregated_count = (obj?: { __typename?: any } | null): obj is service_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_aggregated_count"')
      return service_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const version_service_possibleTypes: string[] = ['version_service']
    export const isversion_service = (obj?: { __typename?: any } | null): obj is version_service => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_service"')
      return version_service_possibleTypes.includes(obj.__typename)
    }
    


    const categories_possibleTypes: string[] = ['categories']
    export const iscategories = (obj?: { __typename?: any } | null): obj is categories => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories"')
      return categories_possibleTypes.includes(obj.__typename)
    }
    


    const project_possibleTypes: string[] = ['project']
    export const isproject = (obj?: { __typename?: any } | null): obj is project => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject"')
      return project_possibleTypes.includes(obj.__typename)
    }
    


    const project_translations_possibleTypes: string[] = ['project_translations']
    export const isproject_translations = (obj?: { __typename?: any } | null): obj is project_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_translations"')
      return project_translations_possibleTypes.includes(obj.__typename)
    }
    


    const project_files_possibleTypes: string[] = ['project_files']
    export const isproject_files = (obj?: { __typename?: any } | null): obj is project_files => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_files"')
      return project_files_possibleTypes.includes(obj.__typename)
    }
    


    const project_categories_1_possibleTypes: string[] = ['project_categories_1']
    export const isproject_categories_1 = (obj?: { __typename?: any } | null): obj is project_categories_1 => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_categories_1"')
      return project_categories_1_possibleTypes.includes(obj.__typename)
    }
    


    const blog_possibleTypes: string[] = ['blog']
    export const isblog = (obj?: { __typename?: any } | null): obj is blog => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog"')
      return blog_possibleTypes.includes(obj.__typename)
    }
    


    const blog_translations_possibleTypes: string[] = ['blog_translations']
    export const isblog_translations = (obj?: { __typename?: any } | null): obj is blog_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_translations"')
      return blog_translations_possibleTypes.includes(obj.__typename)
    }
    


    const blog_categories_possibleTypes: string[] = ['blog_categories']
    export const isblog_categories = (obj?: { __typename?: any } | null): obj is blog_categories => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_categories"')
      return blog_categories_possibleTypes.includes(obj.__typename)
    }
    


    const categories_translations_possibleTypes: string[] = ['categories_translations']
    export const iscategories_translations = (obj?: { __typename?: any } | null): obj is categories_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_translations"')
      return categories_translations_possibleTypes.includes(obj.__typename)
    }
    


    const categories_aggregated_possibleTypes: string[] = ['categories_aggregated']
    export const iscategories_aggregated = (obj?: { __typename?: any } | null): obj is categories_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_aggregated"')
      return categories_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const categories_aggregated_count_possibleTypes: string[] = ['categories_aggregated_count']
    export const iscategories_aggregated_count = (obj?: { __typename?: any } | null): obj is categories_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_aggregated_count"')
      return categories_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const version_categories_possibleTypes: string[] = ['version_categories']
    export const isversion_categories = (obj?: { __typename?: any } | null): obj is version_categories => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_categories"')
      return version_categories_possibleTypes.includes(obj.__typename)
    }
    


    const categories_translations_aggregated_possibleTypes: string[] = ['categories_translations_aggregated']
    export const iscategories_translations_aggregated = (obj?: { __typename?: any } | null): obj is categories_translations_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_translations_aggregated"')
      return categories_translations_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const categories_translations_aggregated_count_possibleTypes: string[] = ['categories_translations_aggregated_count']
    export const iscategories_translations_aggregated_count = (obj?: { __typename?: any } | null): obj is categories_translations_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_translations_aggregated_count"')
      return categories_translations_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const categories_translations_aggregated_fields_possibleTypes: string[] = ['categories_translations_aggregated_fields']
    export const iscategories_translations_aggregated_fields = (obj?: { __typename?: any } | null): obj is categories_translations_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_translations_aggregated_fields"')
      return categories_translations_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_categories_translations_possibleTypes: string[] = ['version_categories_translations']
    export const isversion_categories_translations = (obj?: { __typename?: any } | null): obj is version_categories_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_categories_translations"')
      return version_categories_translations_possibleTypes.includes(obj.__typename)
    }
    


    const blog_aggregated_possibleTypes: string[] = ['blog_aggregated']
    export const isblog_aggregated = (obj?: { __typename?: any } | null): obj is blog_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_aggregated"')
      return blog_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const blog_aggregated_count_possibleTypes: string[] = ['blog_aggregated_count']
    export const isblog_aggregated_count = (obj?: { __typename?: any } | null): obj is blog_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_aggregated_count"')
      return blog_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const version_blog_possibleTypes: string[] = ['version_blog']
    export const isversion_blog = (obj?: { __typename?: any } | null): obj is version_blog => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_blog"')
      return version_blog_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_possibleTypes: string[] = ['testimonials']
    export const istestimonials = (obj?: { __typename?: any } | null): obj is testimonials => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials"')
      return testimonials_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_translations_possibleTypes: string[] = ['testimonials_translations']
    export const istestimonials_translations = (obj?: { __typename?: any } | null): obj is testimonials_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_translations"')
      return testimonials_translations_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_aggregated_possibleTypes: string[] = ['testimonials_aggregated']
    export const istestimonials_aggregated = (obj?: { __typename?: any } | null): obj is testimonials_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_aggregated"')
      return testimonials_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_aggregated_count_possibleTypes: string[] = ['testimonials_aggregated_count']
    export const istestimonials_aggregated_count = (obj?: { __typename?: any } | null): obj is testimonials_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_aggregated_count"')
      return testimonials_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const version_testimonials_possibleTypes: string[] = ['version_testimonials']
    export const isversion_testimonials = (obj?: { __typename?: any } | null): obj is version_testimonials => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_testimonials"')
      return version_testimonials_possibleTypes.includes(obj.__typename)
    }
    


    const project_aggregated_possibleTypes: string[] = ['project_aggregated']
    export const isproject_aggregated = (obj?: { __typename?: any } | null): obj is project_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_aggregated"')
      return project_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const project_aggregated_count_possibleTypes: string[] = ['project_aggregated_count']
    export const isproject_aggregated_count = (obj?: { __typename?: any } | null): obj is project_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_aggregated_count"')
      return project_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const version_project_possibleTypes: string[] = ['version_project']
    export const isversion_project = (obj?: { __typename?: any } | null): obj is version_project => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_project"')
      return version_project_possibleTypes.includes(obj.__typename)
    }
    


    const project_categories_1_aggregated_possibleTypes: string[] = ['project_categories_1_aggregated']
    export const isproject_categories_1_aggregated = (obj?: { __typename?: any } | null): obj is project_categories_1_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_categories_1_aggregated"')
      return project_categories_1_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const project_categories_1_aggregated_count_possibleTypes: string[] = ['project_categories_1_aggregated_count']
    export const isproject_categories_1_aggregated_count = (obj?: { __typename?: any } | null): obj is project_categories_1_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_categories_1_aggregated_count"')
      return project_categories_1_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const project_categories_1_aggregated_fields_possibleTypes: string[] = ['project_categories_1_aggregated_fields']
    export const isproject_categories_1_aggregated_fields = (obj?: { __typename?: any } | null): obj is project_categories_1_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_categories_1_aggregated_fields"')
      return project_categories_1_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_project_categories_1_possibleTypes: string[] = ['version_project_categories_1']
    export const isversion_project_categories_1 = (obj?: { __typename?: any } | null): obj is version_project_categories_1 => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_project_categories_1"')
      return version_project_categories_1_possibleTypes.includes(obj.__typename)
    }
    


    const project_files_aggregated_possibleTypes: string[] = ['project_files_aggregated']
    export const isproject_files_aggregated = (obj?: { __typename?: any } | null): obj is project_files_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_files_aggregated"')
      return project_files_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const project_files_aggregated_count_possibleTypes: string[] = ['project_files_aggregated_count']
    export const isproject_files_aggregated_count = (obj?: { __typename?: any } | null): obj is project_files_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_files_aggregated_count"')
      return project_files_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const project_files_aggregated_fields_possibleTypes: string[] = ['project_files_aggregated_fields']
    export const isproject_files_aggregated_fields = (obj?: { __typename?: any } | null): obj is project_files_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_files_aggregated_fields"')
      return project_files_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_project_files_possibleTypes: string[] = ['version_project_files']
    export const isversion_project_files = (obj?: { __typename?: any } | null): obj is version_project_files => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_project_files"')
      return version_project_files_possibleTypes.includes(obj.__typename)
    }
    


    const project_translations_aggregated_possibleTypes: string[] = ['project_translations_aggregated']
    export const isproject_translations_aggregated = (obj?: { __typename?: any } | null): obj is project_translations_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_translations_aggregated"')
      return project_translations_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const project_translations_aggregated_count_possibleTypes: string[] = ['project_translations_aggregated_count']
    export const isproject_translations_aggregated_count = (obj?: { __typename?: any } | null): obj is project_translations_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_translations_aggregated_count"')
      return project_translations_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const project_translations_aggregated_fields_possibleTypes: string[] = ['project_translations_aggregated_fields']
    export const isproject_translations_aggregated_fields = (obj?: { __typename?: any } | null): obj is project_translations_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_translations_aggregated_fields"')
      return project_translations_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_project_translations_possibleTypes: string[] = ['version_project_translations']
    export const isversion_project_translations = (obj?: { __typename?: any } | null): obj is version_project_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_project_translations"')
      return version_project_translations_possibleTypes.includes(obj.__typename)
    }
    


    const blog_translations_aggregated_possibleTypes: string[] = ['blog_translations_aggregated']
    export const isblog_translations_aggregated = (obj?: { __typename?: any } | null): obj is blog_translations_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_translations_aggregated"')
      return blog_translations_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const blog_translations_aggregated_count_possibleTypes: string[] = ['blog_translations_aggregated_count']
    export const isblog_translations_aggregated_count = (obj?: { __typename?: any } | null): obj is blog_translations_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_translations_aggregated_count"')
      return blog_translations_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const blog_translations_aggregated_fields_possibleTypes: string[] = ['blog_translations_aggregated_fields']
    export const isblog_translations_aggregated_fields = (obj?: { __typename?: any } | null): obj is blog_translations_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_translations_aggregated_fields"')
      return blog_translations_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_blog_translations_possibleTypes: string[] = ['version_blog_translations']
    export const isversion_blog_translations = (obj?: { __typename?: any } | null): obj is version_blog_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_blog_translations"')
      return version_blog_translations_possibleTypes.includes(obj.__typename)
    }
    


    const blog_categories_aggregated_possibleTypes: string[] = ['blog_categories_aggregated']
    export const isblog_categories_aggregated = (obj?: { __typename?: any } | null): obj is blog_categories_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_categories_aggregated"')
      return blog_categories_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const blog_categories_aggregated_count_possibleTypes: string[] = ['blog_categories_aggregated_count']
    export const isblog_categories_aggregated_count = (obj?: { __typename?: any } | null): obj is blog_categories_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_categories_aggregated_count"')
      return blog_categories_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const blog_categories_aggregated_fields_possibleTypes: string[] = ['blog_categories_aggregated_fields']
    export const isblog_categories_aggregated_fields = (obj?: { __typename?: any } | null): obj is blog_categories_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_categories_aggregated_fields"')
      return blog_categories_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_blog_categories_possibleTypes: string[] = ['version_blog_categories']
    export const isversion_blog_categories = (obj?: { __typename?: any } | null): obj is version_blog_categories => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_blog_categories"')
      return version_blog_categories_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_translations_aggregated_possibleTypes: string[] = ['testimonials_translations_aggregated']
    export const istestimonials_translations_aggregated = (obj?: { __typename?: any } | null): obj is testimonials_translations_aggregated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_translations_aggregated"')
      return testimonials_translations_aggregated_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_translations_aggregated_count_possibleTypes: string[] = ['testimonials_translations_aggregated_count']
    export const istestimonials_translations_aggregated_count = (obj?: { __typename?: any } | null): obj is testimonials_translations_aggregated_count => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_translations_aggregated_count"')
      return testimonials_translations_aggregated_count_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_translations_aggregated_fields_possibleTypes: string[] = ['testimonials_translations_aggregated_fields']
    export const istestimonials_translations_aggregated_fields = (obj?: { __typename?: any } | null): obj is testimonials_translations_aggregated_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_translations_aggregated_fields"')
      return testimonials_translations_aggregated_fields_possibleTypes.includes(obj.__typename)
    }
    


    const version_testimonials_translations_possibleTypes: string[] = ['version_testimonials_translations']
    export const isversion_testimonials_translations = (obj?: { __typename?: any } | null): obj is version_testimonials_translations => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isversion_testimonials_translations"')
      return version_testimonials_translations_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Subscription_possibleTypes: string[] = ['Subscription']
    export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
      return Subscription_possibleTypes.includes(obj.__typename)
    }
    


    const directus_files_mutated_possibleTypes: string[] = ['directus_files_mutated']
    export const isdirectus_files_mutated = (obj?: { __typename?: any } | null): obj is directus_files_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdirectus_files_mutated"')
      return directus_files_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const languages_mutated_possibleTypes: string[] = ['languages_mutated']
    export const islanguages_mutated = (obj?: { __typename?: any } | null): obj is languages_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "islanguages_mutated"')
      return languages_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const service_translations_mutated_possibleTypes: string[] = ['service_translations_mutated']
    export const isservice_translations_mutated = (obj?: { __typename?: any } | null): obj is service_translations_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_translations_mutated"')
      return service_translations_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const service_mutated_possibleTypes: string[] = ['service_mutated']
    export const isservice_mutated = (obj?: { __typename?: any } | null): obj is service_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isservice_mutated"')
      return service_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const categories_mutated_possibleTypes: string[] = ['categories_mutated']
    export const iscategories_mutated = (obj?: { __typename?: any } | null): obj is categories_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_mutated"')
      return categories_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const categories_translations_mutated_possibleTypes: string[] = ['categories_translations_mutated']
    export const iscategories_translations_mutated = (obj?: { __typename?: any } | null): obj is categories_translations_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "iscategories_translations_mutated"')
      return categories_translations_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const blog_mutated_possibleTypes: string[] = ['blog_mutated']
    export const isblog_mutated = (obj?: { __typename?: any } | null): obj is blog_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_mutated"')
      return blog_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_mutated_possibleTypes: string[] = ['testimonials_mutated']
    export const istestimonials_mutated = (obj?: { __typename?: any } | null): obj is testimonials_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_mutated"')
      return testimonials_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const project_mutated_possibleTypes: string[] = ['project_mutated']
    export const isproject_mutated = (obj?: { __typename?: any } | null): obj is project_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_mutated"')
      return project_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const project_categories_1_mutated_possibleTypes: string[] = ['project_categories_1_mutated']
    export const isproject_categories_1_mutated = (obj?: { __typename?: any } | null): obj is project_categories_1_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_categories_1_mutated"')
      return project_categories_1_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const project_files_mutated_possibleTypes: string[] = ['project_files_mutated']
    export const isproject_files_mutated = (obj?: { __typename?: any } | null): obj is project_files_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_files_mutated"')
      return project_files_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const project_translations_mutated_possibleTypes: string[] = ['project_translations_mutated']
    export const isproject_translations_mutated = (obj?: { __typename?: any } | null): obj is project_translations_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isproject_translations_mutated"')
      return project_translations_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const blog_translations_mutated_possibleTypes: string[] = ['blog_translations_mutated']
    export const isblog_translations_mutated = (obj?: { __typename?: any } | null): obj is blog_translations_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_translations_mutated"')
      return blog_translations_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const blog_categories_mutated_possibleTypes: string[] = ['blog_categories_mutated']
    export const isblog_categories_mutated = (obj?: { __typename?: any } | null): obj is blog_categories_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isblog_categories_mutated"')
      return blog_categories_mutated_possibleTypes.includes(obj.__typename)
    }
    


    const testimonials_translations_mutated_possibleTypes: string[] = ['testimonials_translations_mutated']
    export const istestimonials_translations_mutated = (obj?: { __typename?: any } | null): obj is testimonials_translations_mutated => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istestimonials_translations_mutated"')
      return testimonials_translations_mutated_possibleTypes.includes(obj.__typename)
    }
    

export const enumEventEnum = {
   create: 'create' as const,
   update: 'update' as const,
   delete: 'delete' as const
}
