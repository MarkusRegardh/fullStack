import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <>
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const avg = () => {
    return (good-bad)/(good+bad+neutral)
  }
  
  const total = () => {
    return good+bad+neutral
  }

  const positive = () => {
    return `${good/(good+bad+neutral)*100} %`
  }
  if (total()>0){
  return (
  <>
  <h1>statistics</h1>
  <table>
    <tbody>  
  <StatisticLine text={"good"} value={good}/>
  <StatisticLine text={"neutral"} value={neutral}/>
  <StatisticLine text={"bad"} value={bad}/>
  <StatisticLine text={"total"} value={total()}/>
  <StatisticLine text={"average"} value={avg()}/>
  <StatisticLine text={"positive"} value={positive()}/>
  </tbody>

  </table>
  </>
  )
} else {
  return (
    <>
     <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )
}
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App