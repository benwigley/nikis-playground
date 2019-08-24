import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import css from '../../styles/KingOfTokyo/Player.styl'


class Player extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={cx(css.player, {
        [css.active]: this.props.active
      })}>
        <h3>Player {this.props.playerId}</h3>
        <img src={this.props.monsterAvatarImgUrl} />
        <img src={this.props.monsterCardImgUrl} />
      </div>
    )
  }

}

Player.propTypes = {
  playerId: PropTypes.number.isRequired,
  monsterCardImgUrl: PropTypes.string.isRequired,
  monsterAvatarImgUrl: PropTypes.string.isRequired
}

export default Player
