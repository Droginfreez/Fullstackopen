import React from "react";

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const total = exercises1 + exercises2 + exercises3

const Header = () => {
  return( <h1>{course}</h1> )
}

const Content = () => {
  return (
    <div>
      <p>{part1} {exercises1}</p>
      <p>{part2} {exercises2}</p>
      <p>{part3} {exercises3}</p>
    </div>
  )
}

const Total = () => {
  return( <p>{total}</p> )
}
  
return (
  <div>
    <Header course={course}/>
    <Content></Content>
    <Total total={'Total number of exercises ' + total}/>
  </div>
)
}

export default App;