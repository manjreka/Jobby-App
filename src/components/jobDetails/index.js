import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../header'
import JobDetailsCard from '../JobDetailsCard'

import './index.css'

class JobDetails extends Component {
  state = {
    jobDetailsObject: {},
    similarJobsList: [],
    skillsList: [],
    lifeCompany: {},
  }

  componentDidMount() {
    this.getRespectiveJobDetails()
  }

  getRespectiveJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()
    const ConvertedJabsData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }

    const updatedJobDetails = {
      companyLogoUrl: ConvertedJabsData.jobDetails.company_logo_url,
      companyWebsiteUrl: ConvertedJabsData.jobDetails.company_website_url,
      employmentType: ConvertedJabsData.jobDetails.employment_type,
      id: ConvertedJabsData.jobDetails.id,
      jobDescription: ConvertedJabsData.jobDetails.job_description,
      lifeAtCompany: ConvertedJabsData.jobDetails.life_at_company,
      location: ConvertedJabsData.jobDetails.location,
      packagePerAnnum: ConvertedJabsData.jobDetails.package_per_annum,
      rating: ConvertedJabsData.jobDetails.rating,
      skills: ConvertedJabsData.jobDetails.skills,
      title: ConvertedJabsData.jobDetails.title,
    }

    const skillsDetails = updatedJobDetails.skills.map(each => ({
      name: each.name,
      url: each.image_url,
    }))

    const lifeAtCompanyDetails = {
      description: updatedJobDetails.lifeAtCompany.description,
      url: updatedJobDetails.lifeAtCompany.image_url,
    }

    const updatedSimilarJobsDetails = ConvertedJabsData.similarJobs.map(
      each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }),
    )

    console.log(updatedJobDetails)
    console.log(updatedSimilarJobsDetails)
    console.log(skillsDetails)

    this.setState({
      jobDetailsObject: updatedJobDetails,
      similarJobsList: updatedSimilarJobsDetails,
      skillsList: skillsDetails,
      lifeCompany: lifeAtCompanyDetails,
    })
  }

  render() {
    const {
      jobDetailsObject,
      similarJobsList,
      skillsList,
      lifeCompany,
    } = this.state
    return (
      <div>
        <Header />
        <JobDetailsCard
          jobDetailsObject={jobDetailsObject}
          skillsList={skillsList}
          lifeAtCompany={lifeCompany}
          similarJobsList={similarJobsList}
        />
      </div>
    )
  }
}
export default JobDetails
