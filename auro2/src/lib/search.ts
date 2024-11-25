import { create } from 'zustand';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'event' | 'service' | 'forum' | 'resource' | 'bazaar';
  url: string;
  icon?: string;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  clearSearch: () => void;
}

// Mock data for development
const mockData: SearchResult[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Daily meditation session at Matrimandir',
    type: 'event',
    url: '/events/1'
  },
  {
    id: '2',
    title: 'Health Center',
    description: 'Primary healthcare services for residents',
    type: 'service',
    url: '/services'
  },
  {
    id: '3',
    title: 'Community Garden Project',
    description: 'Discussion about new community garden',
    type: 'forum',
    url: '/forums/3'
  }
];

export const useSearch = create<SearchState>((set) => ({
  query: '',
  results: [],
  isSearching: false,
  error: null,

  setQuery: (query) => set({ query }),

  search: async (query) => {
    if (!query.trim()) {
      set({ results: [], isSearching: false });
      return;
    }

    set({ isSearching: true, error: null });

    try {
      // In development, search mock data
      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      const results = mockData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

      set({ results, isSearching: false });
    } catch (error) {
      set({ error: 'Search failed', isSearching: false });
    }
  },

  clearSearch: () => set({ query: '', results: [], error: null })
}));