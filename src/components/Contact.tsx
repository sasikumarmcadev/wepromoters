import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Store the current value of the ref inside the effect
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the section becomes visible in the viewport
            const animatedElements = entry.target.querySelectorAll('.animate-bottom-up');
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, 150 * index); // Stagger the animations
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Use the stored ref value in the cleanup function
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <style>{`
        .animate-bottom-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-bottom-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Have a project in mind? Let's discuss how we can help bring your vision to life.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-200 animate-bottom-up">
            <div>
              <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-2 text-gray-900">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-gray-800" />
                  </div>
                  <span className="text-gray-700">GK Nagar, 2nd St, Manthithoppu rd, Kovilpatti, Tamil Nadu 628501</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-gray-800" />
                  </div>
                  <span className="text-gray-700">+91 63748 76357</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-gray-800" />
                  </div>
                  <span className="text-gray-700">wepromoters23@gmail.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-2 text-gray-900">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Monday - Friday</p>
                  <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Saturday</p>
                  <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Sunday</p>
                  <p className="text-gray-600">Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-200 animate-bottom-up">
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-2 text-gray-900">Send Us a Message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-800 to-black text-white px-6 py-3 rounded-lg hover:from-black hover:to-gray-800 transition-colors font-medium flex items-center justify-center space-x-2 shadow-sm"
            >
              <Mail className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;