import { Component } from 'react'

// App Components
import Button from './Button'
import Range from './Range'

import css from '../../styles/BmiCalculator/Calculator.styl'


export default class Calculator extends Component {

  constructor(props) {
    super(props)
    this.state = this.defaultState()
  }

  render() {
    let styles = this.getStyles()
    return (
      <div className={css.calculator}>
        <h3>BMI Healthy Weight Calculator</h3>
        <div className={css.bmiResultContainer}>
          <div className={css.bmiResult}>
            <div className={css.bmiResultNumber}>
              Body Mass Index (BMI) = {this.state.bmi}
            </div>
            <div style={styles[this.state.bmiClass.split(' ')[0].toLowerCase()]}>
              {this.state.bmiClass}
            </div>
          </div>
        </div>

        <div className={css.bmiInput}>
          <div className={css.inputFields}>
            <div className={css.inputGroup}>
              <span className={css.label}>Height (cm)</span>
              <Range min={90} max={245} value={this.state.height} onChange={this.heightChange} />
            </div>

            <div className={css.inputGroup}>
              <span className={css.label}>Weight (kg)</span>
              <Range min={35} value={this.state.weight} onChange={this.weightChange} />
            </div>
          </div>
        </div>
        <div className={css.bmiInput}>
          <Button text='Reset' onclick={this.reset} />
        </div>
      </div>
    )
  }

  heightChange = (height) => {
    this.setState({ height: height }, this.setBmi)
  }

  weightChange = (weight) => {
    this.setState({ weight: weight }, this.setBmi)
  }

  reset = () => {
    this.setState(this.defaultState())
  }

  defaultState = () => {
    return {
      height: 156,
      weight: 76,
      bmi: 20.9,
      bmiClass: 'Normal Weight'
    }
  }

  setBmi = () => {
    let bmi = ((this.state.weight / this.state.height / this.state.height) * 10000).toFixed(2)
    this.setState({ bmi: bmi, bmiClass: this.getBmiClass(bmi) })
  }

  getBmiClass = (bmi) => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal Weight'
    if (bmi >= 25 && bmi <= 29.9) return 'Overweight'
    if (bmi >= 30) return 'Obese'
  }

  getStyles = () => {
    return {
      underweight: { color: '#FFFFFF' },
      normal: { color: '#F9F68D' },
      overweight: { color: '#FED88B' },
      obese: { color: '#FF5411' }
    }
  }
}
