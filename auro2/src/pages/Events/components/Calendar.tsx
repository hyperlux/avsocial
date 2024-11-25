import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { useCalendar, type CalendarEvent } from '../../../lib/calendar';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

export default function Calendar({ onSelectDate }: CalendarProps) {
  const { selectedDate, events, setSelectedDate } = useCalendar();

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const previousMonth = () => {
    const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() - 1));
    setSelectedDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
    setSelectedDate(newDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {monthDays.map(day => {
          const dayEvents = getEventsForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`
                aspect-square p-2 rounded-lg relative
                ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                ${isSelected ? 'bg-auroville-primary text-white' : 'hover:bg-gray-100'}
              `}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {dayEvents.length > 0 && (
                <span className={`
                  absolute bottom-1 right-1 w-2 h-2 rounded-full
                  ${isSelected ? 'bg-white' : 'bg-auroville-primary'}
                `} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}