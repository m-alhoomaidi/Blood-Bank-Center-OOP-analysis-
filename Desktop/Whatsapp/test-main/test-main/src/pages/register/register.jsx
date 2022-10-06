import { useState } from "react";
import { useParams } from "react-router-dom";
import Vector from '../../assist/images/main_vector.png'
import { Input } from '../login/components/Input'

export function RegisterComponent() {
  let { type } = useParams()
  let [verify, setVerify] = useState(0)
  return verify === 0 ? (
    <div className="join_us_container">
      <div className="join_us_down2 join_us_down">
        <img src={Vector} />
        { type !== 'person' ? <CompanyAndEstablishment onSubmit={() => setVerify(1)} /> : <Person onSubmit={() => setVerify(1)} /> }
      </div>
    </div>
  ) : verify === 1 ? (
  <div className="login_container mg100">
    <img src={Vector} />
    <div className="login_compmonent">
      <h1>ادخل رقم هاتفك</h1>
      <a>سيتم ارسال رمز التأكيد كرسالة نصية</a>
      <div className="login_inputs">
        <Input title="رقم الهاتف" req />
      </div>
      <button onClick={() => setVerify(2)} className="button wd300">التالي</button>
      <p onClick={() => setVerify(0)}>العودة</p>
    </div>
  </div>
  ) : verify === 2 ? (
    <div className="login_container mg100">
      <img src={Vector} />
      <div className="login_compmonent">
        <h1>ادخل الرمز المرسل الى هاتفك</h1>
        <a>تم ارسال رمز التأكيد الى الرقم ** ** 567 966+</a>
        <div className="phone_inputs">
          <input minLength={1} maxLength={1} />
          <input minLength={1} maxLength={1} />
          <input minLength={1} maxLength={1} />
          <input minLength={1} maxLength={1} />
        </div>
        <button className="button wd300">التسجيل</button>
        <p onClick={() => setVerify(0)}>العودة</p>
      </div>
    </div>
  ) : ""
}

function CompanyAndEstablishment(props) {
  return (
    <div className="fields_container">
      <h1>انشاء حساب جديد</h1>
      <div className="fields_colom">
        <Input title="اسم الشركة / المؤسسة" req />
      </div>
      <div className="fields_colom">
        <Input title="رقم الهاتف" req />
      </div>
      <div className="fields_colom">
        <Input title="البريد الالكتروني" req />
      </div>
      <div className="fields_colom">
        <Input title="رقم السجل التجاري" req />
      </div>
      <div className="fields_colom">
        <Input title="كلمة السر" req />
      </div>
      <div className="fields_colom">
        <Input title="اعادة كلمة السر" req />
      </div>
      <button onClick={props.onSubmit} className='button wd300'>التالي</button>
    </div>
  )
}

function Person(props) {
  return (
    <div className="fields_container">
      <h1>انشاء حساب جديد</h1>
      <div className="fields_colom">
        <Input title="الاسم الثلاثي" req />
      </div>
      <div className="fields_colom">
        <Input title="رقم الهاتف" req />
      </div>
      <div className="fields_colom">
        <Input title="البريد الالكتروني" req />
      </div>
      <div className="fields_colom">
        <Input title="رقم الهوية / الاقامة" req />
      </div>
      <div className="fields_colom">
        <Input title="كلمة السر" req />
      </div>
      <div className="fields_colom">
        <Input title="اعادة كلمة السر" req />
      </div>
      <button onClick={props.onSubmit} className='button wd300'>التالي</button>
    </div>
  )
}