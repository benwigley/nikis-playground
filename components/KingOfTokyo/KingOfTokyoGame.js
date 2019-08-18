import { Component } from 'react'

import css from '../../styles/KingOfTokyo/KingOfTokyoGame.styl'


export default class KingOfTokyoGame extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={css.kingOfTokyoGame}>
        <h3>King of Tokyo</h3>
      </div>
    )
  }

}
