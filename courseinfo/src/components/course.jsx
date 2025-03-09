import React from 'react';

const Header = (props) => <h2><u>{props.course}</u></h2>

const Course = ({course}) => {
  const total = course.parts.reduce((sum, current_value) => sum + current_value.exercises, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

const Content = (props) => {
  const arr = props.parts.map(part => <Part part={part} key={part.id}/>)
  return (
    <div>
      {arr}
    </div>
  ) 
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <b>Number of exercises {props.total}</b>


export default Course;