import { Component } from 'react'
import { Link } from '../routes'
import css from '../styles/Nav.styl'


class Nav extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  renderLinksList() {
    const links = [
      {
        href: '/',
        label: 'Home'
      },
      // {
      //   href: '/bmi-calculator',
      //   label: 'BMI Calculator'
      // },
      {
        href: '/king-of-tokyo',
        label: 'King of Tokyo'
      },
      // {
      //   href: '/shopping-list',
      //   label: 'Shopping List'
      // },
      // {
      //   href: '/mastermind',
      //   label: 'Mastermind'
      // },
      {
        href: '/cards',
        label: 'Cards'
      },
    ]
    return (
      links.map(link => {
        return (
          <div
            key={`nav-link-${link.href}-${link.label}`}
            className={css.navLink}>
            <Link prefetch href={link.href}>
              <a>{link.label}</a>
            </Link>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <nav className={css.nav}>
        {this.renderLinksList()}
      </nav>
    )
  }
}

export default Nav
