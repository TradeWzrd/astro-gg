import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  position: relative;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: white;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const VlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VlogCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const VlogThumbnail = styled.div.attrs(props => ({
  style: {
    backgroundImage: `url(${props.$image})`
  }
}))`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const VlogContent = styled.div`
  padding: 1.5rem;
`;

const VlogTitle = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const VlogDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const VlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
`;

const vlogs = [
  {
    title: "Understanding Your Birth Chart",
    description: "Learn the basics of reading and interpreting your astrological birth chart.",
    date: "Dec 26, 2024",
    duration: "15:30",
    views: "1.2K",
    thumbnail: "path/to/thumbnail1.jpg"
  },
  {
    title: "Mercury Retrograde Explained",
    description: "Everything you need to know about Mercury retrograde and its effects.",
    date: "Dec 25, 2024",
    duration: "12:45",
    views: "980",
    thumbnail: "path/to/thumbnail2.jpg"
  },
  {
    title: "Numerology Basics",
    description: "Introduction to numerology and how numbers influence your life.",
    date: "Dec 24, 2024",
    duration: "18:20",
    views: "1.5K",
    thumbnail: "path/to/thumbnail3.jpg"
  },
  {
    title: "Planetary Alignments",
    description: "How planetary alignments affect your daily life and decisions.",
    date: "Dec 23, 2024",
    duration: "20:15",
    views: "2.1K",
    thumbnail: "path/to/thumbnail4.jpg"
  },
  {
    title: "Zodiac Compatibility",
    description: "Understanding relationship compatibility through zodiac signs.",
    date: "Dec 22, 2024",
    duration: "16:40",
    views: "1.8K",
    thumbnail: "path/to/thumbnail5.jpg"
  },
  {
    title: "Full Moon Rituals",
    description: "Powerful rituals to perform during the full moon phase.",
    date: "Dec 21, 2024",
    duration: "14:55",
    views: "1.3K",
    thumbnail: "path/to/thumbnail6.jpg"
  }
];

const Vlogs = () => {
  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Latest Vlogs
      </Title>
      
      <VlogsGrid>
        {vlogs.map((vlog, index) => (
          <VlogCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <VlogThumbnail $image={vlog.thumbnail} />
            <VlogContent>
              <VlogTitle>{vlog.title}</VlogTitle>
              <VlogDescription>{vlog.description}</VlogDescription>
              <VlogMeta>
                <span>{vlog.date}</span>
                <span>{vlog.duration}</span>
                <span>{vlog.views} views</span>
              </VlogMeta>
            </VlogContent>
          </VlogCard>
        ))}
      </VlogsGrid>
    </SectionContainer>
  );
};

export default Vlogs;
