import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [    
  {    
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../worker/tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../worker/tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../worker/tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/worker/tab1',
        pathMatch: 'full',
      }
    ]
  }
];

// export const WorkerRoutes = RouterModule.forChild(routes);
