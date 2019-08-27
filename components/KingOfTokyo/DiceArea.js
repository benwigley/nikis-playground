import { Component } from 'react'
import Dice from './Dice'

import css from '../../styles/KingOfTokyo/DiceArea.styl'


export default class DiceArea extends Component {

  constructor(props) {
    super(props)
    this.state = {
      diceStatesById: {}
    }
  }

  handleDiceClick = (diceId) => {
    let modifiedDiceStatesById = { ...this.state.diceStatesById }
    modifiedDiceStatesById[diceId] = !modifiedDiceStatesById[diceId]
    this.setState({
      diceStatesById: modifiedDiceStatesById
    })
  }

  areDiceHighlighted() {
    let oneOrMoreDiceAreHighlighted = false

    this.props.roll.forEach((randomDiceRoll) => {
      if (this.state.diceStatesById[randomDiceRoll.key]) {
        oneOrMoreDiceAreHighlighted = true
      }
    })
    return oneOrMoreDiceAreHighlighted
  }

  render() {

    let diceComponents = []

    const createAndAddNewDiceComponent = (randomDiceRoll) => {
      diceComponents.push(
        <Dice
          diceNumber={randomDiceRoll.value}
          highlighted={this.state.diceStatesById[randomDiceRoll.key]}
          highlightable={true}
          onDiceClick={this.handleDiceClick}
          diceId={randomDiceRoll.key}
          key={randomDiceRoll.key} />
      )
    }
    this.props.roll.forEach(createAndAddNewDiceComponent)

    return (
      <div className={css.diceArea}>
        {this.props.roll.length === 0 ? (
          <button onClick={this.props.onDiceRollClick}>
            Roll!
          </button>
        ) : (
          <>
            <div className={css.diceContainer}>
              {diceComponents}
            </div>
            <button>
              {!this.areDiceHighlighted() ? 'Reroll!' : 'Keep dice and reroll!'}
            </button>
          </>
        )}
      </div>
    )
  }

}
