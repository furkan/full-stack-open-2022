import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Feedback = (props) => (
  <div>
    <p>give feedback</p>
    <Button handleClick={props.increaseGood} text='good' />
    <Button handleClick={props.increaseNeutral} text='neutral' />
    <Button handleClick={props.increaseBad} text='bad' />
  </div>
)

const Statistics = (props) => (
  <div>
    <h2>statistics</h2>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseStat = (stat, setStat) => {
    return () => {
      console.log(stat, 'incremented')
      setStat(stat + 1)
    }
  }

  return (
    <div>
      <Feedback increaseGood={increaseStat(good, setGood)} increaseNeutral={increaseStat(neutral, setNeutral)} increaseBad={increaseStat(bad, setBad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App