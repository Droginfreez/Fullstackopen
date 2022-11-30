import React from 'react'
import {connect} from 'react-redux'
import {filterText} from '../reducers/filterReducer'

const Filter = (props) => {

  const changeHandler = (event) => {
    props.filterText(event.target.value)
  }

  return (
    <div>
      Filter <input onChange={changeHandler} />
    </div>
  )
}

export default connect(null, {filterText}) (Filter)