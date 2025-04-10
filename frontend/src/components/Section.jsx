const Section = ({ image, title, text, children, reverse }) => {
    return (
      <section className="min-h-screen py-20 px-6 bg-gray-50">
        {/* Title */}
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-12">{title}</h2>
  
        {/* Bordered Box */}
        <div className="max-w-6xl mx-auto border border-blue-400 rounded-xl p-6 bg-white shadow-md">
          <div className={`flex flex-col md:flex-row items-center gap-10 ${reverse ? 'md:flex-row-reverse' : ''}`}>
            {/* Text */}
            <div className="md:w-1/2 space-y-4 text-lg text-gray-700 text-center md:text-left">
              <p>{text}</p>
              {children}
            </div>
  
            {/* Image */}
            <img
              src={image}
              alt={title}
              className="w-full md:w-1/2 rounded-xl shadow-lg object-cover h-64 md:h-[400px]"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default Section;
  