export interface Blog {
  _id: string;
  title: string;
  subTitel: string;
  image: string;
  category: string;
  description: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DashboardData {
  blogs: number;
  comments: number;
  drafts: number;
  recentBlogs: Blog[];
}

interface Icomment {
  _id: string;
  blog: string;      
  name: string;     
  content: string;  
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
