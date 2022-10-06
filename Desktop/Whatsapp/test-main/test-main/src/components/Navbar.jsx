import Search from '../assist/icons/search.svg'
import Dashes from '../assist/icons/dashes.svg'
import Times from '../assist/icons/times.svg'
import Logo from '../assist/images/logo.png'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Navbar(props) {

  let [open, setOpen] = useState(false)
  let route = useLocation().pathname

  return (
    <div className="navbar">
      <div className="navbar_slider">
        <div onClick={() => setOpen(!open)} className="navbar_slider_button"><img src={open ? Times : Dashes} /></div>
        <div style={{ display: open ? 'flex' : 'none' }} className="navbar_slider_box">
          <div className="navbar_slider_buttone">
            <Link to='/about_us'>من نحن</Link>
          </div>
          <div className="navbar_slider_buttone">
            <Link to="/services">مجالات الممارسة</Link>
          </div>
          <div className="navbar_slider_buttone">
            <Link to='/team'>فريق العمل</Link>
          </div>
          <div className="navbar_slider_buttone">
            <Link to='/blog'>المدونة</Link>
          </div>
          <div className="navbar_slider_buttone">
            <Link to="/join_us">انضم الينا</Link>
          </div>
          <div className="navbar_slider_buttone">
            <Link to="/contact_us">تواصل معنا</Link>
          </div>
          <Link to='/login'><button className="button small">الخدمات الإلكترونية</button></Link>
        </div>
      </div>
      <div className="navbar_left">
        <Link to='/login'><button className="button">الخدمات الإلكترونية</button></Link>
        <img src={Search} />
      </div>
      <div className="navbar_center">
        <div className="navbar_button">
          <Link to="/contact_us">تواصل معنا</Link>
          <div className={route === '/contact_us' ? "navbar_line navbar_line_active" : "navbar_line"}></div>
        </div>
        <div className="navbar_button">
          <Link to="/join_us">انضم الينا</Link>
          <div className={route === '/join_us' ? "navbar_line navbar_line_active" : "navbar_line"}></div>
        </div>
        <div className="navbar_button">
          <Link to='/blog'>المدونة</Link>
          <div className={route === '/blog' ? "navbar_line navbar_line_active" : "navbar_line"}></div>
        </div>
        <div className="navbar_button">
          <Link to='/team'>فريق العمل</Link>
          <div className={route === '/team' ? "navbar_line navbar_line_active" : "navbar_line"}></div>
        </div>
        <div className="navbar_button">
          <Link to="/services">مجالات الممارسة</Link>
          <div className={route === '/services' ? "navbar_line navbar_line_active" : "navbar_line"}></div>
        </div>
        <div className="navbar_button">
          <Link to='/about_us'>من نحن</Link>
          <div className={route === '/about_us' ? "navbar_line navbar_line_active" : "navbar_line"}></div>
        </div>
      </div>
      <div className="navbar_logo">
        <Link to="/"><img src={Logo} /></Link>
      </div>
    </div>
  )
}