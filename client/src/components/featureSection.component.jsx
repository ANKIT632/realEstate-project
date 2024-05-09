import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { commonStyle } from '../style'

const images = [
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'https://images.unsplash.com/photo-1658253614194-85603071f903?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1655322126436-9dd898d4a636?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  'https://images.unsplash.com/photo-1699636250199-2a6998981619?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1570356811230-2f3b816ebb29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1565838500329-d10006e80f55?q=80&w=1861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1623495349319-e2e1c06efced?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const cityName = [
  "Delhi",
  "Mumbai",
  "Noida",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Gurgaon"
];

function FeatureSection() {
  return (
    <section className='flex flex-col justify-center  pt-5 pb-2'>
      <h1 className={commonStyle.heading}>Top Properties in Prime Locations</h1>
      <div>
        <Carousel autoPlay infiniteLoop useKeyboardArrows emulateTouc width='100%'>
          {images.map((image, index) => (
            <div key={index} className='h-[400px] max-sm:h-[200px]'>
              <img src={image} alt={`Image ${index + 1}`} className=" object-cover h-full overflow-hidden" />

              <h3 className='absolute top-1 left-1 bg-white bg-opacity-30 rounded-lg border border-white  font-bold text-white h-8 py-1 px-2 max-sm:text-[10px] max-sm:h-5'>{cityName[index]}</h3>
            </div>
          ))}

        </Carousel>
      </div>
    </section>
  );
}

export default FeatureSection;