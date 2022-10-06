export function Card(props) {
  return (
    <div onClick={props.onClick} className="agent_card">
      <img src={props.image} />
      <h3>{props.name}</h3>
      <h5>{props.job}</h5>
    </div>
  )
}