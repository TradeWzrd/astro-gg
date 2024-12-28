import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-white bg-opacity-20 backdrop-blur-xl rounded-xl shadow-xl p-6 mb-6 cursor-pointer hover:bg-opacity-30 transition-all duration-300"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="text-lg font-semibold text-white">{question}</div>
      {isOpen && <p className="mt-2 text-gray-200">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    { question: "What is your return policy?", answer: "Our return policy is 30 days." },
    { question: "How long does shipping take?", answer: "Shipping usually takes 5-7 business days." },
    { question: "Do you offer international shipping?", answer: "Yes, we ship to many countries worldwide." },
    { question: "How can I track my order?", answer: "You will receive a tracking link via email." },
    { question: "Can I cancel my order?", answer: "Yes, you can cancel within 24 hours of purchase." },
  ];

  return (
    <section className="py-8 px-4">
      <h2 className="text-center text-4xl font-extrabold mb-12 text-white">FAQs</h2>
      <div className="max-w-3xl mx-auto text-black space-y-6">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
