import { Component } from 'react'
import Dice from './Dice'

import css from '../../styles/KingOfTokyo/DiceArea.styl'


export default class DiceArea extends Component {

  constructor(props) {
    super(props)
    this.state = {
      diceHighlightedStatesById: {}
    }
  }

  handleDiceClick = (diceId) => {
    let modifiedDiceHighlightedStatesById = { ...this.state.diceHighlightedStatesById }
    modifiedDiceHighlightedStatesById[diceId] = !modifiedDiceHighlightedStatesById[diceId]
    this.setState({
      diceHighlightedStatesById: modifiedDiceHighlightedStatesById
    })
  }

  handleRerollClick = () => {
    if (this.areDiceHighlighted()) {
      console.log('keep dice and handle Reroll')
      this.props.onDiceRollClick(this.state.diceHighlightedStatesById)
    } else {
      console.log('reroll dice')
      this.props.onDiceRollClick()
    }
    this.setState({
      diceHighlightedStatesById: {}
    })
  }

  areDiceHighlighted() {
    let oneOrMoreDiceAreHighlighted = false

    this.props.roll.forEach((randomDiceRoll) => {
      if (this.state.diceHighlightedStatesById[randomDiceRoll.key]) {
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
          highlighted={this.state.diceHighlightedStatesById[randomDiceRoll.key]}
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
            <button onClick={this.handleRerollClick}>
              {!this.areDiceHighlighted() ? 'Reroll!' : 'Keep dice and reroll!'}
            </button>
          </>
        )}
      </div>
    )
  }

}
