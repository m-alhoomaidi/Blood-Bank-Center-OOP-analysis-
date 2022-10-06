import { useState } from "react"
import { Agent } from './agent'
import { Cards } from './cards'
import Member from '../../assist/images/agent.png'
 
export function Team() {
  let [agent, setAgent] = useState(null)

  let team = [
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
    { name: 'احمد ناصر', job: 'محامي', image: Member },
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
    { name: 'احمد ناصر', job: 'محامي', image: Member },
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
    { name: 'احمد ناصر', job: 'محامي', image: Member },
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
    { name: 'احمد ناصر', job: 'محامي', image: Member },
    { name: 'ناصر احمد', job: 'مدير قانوني', image: Member },
  ]

  return agent ? <Agent set={setAgent} agent={team[agent]} /> : <Cards team={team} set={setAgent} />
}