import PlayerSearch from "../components/PlayerSearch"

const Home = ({data}) => {
  return (
    <div className="home">
      <PlayerSearch data={data} /> 
      </div>
  )
}

export default Home