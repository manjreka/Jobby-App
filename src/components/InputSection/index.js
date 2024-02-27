import {BsSearch} from 'react-icons/bs'

import './index.css'

const InputSection = props => {
  const {onChangeInput, onEnterInput} = props

  const inputTyped = event => {
    onChangeInput(event.target.value)
  }

  const inputEntered = event => {
    if (event.key === 'Enter') {
      onEnterInput()
    }
  }

  return (
    <div className="input-container">
      <input
        type="search"
        placeholder="Search"
        className="job-container-mainbar-input"
        onChange={inputTyped}
        id="search"
        onKeyDown={inputEntered}
      />

      <button type="button" data-testid="searchButton">
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}
export default InputSection
