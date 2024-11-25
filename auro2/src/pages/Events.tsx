import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Community Clean-up Drive',
    description: 'Join us for our monthly community clean-up initiative.',
    date: '2024-03-15T09:00:00',
    location: 'Central Park',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    attendees: 156
  },
  {
    id: 2,
    title: 'Local Business Fair',
    description: 'Showcase of local businesses and networking opportunity.',
    date: '2024-03-20T10:00:00',
    location: 'City Convention Center',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    attendees: 230
  }
];

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Community Events</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Event
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}