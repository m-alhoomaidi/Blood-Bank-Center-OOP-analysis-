import { AboutUs, Blog, Box, Boxes, Clients, Main, Team } from "./components"

export function Home(props) {
  return (
    <div className='app'>
      <Main />
      <Box />
      <Boxes />
      <Clients />
      <AboutUs />
      <Team />
      <Blog />
    </div>
  )
}