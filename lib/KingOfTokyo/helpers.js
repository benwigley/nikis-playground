
const helpers = {

  generateRandomDiceRoll: () => {
    return {
      key: Math.random(),
      value: Math.ceil(Math.random() * 5)
    }
  }

}

export default helpers
