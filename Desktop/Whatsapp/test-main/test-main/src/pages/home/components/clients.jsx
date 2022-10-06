import Alraghe from '../../../assist/images/alraghe.png'
import Dhl from '../../../assist/images/dhl.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

export function Clients() {
  return (
    <div className="clients_box">
      <h2>عملاؤنا</h2>
      <div className="clients">
      <Swiper
      modules={[Pagination]} 
      slidesPerView={4}
      slidesPerGroup={4}
      pagination={{ el: '.pags' }}
      breakpoints={{
        900: {
          slidesPerGroup: 4,
          slidesPerView: 4
        },
        600: {
          slidesPerGroup: 3,
          slidesPerView: 3
        },
        100: {
          slidesPerGroup: 2,
          slidesPerView: 2
        }
      }}
      >
        <SwiperSlide><img draggable={false} src={Alraghe} /></SwiperSlide>
        <SwiperSlide><img draggable={false} src={Dhl} /></SwiperSlide>
        <SwiperSlide><img draggable={false} src={Alraghe} /></SwiperSlide>
        <SwiperSlide><img draggable={false} src={Dhl} /></SwiperSlide>
        <SwiperSlide><img draggable={false} src={Alraghe} /></SwiperSlide>
        <SwiperSlide><img draggable={false} src={Dhl} /></SwiperSlide>
        <SwiperSlide><img draggable={false} src={Alraghe} /></SwiperSlide>
        <SwiperSlide><img draggable={false} src={Dhl} /></SwiperSlide>
      </Swiper>

      <div className="pagss"><div className="pags"></div></div>
      </div>
    </div>
  )
}