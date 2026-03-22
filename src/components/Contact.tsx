import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from './OurServices';
import { Mail, Phone, MapPin, Send, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [messageStatus, setMessageStatus] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    service: ''
  });

  const validateName = (name: string) => {
    if (!name.trim()) return 'Name is required';
    const nameRegex = /^[A-Za-z. ]{1,20}$/;
    return nameRegex.test(name) ? '' : 'Name should only contain A-Z, a-z, and . (max 20 characters)';
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return 'Phone number is required';
    const phoneRegex = /^[0-9+() -]{10,20}$/;
    return phoneRegex.test(phone) ? '' : 'Please enter a valid phone number';
  };

  const validateService = (service: string) => {
    if (!service.trim()) return 'Please select a service';
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'name') error = validateName(value);
    else if (name === 'phone') error = validatePhone(value);
    else if (name === 'service') error = validateService(value);

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

    setErrors({ name: nameError, phone: phoneError, service: serviceError });

    if (nameError || phoneError || serviceError) return;

    setIsLoading(true);
    emailjs.sendForm('service_22avx9f', 'template_2swvm4n', formRef.current, {
      publicKey: 'IgaNUVa1a-jAGwcIr',
    })
      .then(() => {
        setMessageStatus('success');
        formRef.current?.reset();
        setErrors({ name: '', phone: '', service: '' });
        setTimeout(() => setMessageStatus(null), 5000);
      }, (error) => {
        console.error('EmailJS Error:', error);
        setMessageStatus('error');
      })
      .finally(() => setIsLoading(false));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="relative py-24 md:py-40 bg-[#050505] overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
        >
          {/* Header & Sidebar */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div variants={itemVariants} className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <span className="size-1.5 rounded-full bg-white/40" />
                Connectivity
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl tracking-tighter leading-[0.9]  text-white">
                Initialize <br />
                <span className="text-white/10 italic">Growth.</span>
              </h2>
              <p className="text-white/40 text-lg sm:text-xl font-light leading-relaxed max-w-sm">
                Ready to architecturalize your digital transformation? Let's synergize.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {[
                { icon: MapPin, label: 'Coordinates', value: 'GK Nagar, 2nd St, Manthithoppu Rd, Kovilpatti, TN 628501', href: null },
                { icon: Phone, label: 'Voice Link', value: '+91 63748 76357', href: 'tel:+916374876357' },
                { icon: Mail, label: 'Data Hub', value: 'wepromoters23@gmail.com', href: 'mailto:wepromoters23@gmail.com' }
              ].map((item, idx) => (
                <div key={idx} className="group relative p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-white/[0.03] rounded-xl group-hover:bg-white/10 transition-colors">
                      <item.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-1">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-white/60 group-hover:text-white transition-colors font-light text-sm tracking-wide">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white/60 font-light text-sm tracking-wide leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form Section */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/[0.1] to-transparent">
              <div className="relative bg-[#080808] rounded-[2.4rem] p-8 sm:p-12 md:p-16 overflow-hidden">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-12 relative z-10" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase pl-1">Identification</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="ALEX MERCER"
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none transition-all duration-500"
                        onChange={handleInputChange}
                        required
                      />
                      {errors.name && <p className="text-red-500/40 text-[9px] uppercase tracking-widest pl-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase pl-1">Secure Line</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 00000 00000"
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none transition-all duration-500"
                        onChange={handleInputChange}
                        required
                      />
                      {errors.phone && <p className="text-red-500/40 text-[9px] uppercase tracking-widest pl-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase pl-1">Strategic Path</label>
                    <div className="relative">
                      <select
                        name="service"
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-6 py-5 text-white appearance-none cursor-pointer focus:border-white/20 focus:bg-white/[0.04] focus:outline-none transition-all duration-500"
                        onChange={handleInputChange}
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>Select Objective...</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title} className="bg-[#050505] text-white">
                            {service.title}
                          </option>
                        ))}
                      </select>
                      <Cpu className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                    </div>
                    {errors.service && <p className="text-red-500/40 text-[9px] uppercase tracking-widest pl-1">{errors.service}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isLoading}
                    className="relative w-full group py-6 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 transition-all duration-500 disabled:opacity-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {isLoading ? "Synchronizing..." : (
                      <>
                        Initialize Mission
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Notification System */}
      <AnimatePresence>
        {messageStatus && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 100, x: '-50%' }}
            className={`fixed bottom-12 left-1/2 z-[2000] px-8 py-5 rounded-2xl backdrop-blur-3xl border flex items-center gap-5 shadow-2xl ${messageStatus === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
          >
            <div className={`p-2 rounded-full ${messageStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {messageStatus === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-50 mb-0.5">
                System Status
              </span>
              <span className="text-sm font-light tracking-wide">
                {messageStatus === 'success' ? 'Transmission successful. Data received.' : 'Link failure. Please verify connection.'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;