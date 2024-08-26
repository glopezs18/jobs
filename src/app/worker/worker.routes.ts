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
        path: 'services-list',
        loadComponent: () => import('./services-list/services-list.page').then( m => m.ServicesListPage)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../worker/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/worker/tab1',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'profile/p-settings',
    loadComponent: () => import('./profile/p-settings/p-settings.page').then( m => m.PSettingsPage)
  },
  {
    path: 'services-list',
    loadComponent: () => import('./services-list/services-list.page').then( m => m.ServicesListPage)
  }
];

// export const WorkerRoutes = RouterModule.forChild(routes);
