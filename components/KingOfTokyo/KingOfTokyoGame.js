import { Component } from 'react'
import { find, indexOf } from 'lodash'

import helpers from '../../lib/KingOfTokyo/helpers'
import DiceArea from './DiceArea'
import GameBoardArea from './GameBoardArea'
import Player from './Player'
import css from '../../styles/KingOfTokyo/KingOfTokyoGame.styl'


export default class KingOfTokyoGame extends Component {

  constructor(props) {
    super(props)

    const defaultPlayers = [
      {
        name: "Ben",
        playerId: 1,
        monsterId: 3,
      },
      {
        name: "Niki",
        playerId: 2,
        monsterId: 1,
      },
      {
        name: "Boogy man",
        playerId: 3,
        monsterId: 2,
      }
    ]

    let defaultTurns = []

    // kick off the game with a starting turn for a random player
    const randomPlayer = defaultPlayers[Math.floor((defaultPlayers.length - 1) * Math.random())]
    defaultTurns.push(this.createNewTurn(null, randomPlayer.playerId))

    // set the default state of our game
    this.state = {
      turns: defaultTurns,
      players: defaultPlayers,
    }
  }

  createNewTurn(playerInTokyoId =null, playerId=null) {

    if (!playerId) {
      // We still have access to the current turn,
      // even though we are about to create a new one.
      const previousPlayer = this.getCurrentPlayer()
      const indexOfPreviousPlayer = indexOf(this.state.players, previousPlayer)
      let indexOfNextPlayer = indexOfPreviousPlayer + 1
      if (!this.state.players[indexOfNextPlayer]) {
        indexOfNextPlayer = 0
      }
      const nextPlayer = this.state.players[indexOfNextPlayer]
      playerId = nextPlayer.playerId
    }

    return {
      playerId: playerId,
      playerInTokyoId: playerInTokyoId,
      playerRelinquishedTokyo: false,
      rollComplete: false,
      rolls: [],
    }
  }

  nextPlayersTurn(playerInTokyoId) {
    this.setState(prevState => {
      return {
        turns: [
          ...prevState.turns,
          this.createNewTurn(playerInTokyoId)
        ]
      }
    })
  }

  handleRollCompletion = () => {
    console.log('handleRollCompletion')
  }

  handleEndTurnClick = () => {
    console.log('handleEndTurnClick')

    // get the final roll and if there is no
    // player in Tokyo, and the current roll
    // has attacks, put the player in Tokyo.
    // const finalRoll = this.getCurrentTurn().roll

    this.nextPlayersTurn()
  }

  handleDiceRoll = (diceHighlightedStatesById={}) => {
    console.log('KingOfTokyoGame:handleDiceRoll')

    // Clone current turns array
    let newTurnsArray = [...this.state.turns]
    // Find and clone the current turn
    let currentTurn = { ...newTurnsArray[newTurnsArray.length - 1] }

    // Generate a new random roll
    let newRoll = []
    if (currentTurn.rolls.length) {
      // If there is already a roll, then we need to check whether any of the dice should be kept
      const previousRoll = currentTurn.rolls[currentTurn.rolls.length - 1]
      previousRoll.forEach(diceRoll => {
        if (diceHighlightedStatesById[diceRoll.key]) {
          // Use the existing dice roll
          newRoll.push(diceRoll)
        } else {
          // Generate a new dice roll
          newRoll.push(helpers.generateRandomDiceRoll())
        }
      })
    } else {
      // If there is no previous roll, we can generate a new random roll with all 6 dice
      var times = 6
      for (var i = 0; i < times; i++) {
        newRoll.push(helpers.generateRandomDiceRoll())
      }
    }

    // Add a new roll to the current turn's rolls array
    currentTurn.rolls.push(newRoll)

    if (currentTurn.rolls.length > 2) {
      // If the user has just rolled their final roll,
      // tell the parent that we are finished rolling.
      currentTurn.rollComplete = true
    }

    // Replace the currentTurn
    newTurnsArray[newTurnsArray.length - 1] = currentTurn
    // Update the turns state with our modified turns
    this.setState({
      turns: newTurnsArray
    })
  }

  getCurrentTurn() {
    return this.state.turns[this.state.turns.length - 1]
  }

  getCurrentPlayer() {
    const currentTurn = this.getCurrentTurn()
    return find(this.state.players, { playerId: currentTurn.playerId })
  }

  getCurrentRoll() {
    const currentTurn = this.getCurrentTurn()
    if (!currentTurn) {
      return []
    }
    if (currentTurn.rolls.length === 0) {
      return []
    } else {
      return currentTurn.rolls[currentTurn.rolls.length - 1]
    }
  }

  render() {
    return (
      <div className={css.kingOfTokyoGame}>
        <div className={css.kingOfTokyoGameInner}>
          <h3>King of Tokyo</h3>

          <GameBoardArea />

          {!this.getCurrentTurn().rolls.length && (
            <p className={css.playerTurnNotice}>
              {this.getCurrentPlayer().name}, it's your turn!
            </p>
          )}

          <DiceArea
            roll={this.getCurrentRoll()}
            rollComplete={this.getCurrentTurn().rollComplete}
            onDiceRollClick={this.handleDiceRoll}
            onRollCompletion={this.handleRollCompletion}
            onEndTurnClick={this.handleEndTurnClick}
          />

          <div className={css.playerCardsContainer}>
            <Player
              playerObject={this.state.players[0]}
              active={this.getCurrentTurn().playerId === this.state.players[0].playerId}
            />
            <Player
              playerObject={this.state.players[1]}
              active={this.getCurrentTurn().playerId === this.state.players[1].playerId}
            />
            <Player
              playerObject={this.state.players[2]}
              active={this.getCurrentTurn().playerId === this.state.players[2].playerId}
            />
          </div>
        </div>
      </div>
    )
  }

}
