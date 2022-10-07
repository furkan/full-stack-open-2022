import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Feedback = (props) => (
  <div>
    <h2>give feedback</h2>
    <Button handleClick={props.increaseGood} text='good' />
    <Button handleClick={props.increaseNeutral} text='neutral' />
    <Button handleClick={props.increaseBad} text='bad' />
  </div>
)

const StatisticRow = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if (total === 0) return <p>No feedback given</p>
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <StatisticRow text='good' value={props.good} />
        <StatisticRow text='neutral' value={props.neutral} />
        <StatisticRow text='bad' value={props.bad} />
        <StatisticRow text='all' value={total} />
        <StatisticRow text='average' value={props.good - props.bad} />
        <StatisticRow text='positive' value={100 * props.good / total} />
      </table>
    </div>
  )
}

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