import React from 'react';

const ProductTimeline = ({ verifiedEvents }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
          Product Journey Timeline
        </h1>

        <div className="relative pl-6 sm:pl-10">
          {verifiedEvents.map((event, idx) => (
            <div
              key={event.id}
              className="relative flex items-start sm:items-stretch"
              style={{ minHeight: '120px' }} // ensure enough height for line
            >
              {/* Timeline Dot and Line */}
              <div className="flex flex-col items-center z-10 relative">
                {/* Dot */}
                <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center relative z-20">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Line */}
                {idx !== verifiedEvents.length - 1 && (
                  <div
                    className="w-px bg-gray-400 absolute top-5 left-1/2 transform -translate-x-1/2"
                    style={{ height: 'calc(100% - 20px)', zIndex: 10 }}
                  />
                )}
              </div>

              {/* Event Content */}
              <div className="ml-6 mb-10 sm:mb-16 bg-white rounded-xl shadow-md p-4 sm:p-6 w-full hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {event.name}
                  </h3>
                  <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {event.timestamp}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{event.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTimeline;
