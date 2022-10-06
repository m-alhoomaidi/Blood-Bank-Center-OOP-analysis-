import { useState } from 'react'
import { Input } from '../login/components/Input'
import { Calender } from './components/calender'

export function Consultation() {
  let [choice, setChoice] = useState(0)

  return (
    <div className="consultation_container">
      <div className='consultation_contain'>
        <div className="consultation_title">
          <h1>احجز لأستشارة سريعة</h1>
          <a>ادخل استشارتك و سيتم الرد عليك في اقرب وقت</a>
        </div>
        <div className="consultation_row">
          <div className="consultation_row_obj">
            <Input title="رقم الهاتف" />
            <Input title="اسمك" />
          </div>
        </div>
        <div className="consultation_row">
          <a className='consultation_row_title'>نوع الاستشارة</a>
          <div className="consultation_row_obj">
            <div onClick={() => setChoice(0)} className="choice">
              <a>يستخدم في صناعة المطابع و دور النشر</a>
              <div className="circle">
                { choice === 0 && <div className="circle_active"></div> }
              </div>
            </div>
            <div onClick={() => setChoice(1)} className="choice">
              <a>يستخدم في صناعة المطابع و دور النشر</a>
              <div className="circle">
                { choice === 1 && <div className="circle_active"></div> }
              </div>
            </div>
          </div>
        </div>
        <div className="consultation_row">
          <a className='consultation_row_title'>قم بتحديد تاريخ</a>
          <div className="consultation_row_obj">
            <textarea placeholder='تفاصيل الاستشارة القانونية' />
            <Calender onChange={(e) => console.log(e)} /> {/* use "onChange" to get the calnder new data and don't play with calnder file in the components  */}
          </div>
        </div>
      </div>
    </div>
  )
}