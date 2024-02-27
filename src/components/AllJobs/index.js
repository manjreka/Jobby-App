import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import ProfileSection from '../ProfileSection'

import InputSection from '../InputSection'
import JobCards from '../JobCards'

import EmploymentSection from '../EmploymentSection'

import SalarySection from '../SalarySection'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const newArray = []

class AllJobs extends Component {
  state = {
    status: apiStatus.initial,
    jobList: [],
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    fullTime: true,
    partTime: true,
    freelance: true,
    internship: true,
    array1: [],
    array2: [],
    array3: [],
    array4: [],
  }

  componentDidMount() {
    this.getApiCallData()
  }

  getApiCallData = async () => {
    this.setState({status: apiStatus.loading})
    const {employmentType, salaryRange, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    console.log(url)

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const convertedJobList = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    if (response.ok === true) {
      this.setState({status: apiStatus.success, jobList: convertedJobList})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  allJobFilterEmploymentDetails = async (employmentSelected, id) => {
    const {
      fullTime,
      partTime,
      array1,
      array2,
      freelance,
      internship,
      array3,
      array4,
    } = this.state

    if (id === 'FULLTIME') {
      await this.setState(prevState => ({fullTime: !prevState.fullTime}))

      if (fullTime === true) {
        array1.push(employmentSelected)
        await this.setState(
          {
            employmentType: [...array1, ...array2, ...array3, ...array4],
          },
          this.getApiCallData,
        )
      } else {
        array1.pop()
        await this.setState(
          {employmentType: [...array1, ...array2, ...array3, ...array4]},
          this.getApiCallData,
        )
      }
    }
    if (id === 'PARTTIME') {
      await this.setState(prevState => ({partTime: !prevState.partTime}))

      if (partTime === true) {
        array2.push(employmentSelected)
        await this.setState(
          {
            employmentType: [...array1, ...array2, ...array3, ...array4],
          },
          this.getApiCallData,
        )
      } else {
        array2.pop()
        await this.setState(
          {employmentType: [...array1, ...array2, ...array3, ...array4]},
          this.getApiCallData,
        )
      }
    }
    if (id === 'FREELANCE') {
      await this.setState(prevState => ({freelance: !prevState.freelance}))

      if (freelance === true) {
        array3.push(employmentSelected)
        await this.setState(
          {
            employmentType: [...array1, ...array2, ...array3, ...array4],
          },
          this.getApiCallData,
        )
      } else {
        array3.pop()
        await this.setState(
          {employmentType: [...array1, ...array2, ...array3, ...array4]},
          this.getApiCallData,
        )
      }
    }
    if (id === 'INTERNSHIP') {
      await this.setState(prevState => ({internship: !prevState.internship}))

      if (internship === true) {
        array4.push(employmentSelected)
        await this.setState(
          {
            employmentType: [...array1, ...array2, ...array3, ...array4],
          },
          this.getApiCallData,
        )
      } else {
        array4.pop()
        await this.setState(
          {employmentType: [...array1, ...array2, ...array3, ...array4]},
          this.getApiCallData,
        )
      }
    }
  }

  allJobFilterSalaryDetails = salaryRange => {
    this.setState({salaryRange}, this.getApiCallData)
  }

  onChangeInput = userDefinedValue => {
    this.setState({searchInput: userDefinedValue})
  }

  onEnterInput = () => {
    this.getApiCallData()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  renderSuccessView = () => {
    const {jobList} = this.state

    console.log(jobList)

    if (jobList.length !== 0) {
      return (
        <div className="all-jobs-container">
          <ul className="unordered-job-list">
            {jobList.map(each => (
              <JobCards details={each} key={each.id} />
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className="all-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobSection = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.loading:
        return this.renderLoadingView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-content">
        <div className="job-container-sidebar">
          <ProfileSection />
          <h1 className="job-sidebar-heading">Type of Employment</h1>
          {employmentTypesList.map(each => (
            <EmploymentSection
              details={each}
              key={each.employmentTypeId}
              allJobFilterEmploymentDetails={this.allJobFilterEmploymentDetails}
            />
          ))}
          <hr />
          <h1>Salary Range</h1>
          {salaryRangesList.map(each => (
            <SalarySection
              details={each}
              key={each.salaryRangeId}
              allJobFilterSalaryDetails={this.allJobFilterSalaryDetails}
            />
          ))}
        </div>
        <div className="job-container-mainbar">
          <InputSection
            onChangeInput={this.onChangeInput}
            onEnterInput={this.onEnterInput}
          />
          {this.renderAllJobSection()}
        </div>
      </div>
    )
  }
}
export default AllJobs
