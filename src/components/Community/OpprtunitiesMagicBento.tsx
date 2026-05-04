import React, { useState, useEffect, useRef } from 'react';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  image?: string;
}

const cardData: BentoCardProps[] = [
  {
    color: 'rgba(255, 255, 255, 0.05)',
    title: 'Learning',
    description: 'Action-based education through hands-on workshops, masterclasses, and peer-to-peer knowledge sharing sessions to accelerate growth.',
    label: 'Growth',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center'
  },
  {
    color: 'rgba(255, 255, 255, 0.05)',
    title: 'Collaboration',
    description: 'Connect with like-minded professionals, form strategic partnerships, and work together on projects that drive mutual success and innovation.',
    label: 'Teamwork',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center'
  },
  {
    color: 'rgba(255, 255, 255, 0.05)',
    title: 'Events',
    description: 'Join 20+ unique events including networking mixers, industry panels, skill-building workshops, and exclusive member-only gatherings throughout the year. From intimate roundtables with C-suite executives to large-scale conferences featuring keynote speakers, our events are designed to inspire, educate, and connect. Participate in hackathons, pitch competitions, product launches, and seasonal celebrations that bring our community together. Each event offers structured networking opportunities, actionable takeaways, and the chance to collaborate with peers who are equally committed to excellence and innovation. Our signature events include monthly Innovation Showcases where members present breakthrough ideas, quarterly Leadership Summits featuring industry titans  and annual Community Awards celebrating member achievements.',
    label: 'Community',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center'
  },
  {
    color: 'rgba(255, 255, 255, 0.05)',
    title: 'Networking',
    description: 'Build meaningful professional relationships with industry leaders, entrepreneurs, and innovators who share your passion for growth and excellence. Our curated networking environment connects you with decision-makers, thought leaders, and rising stars across diverse industries including tech, finance, healthcare, and creative sectors. Through structured introductions, mentorship matching, and collaborative project opportunities, you\'ll expand your professional circle with quality connections that lead to partnerships, career opportunities, and lifelong friendships. Access exclusive networking lounges, VIP meetups, and private dinner series designed for authentic relationship building. Our advanced matching algorithm pairs members based on complementary skills, shared interests, and mutual goals.',
    label: 'Connect',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center'
  },
  {
    color: 'rgba(255, 255, 255, 0.05)',
    title: 'Support',
    description: 'Access engagement pods, mentorship programs, and 24/7 community support for you to overcome challenges & achieve your goals.',
    label: 'Help',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center'
  },
  {
    color: 'rgba(255, 255, 255, 0.05)',
    title: 'Access',
    description: 'Get warm introductions to top talent, strategic partners, investors, and industry experts who can accelerate your business and career growth.',
    label: 'Opportunities',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&crop=center'
  }
];

