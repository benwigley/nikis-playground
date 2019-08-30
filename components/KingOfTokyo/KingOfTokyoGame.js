import { Component } from 'react'
import { find, indexOf } from 'lodash'

import helpers from '../../lib/KingOfTokyo/helpers'
import { diceLookup, diceFaceKeys } from '../../lib/KingOfTokyo/config'
import DiceArea from './DiceArea'
import GameBoardArea from './GameBoardArea'
import Player from './Player'
import css from '../../styles/KingOfTokyo/KingOfTokyoGame.styl'


// TODO
// - Make a player win if they go over 20 victory points
// - Move complex game logic into helpers


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
      winningPlayerId: null,
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
          computer: true
        }
      ],
      gameStarted: false,
    }
  }

  async componentDidMount() {

    // Development code to speed up game testing
    // await this.handleStartClick()
    // await this.handleDiceRoll()
    // await this.handleDiceRoll()
    // await this.handleDiceRoll()
    // this.handleEndTurnClick()
  }

  createNewTurn(playerId=null) {

      // We still have access to the current/previous turn,
      // even though we are about to create a new one.
    const previousTurn = this.getCurrentTurn()

    if (!playerId) {
      const previousPlayer = this.getCurrentPlayer()

      const activePlayers = this.state.players.filter(playerObject => {
        return !this.isPlayerDead(playerObject.playerId)
      })
      if (activePlayers.length === 1) {
        throw new Error("You can't move onto the next turn. There is only one player left!")
      }

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

    const playerInTokyoId = previousTurn ? previousTurn.nextPlayerInTokyoId : null
    console.log('Creating new turn: playerInTokyoId', playerInTokyoId)

    return {
      playerId,
      playerInTokyoId,
      playerStatsChanges,
      nextPlayerInTokyoId: null,
      playerInTokyoPendingLeaveDecision: false,
      rollComplete: false,
      rolls: [],
    }
  }

  checkForPlayerVictory() {
    let winningPlayerId = null
    const activePlayers = this.state.players.filter(playerObject => {
      return !this.isPlayerDead(playerObject.playerId)
    })
    if (activePlayers.length === 1) {
      winningPlayerId = activePlayers[0].playerId
      console.log(`${activePlayers[0].name} is the last player standing`)
    } else {
      this.state.players.forEach((playerObject) => {
        const playerStats = this.getStatsForPlayerId(playerObject.playerId)
        if (playerStats.victoryPoints >= 20) {
          winningPlayerId = playerObject.playerId
          console.log(`${playerObject.name} has won with ${playerStats.victoryPoints} victory points`)
        }
      })
    }
    if (winningPlayerId) {
      this.setState({ winningPlayerId })
      return true
    }
    return false
  }

  async nextPlayersTurn() {
    await this.setState(prevState => {
      return {
        turns: [
          ...prevState.turns,
          this.createNewTurn()
        ]
      }
    })
    
    // Is the next turn a computer?
    if (this.getCurrentPlayer().computer) this.automateCurrentTurn()
  }

  async automateDiceSelection(clickedDiceLookup={}) {
    const diceElements = document.querySelectorAll('[data-name="diceComponent"]')
    const numberOfDiceToChange = Math.floor(Math.random() * diceElements.length)
    for (let i = 0; i < numberOfDiceToChange; i++) {
      const randomDiceIndex = Math.floor(Math.random() * diceElements.length)
      const randomWaitTime = Math.round((Math.random() + 0.5) * 10) / 10 // between .5 and 1.5
      if (!clickedDiceLookup[randomDiceIndex]) {
        diceElements[randomDiceIndex].click()
        await helpers.wait(randomWaitTime)
        clickedDiceLookup[randomDiceIndex] = true
      }
    }
  }

  clickRerollButton() {
    document.querySelector('[data-name="rerollButton"]').click()
  }

  async automateCurrentTurn() {
    let savedClickedDiceLookup = {}

    this.clickRerollButton()
    console.log("he rolled the first time")
    await helpers.wait(0.2)
    await this.automateDiceSelection(savedClickedDiceLookup)
    console.log("he finished selecting dice")

    this.clickRerollButton()
    console.log("he clicked reroll for the 2nd time!")
    await helpers.wait(0.2)
    await this.automateDiceSelection(savedClickedDiceLookup)
    console.log("he finished selecting more dice")

    this.clickRerollButton()
    console.log("he clicked reroll for the 3rd and final time")
    await helpers.wait(0.2)
    await this.automateDiceSelection(savedClickedDiceLookup)
    console.log("he finished selecting more dice")

    await helpers.wait(0.6)
    console.log("He's finished, about to click end turn")
    this.handleEndTurnClick()
  }

  handleStartClick = async () => {
    // console.log('handleStartClick')
    if (this.state.turns.length) return

    // kick off the game with a starting turn for a random player
    const randomPlayer = this.state.players[Math.floor((this.state.players.length) * Math.random())]
    
    await this.setState({
      turns: [this.createNewTurn(randomPlayer.playerId)],
      gameStarted: true
    })
    if (this.getCurrentPlayer().computer) this.automateCurrentTurn()
  }

  handleRelinquishTokyoButtonClick = async (e) => {
    const playerWantsToLeaveTokyo = e.target.value === 'true'
    console.log('handleRelinquishTokyoButtonClick', { playerWantsToLeaveTokyo })

    // If the player wants to leave, switch out the current player with the one in Tokyo
    if (playerWantsToLeaveTokyo) {
      let modifiedTurnsArray = [...this.state.turns]
      let modifiedCurrentTurn = { ...modifiedTurnsArray[modifiedTurnsArray.length - 1] }
      modifiedCurrentTurn.nextPlayerInTokyoId = modifiedCurrentTurn.playerId
      modifiedTurnsArray[modifiedTurnsArray.length - 1] = modifiedCurrentTurn
      console.log('The player in Tokyo opted to leave, new player going into Tokyo is: ', modifiedCurrentTurn.playerId)
      await this.setState({
        turns: modifiedTurnsArray
      })
    }

    // Turn is over, move on to the next player
    this.nextPlayersTurn()
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

  handleEndTurnClick = async () => {
    // Clone current turns array so we can set the player stats changes
    let modifiedTurnsArray = [...this.state.turns]
    let modifiedCurrentTurn = { ...modifiedTurnsArray[modifiedTurnsArray.length - 1] }
    const finalRoll = modifiedCurrentTurn.rolls[modifiedCurrentTurn.rolls.length - 1]

    // By default, the next player in Tokyo will be the current player in Tokyo.
    modifiedCurrentTurn.nextPlayerInTokyoId = modifiedCurrentTurn.playerInTokyoId

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

      let changesForPlayer = modifiedCurrentTurn.playerStatsChanges[playerObject.playerId]
      const currentStatsForPlayer = this.getStatsForPlayerId(playerObject.playerId)

      // If it is this player's turn, apply health, 
      // energy, and victoryPoint changes to them.
      if (playerObject.playerId === modifiedCurrentTurn.playerId) {

        // Check if the current player is in Tokyo, 
        // and if so, they are not allowed to heal.
        if (modifiedCurrentTurn.playerInTokyoId !== modifiedCurrentTurn.playerId) {
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
        // Is this player in Tokyo?
        if (modifiedCurrentTurn.playerInTokyoId === playerObject.playerId) {
          // Did the player outside of Tokyo attack the player in Tokyo?
          if (diceTotalsLookup[diceFaceKeys.ATTACK] > 0) {

            // Yes, remove attacks from player health
            changesForPlayer.health = -(diceTotalsLookup[diceFaceKeys.ATTACK])

            // Ask the current player in Tokyo if they want to relinquish control,
            // but only if their total health is above 0 (they're not dead)
            const totalHealth = currentStatsForPlayer.health + changesForPlayer.health
            if (totalHealth > 0) {
              modifiedCurrentTurn.playerInTokyoPendingLeaveDecision = true
            }
            console.log('Putting game into pending state, and asking if the player in Tokyo wants to leave')
          }
        }
        // Is the current player in Tokyo?
        else if (modifiedCurrentTurn.playerInTokyoId === modifiedCurrentTurn.playerId) {
          // Yes, remove health from the current player if attacks were rolled
          changesForPlayer.health = -(diceTotalsLookup[diceFaceKeys.ATTACK])
        }
      }

      // Apply the changes
      modifiedCurrentTurn.playerStatsChanges[playerObject.playerId] = changesForPlayer
    })

    if (modifiedCurrentTurn.playerInTokyoId) {

      // Has a player been killed in Tokyo?
      if (this.isPlayerDead(modifiedCurrentTurn.playerInTokyoId)) {
        // The current player must have killed the player in Tokyo, put the 
        // current player in Tokyo, and give them 1 victoryPoint for going in.
        modifiedCurrentTurn.nextPlayerInTokyoId = modifiedCurrentTurn.playerId
        modifiedCurrentTurn.playerStatsChanges[modifiedCurrentTurn.playerId].victoryPoints += 1
        console.log('Current player kills the guy in Tokyo, and gets 1 point for going in')
      }

      // If the current player was, and is still in Tokyo, give 
      // them 2 victoryPoints for having an entire round in Tokyo.
      // TODO: Move this to happen at the start of a players turn in Tkyo
      else if (modifiedCurrentTurn.playerInTokyoId === modifiedCurrentTurn.playerId) {
        modifiedCurrentTurn.playerStatsChanges[modifiedCurrentTurn.playerId].victoryPoints += 2
        console.log('Current player was already in Tokyo, and gets 2 points')
      }
    } 
    
    // If there is no one in Tokyo, put the current 
    // player in Tokyo if they rolled one or more attacks.
    else if (diceTotalsLookup[diceFaceKeys.ATTACK] > 0) {
      console.log('Putting the current player In Tokyo for rolling an attack')
      modifiedCurrentTurn.nextPlayerInTokyoId = modifiedCurrentTurn.playerId
      modifiedCurrentTurn.playerStatsChanges[modifiedCurrentTurn.playerId].victoryPoints += 1
    }

    // Set the updated turn object back on the state
    modifiedTurnsArray[modifiedTurnsArray.length - 1] = modifiedCurrentTurn
    await this.setState({
      turns: modifiedTurnsArray
    })

    if (this.checkForPlayerVictory()) return

    // If there is a pending leave decision, don't move on to the next turn just yet
    if (modifiedCurrentTurn.playerInTokyoPendingLeaveDecision) return

    // Turn is over, move on to the next player
    this.nextPlayersTurn()
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

  getWinningPlayer() {
    if (this.state.winningPlayerId) {
      return find(this.state.players, { playerId: this.state.winningPlayerId })
    }
    return null
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
    const currentTurn = this.getCurrentTurn()

    return (
      <div className={css.kingOfTokyoGame}>
        <div className={css.kingOfTokyoGameInner}>
          <h3>King of Tokyo</h3>

          <GameBoardArea
            playerInTokyo={this.getPlayerInTokyo()}
            winningPlayer={this.getWinningPlayer()}
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

          {this.state.gameStarted && !this.state.winningPlayerId && (
            <>
              {!currentTurn.rolls.length && (
                <p className={css.playerTurnNotice}>
                  {this.getCurrentPlayer().name}, it's your turn!
                </p>
              )}

              <DiceArea
                roll={this.getCurrentRoll()}
                rollComplete={currentTurn.rollComplete}
                isComputer={this.getCurrentPlayer().computer}
                onDiceRollClick={this.handleDiceRoll}
                onRollCompletion={this.handleRollCompletion}
                onEndTurnClick={this.handleEndTurnClick}
                showRelinquishTokyoButtonForPlayer={currentTurn.playerInTokyoPendingLeaveDecision ? this.getPlayerInTokyo() : null}
                onRelinquishTokyoButtonClick={this.handleRelinquishTokyoButtonClick}
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
