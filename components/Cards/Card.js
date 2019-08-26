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
  }

  render() {
    return (
      <div className={cx(css.cardContainer)}>

        <div className={css.cardStats}>
          <h4>State:</h4>
          <ul>
            <li>flipped: {this.state.flipped.toString()}<br /></li>
          </ul>
          <h4>Props:</h4>
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

            <div className={css.cardFront}>
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
}

export default Card
