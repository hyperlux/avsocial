import React from 'react';
import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    image: string;
    attendees: number;
  };
  isDark: boolean;
}

export default function EventCard({ event, isDark }: EventCardProps) {
  return (
    <div className={`${
      isDark ? 'bg-dark-card' : 'bg-white'
    } rounded-xl shadow-sm overflow-hidden`}>
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-4 w-4 text-auroville-primary" />
          <span className="text-sm text-auroville-primary">{event.category}</span>
        </div>

        <h3 className={`text-xl font-semibold mb-2 ${
          isDark ? 'text-dark-primary' : 'text-gray-900'
        }`}>
          {event.title}
        </h3>
        
        <p className={`mb-4 ${
          isDark ? 'text-dark-secondary' : 'text-gray-600'
        }`}>
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className={`flex items-center ${
            isDark ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            <Calendar className="h-5 w-5 mr-2" />
            <span>{format(new Date(event.date), 'PPP')}</span>
          </div>
          <div className={`flex items-center ${
            isDark ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            <Clock className="h-5 w-5 mr-2" />
            <span>{format(new Date(event.date), 'p')}</span>
          </div>
          <div className={`flex items-center ${
            isDark ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className={`flex items-center ${
            isDark ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            <Users className="h-5 w-5 mr-2" />
            <span>{event.attendees} attending</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-auroville-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Join Event
          </button>
          <button className={`px-4 py-2 rounded-lg border transition-colors ${
            isDark
              ? 'border-dark text-dark-primary hover:bg-dark-lighter'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}