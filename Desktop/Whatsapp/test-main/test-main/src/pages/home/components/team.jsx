import Agent from '../../../assist/images/agent.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

export function Team(props) {

  let slides = [0, 1, 2, 3, 4, 5]

  return (
    <div className="team_container">
      <h2>فريق العمل</h2>
      <div className="team">
      <Swiper 
      navigation={true} 
      pagination={{ el: '.pags2' }}
      modules={[Navigation, Pagination]}
      slidesPerView={3}
      className='agents_swiper'
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
            <img className='agent_image' src={Agent} />
          </SwiperSlide>
        )) }
        </Swiper>
        <div className="pagss"><div className="pags2"></div></div>
      </div>
    </div>
  )
}