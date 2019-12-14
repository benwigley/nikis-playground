import { Component } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import About from '../components/TjmerSite/About'


export default class TjMERAbout extends Component {

  render() {
    return (
      <div>
        <Head title="About" />
        <div>
          <About />
        </div>
      </div>
    )
  }

}
