import { useState } from "react"
import { useNavigate } from "react-router-dom"

export { RegisterComponent } from './register'

export function Register(props) {
  let [choice, setChoice] = useState(null)
  let nav = useNavigate()

  function setCh(h) {
    if(choice === h) return setChoice(null)
    setChoice(h)
  }

  function next() {
    if(typeof(choice) === 'number') {
      if(choice === 0) {
        nav('/register/company')
      } else if(choice === 1) {
        nav('/register/establishment')
      } else if(choice === 2) {
        nav('/register/person')
      }
    }
  }

  return (
    <div className="register_container">
      <h1>اختر نوع الحساب</h1>
      <div className="register_boxes">
        <div onClick={() => setCh(0)} className={choice === 0 ? 'register_box register_choice' : 'register_box'}>
          <svg width="43" height="38" viewBox="0 0 43 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.1284 25.3333H29.8689V29.5556H34.1284M34.1284 16.8889H29.8689V21.1111H34.1284M38.3878 33.7778H21.35V29.5556H25.6094V25.3333H21.35V21.1111H25.6094V16.8889H21.35V12.6667H38.3878M17.0905 8.44444H12.8311V4.22222H17.0905M17.0905 16.8889H12.8311V12.6667H17.0905M17.0905 25.3333H12.8311V21.1111H17.0905M17.0905 33.7778H12.8311V29.5556H17.0905M8.57164 8.44444H4.31219V4.22222H8.57164M8.57164 16.8889H4.31219V12.6667H8.57164M8.57164 25.3333H4.31219V21.1111H8.57164M8.57164 33.7778H4.31219V29.5556H8.57164M21.35 8.44444V0H0.0527344V38H42.6473V8.44444H21.35Z" fill="#979797"/></svg>
          <a>شركة</a>
        </div>
        <div onClick={() => setCh(1)} className={choice === 1 ? 'register_box register_choice' : 'register_box'}>
          <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.7341 39.4268V31.5645H33.2764V7.92296H31.0313V3.50272H23.1627V0H20.5913V3.50263H12.7227V7.92279H10.4776V31.5643H3.01977V39.4267H0.876953V42H3.01977H10.4775H13.0489H14.6729H29.0809H30.7049H33.2763H40.7341H42.877V39.4267L40.7341 39.4268ZM10.4776 39.4269H5.59121V34.1378H10.4775L10.4776 39.4269ZM15.2941 6.076H28.4598V7.92287H15.2941V6.076ZM18.673 39.4269H17.2444V14.8924H18.673V39.4269ZM22.6444 39.4268H21.2444V14.8924H22.6444V39.4268ZM26.5096 39.4268H25.2158V14.8924H26.5096V39.4268ZM30.7049 31.5644V39.4268H29.0809V12.3191H14.6729V39.4268H13.0489V31.5644V10.4962H30.7048L30.7049 31.5644ZM38.1627 39.4269H33.2764V34.1378H38.1627V39.4269Z" fill="#979797"/></svg>
          <a>مؤسسة</a>
        </div>
        <div onClick={() => setCh(2)} className={choice === 2 ? 'register_box register_choice' : 'register_box'}>
          <svg width="44" height="41" viewBox="0 0 44 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.5502 19.5735C27.3274 19.5735 31.2269 15.7543 31.2269 11C31.2269 6.24564 27.3274 2.42647 22.5502 2.42647C17.7731 2.42647 13.8736 6.24564 13.8736 11C13.8736 15.7543 17.7731 19.5735 22.5502 19.5735ZM33.7059 11C33.7059 17.0775 28.7138 22 22.5502 22C16.3867 22 11.3945 17.0775 11.3945 11C11.3945 4.92249 16.3867 0 22.5502 0C28.7138 0 33.7059 4.92249 33.7059 11Z" fill="#979797"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.9284 25.793C14.6518 25.2025 14.0271 24.8833 13.418 25.0394C6.87178 26.7159 0.240234 30.1344 0.240234 35.277V38.4752C0.240234 39.8695 1.32492 41 2.66294 41H41.4262C42.7643 41 43.8489 39.8695 43.8489 38.4752V35.277C43.8489 30.1344 37.2174 26.7159 30.6711 25.0394C30.062 24.8833 29.4373 25.2025 29.1608 25.793L24.2377 29.5803C23.1612 29.5805 22.6131 29.5805 22.0746 29.5805C21.5161 29.5804 20.9679 29.5804 19.8512 29.5807L14.9284 25.793ZM30.7911 27.6771L25.0353 32.105L24.2382 32.1051C23.1545 32.1054 22.6092 32.1054 22.0736 32.1054C21.5186 32.1053 20.9741 32.1053 19.8518 32.1055L19.054 32.1058L13.298 27.6771C10.4249 28.471 7.70689 29.5883 5.71094 30.9642C3.50195 32.487 2.66294 33.9625 2.66294 35.277V38.4752H41.4262V35.277C41.4262 33.9625 40.5872 32.487 38.3782 30.9642C36.3823 29.5883 33.6643 28.471 30.7911 27.6771Z" fill="#979797"/></svg>
          <a>فرد / مستقل</a>
        </div>
      </div>
      <button disabled={typeof(choice) === 'number' ? false : true} onClick={next} className="button wd300">التالي</button>
    </div>
  )
}