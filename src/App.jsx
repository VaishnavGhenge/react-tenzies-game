import './App.css'
import Die from './Die'
import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use-window-size';

export default function App() {
  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)
  const { width, height } = useWindowSize();

  useEffect(() => {
    const value = dice[0].value
    if(dice.every(die => die.isHeld && die.value == value)) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newArray = []
    for(let i = 0; i < 10; i++) {
      const newDie = {
        value: randomDieValue(),
        isHeld: false,
        id: nanoid()
      }

      newArray.push(newDie)
    }

    return newArray
  }

  function randomDieValue() {
    return Math.ceil(Math.random() * 6)
  }

  function reRollDice() {
    setDice(oldDice => {
      const newDice = oldDice.map(die => {
        if(!die.isHeld) {
          return ({
            value: randomDieValue(),
            isHeld: false,
            id: nanoid()
          })
        }
        else {
          return(die)
        }
      })

      return newDice
    })
  }

  function newGame() {
    setDice(allNewDice)

    setTenzies(false)
  }

  function holdDice(id) {
    setDice(oldDice => {
      const newDice = []
      oldDice.map(die => {
        if(die.id == id) {
          newDice.push({
            value: die.value,
            isHeld: !die.isHeld,
            id: die.id
          })
        }
        else {
          newDice.push(die)
        }
      })

      return newDice
    })
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} {...die} isHeld={die.isHeld} toggleHold={() => holdDice(die.id)}/>
  ))

  return (
    <main className='main'>
      {tenzies && <Confetti width={width} height={height} />}
      <div className="hero">
        <h1 className='hero-head'>Tenzies</h1>
        <p className='hero-text'>Roll until all dice are the same. Click each die to freeze it at its current value between roll.</p>
      </div>
      <div className="die-container">
        {diceElements}
      </div>
      <button className='btn-roll' onClick={tenzies? newGame:reRollDice}>{tenzies? 'New Game':'Roll'}</button>
    </main>
  )
}