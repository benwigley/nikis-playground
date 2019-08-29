import { diceFaceKeys } from './config'

const helpers = {

  wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  },

  generateRandomDiceRoll: () => {
    return {
      key: Math.random(),
      value: Math.ceil(Math.random() * 6)
    }
  },

  getVictoryPointsFromDiceTotals: (diceTotals) => {
    let victoryPoints = 0
    if (diceTotals[diceFaceKeys.ONE] >= 3) {
      victoryPoints = 1
      const extraPoints = diceTotals[diceFaceKeys.ONE] - 3
      victoryPoints += extraPoints
    }
    if (diceTotals[diceFaceKeys.TWO] >= 3) {
      victoryPoints = 2
      const extraPoints = diceTotals[diceFaceKeys.TWO] - 3
      victoryPoints += extraPoints
    }
    if (diceTotals[diceFaceKeys.THREE] >= 3) {
      victoryPoints = 3
      const extraPoints = diceTotals[diceFaceKeys.THREE] - 3
      victoryPoints += extraPoints
    }
    return victoryPoints
  }

}

export default helpers
