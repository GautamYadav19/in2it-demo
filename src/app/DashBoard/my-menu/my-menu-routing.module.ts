import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTaskComponent } from './my-task/my-task.component';
import { TeamTaskComponent } from './team-task/team-task.component';

const routes: Routes = [
  {path:'', redirectTo:'mytask', pathMatch:'full'},
  { path: 'mytask', component: MyTaskComponent },
  { path: 'teamtask', component: TeamTaskComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMenuRoutingModule {}
