import { Component } from 'react'
import cx from 'classnames'

import css from '../../styles/Cards/Cards.styl'
import Card from './Card'


class Cards extends Component {

  constructor() {
    super()

    this.state = {
      cardObjects: [
        {
          key: 1,
          symbol: "♡",
          number: "5"
        },
        {
          key: 3,
          symbol: "♧",
          number: "2"
        },
        // {
        //   key: 2,
        //   symbol: "♢",
        //   number: "10"
        // },
        // {
        //   key: 4,
        //   symbol: "♤",
        //   number: "9"
        // },
      ],
      flipCount: 0,
      somethingElse: false
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
              return <div key={cardObj.key}>&nbsp;{JSON.stringify(cardObj)}<br /></div>
            })}
            ],<br />
            flipCount: {this.state.flipCount},<br />
            somethingElse: {this.state.somethingElse.toString()}
          </pre>
        </div>

        <h5>Props:</h5>
        <div className={css.cardsStateAndPropsInner}>
          <pre>
            {JSON.stringify(this.props)}
          </pre>
        </div>
      </div>
    )
  }

  handleCardFlip = () => {
    this.setState({
      flipCount: this.state.flipCount + 1,
      somethingElse: true
    })
  }

  render() {

    const createCardComponentFromCardObject = (cardObject) => {
      return (
        <Card
          symbol={cardObject.symbol}
          number={cardObject.number}
          onCardFlip={this.handleCardFlip} />
      )
    }
    
    const items = this.state.cardObjects.map(createCardComponentFromCardObject)

    return (
      <div className={cx(css.cards)}>
        <h4>Cards component</h4>

        {this.renderCardsStateAndProps()}

        <div>
          {items}
        </div>
      </div>
    )
  }

}

export default Cards
