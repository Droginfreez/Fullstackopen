import {useState} from 'react'

export const useField = (placeholder, type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
  }
  
  return {placeholder, type, value, onChange, reset}
}