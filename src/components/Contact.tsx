import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { services } from './OurServices';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [messageStatus, setMessageStatus] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    service: ''
  });

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-bottom-up');
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, 150 * index);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Custom validation styles
    const setupCustomValidation = () => {
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll('input, textarea');

        inputs.forEach((input) => {
          input.addEventListener('invalid', (e) => {
            const elem = e.target as HTMLInputElement | HTMLTextAreaElement;

            // Prevent the default popup
            e.preventDefault();

            // Add our custom validation message if the field is empty
            if (!elem.value) {
              if (!errors[elem.name as keyof typeof errors]) {
                setErrors(prev => ({
                  ...prev,
                  [elem.name]: elem.name === 'message' ? 'Please share your thoughts with us' : `Please enter your ${elem.name}`
                }));
              }
            }
          });

          // Clear custom message when user starts typing
          input.addEventListener('input', () => {
            const inputElement = input as HTMLInputElement | HTMLTextAreaElement;
            if (errors[inputElement.name as keyof typeof errors]) {
              setErrors(prev => ({
                ...prev,
                [inputElement.name]: ''
              }));
            }
          });
        });
      }
    };

    setupCustomValidation();

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [errors]);

  const validateName = (name: string) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    const nameRegex = /^[A-Za-z. ]{1,20}$/;
    return nameRegex.test(name) ? '' : 'Name should only contain A-Z, a-z, and . (max 20 characters)';
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    const phoneRegex = /^[0-9+() -]{10,20}$/;
    return phoneRegex.test(phone) ? '' : 'Please enter a valid phone number';
  };

  const validateService = (service: string) => {
    if (!service.trim()) {
      return 'Please selection a service';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'name') {
      error = validateName(value);
    } else if (name === 'phone') {
      error = validatePhone(value);
    } else if (name === 'service') {
      error = validateService(value);
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const nameInput = formRef.current.elements.namedItem('name') as HTMLInputElement;
    const phoneInput = formRef.current.elements.namedItem('phone') as HTMLInputElement;
    const serviceInput = formRef.current.elements.namedItem('service') as HTMLSelectElement;

    const nameError = validateName(nameInput.value);
    const phoneError = validatePhone(phoneInput.value);
    const serviceError = validateService(serviceInput.value);

    setErrors({
      name: nameError,
      phone: phoneError,
      service: serviceError
    });

    if (nameError || phoneError || serviceError) {
      return;
    }

    setIsLoading(true);

    emailjs
      .sendForm(
        'service_22avx9f',
        'template_2swvm4n',
        formRef.current,
        {
          publicKey: 'IgaNUVa1a-jAGwcIr',
        }
      )
      .then(
        () => {
          setMessageStatus('success');
          formRef.current?.reset();
          setErrors({ name: '', phone: '', service: '' });

          setTimeout(() => {
            setMessageStatus(null);
          }, Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000);
        },
        (error) => {
          console.log('Failed to send email. Error:', error.text);
          setMessageStatus('error');
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/[0.05]"
    >
      {/* Robotic Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />


      <style>{`
        .animate-bottom-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .message {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 14px 24px;
          border-radius: 0;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1000;
          font-family: 'Inter', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .message.success { border-bottom: 2px solid #22c55e; }
        .message.error { border-bottom: 2px solid #ef4444; }
        
        input, textarea, select {
          background-color: rgba(255, 255, 255, 0.01) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          color: white !important;
          border-radius: 4px !important;
          padding: 18px 20px !important;
          font-size: 15px !important;
          font-weight: 300 !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          appearance: none;
        }
        
        input:focus, textarea:focus, select:focus {
          border-color: rgba(255, 255, 255, 0.15) !important;
          background-color: rgba(255, 255, 255, 0.02) !important;
          box-shadow: 0 0 40px rgba(255,255,255,0.02) !important;
          outline: none !important;
        }

        select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.3)' %3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 20px center;
          background-size: 16px;
        }

        select option {
          background: #0a0a0a;
          color: white;
          padding: 20px;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.1) !important;
          text-transform: none;
          font-size: 14px;
          letter-spacing: 0.02em;
        }

        label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        label::before {
          content: '';
          width: 4px;
          height: 4px;
          background: white;
          opacity: 0.3;
        }

        .corner-panel {
          position: relative;
          background: rgba(255, 255, 255, 0.005);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .corner-panel:hover {
          background: rgba(255, 255, 255, 0.08); /* Much brighter white tint */
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 50px rgba(255, 255, 255, 0.05);
        }

        .corner-accent {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }
        .top-left { top: 12px; left: 12px; border-top: 1px solid; border-left: 1px solid; }
        .top-right { top: 12px; right: 12px; border-top: 1px solid; border-right: 1px solid; }
        .bottom-left { bottom: 12px; left: 12px; border-bottom: 1px solid; border-left: 1px solid; }
        .bottom-right { bottom: 12px; right: 12px; border-bottom: 1px solid; border-right: 1px solid; }

        .tech-button {
          background: rgba(255, 255, 255, 0.03);
          color: white;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.3em;
          height: 64px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
        .tech-button:hover { 
          background: white; 
          color: black;
          box-shadow: 0 0 30px rgba(255,255,255,0.1);
        }
        .tech-button:active { transform: scale(0.98); }
        .tech-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .tech-button:hover::before { transform: translateX(100%); }
        .tech-button:disabled { opacity: 0.5; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 animate-bottom-up text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-5xl font-semibold text-white mb-6">
            Get in <span className="text-white/20 not-italic ">Touch.</span>
          </h2>
          <p className="text-white/40 max-w-xl font-light text-base leading-relaxed tracking-widest mx-auto">
            Your message will be securely transmitted via WhatsApp.

          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-4 space-y-8 animate-bottom-up">
            <div className="corner-panel p-10">
              <div className="corner-accent top-left" />
              <div className="corner-accent top-right" />
              <div className="corner-accent bottom-left" />
              <div className="corner-accent bottom-right" />

              <h3 className="text-[14px] text-white/40 tracking-[0.2em] mb-14 font-bold border-b border-white/[0.05] pb-4">Hardware Access</h3>

              <div className="space-y-16">
                <div className="group/item">
                  <p className="text-[13px] text-white/40 tracking-[0.1em] mb-4 font-semibold">Base Location</p>
                  <p className="text-white/80 text-[16px] leading-relaxed tracking-wide font-light">
                    GK Nagar, 2nd St, Manthithoppu Rd, Kovilpatti, TN 628501
                  </p>
                </div>

                <div className="group/item">
                  <p className="text-[13px] text-white/40 tracking-[0.1em] mb-4 font-semibold">Comms Channel</p>
                  <a href="tel:+916374876357" className="text-white/90 text-[16px] hover:text-white transition-all block tracking-wide font-light">
                    +91 63748 76357
                  </a>
                  <a href="mailto:wepromoters23@gmail.com" className="text-white/90 text-[16px] hover:text-white transition-all block mt-3 tracking-wide font-light">
                    wepromoters23@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 corner-panel p-10 sm:p-14 animate-bottom-up" style={{ animationDelay: '0.1s' }}>
            <div className="corner-accent top-left" />
            <div className="corner-accent top-right" />
            <div className="corner-accent bottom-left" />
            <div className="corner-accent bottom-right" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-3">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Wade Warren"
                    className="w-full"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    required
                  />
                  {errors.name && <div className="custom-error">{errors.name}</div>}
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 9876543210"
                    className="w-full"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    required
                  />
                  {errors.phone && <div className="custom-error">{errors.phone}</div>}
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="service">What Service You Are Looking For?</label>
                <select
                  id="service"
                  name="service"
                  className="w-full"
                  onChange={handleInputChange}
                  onBlur={handleInputChange}
                  required
                >
                  <option value="" disabled selected>Initialization required...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.service && <div className="custom-error">{errors.service}</div>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="tech-button"
              >
                {isLoading ? (
                  <div className="flex justify-center"><div className="spinner !border-gray-800 !border-t-transparent" /></div>
                ) : (
                  <div className="flex items-center gap-3">
                    Grow With Us
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {messageStatus === 'success' && (
        <div className="message success">
          Data Received. Acknowledged.
        </div>
      )}
      {messageStatus === 'error' && (
        <div className="message error">
          Link Failed. Retry.
        </div>
      )}
    </section>
  );
};

export default Contact;