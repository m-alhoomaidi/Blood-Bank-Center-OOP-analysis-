import { Link } from 'react-router-dom'
import Arrow from '../../../assist/icons/arrow.svg'
import Calnder from '../../../assist/icons/calnder.svg'

export function Blog(props) {
  return (
    <div className="blog_box">
      <div className="blog_top">
        <div>
          <img src={Arrow} />
          <Link to="/blog">اطلع على المزيد</Link>
        </div>
        <h2>المدونة</h2>
      </div>
      <div className="blog_boxes">
        <div className="blog_boxe">
          <h5>لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي  </h5>
          <div>
            <img src={Arrow} />
            <a>فبراير, 2022 <img src={Calnder} /></a>
          </div>
        </div>
        <div className="blog_boxe">
          <h5>لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي  </h5>
          <div>
            <img src={Arrow} />
            <a>فبراير, 2022 <img src={Calnder} /></a>
          </div>
        </div>
        <div className="blog_boxe">
          <h5>لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي  </h5>
          <div>
            <img src={Arrow} />
            <a>فبراير, 2022 <img src={Calnder} /></a>
          </div>
        </div>
      </div>
    </div>
  )
}