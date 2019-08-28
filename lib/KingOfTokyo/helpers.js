import { diceValues } from './config'

const helpers = {

  generateRandomDiceRoll: () => {
    return {
      key: Math.random(),
      value: Math.ceil(Math.random() * 6)
    }
  },

  getVictoryPointsFromDiceTotals: (diceTotals) => {
    let victoryPoints = 0
    if (diceTotals[diceValues.ONE] >= 3) {
      victoryPoints = 1
      const extraPoints = diceTotals[diceValues.ONE] - 3
      victoryPoints += extraPoints
    }
    if (diceTotals[diceValues.TWO] >= 3) {
      victoryPoints = 2
      const extraPoints = diceTotals[diceValues.TWO] - 3
      victoryPoints += extraPoints
    }
    if (diceTotals[diceValues.THREE] >= 3) {
      victoryPoints = 3
      const extraPoints = diceTotals[diceValues.THREE] - 3
      victoryPoints += extraPoints
    }
    return victoryPoints
  }

}

export default helpers
