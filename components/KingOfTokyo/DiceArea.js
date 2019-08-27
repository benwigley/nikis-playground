import { Component } from 'react'
import Dice from './Dice'

import css from '../../styles/KingOfTokyo/DiceArea.styl'


export default class DiceArea extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let diceComponents = []

    const createAndAddNewDiceComponent = (randomDiceRoll) => {
      diceComponents.push(
        <Dice diceNumber={randomDiceRoll.value} key={randomDiceRoll.key} />
      )
    }
    this.props.roll.forEach(createAndAddNewDiceComponent)
    
    return (
      <div className={css.diceArea}>
        {this.props.roll.length === 0 ? (
          <button onClick={this.props.onDiceRollClick}>
            Roll!
          </button>
        ) : diceComponents}
      </div>
    )
  }

}
