import React, { useState } from 'react';
import { useCalendar } from '../../lib/calendar';
import Calendar from './components/Calendar';
import EventCard from './components/EventCard';
import EventForm from './components/EventForm';
import EventFilters from './components/EventFilters';
import { useTheme } from '../../lib/theme';
import { Search, Plus } from 'lucide-react';

export default function Events() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { events, selectedDate, isLoading, error, fetchEvents } = useCalendar();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDateSelect = (date: Date) => {
    fetchEvents(date.getMonth() + 1, date.getFullYear());
  };

  const handleCreateEvent = async (data: any) => {
    try {
      await useCalendar.getState().createEvent(data);
      setShowEventForm(false);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
      isDark ? 'text-dark-primary' : 'text-gray-900'
    }`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Community Events</h1>
        <button
          onClick={() => setShowEventForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1 space-y-6">
          <Calendar onSelectDate={handleDateSelect} />
          <EventFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-dark-card border-dark text-dark-primary placeholder-dark-secondary'
                    : 'bg-white border-gray-300 text-gray-900'
                } border focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 ${
                isDark ? 'text-dark-secondary' : 'text-gray-400'
              }`} />
            </div>
          </div>

          {isLoading ? (
            <div className={`text-center py-8 ${
              isDark ? 'text-dark-secondary' : 'text-gray-500'
            }`}>
              Loading events...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              {error}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className={`text-center py-8 ${
              isDark ? 'text-dark-secondary' : 'text-gray-500'
            }`}>
              No events found for the selected criteria.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  isDark={isDark}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showEventForm && (
        <EventForm
          onClose={() => setShowEventForm(false)}
          onSubmit={handleCreateEvent}
          isDark={isDark}
        />
      )}
    </div>
  );
}