import { create } from 'zustand';
import axios from './axios';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  replies: number;
  views: number;
  lastActivity: string;
}

interface ForumState {
  posts: ForumPost[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
  fetchPosts: () => Promise<void>;
  createPost: (data: Partial<ForumPost>) => Promise<void>;
  setSelectedCategory: (category: string) => void;
}

export const useForumStore = create<ForumState>((set, get) => ({
  posts: [],
  categories: ['General', 'Announcements', 'Events', 'Projects', 'Questions', 'Ideas'],
  isLoading: false,
  error: null,
  selectedCategory: 'General',

  fetchPosts: async () => {
    try {
      set({ isLoading: true, error: null });
      const { selectedCategory } = get();
      const response = await axios.get(`/api/forums/posts${
        selectedCategory !== 'All' ? `?category=${selectedCategory}` : ''
      }`);
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createPost: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post('/api/forums/posts', data);
      await get().fetchPosts();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchPosts();
  }
}));