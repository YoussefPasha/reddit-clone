export interface Post {
  identifier: string;
  title: string;
  body?: string;
  slug: string;
  subName: string;
  username: string;
  createAt: string;
  updatedAt: string;
  // Virtual fields
  url: string;
}
