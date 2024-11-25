import React from 'react';
import { MessageSquare, Users, Clock } from 'lucide-react';
import { useForumStore } from '../../lib/forum';
import NewPostModal from './components/NewPostModal';

export default function Forums() {
  const [showNewPost, setShowNewPost] = React.useState(false);
  const { 
    posts, 
    categories, 
    selectedCategory, 
    isLoading, 
    error,
    fetchPosts,
    setSelectedCategory 
  } = useForumStore();

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Community Forums</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="bg-auroville-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          New Discussion
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-3">
              {['All', ...categories].map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center justify-between text-left px-4 py-2 rounded-lg hover:bg-gray-50 ${
                      selectedCategory === category ? 'bg-auroville-light text-auroville-primary' : 'text-gray-700'
                    }`}
                  >
                    <span>{category}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {posts.filter(post => category === 'All' || post.category === category).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              Loading discussions...
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-red-600">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
              No discussions found in this category.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {posts.map((post) => (
                <div key={post.id} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}`}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500">
                        Posted by {post.author.name} in {post.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{post.views} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Last activity {post.lastActivity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <NewPostModal 
        isOpen={showNewPost} 
        onClose={() => setShowNewPost(false)} 
      />
    </div>
  );
}