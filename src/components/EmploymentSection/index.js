const EmploymentSection = props => {
  const {details, allJobFilterEmploymentDetails} = props
  const {label, employmentTypeId} = details

  const employmentTypeSelected = event => {
    allJobFilterEmploymentDetails(event.target.value, employmentTypeId)
  }

  return (
    <div>
      <div className="job-sidebar-container">
        <input
          type="checkbox"
          value={employmentTypeId}
          id={employmentTypeId}
          className="job-sidebar-input"
          onChange={employmentTypeSelected}
        />
        <label htmlFor={employmentTypeId} className="job-sidebar-label">
          {label}
        </label>
      </div>
    </div>
  )
}

export default EmploymentSection
