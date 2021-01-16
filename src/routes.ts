import type { Router } from 'framework7/modules/router/router';
import Playground from './pages/Playground.svelte';
import Space from './pages/Space.svelte';

const routes: Router.RouteParameters[] = [
  {
    path: '/',
    component: Playground,
  },
  {
    path: '/space/',
    component: Space,
  },
];

export default routes;
