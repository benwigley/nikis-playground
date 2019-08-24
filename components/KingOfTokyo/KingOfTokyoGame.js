import { Component } from 'react'

import DiceArea from './DiceArea'
import GameBoardArea from './GameBoardArea'
import Player from './Player'
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

        <GameBoardArea />

        <DiceArea />

        <div className={css.playerCardsContainer}>
          <Player 
            playerId={1} 
            ben={'awesome'}
            monsterCardImgUrl="/static/images/KingOfTokyo/Card---CyberBunny.png"
            monsterAvatarImgUrl="/static/images/KingOfTokyo/Monster--CyberBunny.png" />
          <Player 
            playerId={2}
            monsterCardImgUrl="/static/images/KingOfTokyo/Card---MekaDragon.png"
            monsterAvatarImgUrl="/static/images/KingOfTokyo/Monster--MekaDragon.png"
            active={true} />
          <Player 
            playerId={3}
            monsterCardImgUrl="/static/images/KingOfTokyo/Card---XSmashTree.png"
            monsterAvatarImgUrl="/static/images/KingOfTokyo/Monster--XSmashTree.png" />
        </div>
      </div>
    )
  }

}
