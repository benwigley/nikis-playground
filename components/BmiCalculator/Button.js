import { Component } from 'react'
import css from '../../styles/BmiCalculator/Button.styl'

export default class Button extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.button} onClick={this.props.onclick}>
        {this.props.text}
      </div>
    );
  }
}
