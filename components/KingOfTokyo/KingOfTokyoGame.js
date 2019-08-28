import { Component } from 'react'
import { find, indexOf } from 'lodash'

import helpers from '../../lib/KingOfTokyo/helpers'
import { diceLookup, diceValues } from '../../lib/KingOfTokyo/config'
import DiceArea from './DiceArea'
import GameBoardArea from './GameBoardArea'
import Player from './Player'
import css from '../../styles/KingOfTokyo/KingOfTokyoGame.styl'


export default class KingOfTokyoGame extends Component {

  constructor(props) {
    super(props)

    // set the default state of our game
    this.state = {
      startingStats: {
        startingHealth: 10,
        startingEnergy: 0,
        startingVictoryPoints: 0,
      },
      turns: [],
      players: [
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
      ],
      gameStarted: false,
    }
  }

  async componentDidMount() {

    // Development code to speed up game testing
    await this.handleStartClick()
    await this.handleDiceRoll()
    // await this.handleDiceRoll()
    // await this.handleDiceRoll()
    // this.handleEndTurnClick()
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

    // Create a lookup of player stats changes for this turn
    let playerStatsChanges = {}
    this.state.players.forEach(playerObject => {
      playerStatsChanges[playerObject.playerId] = {
        health: 0,
        energy: 0,
        victoryPoints: 0,
      }
    })

    return {
      playerId,
      playerInTokyoId,
      playerStatsChanges,
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

  handleStartClick = () => {
    // console.log('handleStartClick')
    if (this.state.turns.length) return

    // kick off the game with a starting turn for a random player
    const randomPlayer = this.state.players[Math.floor((this.state.players.length - 1) * Math.random())]
    
    this.setState({
      turns: [this.createNewTurn(null, randomPlayer.playerId)],
      gameStarted: true
    })
  }

  handleRollCompletion = () => {
    console.log('handleRollCompletion')
  }

  handleEndTurnClick = () => {
    const currentTurn = this.getCurrentTurn()

    // By default, the next player in Tokyo will be the current player in Tokyo.
    let playerInTokyoId = currentTurn.playerInTokyoId

    // get the final roll and if there is no
    // player in Tokyo, and the current roll
    // has attacks, put the player in Tokyo.
    const finalRoll = currentTurn.rolls[currentTurn.rolls.length - 1]

    let rollContainsAttacks = false
    finalRoll.forEach(diceRoll => {
      if (diceLookup[diceRoll.value] === diceValues.ATTACK) {
        rollContainsAttacks = true
      }
    })

    if (rollContainsAttacks) {
      if (!currentTurn.playerInTokyoId) {
        playerInTokyoId = currentTurn.playerId
      } else {
        // TODO: Ask the current player in Tokyo, if they want to relinquish it
        //       But only if they were actually attacked.
      }
    }

    // Apply player stats changes
    let modifiedTurnsArray = [...this.state.turns]
    let modifiedCurrentTurn = { ...modifiedTurnsArray[modifiedTurnsArray.length - 1] }

    // Figure out how many of each dice face was rolled
    let diceTotalsLookup = {}
    finalRoll.forEach(diceRoll => {
      for (const property in diceValues) {
        if (diceValues.hasOwnProperty(property)) {
          const diceFace = diceValues[property]
          if (!diceTotalsLookup[diceFace]) diceTotalsLookup[diceFace] = 0 
          if (diceLookup[diceRoll.value] === diceFace) {
            diceTotalsLookup[diceFace]++
          }
        }
      }
    })

    console.log('diceTotalsLookup', diceTotalsLookup)

    this.state.players.forEach(playerObject => {
      let changesForPlayer = currentTurn.playerStatsChanges[playerObject.playerId]

      // If it is this player's turn, apply health, 
      // energy, and victoryPoint changes to them.
      if (playerObject.playerId === currentTurn.playerId) {
        changesForPlayer.health = diceTotalsLookup[diceValues.HEART]
        changesForPlayer.energy = diceTotalsLookup[diceValues.ENERGY]
        // TODO: Caclulate victory points earned for this player
        // changesForPlayer.victoryPoints = diceTotalsLookup[diceValues.ENERGY]
        changesForPlayer.victoryPoints = helpers.getVictoryPointsFromDiceTotals(diceTotalsLookup)
      } 
      
      // It is not this player's turn.
      else {
        // Is this player being attacked?
        if (currentTurn.playerInTokyoId === playerObject.playerId) {
          // If this player is in Tokyo, then yes
          changesForPlayer.health = -(diceTotalsLookup[diceValues.HEART])
        }
        // If the player whose turn it currently is in Tokyo, then yes
        else if (currentTurn.playerInTokyoId === currentTurn.playerId) {
          changesForPlayer.health = -(diceTotalsLookup[diceValues.HEART])
        }
      }

      // Apply the changes
      modifiedCurrentTurn.playerStatsChanges[playerObject.playerId] = changesForPlayer
    })
    
    modifiedTurnsArray[modifiedTurnsArray.length - 1] = modifiedCurrentTurn
    this.setState({
      turns: modifiedTurnsArray
    })

    this.nextPlayersTurn(playerInTokyoId)
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

  getPlayerInTokyo() {
    const currentTurn = this.getCurrentTurn()
    if (!currentTurn || !currentTurn.playerInTokyoId) return null
    return find(this.state.players, { playerId: currentTurn.playerInTokyoId })
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

  getPlayerComponents() {
    return this.state.players.map(playerObject => {
      const playerInTokyo = this.getPlayerInTokyo()
      return (
        <Player
          playerObject={playerObject}
          hideMonsterAvatar={playerInTokyo && playerInTokyo.playerId === playerObject.playerId}
          active={this.getCurrentTurn().playerId === playerObject.playerId}
          key={`TokyoPlayer:${playerObject.playerId}`}
        />
      )
    })
  }

  render() {
    return (
      <div className={css.kingOfTokyoGame}>
        <div className={css.kingOfTokyoGameInner}>
          <h3>King of Tokyo</h3>

          <GameBoardArea
            playerInTokyo={this.getPlayerInTokyo()}
          />

          {!this.state.gameStarted && (
            <div className={css.startButtonContainer}>
              <button 
                className={css.startButton}
                onClick={this.handleStartClick}
              >
                Start game!
              </button>
            </div>
          )}

          {this.state.gameStarted && (
            <>
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
                {this.getPlayerComponents()}
              </div>
            </>
          )}
          </div>
      </div>
    )
  }

}
