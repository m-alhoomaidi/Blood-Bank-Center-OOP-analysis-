import Twitter from '../assist/icons/twitter.svg'
import Linkedin from '../assist/icons/linkedin.svg'
import Email from '../assist/icons/email.svg'
import angle from '../assist/icons/angle_down.svg'
import { Link } from 'react-router-dom'

export function Footer(props) {

  function Scroll() {
    window.scrollTo(0, 0)
  }

  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_top_line">
          <h3>القائمة</h3>
          <Link to='/' onClick={() => Scroll()} className="gold_a">الرئيسية</Link>
          <Link to='/about_us'>من نحن</Link>
          <Link to='/services'>مجالات الممارسة</Link>
          <Link to='/team'>فريق العمل</Link>
          <a>عملاؤنا</a>
          <Link to='/blog'>المدونة</Link>
          <Link to="/join_us">انضم الينا</Link>
          <Link to="/contact_us">تواصل معنا</Link>
        </div>
        <div className="footer_top_line">
          <h3>تابعنا على</h3>
          <div className="contact">
            <img src={Twitter} />
            <img src={Linkedin} />
            <img src={Email} />
          </div>
        </div>
        <div className="footer_top_line">
          <h3>العنوان</h3>
          <a>جده - الرياض - الدمام</a>
        </div>
        <div className="footer_top_line">
          <h3>ساعات العمل</h3>
          <a>من الاحد الى الخميس </a>
          <a>9:00 ص - 4:00 م</a>
        </div>
      </div>
      <div className="footer_bottom">
        <a>جميع الحقوق محفوظة لمجموعة ماجد بن طالب 2022</a>
        <div onClick={() => Scroll()} className="scroll_buttom scroll_buttom2">
          <img src={angle} />
        </div>
      </div>
    </div>
  )
}