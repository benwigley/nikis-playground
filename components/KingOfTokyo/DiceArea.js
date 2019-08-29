import { Component } from 'react'
import PropTypes from 'prop-types'
import Dice from './Dice'

import css from '../../styles/KingOfTokyo/DiceArea.styl'


class DiceArea extends Component {

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
    if (this.areAllDiceHighlighted()) {
      // Tell the parent component that we are finished rolling
      this.props.onRollCompletion()
    } else if (this.areDiceHighlighted()) {
      // Reroll only the dice that aren't highlighted
      this.props.onDiceRollClick(this.state.diceHighlightedStatesById)
    } else {
      // Reroll all dice
      this.props.onDiceRollClick()
    }
  }

  handleEndTurnClick = () => {
    this.props.onEndTurnClick()
  }

  areDiceHighlighted() {
    let oneOrMoreDiceAreHighlighted = false

    this.props.roll.forEach(diceRoll => {
      if (this.state.diceHighlightedStatesById[diceRoll.key]) {
        oneOrMoreDiceAreHighlighted = true
      }
    })
    return oneOrMoreDiceAreHighlighted
  }

  areAllDiceHighlighted() {
    let allDiceAreHighlighted = true

    this.props.roll.forEach(diceRoll => {
      if (!this.state.diceHighlightedStatesById[diceRoll.key]) {
        allDiceAreHighlighted = false
      }
    })
    return allDiceAreHighlighted
  }

  render() {

    let diceComponents = []

    const createAndAddNewDiceComponent = (randomDiceRoll) => {
      diceComponents.push(
        <Dice
          diceNumber={randomDiceRoll.value}
          highlighted={this.state.diceHighlightedStatesById[randomDiceRoll.key]}
          highlightable={!this.props.rollComplete}
          onDiceClick={this.handleDiceClick}
          diceId={randomDiceRoll.key}
          key={randomDiceRoll.key} />
      )
    }
    this.props.roll.forEach(createAndAddNewDiceComponent)

    return (
      <div className={css.diceArea}>
        {this.props.showRelinquishTokyoButtonForPlayer ? (
          <div className={css.relinquishButtonsContainer}>
            <p>
              {this.props.showRelinquishTokyoButtonForPlayer.name}, you've been hit! Do you want to leave Tokyo?
            </p>
            <button 
              value={true} 
              onClick={this.props.onRelinquishTokyoButtonClick}
              className="primary"
            >
              Leave Tokyo!
            </button>
            <button 
              value={false} 
              onClick={this.props.onRelinquishTokyoButtonClick}
              className="secondary"
            >
              No, stay in Tokyo!
            </button>
          </div>
        ) : (
          this.props.roll.length === 0 ? (
            <button 
              onClick={this.props.onDiceRollClick}
              disabled={this.props.isComputer}
            >
              Roll!
            </button>
          ) : (
            <>
              <div className={css.diceContainer}>
                {diceComponents}
              </div>
              {this.props.rollComplete ? (
                  <button 
                    onClick={this.handleEndTurnClick}
                    disabled={this.props.isComputer}>
                  End turn
                </button>
              ) : (
                <button 
                  onClick={this.handleRerollClick}
                  disabled={this.props.isComputer}
                >
                  {!this.areDiceHighlighted() ? 'Reroll!' : (
                    this.areAllDiceHighlighted() ? 'Keep all and finish rolling' : 'Keep dice and reroll!'
                  )}
                </button>
              )}
            </>
          )
        )}
      </div>
    )
  }

}

DiceArea.propTypes = {
  roll: PropTypes.array.isRequired,
  rollComplete: PropTypes.bool.isRequired,
  onDiceRollClick: PropTypes.func.isRequired,
  onRollCompletion: PropTypes.func.isRequired,
  onEndTurnClick: PropTypes.func.isRequired,
  showRelinquishTokyoButtonForPlayer: PropTypes.object,
  onRelinquishTokyoButtonClick: PropTypes.func.isRequired,
}

export default DiceArea
