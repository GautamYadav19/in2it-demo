import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Set OnPush change detection
})
export class TeamTaskComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  constructor(private cdr: ChangeDetectorRef) {}

  onFileSelected(event: any) {
    this.imagePreview = this.videoPreview = null; // add for double click on a same button
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && this.selectedFile?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(this.selectedFile);
    } else if (
      this.selectedFile &&
      this.selectedFile?.type.startsWith('video/')
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoPreview = reader.result as string;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
