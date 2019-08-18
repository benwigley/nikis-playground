import React from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import KingOfTokyoGame from '../components/KingOfTokyo/KingOfTokyoGame'


const KingOfTokyoPage = () => (
  <div>
    <Head title="King of Tokyo" />
    <Nav />

    <div>
      <KingOfTokyoGame />
    </div>
  </div>
)

export default KingOfTokyoPage
