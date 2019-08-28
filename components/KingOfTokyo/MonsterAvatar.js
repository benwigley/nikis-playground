import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import css from '../../styles/KingOfTokyo/MonsterAvatar.styl'


class MonsterAvatar extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  getMonsterAvatarImg() {
    switch (this.props.monsterId) {
      case 1:
        return <img src="/static/images/KingOfTokyo/Monster--CyberBunny.png" alt="Bunny Monster" />
      case 2:
        return <img src="/static/images/KingOfTokyo/Monster--MekaDragon.png" alt="Dragon Monster" />
      case 3:
        return <img src="/static/images/KingOfTokyo/Monster--XSmashTree.png" alt="Tree Monster" />
    }
  }

  render() {

    return (
      <div className={cx(css.monsterAvatar, this.props.className)}>
        {this.getMonsterAvatarImg()}
      </div>
    )
  }

}

MonsterAvatar.propTypes = {
  monsterId: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default MonsterAvatar
