import React from 'react';

const ContactPage = () => {
  return (
    // md:ml-64 ensures the page starts after the sidebar on desktop
    // on small screens (mobile), it takes full width
    <div className="min-h-screen bg-white font-sans text-gray-700 md:ml-64">
      
      {/* Hero Header: Height adjusts for small screens (h-48 vs h-64) */}
      <div 
        className="relative h-48 md:h-64 flex flex-col items-center justify-center bg-black text-white text-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-2">Contact Us</h1>
        <p className="text-sm md:text-xl text-gray-300">We love to chat for any reason.</p>
      </div>

      {/* Main Content: grid-cols-1 for small screens, md:grid-cols-12 for desktop */}
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Form */}
        <div className="md:col-span-7 order-2 md:order-1">
          <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs md:text-sm mb-1 text-gray-500">Your Name (required)</label>
              <input type="text" className="w-full bg-[#f2f2f2] p-3 outline-none" required />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-1 text-gray-500">Your Email (required)</label>
              <input type="email" className="w-full bg-[#f2f2f2] p-3 outline-none" required />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-1 text-gray-500">Subject</label>
              <input type="text" className="w-full bg-[#f2f2f2] p-3 outline-none" />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-1 text-gray-500">Your Message</label>
              <textarea rows="6" className="w-full bg-[#f2f2f2] p-3 outline-none resize-y"></textarea>
            </div>

            <button type="submit" className="bg-[#333333] text-white px-8 py-2 text-sm font-medium hover:bg-black transition-all">
              Send
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info */}
        <div className="md:col-span-5 space-y-6 order-1 md:order-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Don’t hesitate to reach out!</h2>
          <p className="text-sm md:text-base leading-relaxed text-gray-600">
            Please feel free to contact us for more information about <span className="italic">Anomaly</span> and our services. 
          </p>
          
          <div className="space-y-2 text-xs md:text-sm border-t md:border-none pt-4 md:pt-0">
            <p><span className="font-bold">Address:</span> 13 rue de la Deserte, Vaugneray, FRANCE</p>
            <p><span className="font-bold">Phone:</span> +33 6 51 24 53 56</p>
            <p><span className="font-bold">Email:</span> <span className="text-cyan-500">martin@anomaly.io</span></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;