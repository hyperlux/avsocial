import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isDark: boolean;
}

export default function EventForm({ onClose, onSubmit, isDark }: EventFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDark ? 'bg-dark-card' : 'bg-white'
      } rounded-xl max-w-2xl w-full p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${
            isDark ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            Create New Event
          </h2>
          <button 
            onClick={onClose}
            className={isDark ? 'text-dark-secondary hover:text-dark-primary' : 'text-gray-500 hover:text-gray-700'}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-primary' : 'text-gray-700'
            }`}>
              Event Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`w-full rounded-lg ${
                isDark
                  ? 'bg-dark-lighter border-dark text-dark-primary'
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-primary' : 'text-gray-700'
            }`}>
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className={`w-full rounded-lg ${
                isDark
                  ? 'bg-dark-lighter border-dark text-dark-primary'
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            >
              <option value="">Select a category</option>
              <option value="cultural">Cultural</option>
              <option value="educational">Educational</option>
              <option value="spiritual">Spiritual</option>
              <option value="community">Community</option>
              <option value="environmental">Environmental</option>
              <option value="arts">Arts & Crafts</option>
              <option value="sports">Sports & Wellness</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message as string}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-primary' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={3}
              className={`w-full rounded-lg ${
                isDark
                  ? 'bg-dark-lighter border-dark text-dark-primary'
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-dark-primary' : 'text-gray-700'
              }`}>
                Date
              </label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className={`w-full rounded-lg ${
                  isDark
                    ? 'bg-dark-lighter border-dark text-dark-primary'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message as string}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-dark-primary' : 'text-gray-700'
              }`}>
                Time
              </label>
              <input
                type="time"
                {...register('time', { required: 'Time is required' })}
                className={`w-full rounded-lg ${
                  isDark
                    ? 'bg-dark-lighter border-dark text-dark-primary'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time.message as string}</p>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-primary' : 'text-gray-700'
            }`}>
              Location
            </label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className={`w-full rounded-lg ${
                isDark
                  ? 'bg-dark-lighter border-dark text-dark-primary'
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message as string}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-dark-primary' : 'text-gray-700'
            }`}>
              Image URL
            </label>
            <input
              type="url"
              {...register('image')}
              className={`w-full rounded-lg ${
                isDark
                  ? 'bg-dark-lighter border-dark text-dark-primary'
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                isDark
                  ? 'border-dark text-dark-primary hover:bg-dark-lighter'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}