import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './carousel.css';

import Foto1 from '../assets/home.png';
import Foto2 from '../assets/imagem_carrosel1.jpg';
import Foto3 from '../assets/imagem_carrosel2.jpg';
import Foto4 from '../assets/imagem_carrosel3.jpg';

const Carousel = () => {
  const imagens = [
    { id: 1, url: Foto1, texto: "Home"},
    { id: 2, url: Foto2, texto: "Home 2"},
    { id: 3, url: Foto3, texto: "Home 3"},
    { id: 4, url: Foto4, texto: "Home 4"},
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