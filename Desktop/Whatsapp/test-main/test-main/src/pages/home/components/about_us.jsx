import Coma from '../../../assist/icons/coma.svg'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

export function AboutUs(props) {

  let slides = [0, 1, 2, 3, 4, 5]

  return (
    <div className="about_container">
      <h2>ماذا قالوا عنا !</h2>
      <div className="about">
      <Swiper 
      navigation={true} 
      modules={[Navigation]}
      slidesPerView={3}
      breakpoints={{
        1100: {
          slidesPerView: 3
        },
        700: {
          slidesPerView: 2
        },
        100: {
          slidesPerView: 1
        }
      }}>
        { slides.map((slide) => (
          <SwiperSlide>
            <div className="about_box">
              <img src={Coma} />
              <span>هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)المطابع ودور
  النشر.كان لوريم إيبسوم المعيار للنص  الشكلي منذ القرن الخامس عشر </span>
              <h3>لوريم إيبسوم</h3>
              <a>مدير شركة</a>
            </div>
          </SwiperSlide>
        )) }
        </Swiper>
      </div>
    </div>
  )
}