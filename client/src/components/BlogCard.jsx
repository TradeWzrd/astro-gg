import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Keyframes for the bubble animation inside the button
const bubble = keyframes`
  0% {
    transform: translateY(100%) scale(1); /* Start from the bottom */
    opacity: 0.7;
  }
  50% {
    transform: translateY(-40px) scale(1.2); /* Move upwards */
    opacity: 0.5;
  }
  100% {
    transform: translateY(-80px) scale(0.8); /* End near the top */
    opacity: 0;
  }
`;

// Styled Blog Card Wrapper
const BlogCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1); /* Transparent background */
  border-radius: 10px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px); /* Frosted glass effect */
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: scale(1.05); /* Subtle zoom effect */
    box-shadow: 0 6px 35px rgba(0, 0, 0, 0.2);
  }
`;

// Styled Image
const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: url(${(props) => props.imageUrl}) no-repeat center center;
  background-size: cover;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1; /* Image becomes fully visible on hover */
  }
`;

// Styled Content
const BlogContent = styled.div`
  padding: 1.5rem;
  color: white;
`;

// Styled Blog Title
const BlogTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff; /* White text */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Slight text shadow */
`;

// Styled Blog Excerpt
const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin-bottom: 1.5rem;
`;

// Styled Bubble element with random position and animation
const Bubble = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.4;
  animation: ${bubble} 5s ease-in-out infinite;
  width: ${(props) => `${props.size}px`}; /* Use passed size */
  height: ${(props) => `${props.size}px`}; /* Use passed size */
  left: ${(props) => `${props.left}%`};
  bottom: ${(props) => `${props.bottom}%`};
  animation-delay: ${(props) => `${props.delay}s`};
`;

// Styled Read More Button with Bubble Effect
const ReadMoreButton = styled(Link)`
  position: relative;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6); /* Navy blue gradient */
  color: white;
  border-radius: 30px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s ease;
  overflow: hidden; /* Ensures bubbles stay inside the button */

  &:hover {
    background: linear-gradient(90deg, #3b82f6, #1e3a8a); /* Reverse gradient on hover */
  }

  /* Bubble animation inside the button */
  &::after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    width: 15px;
    height: 15px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: ${bubble} 1.5s ease-out infinite;
  }
`;

// Generate random values for the bubbles inside the button
const generateRandomBubbles = (count = 6) => {
  return Array.from({ length: count }).map(() => ({
    size: Math.random() * 15 + 5, // Random size
    left: Math.random() * 100, // Random left position
    bottom: Math.random() * 100, // Random bottom position
    delay: Math.random() * 2, // Random animation delay
  }));
};

const BlogCard = ({ blog }) => {
  const randomBubbles = generateRandomBubbles();

  return (
    <BlogCardWrapper>
      <BlogImage imageUrl={blog.imageUrl} />
      <BlogContent>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogExcerpt>{blog.excerpt}</BlogExcerpt>

        {/* Render random bubbles around the button */}
        {randomBubbles.map((bubbleProps, index) => (
          <Bubble key={index} {...bubbleProps} />
        ))}

        <ReadMoreButton to={`/blog/${blog.id}`}>Read More</ReadMoreButton>
      </BlogContent>
    </BlogCardWrapper>
  );
};

export default BlogCard;
