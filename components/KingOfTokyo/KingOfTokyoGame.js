import { Component } from 'react'
import { find, indexOf } from 'lodash'

import helpers from '../../lib/KingOfTokyo/helpers'
import { diceLookup, diceFaceKeys } from '../../lib/KingOfTokyo/config'
import DiceArea from './DiceArea'
import GameBoardArea from './GameBoardArea'
import Player from './Player'
import css from '../../styles/KingOfTokyo/KingOfTokyoGame.styl'


export default class KingOfTokyoGame extends Component {

  constructor(props) {
    super(props)

    // set the default state of our game
    this.state = {
      maxStats: {
        health: 10,
        energy: Infinity,
        victoryPoints: 20,
      },
      startingStats: {
        health: 10,
        energy: 0,
        victoryPoints: 0,
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

      const activePlayers = this.state.players.filter(playerObject => {
        return !this.isPlayerDead(playerObject.playerId)
      })
      if (activePlayers.length === 1) {
        throw new Error("You can't move onto the next turn. There is only one player left!")
      }
      console.log({ activePlayers })

      const indexOfPreviousPlayer = indexOf(activePlayers, previousPlayer)
      let indexOfNextPlayer = indexOfPreviousPlayer + 1
      if (!activePlayers[indexOfNextPlayer]) {
        indexOfNextPlayer = 0
      }
      const nextPlayer = activePlayers[indexOfNextPlayer]
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

  handleRollCompletion = async () => {
    console.log('handleRollCompletion')

    // Clone the turn data that we need
    let modifiedTurnsArray = [ ...this.state.turns ]
    let modifiedCurrentTurn = { ...modifiedTurnsArray[modifiedTurnsArray.length - 1] }

    // Update the current turn
    modifiedCurrentTurn.rollComplete = true

    // Replace the current turn with our new modified current turn
    modifiedTurnsArray[modifiedTurnsArray.length - 1] = modifiedCurrentTurn

    this.setState({
      turns: modifiedTurnsArray
    })
  }

  handleEndTurnClick = () => {
    const currentTurn = this.getCurrentTurn()
    const finalRoll = currentTurn.rolls[currentTurn.rolls.length - 1]

    // By default, the next player in Tokyo will be the current player in Tokyo.
    let playerInTokyoId = currentTurn.playerInTokyoId

    // Apply player stats changes
    let modifiedTurnsArray = [...this.state.turns]
    let modifiedCurrentTurn = { ...modifiedTurnsArray[modifiedTurnsArray.length - 1] }

    // Figure out how many of each dice face was rolled
    let diceTotalsLookup = {}
    finalRoll.forEach(diceRoll => {
      for (const property in diceFaceKeys) {
        if (diceFaceKeys.hasOwnProperty(property)) {
          const diceFace = diceFaceKeys[property]
          if (!diceTotalsLookup[diceFace]) diceTotalsLookup[diceFace] = 0 
          if (diceLookup[diceRoll.value] === diceFace) {
            diceTotalsLookup[diceFace]++
          }
        }
      }
    })

    // Loop through all our players, and set the stats changes for this turn
    this.state.players.forEach(playerObject => {

      // Once a player is out, no stats changes should take place for them
      if (this.isPlayerDead(playerObject.playerId)) return 

      let changesForPlayer = currentTurn.playerStatsChanges[playerObject.playerId]
      const currentStatsForPlayer = this.getStatsForPlayerId(playerObject.playerId)

      // If it is this player's turn, apply health, 
      // energy, and victoryPoint changes to them.
      if (playerObject.playerId === currentTurn.playerId) {

        // Check if the current player is in Tokyo, 
        // and if so, they are not allowed to heal.
        if (currentTurn.playerInTokyoId !== currentTurn.playerId) {
          // Calcuate how many hearts the current player can add to their health
          changesForPlayer.health = diceTotalsLookup[diceFaceKeys.HEART]
          const newTotalHealth = currentStatsForPlayer.health + changesForPlayer.health
          if (newTotalHealth > this.state.maxStats.health) {
            changesForPlayer.health = this.state.maxStats.health - currentStatsForPlayer.health
          }
        }

        changesForPlayer.energy = diceTotalsLookup[diceFaceKeys.ENERGY]
        
        changesForPlayer.victoryPoints = helpers.getVictoryPointsFromDiceTotals(diceTotalsLookup)
        if (changesForPlayer.victoryPoints > this.state.maxStats.victoryPoints) {
          alert(`${playerObject.name} has won!`)
        }
      } 
      
      // It is not this player's turn.
      else {
        // Is this player being attacked?
        if (currentTurn.playerInTokyoId === playerObject.playerId) {
          // If this player is in Tokyo, then yes
          changesForPlayer.health = -(diceTotalsLookup[diceFaceKeys.ATTACK])
        }
        // If the player whose turn it currently is in Tokyo, then yes
        else if (currentTurn.playerInTokyoId === currentTurn.playerId) {
          changesForPlayer.health = -(diceTotalsLookup[diceFaceKeys.ATTACK])
        }
      }

      // Apply the changes
      modifiedCurrentTurn.playerStatsChanges[playerObject.playerId] = changesForPlayer
    })

    if (playerInTokyoId) {

      // Has a player been killed in Tokyo?
      if (this.isPlayerDead(playerInTokyoId)) {
        // The current player must have killed the player in Tokyo, put the 
        // current player in Tokyo, and give them 1 victoryPoint for going in.
        playerInTokyoId = currentTurn.playerId
        modifiedCurrentTurn.playerStatsChanges[currentTurn.playerId].victoryPoints += 1
        console.log('Current player kills the guy in Tokyo, and get 1 point for going in')
      }

      // If the current player was, and is still in Tokyo, give 
      // them 2 victoryPoints for having an entire round in Tokyo.
      else if (playerInTokyoId === currentTurn.playerId) {
        modifiedCurrentTurn.playerStatsChanges[currentTurn.playerId].victoryPoints += 2
        console.log('Current player was already in Tokyo, and gets 2 points')
      }
    } 
    
    // If there is no one in Tokyo, put the current 
    // player in Tokyo if they rolled one or more attacks.
    else if (diceTotalsLookup[diceFaceKeys.ATTACK] > 0) {
      console.log('Putting the current player In Tokyo for rolling an attack')
      playerInTokyoId = currentTurn.playerId
      modifiedCurrentTurn.playerStatsChanges[currentTurn.playerId].victoryPoints += 1

      // TODO: Ask the current player in Tokyo if they want to relinquish it
      //       (But only if they were actually attacked)
    }
    
    // Set the updated state
    modifiedTurnsArray[modifiedTurnsArray.length - 1] = modifiedCurrentTurn
    this.setState({
      turns: modifiedTurnsArray
    })

    // Turn is over, move on to the next player
    this.nextPlayersTurn(playerInTokyoId)
  }

  handleDiceRoll = (diceHighlightedStatesById={}) => {
    // console.log('KingOfTokyoGame:handleDiceRoll')

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

  getStatsForPlayerId(playerId) {
    let playerStats = { ...this.state.startingStats }
    this.state.turns.forEach(turn => {
      const changesForTurn = turn.playerStatsChanges[playerId]
      playerStats.health += changesForTurn.health
      playerStats.energy += changesForTurn.energy
      playerStats.victoryPoints += changesForTurn.victoryPoints
    })
    return playerStats
  }

  isPlayerDead(playerId) {
    return this.getStatsForPlayerId(playerId).health <= 0
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

      // Only render players that are still in the game
      if (this.isPlayerDead(playerObject.playerId)) return null

      const playerInTokyo = this.getPlayerInTokyo()
      return (
        <Player
          playerObject={playerObject}
          isPlayerDead={this.isPlayerDead(playerObject.playerId)}
          hideMonsterAvatar={playerInTokyo && playerInTokyo.playerId === playerObject.playerId}
          active={this.getCurrentTurn().playerId === playerObject.playerId}
          stats={this.getStatsForPlayerId(playerObject.playerId)}
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
