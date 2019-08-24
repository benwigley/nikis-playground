import { Component } from 'react'

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

  handleDiceRoll() {
    this.setState({
      roll: [
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6)
      ]})
  }

  render() {
    return (
      <div className={css.diceArea}>
        {this.state.roll.length === 0 ? (
          <button onClick={this.handleDiceRoll.bind(this)}>
            Roll!
          </button>
        ) : (
          <div className={css.diceContainer}>

          </div>
        )}
      </div>
    )
  }

}
