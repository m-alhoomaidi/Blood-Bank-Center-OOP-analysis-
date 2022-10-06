import Vector from '../../../assist/images/main_vector.png'
import Users from '../../../assist/icons/users.svg'
import Balance from '../../../assist/icons/balance.svg'
import angle from '../../../assist/icons/angle_down.svg'
import { Link } from 'react-router-dom'


export function Main() {

  function Scroll() {
    window.scrollTo(0, 100000)
  }

  return (
    <div className='main'>
      <div className="main_container">
        <div className="main_left">
          <img src={Vector} />
        </div>
        <div className="main_right">
          <h1>مجموعة ماجد بن طالب للمحاماة والاستشارات القانونية</h1>
          <span>نوفر من خلال مجموعة ماجد بن طالب مجموعة مختلفة من  الخدمات  القانونية التى تحتاج اليها</span>
          <Link to="/order/consultation"><button className="button">اطلب استشارتك الآن </button></Link>
        </div>
      </div>
      <div className="main_bottom">
        <div className="box_shape">
          <div className='box_item'>
            <a><p>عميل</p><p>+30</p></a>
            <img src={Users} />
          </div>
          <div className="box_line"></div>
          <div className='box_item'>
            <a><p>قضية</p><p>+30</p></a>
            <img src={Balance} />
          </div>
        </div>
        <div onClick={Scroll} className="scroll_buttom">
          <img src={angle} />
        </div>
      </div>
    </div>
  )
}