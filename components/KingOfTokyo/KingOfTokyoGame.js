import { Component } from 'react'
// import _ from 'lodash'

import DiceArea from './DiceArea'
import GameBoardArea from './GameBoardArea'
import Player from './Player'
import css from '../../styles/KingOfTokyo/KingOfTokyoGame.styl'


export default class KingOfTokyoGame extends Component {

  constructor(props) {
    super(props)

    this.state = {
      turns: [],
      activePlayerId: 3,
      players: [
        {
          name: "Ben",
          playerId: 1,
          monsterId: 3,
        }, {
          name: "Niki",
          playerId: 2,
          monsterId: 1,
        }, {
          name: "Treeman",
          playerId: 3,
          monsterId: 2,
        }
      ]
    }
  }

  render() {
    return (
      <div className={css.kingOfTokyoGame}>
        <h3>King of Tokyo</h3>

        <GameBoardArea />

        <DiceArea />

        <div className={css.playerCardsContainer}>
          <Player
            playerObject={this.state.players[0]}
          />
          <Player
            playerObject={this.state.players[1]}
            active={true}
          />
          <Player
            playerObject={this.state.players[2]}
          />
        </div>
      </div>
    )
  }

}