const MagicBento: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;

    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth * 0.85; // 85% width per card
      const newSlide = Math.round(scrollLeft / cardWidth);
      
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    };

    const carousel = carouselRef.current;
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [isMobile, currentSlide]);

  return (
    <>
      <style>
        {`
          .bento-section {
            --border-color: rgba(0, 116, 237, 0.3);
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
          }
          
          .card-responsive {
            grid-template-columns: 1fr;
            width: 100%;
            margin: 0 auto;
            padding: 0.5rem;
          }
          
          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
            }
            
            .card-responsive .card:nth-child(3) {
              grid-column: span 2;
              grid-row: span 2;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: 1 / span 2;
              grid-row: 2 / span 2;
            }
            
            .card-responsive .card:nth-child(6) {
              grid-column: 4;
              grid-row: 3;
            }
          }
          
          /* Mobile Carousel Styles */
          .mobile-carousel {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            gap: 1rem;
            padding: 0.5rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .mobile-carousel::-webkit-scrollbar {
            display: none;
          }
          
          .mobile-carousel .card {
            flex: 0 0 85%;
            scroll-snap-align: center;
            max-width: 320px;
          }
          
          /* Card Styles */
          .card {
            transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
            will-change: transform, box-shadow;
            cursor: pointer;
          }
          
          .card:hover,
          .card.auto-hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          }
          
          .card-with-bg {
            position: relative;
          }
          
          .card-with-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: inherit;
            transition: filter 0.15s ease-out;
            z-index: 1;
            will-change: filter;
            backface-visibility: hidden;
            transform: translateZ(0);
          }
          
          .card-with-bg:hover::before,
          .card-with-bg.auto-hover::before {
            filter: blur(1.5px);
          }
          
          .card-with-bg::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4));
            border-radius: inherit;
            transition: background 0.15s ease-out;
            z-index: 2;
            will-change: background;
            backface-visibility: hidden;
            transform: translateZ(0);
          }
          
          .card-with-bg:hover::after,
          .card-with-bg.auto-hover::after {
            background: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75));
          }
          
          .card__content {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
          }
          
          .card:hover .card__content,
          .card.auto-hover .card__content {
            transform: translateY(-4px);
          }
          
          .card__description {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 1.5;
            max-height: 3em;
            transition: all 0.3s ease-out;
            will-change: max-height;
          }
          
          .card:hover .card__description,
          .card.auto-hover .card__description {
            display: block;
            -webkit-line-clamp: unset;
            max-height: none;
            overflow: visible;
            padding-bottom: 0.5rem;
          }
          
          /* Carousel Indicators */
          .carousel-indicators {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
          }
          
          .indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transition: background 0.2s ease;
            cursor: pointer;
          }
          
          .indicator.active {
            background: rgba(0, 116, 237, 0.8);
          }
          
          @media (max-width: 599px) {
            .card-responsive {
              display: none;
            }
            
            .mobile-carousel {
              display: flex;
            }
          }
          
          @media (min-width: 600px) {
            .mobile-carousel {
              display: none;
            }
          }
        `}
      </style>

      <div className="bento-section grid gap-2 p-3 w-full select-none relative">
        {/* Desktop Grid */}
        <div className="card-responsive grid gap-2">
          {cardData.map((card, index) => {
            const baseClassName = `card flex flex-col justify-end relative aspect-[4/3] min-h-[200px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden ${
              card.image ? 'card-with-bg' : ''
            }`;

            const cardStyle = {
              backgroundColor: card.color || 'var(--background-dark)',
              borderColor: 'var(--border-color)',
              color: 'var(--white)',
            } as React.CSSProperties;

            return (
              <div
                key={index}
                className={baseClassName}
                style={cardStyle}
              >
                {card.image && (
                  <style>
                    {`.card-with-bg:nth-child(${index + 1})::before { background-image: url(${card.image}); }`}
                  </style>
                )}
                <div className="card__content flex flex-col justify-end relative text-white" style={{ zIndex: 10 }}>
                  <h3 className="card__title font-semibold text-lg m-0 mb-2 text-white">
                    {card.title}
                  </h3>
                  <p className="card__description text-sm leading-6 text-white font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="mobile-carousel" ref={carouselRef}>
          {cardData.map((card, index) => {
            const isActive = index === currentSlide;
            const baseClassName = `card flex flex-col justify-end relative aspect-[4/3] min-h-[280px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden ${
              card.image ? 'card-with-bg' : ''
            } ${isActive ? 'auto-hover' : ''}`;

            const cardStyle = {
              backgroundColor: card.color || 'var(--background-dark)',
              borderColor: 'var(--border-color)',
              color: 'var(--white)',
            } as React.CSSProperties;

            return (
              <div
                key={`mobile-${index}`}
                className={baseClassName}
                style={cardStyle}
              >
                {card.image && (
                  <style>
                    {`.mobile-carousel .card-with-bg:nth-child(${index + 1})::before { background-image: url(${card.image}); }`}
                  </style>
                )}
                <div className="card__content flex flex-col justify-end relative text-white" style={{ zIndex: 10 }}>
                  <h3 className="card__title font-semibold text-lg m-0 mb-2 text-white">
                    {card.title}
                  </h3>
                  <p className="card__description text-sm leading-6 text-white font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel Indicators */}
        {isMobile && (
          <div className="carousel-indicators">
            {cardData.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  if (carouselRef.current) {
                    const cardWidth = carouselRef.current.offsetWidth * 0.85;
                    carouselRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MagicBento;
