import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [    
  {    
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
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
        path: 'job-request',
        loadComponent: () => import('./job-request/job-request.page').then( m => m.JobRequestPage)        
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
    path: 'job-request/j-r-detail',
    loadComponent: () => import('./job-request/j-r-detail/j-r-detail.page').then( m => m.JRDetailPage)
  },
  {
    path: 'job-request/j-r-history',
    loadComponent: () => import('./job-request/j-r-history/j-r-history.page').then( m => m.JRHistoryPage)
  },
  {
    path: 'job-request/j-r-history/j-r-h-detail',
    loadComponent: () => import('./job-request/j-r-history/j-r-h-detail/j-r-h-detail.page').then( m => m.JRHDetailPage)
  },
  {
    path: 'job-request/j-r-chat-list',
    loadComponent: () => import('./job-request/j-r-chat-list/j-r-chat-list.page').then( m => m.JRChatListPage)
  },
  {
    path: 'job-request/j-r-chat-list/j-r-chat-detail',
    loadComponent: () => import('./job-request/j-r-chat-list/j-r-chat-detail/j-r-chat-detail.page').then( m => m.JRChatDetailPage)
  }
  // {
  //   path: 'services-list',
  //   loadComponent: () => import('./services-list/services-list.page').then( m => m.ServicesListPage)
  // },
  // {
  //   path: 'job-request',
  //   loadComponent: () => import('./job-request/job-request.page').then( m => m.JobRequestPage)
  // }
];

// export const WorkerRoutes = RouterModule.forChild(routes);
