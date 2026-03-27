import { commonStyle } from '../style';
import { useNavigate } from 'react-router-dom';

function HomeCategory() {
  const navigate = useNavigate();
  
  const categories = [
    { name: 'House', image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Apartment', image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=1935&auto=format&fit=crop' },
    { name: 'Studio', image: 'https://images.unsplash.com/photo-1550838771-2b5ce38db44a?q=80&w=387&auto=format&fit=crop' },
    { name: 'Villa', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop' },
    { name: 'Commercial', image: 'https://images.unsplash.com/photo-1576375801517-45814f908aa4?q=80&w=387&auto=format&fit=crop' },
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to allDeals page and the component will filter by the selected category
    navigate(`/allDeals?category=${categoryName}`);
  };

  return (
    <section className="w-full py-14 bg-gradient-to-b from-white via-slate-50 to-white">
      
      {/* Heading */}
      <div className="px-4 md:px-8 mb-8">
        <h2 className={commonStyle.heading}>Browse by Category</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-xl">
          Click on any category to explore properties that match your lifestyle.
        </p>
      </div>

      {/* Scroll Container */}
      <div className="flex gap-6 px-4 md:px-8 overflow-x-auto scrollbarStyle scroll-smooth snap-x snap-mandatory">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="group relative min-w-[200px] md:min-w-[260px] h-[140px] md:h-[180px]
                       rounded-2xl overflow-hidden snap-start
                       shadow-lg hover:shadow-2xl transition-all duration-500
                       cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover
                         transition-transform duration-700
                         group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t
                            from-black/70 via-black/20 to-transparent
                            group-hover:from-black/80 transition-all duration-300"></div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="inline-block px-4 py-1.5
                              bg-white/20 backdrop-blur-md
                              border border-white/30
                              rounded-full text-white
                              text-sm font-semibold
                              tracking-wide group-hover:bg-cyan-500/30
                              group-hover:border-cyan-400 transition-all duration-300">
                {category.name}
              </div>
              <div className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default HomeCategory;
