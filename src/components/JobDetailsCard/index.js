import {withRouter, Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import SimilarJobsCard from '../SimilarJobsCard'
import './index.css'

const JobDetailsCard = props => {
  const {jobDetailsObject, skillsList, lifeAtCompany, similarJobsList} = props

  const {
    companyLogoUrl,
    companyWebsiteUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetailsObject

  const {description, url} = lifeAtCompany

  console.log(similarJobsList)

  const visitButtonClicked = () => {
    const {history} = props
    Cookies.get('jwt_token')
    history.push({companyWebsiteUrl})
  }

  return (
    <li className="job-cards-container">
      <div>
        <div className="job-card-container-1">
          <img className="image" src={companyLogoUrl} alt={title} />
          <div className="job-card-container-1-subcontainer">
            <h1 className="job-card-container-1-heading">{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="job-card-container-2">
          <div className="job-card-container-2-subcontainer">
            <p className="job-card-container-2-subcontainer-para">{location}</p>
            <p className="job-card-container-2-subcontainer-para">
              {employmentType}
            </p>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div className="job-card-container-3">
          <div className="job-card-container-3-sub">
            <p>Description</p>
            <Link to={companyWebsiteUrl}>
              <button type="button" onClick={visitButtonClicked}>
                Visit
              </button>
            </Link>
          </div>
          <p>{jobDescription}</p>
        </div>
        <div>
          <p>Skills</p>
          <div className="job-card-container-4">
            {skillsList.map(each => (
              <div className="job-card-container-4-sub" key={each.name}>
                <img src={each.url} alt={each.name} />
                <p>{each.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Life At Company</h1>
          <div className="job-card-container-5">
            <p>{description}</p>
            <img src={url} alt={title} />
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul className="unordered-similar-list">
            {similarJobsList.map(each => (
              <SimilarJobsCard details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default withRouter(JobDetailsCard)
