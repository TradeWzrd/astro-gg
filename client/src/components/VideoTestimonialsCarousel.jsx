import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 4rem auto;
  position: relative;
  overflow: hidden;
  padding: 0 1rem;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
  }

  .testimonials-text {
    font-size: 5rem;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
    letter-spacing: 4px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const SlideContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
`;

const VideoCard = styled.div`
  flex: 0 0 360px;
  aspect-ratio: 9/16;
  background: rgba(46, 13, 87, 0.5);
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: rgba(151, 71, 255, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.3) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isPlaying ? 0 : 1};
  transition: opacity 0.3s ease;
  pointer-events: ${props => props.isPlaying ? 'none' : 'all'};
  z-index: 2;
`;

const PlayButton = styled.button`
  background: rgba(151, 71, 255, 0.8);
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(151, 71, 255, 1);
  }
`;

const ClientInfo = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  color: white;
  text-align: center;
  z-index: 3;
  opacity: ${props => props.isPlaying ? 0 : 1};
  transition: opacity 0.3s ease;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
  }
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.isPlaying ? 1 : 0};
  pointer-events: ${props => props.isPlaying ? 'all' : 'none'};
  transition: opacity 0.3s ease;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem 0;
`;

const NavigationButton = styled.button`
  background: rgba(151, 71, 255, 0.6);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    background: rgba(151, 71, 255, 0.8);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Birth Chart Reading",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=688&h=688",
    videoId: "jNQXAC9IVRw"
  },
  {
    id: 2,
    name: "Michael Chen",
    service: "Career Guidance",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=688&h=688",
    videoId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    name: "Emma Davis",
    service: "Relationship Reading",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=688&h=688",
    videoId: "M7lc1UVf-VE"
  },
  {
    id: 4,
    name: "David Wilson",
    service: "Life Path Reading",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=688&h=688",
    videoId: "ZZ5LpwO-An4"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    service: "Spiritual Guidance",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=688&h=688",
    videoId: "9bZkp7q19f0"
  }
];

const VideoTestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingStates, setPlayingStates] = useState({});
  const [autoplay, setAutoplay] = useState(true);
  const players = useRef({});

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    let interval;
    if (autoplay && Object.values(playingStates).every(state => !state)) {
      interval = setInterval(handleNext, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, playingStates]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= testimonials.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        return testimonials.length - 1;
      }
      return prevIndex;
    });
  };

  const handleVideoClick = (testimonial, index) => {
    const playerId = `player-${testimonial.id}-${index}`;
    
    if (!players.current[playerId]) {
      // Stop all other videos
      Object.entries(players.current).forEach(([id, player]) => {
        if (player && player.pauseVideo) {
          player.pauseVideo();
          setPlayingStates(prev => ({ ...prev, [id]: false }));
        }
      });

      // Create new player
      players.current[playerId] = new window.YT.Player(playerId, {
        videoId: testimonial.videoId,
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          controls: 1,
          showinfo: 0,
          fs: 1,
          playsinline: 1
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setPlayingStates(prev => ({ ...prev, [playerId]: true }));
              setAutoplay(false);
            } else if (event.data === window.YT.PlayerState.ENDED || event.data === window.YT.PlayerState.PAUSED) {
              setPlayingStates(prev => ({ ...prev, [playerId]: false }));
              setAutoplay(true);
            }
          }
        }
      });
    } else {
      const player = players.current[playerId];
      if (playingStates[playerId]) {
        player.pauseVideo();
      } else {
        // Stop all other videos first
        Object.entries(players.current).forEach(([id, p]) => {
          if (id !== playerId && p && p.pauseVideo) {
            p.pauseVideo();
            setPlayingStates(prev => ({ ...prev, [id]: false }));
          }
        });
        player.playVideo();
      }
    }
  };

  return (
    <CarouselContainer>
      <Title>
        <h2>WHAT OUR CLIENTS HAVE TO SAY</h2>
        <div className="testimonials-text">TESTIMONIALS</div>
      </Title>
      
      <SlideContainer
        animate={{ x: `calc(-${currentIndex * (360 + 32)}px)` }}
        transition={{ duration: 0.5 }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <VideoCard 
            key={`${testimonial.id}-${index}`}
            onClick={() => handleVideoClick(testimonial, index)}
            style={{
              backgroundImage: !playingStates[`player-${testimonial.id}-${index}`] ? 
                `url(${testimonial.thumbnail})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <VideoOverlay isPlaying={playingStates[`player-${testimonial.id}-${index}`]}>
              <PlayButton>
                <FaPlay />
              </PlayButton>
            </VideoOverlay>
            <VideoContainer isPlaying={playingStates[`player-${testimonial.id}-${index}`]}>
              <div id={`player-${testimonial.id}-${index}`} />
            </VideoContainer>
            <ClientInfo isPlaying={playingStates[`player-${testimonial.id}-${index}`]}>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.service}</p>
            </ClientInfo>
          </VideoCard>
        ))}
      </SlideContainer>

      <NavigationContainer>
        <NavigationButton onClick={handlePrev}>
          <FaChevronLeft />
        </NavigationButton>
        <NavigationButton onClick={handleNext}>
          <FaChevronRight />
        </NavigationButton>
      </NavigationContainer>
    </CarouselContainer>
  );
};

export default VideoTestimonialsCarousel;
