import PlayerSearch from "../components/PlayerSearch"

const Home = ({data}) => {
  return (
    <div className="home">
      <PlayerSearch data={data} /> {/* Pass data to PlayerSearch */}
      </div>
  )
}

export default Home