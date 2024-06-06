import { commonStyle } from '../style';


function HomeCategory() {
 
  const categories = [
    { name: 'Houses', image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Apartments', image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
   
    { name: 'flat', image: 'https://images.unsplash.com/photo-1550838771-2b5ce38db44a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Villas', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

    { name: 'Town houses', image: 'https://images.unsplash.com/photo-1576375801517-45814f908aa4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Bungalow', image: 'https://images.unsplash.com/photo-1632152683081-28923830268d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

   
    { name: 'penthouse', image: 'https://images.unsplash.com/photo-1620086385485-d0bd6daa815c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

    { name: 'cottage', image: 'https://images.unsplash.com/photo-1570127828934-c60aa3e1e5af?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

    { name: 'Beach house', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },


    { name: 'palace', image: 'https://images.unsplash.com/photo-1571534980863-05f4c9e55568?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },


  ];



  return (
    <div className='relative  w-full  '>
      <h2 className={commonStyle.heading}>Home Categories</h2>
      <div className='flex  h-30 overflow-x-scroll scrollbarStyle'>
        {categories.map((category, index) => (
          <div key={index} className='mr-2 shadow border border-white rounded-xl bg-white '>
          <div className='w-48 h-28 md:w-64 md:h-40'>
            <img src={category.image} alt={category.name} className='rounded-xl  h-28 w-48  object-cover md:w-64 md:h-40' />
            </div>  
            <h3 className={commonStyle.title +" text-[1.1rem] "}>{category.name}</h3>
          </div>
        ))}

      </div>

    </div>
  );
}

export default HomeCategory;