const astrologyServices = [
  {
    serviceName: "Full Native Chart Analysis",
    description: "A comprehensive analysis of your birth chart to decode planetary influences, life path, personality traits, strengths, weaknesses, and key opportunities. Ideal for gaining deep self-awareness and clarity about your life's purpose.",
    faqs: [
      {
        question: "What information is required for this analysis?",
        answer: "You need to provide your date, time, and place of birth."
      },
      {
        question: "How detailed is the report?",
        answer: "It covers personality, career, relationships, health, and future predictions."
      },
      {
        question: "Can this report be used for decision-making?",
        answer: "Yes, it provides insights to guide important life decisions."
      },
      {
        question: "Will this include remedies?",
        answer: "Yes, specific remedies to balance planetary influences will be provided."
      },
      {
        question: "How long does it take to prepare the report?",
        answer: "Typically, 3-5 business days after receiving your details."
      }
    ],
    pricing: "5,000"
  },
  {
    serviceName: "Kundali Matching",
    description: "Evaluate the compatibility between two individuals by analyzing their birth charts. This service assesses emotional, physical, and spiritual compatibility, ideal for marriage prospects.",
    faqs: [
      {
        question: "What is Kundali matching?",
        answer: "It compares two charts to assess compatibility for marriage."
      },
      {
        question: "Is it necessary for love marriages?",
        answer: "Yes, it provides deeper insights into compatibility and harmony."
      },
      {
        question: "What if the Kundalis don't match?",
        answer: "Remedies can be suggested to overcome obstacles."
      },
      {
        question: "How many Gunas need to match for a successful marriage?",
        answer: "Ideally, 18 out of 36 Gunas should match."
      },
      {
        question: "Do you provide an online consultation?",
        answer: "Yes, consultations can be conducted virtually."
      }
    ],
    pricing: "3,000"
  },
  {
    serviceName: "Career Counselling",
    description: "Discover the best career path based on your astrological chart. Identify opportunities, strengths, and potential challenges to make informed decisions about your professional journey.",
    faqs: [
      {
        question: "How does astrology help with career guidance?",
        answer: "It identifies favorable industries, opportunities, and timing for career growth."
      },
      {
        question: "Can it help in choosing between two career paths?",
        answer: "Yes, detailed analysis can provide clarity."
      },
      {
        question: "Does this include predictions for promotions and transfers?",
        answer: "Yes, career timing predictions are included."
      },
      {
        question: "What details are required for the analysis?",
        answer: "Date, time, and place of birth are necessary."
      },
      {
        question: "Are remedies suggested for professional obstacles?",
        answer: "Yes, remedies to boost success are included."
      }
    ],
    pricing: "4,000"
  },
  {
    serviceName: "Dasha Prediction",
    description: "Understand how planetary periods (Dashas) influence your life. This service offers insights into upcoming opportunities, challenges, and the best times to act.",
    faqs: [
      {
        question: "What is a Dasha period?",
        answer: "It’s a phase ruled by a specific planet in your chart, influencing your life."
      },
      {
        question: "How far into the future can this predict?",
        answer: "The analysis can extend for several years."
      },
      {
        question: "Does this cover specific events like marriage or career changes?",
        answer: "Yes, Dashas highlight favorable timings for life events."
      },
      {
        question: "How often should Dasha predictions be updated?",
        answer: "It’s advisable to review every 1-2 years or before major decisions."
      },
      {
        question: "Are remedies provided for challenging Dashas?",
        answer: "Yes, effective remedies are suggested."
      }
    ],
    pricing: "4,500"
  },
  {
    serviceName: "Birth Time Rectification",
    description: "For individuals unsure of their exact birth time, this service uses astrological methods to determine the most accurate time of birth for precise chart analysis.",
    faqs: [
      {
        question: "Why is accurate birth time important?",
        answer: "It ensures precise chart readings and predictions."
      },
      {
        question: "What if I only know the approximate time?",
        answer: "A range of time can be used to narrow it down."
      },
      {
        question: "How long does the rectification process take?",
        answer: "Typically, 3-7 days based on the information provided."
      },
      {
        question: "Does this require any additional details?",
        answer: "Yes, key life events (e.g., marriage, job changes) may be needed."
      },
      {
        question: "Will the rectified time be 100% accurate?",
        answer: "It’s a highly precise estimate based on astrological principles."
      }
    ],
    pricing: "5,000"
  },
  {
    serviceName: "Past Life Karma Analysis",
    description: "Explore karmic influences from past lives that shape your current experiences. Gain insights into recurring patterns, challenges, and spiritual lessons.",
    faqs: [
      {
        question: "How is past life karma analyzed?",
        answer: "Through the 12th house, Rahu-Ketu axis, and planetary placements in your chart."
      },
      {
        question: "Can this help in overcoming current life challenges?",
        answer: "Yes, it offers clarity and remedies for karmic patterns."
      },
      {
        question: "Does this analysis include spiritual guidance?",
        answer: "Yes, spiritual practices and remedies are suggested."
      },
      {
        question: "Is past life analysis accurate?",
        answer: "It provides insights based on astrological principles and intuition."
      },
      {
        question: "How long does this session take?",
        answer: "The analysis typically requires 2-3 hours of preparation and a 1-hour consultation."
      }
    ],
    pricing: "6,000"
  },
  {
    serviceName: "Relationship Analysis",
    description: "Analyze the dynamics of your relationships using astrological insights. Understand compatibility, communication styles, and ways to enhance harmony.",
    faqs: [
      {
        question: "Does this service cover all types of relationships?",
        answer: "Yes, including romantic, familial, and professional relationships."
      },
      {
        question: "Can this improve strained relationships?",
        answer: "Yes, remedies to improve relationships are included."
      },
      {
        question: "What information is needed for analysis?",
        answer: "Birth details of both parties involved."
      },
      {
        question: "Does this include compatibility scores?",
        answer: "Yes, compatibility is a key focus of the analysis."
      },
      {
        question: "Is this suitable for business partnerships?",
        answer: "Absolutely, it’s beneficial for understanding partnerships."
      }
    ],
    pricing: "4,500"
  },
  {
    serviceName: "Maha Dasha Analysis and Remedies",
    description: "Comprehensive insights into your Maha Dasha period, highlighting key opportunities and challenges. Tailored remedies ensure smooth progress during this significant astrological phase.",
    faqs: [
      {
        question: "What is a Maha Dasha?",
        answer: "It’s a major planetary period lasting several years, impacting key life areas."
      },
      {
        question: "Does this service include remedies?",
        answer: "Yes, remedies like mantras, gemstones, and rituals are provided."
      },
      {
        question: "Can this predict specific events?",
        answer: "Yes, including career growth, marriage, or financial changes."
      },
      {
        question: "How accurate are Maha Dasha predictions?",
        answer: "They are highly accurate when based on precise birth details."
      },
      {
        question: "Is this a one-time analysis?",
        answer: "Yes, but periodic reviews are recommended during Maha Dasha transitions."
      }
    ],
    pricing: "6,000"
  },
  {
    serviceName: "Gemstones Recommendation and Remedies",
    description: "Get personalized gemstone recommendations based on your chart. Boost positivity and reduce challenges with the right gemstones and associated remedies.",
    faqs: [
      {
        question: "How are gemstones recommended?",
        answer: "Based on planetary placements and their influences on your chart."
      },
      {
        question: "Do you suggest natural or synthetic gemstones?",
        answer: "Natural, high-quality gemstones are recommended for effective results."
      },
      {
        question: "How to wear the gemstone for maximum benefit?",
        answer: "Instructions regarding metal, finger, and auspicious timing are provided."
      },
      {
        question: "Can gemstones replace other remedies?",
        answer: "They complement, but don’t replace, other remedies."
      },
      {
        question: "Where can I purchase authentic gemstones?",
        answer: "Recommendations for trusted sellers will be provided."
      }
    ],
    pricing: "4,000"
  }
];

export default astrologyServices;
