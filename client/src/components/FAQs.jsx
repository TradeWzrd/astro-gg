import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
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

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
`;

const Question = styled.button`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  span {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
  }
`;

const Answer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const faqs = [
  {
    question: "What is astrology and how does it work?",
    answer: "Astrology is the study of the movements and relative positions of celestial bodies, such as the sun, moon, planets, and stars, and their influence on human affairs and terrestrial events. It works by analyzing the positions of these celestial bodies at the time of your birth to create a birth chart, which astrologers interpret to provide insights into your personality, relationships, and life events."
  },
  {
    question: "How accurate are astrological predictions?",
    answer: "Astrological predictions are based on complex calculations and interpretations of planetary positions. While many people find them insightful and helpful, it's important to remember that astrology is a tool for self-reflection and guidance rather than absolute prediction. Our experienced astrologers strive for the highest accuracy in their readings."
  },
  {
    question: "What information do I need for a birth chart reading?",
    answer: "For an accurate birth chart reading, we need your date of birth, exact time of birth, and place of birth. The more precise these details are, the more accurate your reading will be. If you don't know your exact birth time, we can still provide a general reading based on your date and location."
  },
  {
    question: "How is numerology different from astrology?",
    answer: "While astrology focuses on the positions of celestial bodies, numerology is based on the mystical significance of numbers. It uses your birth date and name to calculate various numbers that can provide insights into your personality, life path, and potential future events. Both systems can work together to provide a more comprehensive understanding of your life."
  },
  {
    question: "How often should I get an astrological reading?",
    answer: "The frequency of readings depends on your personal needs and circumstances. Many clients opt for yearly readings to understand the upcoming influences, while others prefer quarterly updates. Some also choose to get readings during significant life events or when facing important decisions."
  },
  {
    question: "Do you offer online consultations?",
    answer: "Yes, we offer online consultations through video calls and chat. Our digital platform makes it convenient for you to connect with our experienced astrologers from anywhere in the world. All you need is a stable internet connection and a quiet space for your session."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </Title>
      
      <FAQContainer>
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Question
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span>+</span>
            </Question>
            
            <AnimatePresence>
              {openIndex === index && (
                <Answer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </Answer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </FAQContainer>
    </SectionContainer>
  );
};

export default FAQs;
