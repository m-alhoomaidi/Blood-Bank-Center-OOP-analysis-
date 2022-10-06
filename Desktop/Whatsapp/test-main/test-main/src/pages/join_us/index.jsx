import Vector from '../../assist/images/main_vector.png'

export function JoinUs() {
  return (
    <div className="join_us_container">
      <h1>يرجى ملئ هذا النموذج و ارفاق سيرتك الذاتية</h1>
      <div className="join_us_down">
        <img src={Vector} />
        <div className="fields_container">
          <div className="fields_colom">
            <a><p>*</p>الاسم</a>
            <input placeholder='ادخل اسمك الثلاثي' />
          </div>
          <div className="fields_colom">
            <a><p>*</p>رقم الهاتف</a>
            <input placeholder='مثال : 0555555555' />
          </div>
          <div className="fields_colom">
            <a><p>*</p>البريد الالكتروني</a>
            <input placeholder='مثال : myname.example.com' />
          </div>
          <div className="fields_colom">
            <a><p>*</p>الوظيفة المرغوب التقديم اليها</a>
            <input />
          </div>
          <div className="fields_colom">
            <a>الرسالة</a>
            <textarea />
          </div>
          <div className="fields_colom">
            <a><p>*</p>ارفاق السيرة الذاتية</a>
            <button className="button border">ارفق سيرتك الذاتية PDF</button>
          </div>
          <button className='button wd300'>ارسال</button>
        </div>
      </div>
    </div>
  )
}