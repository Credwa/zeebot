export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [{ path: '', component: () => import('pages/search') }],
  },

  {
    // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
];
