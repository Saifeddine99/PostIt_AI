export interface User {
  username: string;
}

export interface AuthResponse {
  token: string;
  message?: string;
}

export interface Post {
  title?: string;
  content: string;
  platform: 'linkedin' | 'facebook' | 'twitter';
  tone_style: string;
  generated_post?: string;
}

export interface SavedPost {
  title: string;
  content: string;
  generated_post: string;
  style: string;
  platform: string;
}