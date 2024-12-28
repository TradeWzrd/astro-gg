import React from 'react';
import BlogCard from './BlogCard';

const BlogList = () => {
  // Sample blog data related to astrology, vastu, and numerology
  const blogs = [
    {
      id: 1,
      title: 'Astrology Insights: Your Birth Chart Decoded',
      excerpt: 'Learn how your birth chart influences your destiny. Explore the key elements of astrology and how they shape your life.',
      imageUrl: 'https://via.placeholder.com/600x300',
    },
    {
      id: 2,
      title: 'Vastu Tips for a Harmonious Home',
      excerpt: 'Discover vastu principles that can bring balance and positivity to your home. Find out how your living space affects your well-being.',
      imageUrl: 'https://via.placeholder.com/600x300',
    },
    {
      id: 3,
      title: 'Numerology and the Power of Numbers',
      excerpt: 'Understand the significance of numbers in numerology and how they can reveal key life patterns and decisions.',
      imageUrl: 'https://via.placeholder.com/600x300',
    },
  ];

  return (
    <section className="py-8 px-4">
      <h2 className="text-center text-3xl font-semibold text-white mb-12">Explore Our Insights on Astrology, Vastu, and Numerology</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
