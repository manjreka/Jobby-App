const SalarySection = props => {
  const {details, allJobFilterSalaryDetails} = props
  const {label, salaryRangeId} = details

  const salaryRangeSelected = event => {
    allJobFilterSalaryDetails(event.target.value)
  }

  return (
    <div>
      <div className="job-sidebar-container">
        <input
          type="radio"
          value={salaryRangeId}
          id={salaryRangeId}
          className="job-sidebar-input"
          name="salary"
          onChange={salaryRangeSelected}
        />
        <label htmlFor={salaryRangeId} className="job-sidebar-label">
          {label}
        </label>
      </div>
    </div>
  )
}

export default SalarySection
