import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUser, FaTags, FaTimes } from 'react-icons/fa';

const DemoBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  const categories = ['all', 'zodiac', 'horoscope', 'numerology', 'tarot'];

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Zodiac Signs",
      date: "January 3, 2025",
      author: "Jane Doe",
      category: "zodiac",
      excerpt: "Discover the unique characteristics and traits of each zodiac sign and how they influence your daily life...",
      content: `The zodiac signs are divided into four elements: Fire (Aries, Leo, Sagittarius), Earth (Taurus, Virgo, Capricorn), Air (Gemini, Libra, Aquarius), and Water (Cancer, Scorpio, Pisces). Each element brings its own unique characteristics and influences to the signs.

Fire signs are known for their passion and dynamism. Earth signs represent practicality and stability. Air signs embody intellect and communication. Water signs are associated with emotions and intuition.

Understanding your zodiac sign can help you better understand your personality traits, strengths, and areas for growth. It can also help you understand how you relate to others and navigate different aspects of your life.`,
      image: "https://images.unsplash.com/photo-1515942661900-94b3d1972591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      tags: ["zodiac", "astrology", "horoscope"]
    },
    {
      id: 2,
      title: "Mercury Retrograde: What It Means",
      date: "January 2, 2025",
      author: "John Smith",
      category: "horoscope",
      excerpt: "Learn about the astrological phenomenon of Mercury retrograde and how it affects your daily activities...",
      content: `Mercury retrograde is an optical illusion where the planet appears to move backward in its orbit. This astronomical phenomenon has been associated with various effects on daily life, particularly in areas ruled by Mercury: communication, technology, and travel.

During Mercury retrograde, you might experience communication mishaps, technical glitches, or travel delays. It's often recommended to avoid signing contracts, making major purchases, or starting new ventures during this period.

However, this time can be beneficial for reflection, revision, and reconnecting with people from your past. Understanding Mercury retrograde can help you navigate its challenges and use its energy productively.`,
      image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      tags: ["mercury", "planets", "retrograde"]
    },
    {
      id: 3,
      title: "Full Moon Rituals",
      date: "January 1, 2025",
      author: "Sarah Wilson",
      category: "tarot",
      excerpt: "Explore powerful rituals and practices during the full moon phase to enhance your spiritual journey...",
      content: `Full moon rituals have been practiced for centuries across various cultures as a way to harness the moon's powerful energy. The full moon represents completion, illumination, and the height of power.

Common full moon rituals include:
- Moon water creation
- Crystal charging
- Intention setting
- Meditation and reflection
- Gratitude practices
- Energy cleansing

These rituals can help you connect with your intuition, release what no longer serves you, and manifest your desires. The full moon's energy is particularly powerful for completion, culmination, and celebration.`,
      image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      tags: ["moon", "rituals", "spirituality"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <BlogContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassyHeader>
          <h1>Astrology Insights</h1>
          <p>Explore the mysteries of the cosmos through our latest blog posts</p>
          
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon />
          </SearchContainer>

          <CategoryContainer>
            {categories.map(category => (
              <CategoryButton
                key={category}
                $isActive={category === selectedCategory}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </CategoryButton>
            ))}
          </CategoryContainer>
        </GlassyHeader>

        <BlogGrid>
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BlogImageContainer>
                  <BlogImage src={post.image} alt={post.title} />
                  <CategoryTag>{post.category}</CategoryTag>
                </BlogImageContainer>
                
                <BlogContent>
                  <MetaInfo>
                    <MetaItem>
                      <FaCalendarAlt /> {post.date}
                    </MetaItem>
                    <MetaItem>
                      <FaUser /> {post.author}
                    </MetaItem>
                  </MetaInfo>

                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>

                  <TagsContainer>
                    <FaTags />
                    {post.tags.map(tag => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </TagsContainer>

                  <ReadMoreButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPost(post)}
                  >
                    Read More
                  </ReadMoreButton>
                </BlogContent>
              </BlogCard>
            ))}
          </AnimatePresence>
        </BlogGrid>
      </BlogContainer>

      <AnimatePresence>
        {selectedPost && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedPost(null)}>
                <FaTimes />
              </CloseButton>
              
              <ModalImage src={selectedPost.image} alt={selectedPost.title} />
              
              <ModalHeader>
                <h2>{selectedPost.title}</h2>
                <MetaInfo>
                  <MetaItem>
                    <FaCalendarAlt /> {selectedPost.date}
                  </MetaItem>
                  <MetaItem>
                    <FaUser /> {selectedPost.author}
                  </MetaItem>
                </MetaInfo>
              </ModalHeader>

              <ModalBody>
                <p>{selectedPost.content}</p>
                
                <TagsContainer>
                  <FaTags />
                  {selectedPost.tags.map(tag => (
                    <Tag key={tag}>#{tag}</Tag>
                  ))}
                </TagsContainer>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

const BlogContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 180px auto 0;
`;

const GlassyHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #a78bfa;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const CategoryButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: ${props => props.$isActive ? 
    'linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)' : 
    'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => !props.$isActive && 'rgba(255, 255, 255, 0.2)'};
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
`;

const BlogImageContainer = styled.div`
  position: relative;
  height: 200px;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(167, 139, 250, 0.8);
  color: white;
  border-radius: 50px;
  font-size: 0.8rem;
  backdrop-filter: blur(5px);
`;

const BlogContent = styled.div`
  padding: 1.5rem;

  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin: 0.5rem 0;
    transition: color 0.3s ease;

    &:hover {
      color: #a78bfa;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const MetaItem = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 1rem 0;
  color: rgba(255, 255, 255, 0.6);
  flex-wrap: wrap;
`;

const Tag = styled.span`
  color: #a78bfa;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #6d28d9;
  }
`;

const ReadMoreButton = styled(motion.button)`
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  border: none;
  padding: 0.75rem 1.5rem;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  margin-top: 1rem;
  transition: transform 0.3s ease;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 1000;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  background: rgba(30, 20, 50, 0.95);
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.5rem;
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;

  h2 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const ModalBody = styled.div`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

export default DemoBlog;
