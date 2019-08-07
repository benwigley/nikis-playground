const nextRoutes = require('next-routes')
const routes = nextRoutes()

const ourRoutes = [

  // Guest pages
  {
    page: 'index',
    pattern: '/',
  },
  {
    page: 'bmi-calculator',
    pattern: '/bmi-calculator'
  },
  // {
  //   page: 'shopping-list',
  //   pattern: '/shopping-list'
  // },
  // {
  //   page: 'mastermind',
  //   pattern: '/mastermind'
  // },
]

// Loop through and tell next-routes about each of our routes
ourRoutes.forEach(route => routes.add(route))

module.exports = routes
