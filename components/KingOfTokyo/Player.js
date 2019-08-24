import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import css from '../../styles/KingOfTokyo/Player.styl'


class Player extends Component {

  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {}
  }

  getMonsterAvatarImg() {
    switch (this.props.player.monsterId) {
      case 1: 
        return <img src="/static/images/KingOfTokyo/Monster--CyberBunny.png" alt="Bunny Monster" />
      case 2:
        return <img src="/static/images/KingOfTokyo/Monster--MekaDragon.png" alt="Dragon Monster" />
      case 3:
        return <img src="/static/images/KingOfTokyo/Monster--XSmashTree.png" alt="Tree Monster" />
    }
  }

  getMonsterCardImg() {
    switch (this.props.player.monsterId) {
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
        <h3>{this.props.player.name}</h3>
        {this.getMonsterAvatarImg()}
        {this.getMonsterCardImg()}
      </div>
    )
  }

}

Player.propTypes = {
  active: PropTypes.bool,
  player: PropTypes.object.isRequired
}

export default Player
