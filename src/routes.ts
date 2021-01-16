import type { Router } from 'framework7/modules/router/router';
import Playground from './pages/Playground.svelte';
import SpacesNavigator from './pages/SpacesNavigator.svelte';
import Space from './pages/Space.svelte';

const routes: Router.RouteParameters[] = [
  {
    path: '/',
    component: SpacesNavigator,
    master: true,
    detailRoutes: [
      {
        path: '/space/',
        component: Space,
      },
      {
        path: '/playground/',
        component: Playground,
      },
    ],
  },
];

export default routes;
