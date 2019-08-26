import { Component } from 'react'
import cx from 'classnames'

import css from '../../styles/Cards/Cards.styl'
import Card from './Card'


class Cards extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cardObjects: [
        {
          symbol: "♡",
          number: "5"
        },
        {
          symbol: "♢",
          number: "10"
        },
        {
          symbol: "♧",
          number: "2"
        },
        {
          symbol: "♤",
          number: "8"
        },
      ],
      flipCount: 0
    }
  }

  renderCardsStateAndProps() {
    return (
      <div className={css.cardsStateAndProps}>
        <h5>State:</h5>
        <div className={css.cardsStateAndPropsInner}>
          <pre>
            cardObjects: [<br />
            {this.state.cardObjects.map((cardObj) => {
              return <>&nbsp;{JSON.stringify(cardObj)}<br /></>
            })}
            ]<br />
            flipCount: {this.state.flipCount}
          </pre>
        </div>

        <h5>Props:</h5>
        <div className={css.cardsStateAndPropsInner}>
          <pre>
            {'{}'}
          </pre>
        </div>
      </div>
    )
  }

  onCardFlip = () => {
    this.setState({
      flipCount: this.state.flipCount + 1
    })
  }

  render() {
    return (
      <div className={cx(css.cards)}>
        <h4>Cards component</h4>

        {this.renderCardsStateAndProps()}

        <div>
          <Card symbol="♡" number="5" onCardFlip={this.onCardFlip} />
          <Card symbol="♢" number="2" onCardFlip={this.onCardFlip} />
          <Card symbol="♧" number="6" onCardFlip={this.onCardFlip} />
          <Card symbol="♤" number="10" onCardFlip={this.onCardFlip} />
        </div>
      </div>
    )
  }

}

export default Cards
