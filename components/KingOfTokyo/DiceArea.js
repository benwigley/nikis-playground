import { Component } from 'react'
import Dice from './Dice'

import css from '../../styles/KingOfTokyo/DiceArea.styl'

const ONE = 'one'
const TWO = 'two'
const THREE = 'three'
const HEART = 'heart'
const ENERGY = 'energy'
const ATTACK = 'attack'

const DICE_LOOKUP = [
  ONE,
  TWO,
  THREE,
  HEART,
  ENERGY,
  ATTACK,
]

export default class DiceArea extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roll: []
    }
    this.state.roll.forEach(dieNumber => {
      console.log('thing', DICE_LOOKUP[dieNumber])
    })
  }

  generateRandomDiceRoll() {
    return {
      key: Math.random(),
      value: Math.ceil(Math.random() * 5)
    }
  }

  handleDiceRoll() {
    const newRoll = [
      this.generateRandomDiceRoll(),
      this.generateRandomDiceRoll(),
      this.generateRandomDiceRoll(),
      this.generateRandomDiceRoll(),
      this.generateRandomDiceRoll(),
      this.generateRandomDiceRoll()
    ]
    this.setState({
      roll: newRoll
    })
  }

  render() {
    let diceComponents = []
    this.state.roll.forEach((randomDiceRoll) => {
      diceComponents.push(
        <Dice diceNumber={randomDiceRoll.value} key={randomDiceRoll.key} />
      )
    })
    
    return (
      <div className={css.diceArea}>
        {this.state.roll.length === 0 ? (
          <button onClick={this.handleDiceRoll.bind(this)}>
            Roll!
          </button>
        ) : diceComponents}
      </div>
    )
  }

}
