import {Link} from 'react-router-dom'

import './index.css'

const JobCards = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`}>
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
              <p className="job-card-container-2-subcontainer-para">
                {location}
              </p>
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
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobCards
