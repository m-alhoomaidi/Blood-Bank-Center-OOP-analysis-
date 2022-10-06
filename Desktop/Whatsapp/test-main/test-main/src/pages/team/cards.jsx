import { Card } from "./components/card"

export function Cards(props) {
  return (
    <div className="team_page_container">
      <h1>فريق العمل</h1>
      <div className="team_page">
        { props.team.map((teamMember, i) => (
          <Card onClick={() => props.set(i)} name={teamMember.name} job={teamMember.job} image={teamMember.image} />
        )) }
      </div>
    </div>
  )
}