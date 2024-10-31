import PlayerSearch from "../components/PlayerSearch"

const Home = ({data}) => {
  return (
    <div className="home">
       {/* passing data to PlayerSearch component as a prop */}
      <PlayerSearch data={data} /> 
      </div>
  )
}

export default Home