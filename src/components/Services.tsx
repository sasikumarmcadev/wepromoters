import FlowingMenu from './FlowingMenu';

const Services = () => {
  const serviceItems = [
    { 
      link: '#', 
      text: 'Website/Software Development', 
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      link: '#', 
      text: 'Digital / Influencer Marketing', 
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      link: '#', 
      text: 'Content Writing', 
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      link: '#', 
      text: 'Video Editing', 
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      link: '#', 
      text: 'Advertisement Shoot', 
      image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      link: '#', 
      text: 'Social Media Management', 
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      link: '#', 
      text: 'Meta / Google Ads', 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    }
  ];

  return (
    <div id="services" className="relative w-full overflow-hidden py-0 px-0">
      <div className="text-center py-20 px-4 bg-black">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
          What We Do
        </h2>
        <p className="text-white/40 text-sm sm:text-lg max-w-2xl mx-auto uppercase tracking-widest font-black">
          Transforming your business into a digital powerhouse
        </p>
      </div>
      
      <div className="h-[450px] xs:h-[550px] sm:h-[650px] md:h-[800px] relative w-full border-y border-white/5">
        <FlowingMenu 
          items={serviceItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#000000"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#ffffff"
          borderColor="rgba(255,255,255,0.05)"
        />
      </div>
    </div>
  );
};

export default Services;