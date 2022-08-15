import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    
    {text}  
  </button>)


const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  const perc = (props.good/all)*100
  const average = (props.good * 1 + props.bad * -1) / all
  if (all <= 0) {
  return (<div><p>No feedback given</p></div>)
  } else {
  return (
  <div>
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="All" value ={all} />
      <StatisticLine text="Average" value ={average} />
      <StatisticLine text="Perc" value ={perc + " %"} />
      </tbody>
    </table>
  </div>
    )
  }
}
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const HandleGood = () => {   
    setGood(good + 1) 
  }
  const HandleNeutral = () => {  
    setNeutral(neutral + 1) 
  }
  const HandleBad = () => { 
    setBad(bad + 1)  
    
  }
  


  return (
    <div>
      <h1>Give feedback</h1>
        <Button handleClick={HandleGood} text='Good' />
        <Button handleClick={HandleNeutral} text='Neutral' />
        <Button handleClick={HandleBad} text='Bad' />
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
         
    </div>
  )
}
export default App;
