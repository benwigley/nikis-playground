import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import MonsterAvatar from './MonsterAvatar'

import css from '../../styles/KingOfTokyo/Player.styl'


class Player extends Component {

  constructor(props) {
    super(props)
    // console.log('props', props)
    this.state = {}
  }

  getMonsterCardImg() {
    switch (this.props.playerObject.monsterId) {
      case 1:
        return <img src="/static/images/KingOfTokyo/Card---CyberBunny.png" alt="Bunny Card" />
      case 2:
        return <img src="/static/images/KingOfTokyo/Card---MekaDragon.png" alt="Dragon Card" />
      case 3:
        return <img src="/static/images/KingOfTokyo/Card---XSmashTree.png" alt="Tree Card" />
    }
  }

  render() {
    return (
      <div className={cx(css.player, {
        [css.active]: this.props.active
      })}>
        <h3>{this.props.playerObject.name}</h3>

        <div className={css.monsterAvatarContainer}>
          {!this.props.hideMonsterAvatar && (
            <MonsterAvatar monsterId={this.props.playerObject.monsterId} />
          )}
        </div>
        {this.getMonsterCardImg()}
      </div>
    )
  }

}

Player.propTypes = {
  active: PropTypes.bool,
  hideMonsterAvatar: PropTypes.bool.isRequired,
  playerObject: PropTypes.object.isRequired
}

export default Player
