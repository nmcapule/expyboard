import type { Router } from 'framework7/types';

import Home from './pages/Home.svelte';

const routes: Router.RouteParameters[] = [
  {
    path: '/',
    component: Home,
  },
];

export default routes;
