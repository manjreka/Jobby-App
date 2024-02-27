import {Link} from 'react-router-dom'
import Header from '../header'
import './index.css'

const Home = () => {
  const jobButtonClicked = () => {}

  return (
    <div className="bg-home-container bg-home-container-smalll">
      <Header />
      <h1>Find The Job That Fits Your Life </h1>
      <p>millions of people are searching for jobs .....</p>
      <Link to="/jobs">
        <button type="button" onClick={jobButtonClicked}>
          Find Jobs
        </button>
      </Link>
    </div>
  )
}
export default Home
