export function Box(props) {
  return (
    <div className="services_box">
      <div className="services_box_title">
        <h3>{props.title}</h3>
        <img src={props.icon} />
      </div>
      <span>{props.description}</span>
    </div>
  )
}