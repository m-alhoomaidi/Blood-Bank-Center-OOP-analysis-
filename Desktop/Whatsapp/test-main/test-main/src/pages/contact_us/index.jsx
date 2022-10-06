import Vector from '../../assist/images/location.png'

export function ContactUs() {
  return (
    <div className="join_us_container join_us_container2">
      <div className='flex_colom'>
        <h1>هل لديك اي استفسار ؟ </h1>
        <a>املأ النموذج وسيقوم فريقنا بالرد عليك في أقرب وقت  ممكن </a>  
      </div>
      <div className="join_us_down join_us_down32">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1560.1075834086816!2d39.12338624578577!3d21.563190848765075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3db68db82d7d1%3A0x42a102369dc009a7!2z2YXYrNmF2YjYudipINmF2KfYrNivINio2YYg2LfYp9mE2Kgg2YTZhNmF2K3Yp9mF2KfZhw!5e0!3m2!1sen!2siq!4v1663770060719!5m2!1sen!2siq" width="480" height="850" style={{ border: 0 }} allowfullscreen="" className='other_image' loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div className="fields_container fields_container2">
          <div className="fields_colom">
            <a>الاسم بالكامل</a>
            <input />
          </div>
          <div className="fields_colom">
            <a>البريد الالكتروني</a>
            <input />
          </div>
          <div className="fields_colom">
            <a>الموضوع</a>
            <input />
          </div>
          <div className="fields_colom">
            <a>الرسالة</a>
            <textarea />
          </div>
          <button className='button wd300'>ارسال</button>
        </div>
      </div>
    </div>
  )
}