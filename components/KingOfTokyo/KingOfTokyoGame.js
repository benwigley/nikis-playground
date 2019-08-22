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
        <p>To find this file, global search 'King of Tokyo' in your text editor</p>
        {/*
          First step: Plan out what the game will look like.
          You can use a notepad or just plan it right here in these comments.

          Things to consider:
            * What components will you need?
              * e.g. Game Board, Player Cards, etc
        */}
      </div>
    )
  }

}
