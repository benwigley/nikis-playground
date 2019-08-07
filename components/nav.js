import { Component } from 'react'
import Link from 'next/link'
import css from '../styles/Nav.styl'


class Nav extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  renderLinksList() {
    const links = [
      {
        href: 'https://github.com/benwigley',
        label: 'Github'
      },
      {
        href: 'http://benwigley.com',
        label: 'Ben Wigley'
      }
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
