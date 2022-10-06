import { Link } from 'react-router-dom'
import Arrow from '../../../assist/icons/arrow.svg'
import Car from '../../../assist/icons/car.svg'

export function Boxes(props) {
  return (
    <div className="boxes_container">
      <div className="boxes_top">
        <div>
          <img src={Arrow} />
          <Link to="/services">رؤية جميع مجالات الممارسة</Link>
        </div>
        <h2>مجالات الممارسة </h2>
      </div>
      <div className="boxes_bottom">
        <div className="boxes">
          <img src={Car} />
          <a>حوادث السيارات</a>
        </div>
        <div className="boxes">
          <img src={Car} />
          <a>حوادث السيارات</a>
        </div>
        <div className="boxes">
          <img src={Car} />
          <a>حوادث السيارات</a>
        </div>
        <div className="boxes">
          <img src={Car} />
          <a>حوادث السيارات</a>
        </div>
      </div>
    </div>
  )
}