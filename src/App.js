import React, {useState} from 'react'
import Header from '../../part1/src/header'
import Content from '../../part1/src/content'
import Total from '../../part1/src/total'
//import Display from './display'
//import Button from './button'



const History = ({allClicks}) => {
if(allClicks.length === 0) {
  return (
    <div>
    The app is used by pressing buttons
    </div>
  )
}


return(
  <div>
  button press history : {allClicks.join('')}
  </div>
)
}

const Display = ({value}) => <div>{value}</div>

const Button = ({handleClick,text}) => (
<button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [clicks,setClicks] = useState({left:0 , right:0})
  const [allClicks, setAll] = useState([])
  const [value, setValue] = useState(100000)

  const handleLeftClick = () => {
   setAll(allClicks.concat('L'))
    setClicks({ ...clicks, left:clicks.left+1})

  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({...clicks, right:clicks.right+1})
  }

const setToValue = (newValue) => {
 setValue(newValue)
}

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {clicks.right}
      <Button handleClick={() => setToValue(0)} text="reset" />
      
      <History allClicks={allClicks} />
      <Display value={value} />
    </div>
  )
}














 

export default App
