import React from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import css from '../styles/BmiCalculator/index.styl'
import Calculator from '../components/BmiCalculator/Calculator'


const BmiCaclulator = () => (
  <div>
    <Head title="BMI Calculator" />
    <Nav />

    <div className={css.bmiCalculator}>
      <Calculator />
    </div>
  </div>
)

export default BmiCaclulator
