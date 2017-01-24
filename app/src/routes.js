export default [
  {
    path: '/login',
    name: 'login-page',
    component: require('components/loginView')
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
];
