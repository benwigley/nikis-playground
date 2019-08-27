const diceValues = {
  ONE: 'one',
  TWO: 'two',
  THREE: 'three',
  HEART: 'heart',
  ENERGY: 'energy',
  ATTACK: 'attack',
}

module.exports = {

  diceValues: diceValues,

  diceLookup: {
    1: diceValues.ONE,
    2: diceValues.TWO,
    3: diceValues.THREE,
    4: diceValues.HEART,
    5: diceValues.ENERGY,
    6: diceValues.ATTACK,
  }

}
