import { Routes, Route } from 'react-router-dom';
import { Home, AboutUs, Services, Team, Blog, BlogItem, JoinUs, ContactUs, Login, Register, RegisterComponent, Consultation, Case, Addcase } from './pages'
import { Footer, Navbar } from './components';
import ScrollToTop from './utils/ScrollToTop'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './App.css';

function App() {

  return (
    <div className="App">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about_us' element={<AboutUs />} />
        <Route path='/services' element={<Services />} />
        <Route path='/team' element={<Team />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogItem />} />
        <Route path='/join_us' element={<JoinUs />} />
        <Route path='/contact_us' element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/:type' element={<RegisterComponent />} />
        <Route path='/order/consultation' element={<Consultation />} />
        {/****** Staff section */}
        <Route path='/staff' element={<Case />} />
        <Route path='/staff/add' element={<Addcase />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
