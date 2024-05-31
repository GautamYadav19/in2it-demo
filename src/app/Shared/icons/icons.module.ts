import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  User,
  Users,
  AlignJustify,
  Layers,
  Star,
  Slack,
  Menu,
  Circle,
  Clock,
  Crosshair,
  GitPullRequest,
  Wind,
  UserCheck,
  Dribbble,
  Command,
  Grid,
  Hexagon,
  Bell,
  allIcons,
} from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  User,
  Users,
  AlignJustify,
  Layers,
  Star,
  Slack,
  Menu,
  Circle,
  Clock,
  Crosshair,
  GitPullRequest,
  Wind,
  UserCheck,
  Dribbble,
  Command,
  Grid,
  Hexagon,
  Bell
};
@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(allIcons)],
  exports: [FeatherModule],
})
export class IconsModule {}
