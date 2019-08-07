import React from 'react'
// import Link from 'next/link'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import css from '../styles/Homepage.styl'


const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />

    <div className={css.homepage}>
      <h1 className="title">Welcome to Niki's Playground!</h1>
    </div>
  </div>
)

export default Home
