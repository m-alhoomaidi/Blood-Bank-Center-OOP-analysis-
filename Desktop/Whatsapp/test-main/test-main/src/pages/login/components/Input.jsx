import { useState } from "react"

export function Input(props) {
  let [text, setText] = useState(true)
  return (
    <div className="input">
      <a style={text ? { transform: `translateY(17px) translateX(-5px)`, fontSize: `17px` } : {}}>{props.req && <p>*</p>}{props.title}</a>
      <input onFocus={() => setText(false)} onBlur={() => setText(true)} { ...props } />
    </div>
  )
}