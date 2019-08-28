import { Component } from 'react'
import MonsterAvatar from './MonsterAvatar'
import cx from 'classNames'

import css from '../../styles/KingOfTokyo/GameBoardArea.styl'


export default class GameBoardArea extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const playerInTokyo = this.props.playerInTokyo || this.props.winningPlayer

    return (
      <div className={cx(css.gameBoardArea, {
        [css.gameOver]: !!this.props.winningPlayer
      })}>
        <img src={"/static/images/KingOfTokyo/GameBoard.png"} />

        {playerInTokyo && (
          <MonsterAvatar 
            monsterId={playerInTokyo.monsterId}
            className={css.monsterAvatar}
          />
        )}

        {this.props.winningPlayer && (
          <div className={css.winningMessage}>
            Congratulations {this.props.winningPlayer.name}! You have demolished Tokyo
          </div>
        )}
      </div>
    )
  }

}
