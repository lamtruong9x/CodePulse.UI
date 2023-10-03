export interface AddBlogPost {
  id: string;
  name: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  pulishedDate: Date;
  author: string;
  isVisible: boolean;
}
