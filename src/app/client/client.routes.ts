import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../client/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'activity',
        loadComponent: () =>
          import('../client/activity/activity.page').then((m) => m.ActivityPage)          
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../client/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/client/home',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'profile/p-information',
    loadComponent: () => import('./profile/p-information/p-information.page').then( m => m.PInformationPage)
  },
  {
    path: 'profile/p-location',
    loadComponent: () => import('./profile/p-location/p-location.page').then( m => m.PLocationPage)
  },
  {
    path: 'activity/a-detail/:id',
    loadComponent: () => import('./activity/a-detail/a-detail.page').then( m => m.ADetailPage)
  },
  {
    path: 'home/h-categorie-single/:id',
    loadComponent: () => import('./home/h-categorie-single/h-categorie-single.page').then( m => m.HCategorieSinglePage)
  }


];

// export const WorkerRoutes = RouterModule.forChild(routes);
