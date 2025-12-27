import { commonStyle } from '../style';

function HomeCategory() {
  const categories = [
    { name: 'Houses', image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Apartments', image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=1935&auto=format&fit=crop' },
    { name: 'Flats', image: 'https://images.unsplash.com/photo-1550838771-2b5ce38db44a?q=80&w=387&auto=format&fit=crop' },
    { name: 'Villas', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop' },
    { name: 'Town Houses', image: 'https://images.unsplash.com/photo-1576375801517-45814f908aa4?q=80&w=387&auto=format&fit=crop' },
    { name: 'Bungalow', image: 'https://images.unsplash.com/photo-1632152683081-28923830268d?q=80&w=774&auto=format&fit=crop' },
    { name: 'Penthouse', image: 'https://images.unsplash.com/photo-1620086385485-d0bd6daa815c?q=80&w=870&auto=format&fit=crop' },
    { name: 'Cottage', image: 'https://images.unsplash.com/photo-1570127828934-c60aa3e1e5af?q=80&w=387&auto=format&fit=crop' },
    { name: 'Beach House', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=870&auto=format&fit=crop' },
    { name: 'Palace', image: 'https://images.unsplash.com/photo-1571534980863-05f4c9e55568?q=80&w=387&auto=format&fit=crop' },
  ];

  return (
    <section className="w-full py-14 bg-gradient-to-b from-white via-slate-50 to-white">
      
      {/* Heading */}
      <div className="px-4 md:px-8 mb-8">
        <h2 className={commonStyle.heading}>Home Categories</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-xl">
          Explore property types curated for every lifestyle and investment goal.
        </p>
      </div>

      {/* Scroll Container */}
      <div className="flex gap-6 px-4 md:px-8 overflow-x-auto scrollbarStyle scroll-smooth snap-x snap-mandatory">
        {categories.map((category, index) => (
          
          <div
            key={index}
            className="group relative min-w-[200px] md:min-w-[260px] h-[140px] md:h-[180px]
                       rounded-2xl overflow-hidden snap-start
                       shadow-lg hover:shadow-2xl transition-all duration-500"
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
                            from-black/70 via-black/20 to-transparent"></div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-block px-4 py-1.5
                              bg-white/20 backdrop-blur-md
                              border border-white/30
                              rounded-full text-white
                              text-sm font-semibold
                              tracking-wide">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeCategory;
