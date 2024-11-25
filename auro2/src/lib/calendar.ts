import { create } from 'zustand';
import axios from './axios';
import { format } from 'date-fns';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl?: string;
  attendees: number;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface CalendarState {
  events: CalendarEvent[];
  selectedDate: Date;
  isLoading: boolean;
  error: string | null;
  fetchEvents: (month?: number, year?: number) => Promise<void>;
  createEvent: (event: Partial<CalendarEvent>) => Promise<void>;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  setSelectedDate: (date: Date) => void;
}

export const useCalendar = create<CalendarState>((set, get) => ({
  events: [],
  selectedDate: new Date(),
  isLoading: false,
  error: null,

  fetchEvents: async (month?: number, year?: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get('/api/events', {
        params: {
          month: month ?? get().selectedDate.getMonth() + 1,
          year: year ?? get().selectedDate.getFullYear()
        }
      });
      set({ events: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createEvent: async (event) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post('/api/events', event);
      await get().fetchEvents();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateEvent: async (id, event) => {
    try {
      set({ isLoading: true, error: null });
      await axios.put(`/api/events/${id}`, event);
      await get().fetchEvents();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteEvent: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(`/api/events/${id}`);
      await get().fetchEvents();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  setSelectedDate: (date) => {
    set({ selectedDate: date });
    get().fetchEvents(date.getMonth() + 1, date.getFullYear());
  }
}));