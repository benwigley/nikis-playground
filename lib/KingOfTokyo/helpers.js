
const helpers = {

  generateRandomDiceRoll: () => {
    return {
      key: Math.random(),
      value: Math.ceil(Math.random() * 6)
    }
  }

}

export default helpers
