import './index.css'

const SimilarJobsCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    rating,
    title,
    jobDescription,
    location,
    employmentType,
  } = details

  return (
    <li>
      <div className="similar-job-container">
        <div className="similarJob-card-container-1">
          <img className="similar-image" src={companyLogoUrl} alt={title} />
          <div className="similarJob-card-container-1-subcontainer">
            <h1 className="similarjob-card-container-1-heading">{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="similarjob-card-container-3">
          <div className="similarjob-card-container-3-sub">
            <p className="similar-description">Description</p>
          </div>
          <p className="similar-job-descrip-content">{jobDescription}</p>
        </div>
        <div className="similarjob-card-container-4">
          <p>{location}</p>
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
