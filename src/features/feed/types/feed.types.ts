export interface Post {
  id: string;
  user: {
    id: string;
    uid: string;
    fullName: string;
    avatarUrl: string | null;
  };
  actor: {
    id: string;
    uid: string;
    fullName: string;
    avatarUrl: string | null;
  };
  caption: string;
  foreign_id: string;
  mediaType: 'video' | 'image' | 'text';
  object: string;
  origin: string | null;
  target: string;
  time: string;
  videoFullUrl?: string;
  videoUrl?: string;
  videoAccessUrl?: string;
  imageAccessUrl?: string;
  likes: any[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: {
    id: string;
    uid: string;
    fullName: string;
    avatarUrl: string | null;
  };
  data: {
    text: string;
    name: string;
  };
  created_at: string;
}

export interface MyCommentProps {
  comment: string;
  userName: string;
  avatar?: string;
}