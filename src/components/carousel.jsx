import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './carousel.css';

import Foto1 from '../assets/imagem_carrosel1.jpg';
import Foto2 from '../assets/imagem_carrosel2.jpg';
import Foto3 from '../assets/imagem_carrosel3.jpg';
import Foto4 from '../assets/Produtos e serviços.png';

const Carousel = () => {
  const imagens = [
    { id: 1, url: Foto4},
    { id: 2, url: Foto1},
    { id: 3, url: Foto2},
    { id: 4, url: Foto3},
  ];

  return (
    <div className="carrossel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {imagens.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="slide-item">
              <img src={item.url} alt={item.texto} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;