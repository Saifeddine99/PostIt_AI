import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import { Wand2, Save } from 'lucide-react';
import type { Post, SavedPost } from '../types';

const postSchema = z.object({
  platform: z.enum(['linkedin', 'facebook', 'twitter']),
  tone_style: z.string().min(1, 'Please select a tone'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

type PostForm = z.infer<typeof postSchema>;

const toneOptions = [
  'Professional',
  'Casual',
  'Friendly',
  'Humorous',
  'Formal',
  'Inspirational',
];

const Dashboard = () => {
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<SavedPost | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const fetchSavedPosts = async () => {
    try {
      const response = await api.get('/home/');
      setSavedPosts(response.data.result);
    } catch (error) {
      toast.error('Failed to fetch saved posts');
    }
  };

  const onSubmit = async (data: PostForm) => {
    try {
      const response = await api.post('/generate_post/', data);
      setGeneratedPost(response.data.post);
      toast.success('Post generated successfully!');
    } catch (error) {
      toast.error('Failed to generate post. Please try again.');
    }
  };

  const savePost = async () => {
    if (!generatedPost) return;

    const formData = getValues();
    try {
      await api.post('/generate_post/save', {
        ...formData,
        generated_post: generatedPost,
      });
      toast.success('Post saved successfully!');
      fetchSavedPosts(); // Refresh the list
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  const copyToClipboard = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost);
      toast.success('Copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Generate Social Media Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Platform</label>
                <select
                  {...register('platform')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                >
                  <option value="">Select platform</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                </select>
                {errors.platform && (
                  <p className="mt-1 text-sm text-red-600">{errors.platform.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tone</label>
                <select
                  {...register('tone_style')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                >
                  <option value="">Select tone</option>
                  {toneOptions.map((tone) => (
                    <option key={tone} value={tone.toLowerCase()}>
                      {tone}
                    </option>
                  ))}
                </select>
                {errors.tone_style && (
                  <p className="mt-1 text-sm text-red-600">{errors.tone_style.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  {...register('content')}
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your content here..."
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Wand2 className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Generating...' : 'Generate Post'}
              </button>
            </form>
          </div>

          {generatedPost && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Generated Post</h2>
                <div className="space-x-4">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Copy to clipboard
                  </button>
                  <button
                    onClick={savePost}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Post
                  </button>
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{generatedPost}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Posts</h2>
          <div className="space-y-4">
            {savedPosts.map((post, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedPost(post)}
              >
                <h3 className="font-medium text-gray-900">{post.title}</h3>
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                  <span className="capitalize">{post.platform}</span>
                  <span>•</span>
                  <span className="capitalize">{post.style}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedPost && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{selectedPost.title}</h3>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Original Content</h4>
                    <p className="mt-1 text-gray-600">{selectedPost.content}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Generated Post</h4>
                    <p className="mt-1 text-gray-600">{selectedPost.generated_post}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="capitalize">{selectedPost.platform}</span>
                    <span>•</span>
                    <span className="capitalize">{selectedPost.style}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;