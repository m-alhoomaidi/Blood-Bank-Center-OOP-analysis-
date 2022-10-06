import { useState } from "react"
import { Link } from "react-router-dom"
import Vector from '../../assist/images/main_vector.png'
import { Input } from "./components/Input"

export function Login(props) {
  let [type, setType] = useState(0)
  return (
    <div className="login_container">
      <img src={Vector} />
      { type === 0 ? <LoginComponent st={setType} /> : <ResetPasswordComponent st={setType} />}
    </div>
  )
}

function LoginComponent({ st }) {
  return (
    <div className="login_compmonent">
      <h1>أهلا بعودتك حضرة المحامي أ. احمد المحمد,</h1>
      <a>يرجا ادخال معلومات الدخول</a>
      <div className="login_inputs">
        <Input title="رقم الهوية/الإقامة" req />
        <Input title="كلمة المرور" req type="password" />
      </div>
      <div className="remember_me">
        <a>تذكرني</a>
        <div className="circle">
          <div className="circle_active"></div>
        </div>
      </div>
      <span>ليس لديك حساب؟ <Link to="/register">سجل الان</Link></span>
      <button className="button wd300">تسجيل الدخول</button>
      <p onClick={() => st(1)}>هل نسيت كلمة المرور؟</p>
    </div>
  )
}

function ResetPasswordComponent({ st }) {
  return (
    <div className="login_compmonent">
      <h1>هل نسيت كلمة المرور؟</h1>
      <a>ادخل رقم الهاتف المسجل</a>
      <div className="login_inputs">
        <Input title="رقم الهاتف" req />
      </div>
      <button className="button wd300">التالي</button>
      <span>هل تذكر كلمة المرور؟ <a onClick={() => st(0)}>تسجيل الدخول</a></span>
    </div>
  )
}