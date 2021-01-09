import type { Router } from 'framework7/modules/router/router';
import Home from './pages/Home.svelte';

const routes: Router.RouteParameters[] = [
  {
    path: '/',
    component: Home,
  },
];

export default routes;
