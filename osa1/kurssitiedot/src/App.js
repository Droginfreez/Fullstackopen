import React from "react";

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
const Content = () => {
  return (
    <div>
      <p>{course.parts[0].name} {course.parts[0].exercises}</p>
      <p>{course.parts[1].name} {course.parts[1].exercises}</p>
      <p>{course.parts[2].name} {course.parts[2].exercises}</p>
    </div>
  )
}
const Header = () => {
  return( <h1>{course.name}</h1> )
}

const Total = () => {
  return( <p>{'Total number of exercises '+total}</p>)
}
return (
  <div>
    <Header course={course}/>
    <Content parts={course.parts}/>
    <Total/>
  </div>
)


}
export default App;