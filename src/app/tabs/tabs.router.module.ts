import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lista',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../lista/lista.module').then(m => m.ListaPageModule)
          }
        ]
      },
      {
        path: 'adiciona',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../adiciona/adiciona.module').then(m => m.AdicionaPageModule)
          }
        ]
      },
      {
        path: 'info',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../info/info.module').then(m => m.InfoPageModule)
          }
        ]
      },
      {
        path: 'editar/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../adiciona/adiciona.module').then(m => m.AdicionaPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/lista',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/lista',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
