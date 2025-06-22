import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';

// Styled component for the button style from Hero section - modified for full width
const StyledWrapper = styled.div`
  width: 100%; // Make wrapper full width
  
  button {
    width: 100%; // Make button take full width of wrapper
    border: none;
    outline: none;
    background-color: #000000;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    border-radius: 25px;
    transition: all ease 0.1s;
    box-shadow: 0px 5px 0px 0px #3b3c36;
  }
  button:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #3b3c36;
  }
  
  /* Responsive adjustments for the button */
  @media (min-width: 640px) {
    button {
      padding: 12px 24px;
      font-size: 14px;
    }
  }
`;

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [messageStatus, setMessageStatus] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
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

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email address';
  };

  const validatePhone = (phone: string) => {
    if (phone.trim() && !/^\+?\d{10,15}$/.test(phone.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  const validateMessage = (message: string) => {
    if (!message.trim()) {
      return 'Message is required';
    }
    return !message.includes('<') && !message.includes('>') ? '' : 'Message cannot contain < or > characters';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'name') {
      error = validateName(value);
    } else if (name === 'email') {
      error = validateEmail(value);
    } else if (name === 'phone') {
      error = validatePhone(value);
    } else if (name === 'message') {
      error = validateMessage(value);
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const nameInput = formRef.current.elements.namedItem('name') as HTMLInputElement;
    const emailInput = formRef.current.elements.namedItem('email') as HTMLInputElement;
    const phoneInput = formRef.current.elements.namedItem('phone') as HTMLInputElement;
    const messageInput = formRef.current.elements.namedItem('message') as HTMLTextAreaElement;

    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const phoneError = validatePhone(phoneInput.value);
    const messageError = validateMessage(messageInput.value);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError
    });

    if (nameError || emailError || phoneError || messageError) {
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
          setErrors({ name: '', email: '', phone: '', message: '' });

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
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <style>{`
        .animate-bottom-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .message {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 16px;
          border-radius: 8px;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1000;
        }
        .message.success {
          background-color: #22c55e;
        }
        .message.error {
          background-color: #ef4444;
        }
        .tick-icon {
          width: 24px;
          height: 24px;
          fill: white;
        }
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #fff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        /* Custom validation styles */
        input:invalid, textarea:invalid {
          box-shadow: none;
        }
        
        /* Hide default browser validation popup */
        ::-webkit-validation-bubble-message {
          display: none;
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: #6B7280;
        }
        
        .custom-error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        input.has-error, textarea.has-error {
          border-color: #ef4444;
          background-color: #fef2f2;
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
                  <span className="text-gray-700"><a href="tel:+91 63748 76357">+91 63748 76357</a></span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-gray-800" />
                  </div>
                  <span className="text-gray-700"><a href="mailto:wepromoters23@gmail.com">wepromoters23@gmail.com</a></span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-2 text-gray-900">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Monday - Friday</p>
                  <p className="text-gray-600">9:00 AM - 10:00 PM</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Saturday & Sunday</p>
                  <p className="text-gray-600">10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-200 animate-bottom-up" noValidate>
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
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500 has-error' : 'border-gray-300'} rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50`}
                  onChange={handleInputChange}
                  onBlur={handleInputChange}
                  required
                />
                {errors.name && <div className="text-red-500 text-sm mt-1 custom-error">{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500 has-error' : 'border-gray-300'} rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50`}
                  onChange={handleInputChange}
                  onBlur={handleInputChange}
                  required
                />
                {errors.email && <div className="text-red-500 text-sm mt-1 custom-error">{errors.email}</div>}
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
                className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500 has-error' : 'border-gray-300'} rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50`}
                onChange={handleInputChange}
                onBlur={handleInputChange}
              />
              {errors.phone && <div className="text-red-500 text-sm mt-1 custom-error">{errors.phone}</div>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500 has-error' : 'border-gray-300'} rounded-lg focus:ring-gray-500 focus:border-gray-500 bg-gray-50`}
                onChange={handleInputChange}
                onBlur={handleInputChange}
                required
              ></textarea>
              {errors.message && <div className="text-red-500 text-sm mt-1 custom-error">{errors.message}</div>}
            </div>

            {/* Full width button wrapper */}
            <StyledWrapper>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <span style={{ visibility: 'hidden' }}>Send Message</span>
                    <div className="loading-overlay">
                      <div className="spinner"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="relative transition-all duration-300 group-hover:translate-x-1">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                  </>
                )}
              </button>
            </StyledWrapper>
          </form>
        </div>
      </div>

      {messageStatus === 'success' && (
        <div className="message success">
          <svg className="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 16.17l-3.5-3.5a1.5 1.5 0 0 1 2.12-2.12l2.38 2.38 6.38-6.38a1.5 1.5 0 0 1 2.12 2.12l-8.5 8.5a1.5 1.5 0 0 1-2.12 0z" />
          </svg>
          Your message has been sent successfully!
        </div>
      )}
      {messageStatus === 'error' && (
        <div className="message error">
          Failed to send your message. Please try again later.
        </div>
      )}
    </section>
  );
};

export default Contact;