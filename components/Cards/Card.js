import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import css from '../../styles/Cards/Card.styl'


class Card extends Component {

  constructor(props) {
    super(props)

    this.state = {
      flipped: false
    }
  }

  toggleFlip = (e) => {
    this.setState({
      flipped: !this.state.flipped
    })

    this.props.onCardFlip()
  }

  render() {
    return (
      <div className={cx(css.cardContainer)}>

        <div className={css.cardStats}>
          <h4>Card Component</h4>
          <h5>State:</h5>
          <ul>
            <li>flipped: {this.state.flipped.toString()}<br /></li>
          </ul>
          <h5>Props:</h5>
          <ul>
            <li>Symbol: {this.props.symbol}</li>
            <li>Number: {this.props.number}</li>
          </ul>
        </div>

        <div
          className={cx(css.card, {
            [css.flipped]: this.state.flipped
          })}
          onClick={this.toggleFlip}>
          <div className={css.cardFlipper}>

            <div className={css.cardBack}></div>

            <div
              className={css.cardFront}
              style={{
                color: ['♡', '♢'].includes(this.props.symbol) ? 'red' : null
              }}>
              <div className={css.topText}>
                <span className={css.symbol}>{this.props.symbol}</span>
                <span className={css.number}>{this.props.number}</span>
              </div>
              <div className={css.bottomText}>
                <span className={css.symbol}>{this.props.symbol}</span>
                <span className={css.number}>{this.props.number}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

Card.propTypes = {
  symbol: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onCardFlip: PropTypes.func.isRequired,
}

export default Card