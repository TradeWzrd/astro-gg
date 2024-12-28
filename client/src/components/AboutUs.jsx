import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 6rem 0;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  min-height: 400px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-align: center;
  font-size: 1.1rem;
`;

const BookButton = styled(motion.button)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const AboutUs = () => {
  const testimonials = [
    {
      image: "/images/testimonial1.jpg",
      text: "ALR ALR!!! I've uploaded it on the drive and it's ready to be delievered!! you can proceed with the payments and feel free to add tips if ya want and literally anything around 20-25+ would work haha always happy to work with yall sarrow members..my team literally made graphics banner rn for immortal"
    },
    {
      image: "/images/testimonial2.jpg",
      text: "ALR ALR!!! I've uploaded it on the drive and it's ready to be delievered!! you can proceed with the payments and feel free to add tips if ya want and literally anything around 20-25+ would work haha always happy to work with yall sarrow members..my team literally made graphics banner rn for immortal"
    }
  ];

  return (
    <SectionContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        ABOUT US
      </SectionTitle>
      
      <CardsContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            variants={itemVariants}
          >
            <ImageContainer>
              <img 
                src={testimonial.image} 
                alt={`Testimonial ${index + 1}`}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1VjM1WiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNNDAgNTBINjBNNTAgNDBWNjAiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+';
                }}
              />
            </ImageContainer>
            <Description>{testimonial.text}</Description>
            <BookButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK NOW
            </BookButton>
          </Card>
        ))}
      </CardsContainer>
    </SectionContainer>
  );
};

export default AboutUs;
