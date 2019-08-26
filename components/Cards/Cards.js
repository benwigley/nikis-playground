import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import css from '../../styles/Cards/Cards.styl'
import Card from './Card'


class Cards extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={cx(css.cards)}>

        <div className={css.cardsState}>
          <h4>Cards component</h4>
          <h5>State:</h5>
          {'{ }'}
          <h5>Props:</h5>
          {'{ }'}
        </div>

        <div>
          <Card symbol="♡" number="5" />
          <Card symbol="♢" number="2" />
          <Card symbol="♧" number="6" />
          <Card symbol="♤" number="10" />
        </div>
      </div>
    )
  }

}

Cards.propTypes = {
}

export default Cards
