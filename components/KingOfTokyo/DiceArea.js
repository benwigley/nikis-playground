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
  }

  generateRandomDiceRoll() {
    return {
      key: Math.random(),
      value: Math.ceil(Math.random() * 5)
    }
  }

  handleDiceRoll = () => {
    let newRoll = []
    var times = 6
    for (var i = 0; i < times; i++) {
      newRoll.push(this.generateRandomDiceRoll())
    }
    this.setState({
      roll: newRoll
    })
  }

  render() {
    let diceComponents = []

    const createAndAddNewDiceComponent = (randomDiceRoll) => {
      diceComponents.push(
        <Dice diceNumber={randomDiceRoll.value} key={randomDiceRoll.key} />
      )
    }
    this.state.roll.forEach(createAndAddNewDiceComponent)
    
    return (
      <div className={css.diceArea}>
        {this.state.roll.length === 0 ? (
          <button onClick={this.handleDiceRoll}>
            Roll!
          </button>
        ) : diceComponents}
      </div>
    )
  }

}
