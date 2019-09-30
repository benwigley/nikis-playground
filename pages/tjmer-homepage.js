import { Component } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import Homepage from '../components/TjmerSite/Homepage'


export default class TjMERHomepage extends Component {

  render() {
    return (
      <div>
        <Head title="TjMER Homepage" />
        <Nav />

        <div>
          <Homepage />
        </div>
      </div>
    )
  }

}
