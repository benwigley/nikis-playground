import React from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import css from '../styles/BmiCalculator.styl'


const BmiCaclulator = () => (
  <div>
    <Head title="BMI Calculator" />
    <Nav />

    <div className={css.homepage}>
      <h1 className="title">Welcome to Niki's BMI Calculator!</h1>
    </div>
  </div>
)

export default BmiCaclulator
