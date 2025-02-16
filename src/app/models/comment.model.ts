export interface Comment {
    id: number;
    postId: number;
    parentId: number | null;
    user: string;
    date: string;
    content: string;
    replies: Comment[];
  }