import { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import css from '../../styles/KingOfTokyo/QuantitySelector.styl'


class QuantitySelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  render() {
    return (
      <div className={cx(css.quantitySelector, this.props.className)}>
        <div 
          className={css.leftArrow}
          onClick={this.handleLeftClick}></div>
        <div className={css.value}>
          {this.props.options[this.state.index].name}
        </div>
        <div 
          className={css.rightArrow}
          onClick={this.handleRightClick}></div>
      </div>
    )
  }

  handleLeftClick = (e) => {
    // console.log('handleLeftClick')
    this.setState(prevState => {
      return {
        index: prevState.index <= 0 ? this.props.options.length - 1 : prevState.index - 1
      }
    })
    this.sendOnChange()
  }

  handleRightClick = (e) => {
    // console.log('handleRightClick')
    this.setState(prevState => {
      return {
        index: prevState.index >= (this.props.options.length - 1) ? 0 : prevState.index + 1
      }
    })
    this.sendOnChange()
  }

  sendOnChange() {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.options[this.state.index])
    }
  }

}

QuantitySelector.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
}

export default QuantitySelector
