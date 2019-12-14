import { Component } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import TranquilityHomepage from '../components/Tranquility/TranquilityHomepage'


export default class Tranquility extends Component {

  render() {
    return (
      <div>
        <Head title="Tranquility" />
        <div>
          <TranquilityHomepage />
        </div>
      </div>
    )
  }

}
