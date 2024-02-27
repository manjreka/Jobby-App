import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutButtonClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-bg-container">
      <ul>
        <li className="header-logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <div className="header-options">
          <Link to="/">
            <li className="header-home">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="header-jobs">Jobs</li>
          </Link>
        </div>
        <div className="header-button-container">
          <button type="button" onClick={logoutButtonClicked}>
            Logout
          </button>
        </div>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
