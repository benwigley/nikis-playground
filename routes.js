const nextRoutes = require('next-routes')
const routes = nextRoutes()

const ourRoutes = [

  // Guest pages
  {
    page: 'index',
    pattern: '/',
    name: 'Home'
  },
  {
    page: 'king-of-tokyo',
    pattern: '/king-of-tokyo',
    name: 'King of Tokyo'
  },
  // {
  //   page: 'bmi-calculator',
  //   pattern: '/bmi-calculator'
  //   name: 'BMI Calculator'
  // },
  // {
  //   page: 'shopping-list',
  //   pattern: '/shopping-list'
  //   name: 'Shopping List'
  // },
  // {
  //   page: 'mastermind',
  //   pattern: '/mastermind'
  //   name: 'Mastermind'
  // },
]

// Loop through and tell next-routes about each of our routes
ourRoutes.forEach(route => routes.add(route))

module.exports = routes
