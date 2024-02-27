import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class ProfileSection extends Component {
  state = {profileDetailsData: {}, statusProfile: 'initial'}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'

    const token = Cookies.get('jwt_token')

    console.log(token)

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)
    const convertedProfileDetails = {
      name: data.profile_details.name,
      url: data.profile_details.profile_image_url,
      bio: data.profile_details.short_bio,
    }
    if (response.ok === true) {
      this.setState({
        profileDetailsData: convertedProfileDetails,
        statusProfile: 'success',
      })
    } else {
      this.setState({statusProfile: 'failure'})
    }
  }

  renderProfileSuccessView = () => {
    const {profileDetailsData} = this.state
    const {name, url, bio} = profileDetailsData
    return (
      <div>
        <div className="job-profile-container">
          <img src={url} alt="profile" />
          <h1>{name}</h1>
          <p>{bio}</p>
        </div>
        <hr />
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  render() {
    const {statusProfile} = this.state
    switch (statusProfile) {
      case 'success':
        return this.renderProfileSuccessView()
      case 'failure':
        return this.renderProfileFailureView()
      default:
        return null
    }
  }
}

export default ProfileSection
