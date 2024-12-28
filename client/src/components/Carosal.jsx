import React from 'react';

const Carosal = () => {
  const services = [
    { id: 1, name: "Service 1", description: "Description for Service 1" },
    { id: 2, name: "Service 2", description: "Description for Service 2" },
    { id: 3, name: "Service 3", description: "Description for Service 3" },
  ];

  return (
    <section className="bg-purple-900 py-8 text-white">
      <h2 className="text-center text-3xl font-bold mb-8">✨ What We Offer ✨</h2>
      <div className="flex space-x-4 overflow-x-scroll px-4 md:px-16">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white text-center text-black rounded-lg p-6 w-60 flex-shrink-0 transform hover:scale-105 transition-transform"
          >
            {/* Triangle shape */}
            <div className="w-full h-24 bg-gray-300 triangle mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carosal;
