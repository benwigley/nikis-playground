import { Component } from 'react'

import css from '../../styles/KingOfTokyo/GameBoardArea.styl'


export default class GameBoardArea extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={css.gameBoardArea}>
        <img src={"/static/images/KingOfTokyo/GameBoard.png"} />
      </div>
    )
  }

}
