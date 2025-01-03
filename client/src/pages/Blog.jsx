import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaUser, FaTag } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import Layout from '../components/Layout';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: transparent;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const BlogCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 50%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

const BlogTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const BlogExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;

  svg {
    margin-right: 0.25rem;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const PopupContent = styled(motion.div)`
  background: rgba(20, 20, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(167, 139, 250, 0.5);
    border-radius: 4px;
  }
`;

const PopupImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const PopupBody = styled.div`
  padding: 2rem;
`;

const PopupTitle = styled.h2`
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PopupText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 1;
`;

const Tag = styled.span`
  background: rgba(167, 139, 250, 0.2);
  color: #a78bfa;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Birth Chart",
    excerpt: "Learn how to interpret the key elements of your astrological birth chart...",
    image: "https://source.unsplash.com/random/800x600?astrology",
    content: `Your birth chart is a snapshot of the sky at the exact moment you were born. It reveals the positions of the sun, moon, planets, and other astrological aspects that influence your personality and life path.

    The birth chart is divided into twelve houses, each representing different areas of life such as relationships, career, and personal growth. The signs and planets within these houses provide insights into your strengths, challenges, and potential.

    Understanding your birth chart can help you:
    • Make better decisions aligned with your natural tendencies
    • Navigate relationships more effectively
    • Choose optimal timing for important life events
    • Develop self-awareness and personal growth

    Start by learning the basics of the zodiac signs, planets, and houses. Then gradually explore the aspects and patterns that make your chart unique.`,
    date: "2024-01-03",
    author: "Sarah Mitchell",
    tags: ["Astrology", "Birth Chart", "Zodiac"]
  },
  {
    id: 2,
    title: "Mercury Retrograde: Myths and Reality",
    excerpt: "Discover the truth about Mercury retrograde and how to navigate this period...",
    image: "https://source.unsplash.com/random/800x600?mercury",
    content: "Detailed content about Mercury retrograde...",
    date: "2024-01-02",
    author: "John Doe",
    tags: ["Mercury", "Planets", "Retrograde"]
  },
  {
    id: 3,
    title: "Full Moon Rituals",
    excerpt: "Explore powerful rituals to harness the energy of the full moon...",
    image: "https://source.unsplash.com/random/800x600?moon",
    content: "Detailed content about full moon rituals...",
    date: "2024-01-01",
    author: "Luna White",
    tags: ["Moon", "Rituals", "Energy"]
  },
  {
    id: 4,
    title: "Zodiac Compatibility Guide",
    excerpt: "Learn about the complex dynamics between different zodiac signs...",
    image: "https://source.unsplash.com/random/800x600?zodiac",
    content: "Detailed content about zodiac compatibility...",
    date: "2023-12-31",
    author: "Alex Chen",
    tags: ["Zodiac", "Compatibility", "Relationships"]
  },
  {
    id: 5,
    title: "Planetary Transits",
    excerpt: "Understanding how planetary movements affect your daily life...",
    image: "https://source.unsplash.com/random/800x600?planets",
    content: "Detailed content about planetary transits...",
    date: "2023-12-30",
    author: "Maya Patel",
    tags: ["Planets", "Transits", "Astrology"]
  },
  {
    id: 6,
    title: "Healing Crystals Guide",
    excerpt: "Discover the power of crystals and their astrological connections...",
    image: "https://source.unsplash.com/random/800x600?crystals",
    content: "Detailed content about healing crystals...",
    date: "2023-12-29",
    author: "Crystal Rose",
    tags: ["Crystals", "Healing", "Energy"]
  }
];

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <Layout>
      <PageContainer>
        <ShootingStars />
        <FlickeringStars />
        
        <ContentWrapper>
          <Header>
            <Title>Cosmic Insights</Title>
            <Subtitle>
              Explore the mysteries of the universe through our collection of 
              astrological insights, spiritual guidance, and cosmic wisdom.
            </Subtitle>
          </Header>

          <BlogGrid>
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                onClick={() => setSelectedBlog(post)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BlogImage image={post.image} />
                <BlogContent>
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <BlogMeta>
                    <span><FaCalendar /> {post.date}</span>
                    <span><FaUser /> {post.author}</span>
                  </BlogMeta>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>

          <AnimatePresence>
            {selectedBlog && (
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBlog(null)}
              >
                <PopupContent
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <CloseButton
                    onClick={() => setSelectedBlog(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes />
                  </CloseButton>
                  <PopupImage image={selectedBlog.image} />
                  <PopupBody>
                    <PopupTitle>{selectedBlog.title}</PopupTitle>
                    <BlogMeta style={{ marginBottom: '1.5rem' }}>
                      <span><FaCalendar /> {selectedBlog.date}</span>
                      <span><FaUser /> {selectedBlog.author}</span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {selectedBlog.tags.map((tag, index) => (
                          <Tag key={index}><FaTag /> {tag}</Tag>
                        ))}
                      </div>
                    </BlogMeta>
                    <PopupText>
                      {selectedBlog.content.split('\\n').map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: '1rem' }}>
                          {paragraph}
                        </p>
                      ))}
                    </PopupText>
                  </PopupBody>
                </PopupContent>
              </Overlay>
            )}
          </AnimatePresence>
        </ContentWrapper>
      </PageContainer>
    </Layout>
  );
};

export default Blog;
