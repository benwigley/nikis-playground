import { Component } from 'react'
import Head from '../components/Head'
import Nav from '../components/Nav'
import '../styles/global/base.styl'
import Cards from '../components/Cards/Cards'


export default class CardsPage extends Component {

  componentDidMount() {
    // Set the theme for our route to Dark by adding
    // the "dark" classname to the base <html> tag.
    document.getElementsByTagName('html')[0].classList.add('dark')
  }

  componentWillUnmount() {
    // Remove the dark theme when leaving this route.
    // If the next rlute also want to use a theme, they can
    // set a theme className the same way that we have done here.
    document.getElementsByTagName('html')[0].classList.remove('dark')
  }

  render() {
    return (
      <div>
        <Head title="Cards" />
        <Nav />

        <Cards />
      </div>
    )
  }

}
