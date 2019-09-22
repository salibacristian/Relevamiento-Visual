import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoLogInGuard } from './guard/no-log-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'log-in',
    loadChildren: './log-in/log-in.module#LogInPageModule',
    canActivate: [NoLogInGuard]

  },
  { path: 'linda', loadChildren: './page/cosas-lindas/cosas-lindas.module#CosasLindasPageModule',canActivate: [AuthGuard] },
  { path: 'fea', loadChildren: './page/cosas-feas/cosas-feas.module#CosasFeasPageModule',canActivate: [AuthGuard] },
  { path: 'fotos', loadChildren: './page/fotos/fotos.module#FotosPageModule',canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
