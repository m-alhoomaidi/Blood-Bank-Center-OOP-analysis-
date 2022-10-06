import { useState } from 'react'
import angle_down from '../../assist/icons/angle_down_gold.svg'
import search from '../../assist/icons/search.svg'
import trangle from '../../assist/icons/trangle.svg'
import building from '../../assist/images/building.png'
import Arrow from '../../assist/icons/arrow_white.svg'
import { BlogLine } from './components/blogLine'
export { BlogItem } from './item'

export function Blog() {
  let [show, setShow] = useState(false)

  let Blogs = [
    {
      image: building,
      title: "ماهي القيمة المضافة باندماج الشركات ؟",
      shortText: 'ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة ',
      id: '123'
    },
    {
      image: building,
      title: "ماهي القيمة المضافة باندماج الشركات ؟",
      shortText: 'ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة ',
      id: '1234'
    },
    {
      image: building,
      title: "ماهي القيمة المضافة باندماج الشركات ؟",
      shortText: 'ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة ',
      id: '12345'
    },
    {
      image: building,
      title: "ماهي القيمة المضافة باندماج الشركات ؟",
      shortText: 'ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة ',
      id: '123456'
    },
    {
      image: building,
      title: "ماهي القيمة المضافة باندماج الشركات ؟",
      shortText: 'ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة ',
      id: '1234567'
    },
    {
      image: building,
      title: "ماهي القيمة المضافة باندماج الشركات ؟",
      shortText: 'ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة  ماهي القيمة المضافة باندماج الشركات الشكلي عندما قامت مطبعة ',
      id: '12345678'
    },
  ]

  return (
    <div className="main_blog_container">
      <div className="blog_page_container">
        <div className="blog_page_top">
          <div className="blog_page_top_left">
            <div className="blog_page_dropdown">
              <div onClick={(e) => setShow(!show)} className="blog_page_dropdown_button">
                <img src={angle_down} />
                <a>فرز</a>
              </div>
              <div style={{ display: show ? 'flex' : 'none' }} className="blog_page_dropdown_drop">
                <img draggable={false} src={trangle} />
                <div className="blog_page_dropdown_options">
                  <a>من الأحدث الى الأقدم</a>
                  <a>من الأقدم الى الأحدث</a>
                  <a className='blog_page_dropdown_options_gold'>الأكثر مشاهدة</a>
                </div>
              </div>
            </div>
            <div className="blog_page_search">
              <img src={search} />
              <input placeholder='نص العنصر النائب' />
            </div>
          </div>
          <div className="blog_page_top_right">
            <h1>جميع المقالات</h1>
          </div>
        </div>
        <div className="blog_page_bottom">
          { Blogs.map(blog => (
            <BlogLine blog={blog} />
          )) }
        </div>
        <div className="blog_buttons">
          <div className="blog_button"><img src={Arrow} /></div>
          <div className="blog_number active_number"><a>1</a></div>
          <div className="blog_number"><a>2</a></div>
          <div className="blog_number"><a>3</a></div>
          <div className="blog_button"><img src={Arrow} /></div>
        </div>
      </div>
    </div>
  )
}