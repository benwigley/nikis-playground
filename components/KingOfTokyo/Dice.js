import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import css from '../../styles/KingOfTokyo/Dice.styl'


class Dice extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    let diceImgUrl = '', altText = ''
    switch (this.props.diceNumber) {
      case 1:
        diceImgUrl = "/static/images/KingOfTokyo/DiceOne.png"
        altText = "1"
        break
      case 2:
        diceImgUrl = "/static/images/KingOfTokyo/DiceTwo.png"
        altText = "2"
        break
      case 3:
        diceImgUrl = "/static/images/KingOfTokyo/DiceThree.png"
        altText = "3"
        break
      case 4:
        diceImgUrl = "/static/images/KingOfTokyo/DiceHeart.png"
        altText = "Heart"
        break
      case 5:
        diceImgUrl = "/static/images/KingOfTokyo/DiceEnergy.png"
        altText = "Energy"
        break
      case 6:
        diceImgUrl = "/static/images/KingOfTokyo/DiceAttack.png"
        altText = "Attack"
        break
    }
    const diceImg = (
      <img src={diceImgUrl} alt={altText} />
    )

    return (
      <div className={cx(css.dice)}>
        {diceImg}
      </div>
    )
  }

}

Dice.propTypes = {
  diceNumber: PropTypes.number.isRequired,
}

export default Dice