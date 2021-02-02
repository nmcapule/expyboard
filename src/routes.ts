import type { Router } from 'framework7/modules/router/router';
import Playground from './pages/Playground.svelte';
import WorkspaceSwitcher from './pages/WorkspaceSwitcher.svelte';
import Workspace from './pages/Workspace.svelte';

const routes: Router.RouteParameters[] = [
  {
    path: '/',
    component: WorkspaceSwitcher,
    master: true,
    detailRoutes: [
      {
        path: '/space/',
        component: Workspace,
      },
      {
        path: '/playground/',
        component: Playground,
      },
    ],
  },
];

export default routes;
