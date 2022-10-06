import { Link } from "react-router-dom";

export function Box(props) {
  return (
    <div className="box">
      <h3>لوريم إيبسوم</h3>
      <a className="a">لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس</a>
      <span>الشكلي عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً</span>
      <Link to="/about_us"><button className="button">المزيد</button></Link>
    </div>
  )
}