import { useState, useEffect } from "react";
import Arrow from './arrow.svg'

export function Calender(props) {
  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let year = getYear()
  let day = new Date().getDate()

  let [date, setDate] = useState({ day: day, month: getMonth().number, name: getMonth().name, time: { type: 'AM', hour: "09", min: '00' } })

  function getYear() {
    return new Date().getFullYear()
  }

  function getMonth() {
    const date = new Date();
    return { name: months[date.getMonth()], number: date.getMonth() + 1 };
  }

  function getDays(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function getDayName(d) {
    let date = d ? new Date(d) : new Date()
    return date.toLocaleDateString('en-SA', {weekday: 'long'});
  }

  function nextMonth() {
    if(date.month >= 12 || date.month - getMonth().number >= 2) return;
    setDate({ ...date, month: date.month + 1, name: months[date.month], day: null })
  }

  function preveosMonth() {
    if(date.month <= getMonth().number) return;
    setDate({ ...date, month: date.month - 1, name: months[date.month - 2] })
  }

  let monthDays = getDays(year, date.month)

  let rows = []
  for(var i = 0; i < monthDays; i++) {
    let num = i + 1
    let DayName = getDayName(`${year}-${date.month}-${num}`)
    rows.push({ name: DayName, number: num, numberWeek: Days.indexOf(DayName) + 1, html: () => <div onClick={Days.indexOf(DayName) === 5 || Days.indexOf(DayName) === 6 ? "" : () => setDate({ ...date, day: num })} className={Days.indexOf(DayName) === 5 || Days.indexOf(DayName) === 6 ?  'calender_day calender_day_off' : num === date.day ? "calender_day calender_active" : 'calender_day'} >{num}</div> })
  }

  let empty = []
  for(var i = 0; i < rows[0].numberWeek-1; i++) {
    empty.push(<div className="empty_row"></div>)
  }

  useEffect(() => {
    props.onChange(date)
  }, [date])

  return (
    <div className="calender">
      <div className="calender_top">
        <img onClick={preveosMonth} src={Arrow} />
        <div><a>{year}</a> <a>{date.name}</a></div>
        <img onClick={nextMonth} src={Arrow} />
      </div>
      <div className="calender_nav">
        <a>S</a>
        <a>M</a>
        <a>T</a>
        <a>W</a>
        <a>T</a>
        <a>F</a>
        <a>S</a>
      </div>
      <div className="calender_body">
        { empty }
        { rows.map(R => ( <R.html /> )) }
      </div>
      <TimePickers onChange={(e) => setDate({ ...date, time: e })} />
    </div>
  )
}


function TimePickers(props) {
  let [open, setOpen] = useState(null)
  let [data, setData] = useState({ type: 'AM', hour: "09", min: '00' })

  let style = data.hour == '12' ? { transform: "rotate(-90deg) translateX(25px) translateY(-25px)" } : data.hour == '01' ? { transform: 'rotate(-58deg) translateX(20px) translateY(-17px)' } : data.hour == '02' ? { transform: 'rotate(-30deg) translateX(8px) translateY(-5px)' } : data.hour == '03' ? { transform: 'rotate(0deg) translateX(5px) translateY(8px)' } : data.hour == '04' ? { transform: 'rotate(26deg) translateX(10px) translateY(20px)' } : data.hour == '05' ? { transform: 'rotate(60deg) translateX(20px) translateY(25px)' } : data.hour == '06' ? { transform: 'rotate(90deg) translateX(50px) translateY(25px)' } : data.hour == '07' ? { transform: 'rotate(122deg) translateX(50px) translateY(17px)' } : data.hour == '08' ? { transform: 'rotate(152deg) translateX(55px) translateY(5px)' } : data.hour == '09' ? { transform: 'rotate(180deg) translateX(50px) translateY(-8px)' } : data.hour == '10' ? { transform: 'rotate(208deg) translateX(50px) translateY(-20px)' } : data.hour == '11' ? { transform: 'rotate(238deg) translateX(46px) translateY(-25px)' } : { display: 'none' }
  let style2 = data.min == '00' ? { transform: "rotate(-90deg) translateX(25px) translateY(-25px)" } : data.min == '05' ? { transform: 'rotate(-58deg) translateX(20px) translateY(-17px)' } : data.min == '10' ? { transform: 'rotate(-30deg) translateX(8px) translateY(-5px)' } : data.min == '15' ? { transform: 'rotate(0deg) translateX(5px) translateY(8px)' } : data.min == '20' ? { transform: 'rotate(26deg) translateX(10px) translateY(20px)' } : data.min == '25' ? { transform: 'rotate(60deg) translateX(20px) translateY(25px)' } : data.min == '30' ? { transform: 'rotate(90deg) translateX(50px) translateY(25px)' } : data.min == '35' ? { transform: 'rotate(122deg) translateX(50px) translateY(17px)' } : data.min == '40' ? { transform: 'rotate(152deg) translateX(55px) translateY(5px)' } : data.min == '45' ? { transform: 'rotate(180deg) translateX(50px) translateY(-8px)' } : data.min == '50' ? { transform: 'rotate(208deg) translateX(50px) translateY(-20px)' } : data.min == '55' ? { transform: 'rotate(238deg) translateX(46px) translateY(-25px)' } : { display: 'none' }

  let hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  let mins = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00']

  let activeTimes = ['9', '10', '11', '12', '1', '2', '3']

  useEffect(() => {
    props.onChange(data)
  }, [data])

  let PM = ['12', '1', '2', '3']

  function changeHour(R) {
    setData({ ...data, hour: R.length === 1 ? `0${R}` : R, type: PM.includes(R) ? "PM" : "AM" })
  }

  return (
    <div className="calender_bottom">
      <div className={ open === 'ampm' ? "calender_bottom_item calender_bottom_item_active" : "calender_bottom_item"}>
        <a onClick={() => setOpen(open === "ampm" ? null : "ampm")}>{data.type}</a>
        <div style={{ display: open === 'ampm' ? 'flex' : 'none' }} className="calender_bottom_item_box">
          <button onClick={() => setData({ ...data, type: 'AM' })} className={ data.type === 'AM' ? "calender_box_button calender_box_button_active" : "calender_box_button"}>AM</button>
          <button onClick={() => setData({ ...data, type: 'PM' })} className={ data.type === 'PM' ? "calender_box_button calender_box_button_active" : "calender_box_button"}>PM</button>
        </div>
      </div>
      <p>:</p>
      <div className={ open === 'hour' ? "calender_bottom_item calender_bottom_item_active" : "calender_bottom_item"}>
        <a onClick={() => setOpen(open === "hour" ? null : "hour")}>{data.hour}</a>
        <div style={{ display: open === 'hour' ? 'flex' : 'none' }} className="calender_bottom_item_box hour_box">
          { hours.map((R) => (
            <div onClick={ activeTimes.includes(R) ? () => changeHour(R) : ""} className={ activeTimes.includes(R) ? data.hour == `${R.length === 1 ? `0${R}` : R}` ? `hour_bottom hour_bottom_${R} hour_active` : `hour_bottom hour_bottom_${R}` : `hour_bottom hour_bottom_${R} hour_disabled`}>{R}</div>
          )) }
          <div className="center_ball">
            <div style={style} className="arrow"></div>
          </div>
        </div>
      </div>
      <p>:</p>
      <div className={ open === 'min' ? "calender_bottom_item calender_bottom_item_active" : "calender_bottom_item"}>
        <a onClick={() => setOpen(open === "min" ? null : "min")}>{data.min}</a>
        <div style={{ display: open === 'min' ? 'flex' : 'none' }} className="calender_bottom_item_box hour_box">
          { mins.map((R, i) => (
            <div onClick={() => setData({ ...data, min: R })} className={ data.min == R ? `hour_bottom hour_bottom_${i+1} hour_active` : `hour_bottom hour_bottom_${i+1}`}>{R}</div>
          )) }
          <div className="center_ball">
            <div style={style2} className="arrow"></div>
          </div>
        </div>
      </div>
    </div>
  )
}