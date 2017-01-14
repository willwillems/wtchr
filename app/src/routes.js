export default [
  {
    path: '/testpage',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/',
    name: 'main-page',
    component: require('components/MainView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
