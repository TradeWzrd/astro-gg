import React from 'react';
import styled from 'styled-components';
import VideoTestimonialsCarousel from './VideoTestimonialsCarousel';
import StarRating from './StarRating';

const ReviewsSectionContainer = styled.section`
  padding: 4rem 2rem;
  color: white;
  background: transparent;
`;

const Title = styled.div`
  margin-bottom: 4rem;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #fff;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .reviews-text {
    font-size: 5rem;
    font-weight: bold;
    color: #9747FF;
    text-transform: uppercase;
    letter-spacing: 4px;
    opacity: 0.8;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  background: rgba(46, 13, 87, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    border: 1px solid rgba(151, 71, 255, 0.3);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border: 2px solid #9747FF;
`;

const ReviewerInfo = styled.div`
  margin-left: 1rem;

  h4 {
    font-size: 1.1rem;
    margin: 0;
    color: #fff;
  }

  .date {
    color: #9747FF;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ProductTag = styled.span`
  background: rgba(151, 71, 255, 0.2);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: inline-block;
`;

const ReviewText = styled.p`
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 1rem;
`;

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "December 15, 2023",
    rating: 5,
    text: "The birth chart analysis was incredibly accurate and insightful. It helped me understand myself better and make important life decisions.",
    avatar: "/images/avatar1.jpg",
    product: "Birth Chart Analysis"
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "December 10, 2023",
    rating: 5,
    text: "The yearly transit forecast was spot-on! It prepared me for upcoming challenges and opportunities in my career and relationships.",
    avatar: "/images/avatar2.jpg",
    product: "Yearly Transit Forecast"
  },
  {
    id: 3,
    name: "Emma Davis",
    date: "December 5, 2023",
    rating: 5,
    text: "The relationship compatibility reading provided deep insights into my partnership. It helped us understand our dynamics better.",
    avatar: "/images/avatar3.jpg",
    product: "Relationship Compatibility Reading"
  },
  {
    id: 4,
    name: "David Wilson",
    date: "November 28, 2023",
    rating: 5,
    text: "Exceptional service! The predictions were accurate and the guidance helped me navigate through some challenging times.",
    avatar: "/images/avatar4.jpg",
    product: "Personalized Astrology Reading"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    date: "November 20, 2023",
    rating: 5,
    text: "The detailed analysis of my birth chart opened my eyes to many aspects of my personality I hadn't considered before.",
    avatar: "/images/avatar5.jpg",
    product: "Birth Chart Analysis"
  },
  {
    id: 6,
    name: "James Rodriguez",
    date: "November 15, 2023",
    rating: 5,
    text: "Very professional service. The transit forecast helped me plan my year ahead and make better decisions in my business.",
    avatar: "/images/avatar6.jpg",
    product: "Yearly Transit Forecast"
  },
  {
    id: 7,
    name: "Sophia Lee",
    date: "November 10, 2023",
    rating: 5,
    text: "The compatibility reading was eye-opening! It helped us understand our strengths and areas where we need to work together.",
    avatar: "/images/avatar7.jpg",
    product: "Relationship Compatibility Reading"
  },
  {
    id: 8,
    name: "Robert Brown",
    date: "November 5, 2023",
    rating: 5,
    text: "Incredible accuracy in the predictions. The insights provided were practical and helped me make important life choices.",
    avatar: "/images/avatar8.jpg",
    product: "Personalized Astrology Reading"
  },
  {
    id: 9,
    name: "Anna Martinez",
    date: "October 30, 2023",
    rating: 5,
    text: "The birth chart analysis was detailed and precise. It gave me a new perspective on my life path and potential.",
    avatar: "/images/avatar9.jpg",
    product: "Birth Chart Analysis"
  }
];

const ReviewsSection = () => {
  return (
    <ReviewsSectionContainer>
      <Title>
        <h2>WHAT OUR CLIENTS HAVE TO SAY</h2>
        <div className="reviews-text">REVIEWS</div>
      </Title>
      <ReviewsGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.id}>
            <div>
              <ReviewHeader>
                <Avatar image={review.avatar} />
                <ReviewerInfo>
                  <h4>{review.name}</h4>
                  <span className="date">{review.date}</span>
                </ReviewerInfo>
              </ReviewHeader>
              <StarRating rating={review.rating} />
              <ReviewText>{review.text}</ReviewText>
              <ProductTag>{review.product}</ProductTag>
            </div>
          </ReviewCard>
        ))}
      </ReviewsGrid>
      <VideoTestimonialsCarousel />
    </ReviewsSectionContainer>
  );
};

export default ReviewsSection;
