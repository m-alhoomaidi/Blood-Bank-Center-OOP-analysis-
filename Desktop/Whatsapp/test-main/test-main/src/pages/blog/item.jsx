import { Link } from 'react-router-dom'
import building from '../../assist/images/building.png'
import UserCircle from '../../assist/icons/user_circle.svg'

export function BlogItem(props) {
  return (
    <div className="main_blog_container">
      <div className="blog_item_container">
        <div className="blog_item_title">
          <Link to="/blog"><button className="button">جميع&nbsp;المقالات</button></Link>
          <h1>ماهي القيمة المضافة باندماج الشركات ؟</h1>
        </div>
        <div className="blog_item_author">
          <a>يناير 10 , 2022 </a>
          <img src={UserCircle} />
        </div>
        <div className="blog_item_article">
          <div className="blog_item_article_image">
            <img src={building} />
          </div>
          <div className="blog_item_article_coloms">
            <div className="blog_item_article_colom">
              <h5>ماهي القيمة المضافة باندماج الشركات الشكلي عندما </h5>
              <span>قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة </span>
            </div>
            <div className="blog_item_article_colom">
              <h5>ماهي القيمة المضافة باندماج الشركات الشكلي عندما </h5>
              <span>قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة </span>
            </div>
            <div className="blog_item_article_colom">
              <h5>ماهي القيمة المضافة باندماج الشركات الشكلي عندما </h5>
              <span>قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة </span>
            </div>
          </div>
        </div>
        <div className="article_button">
          <Link to="/blog"><button className="button border">اطلع على المزيد</button></Link>
        </div>
      </div>
    </div>
  )
}