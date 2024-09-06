import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  // Import DomSanitizer

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,  // Set OnPush change detection
})
export class TeamTaskComponent {
  selectedFile: File | null = null;
  mediaPreview: SafeUrl | null = null;  // Use SafeUrl to store sanitized URL
  isVideo: boolean = false;  // Flag to check if the selected file is a video
  isPDF: boolean = false;    // Flag to check if the selected file is a PDF

  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {}  // Inject DomSanitizer

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Check if the file is an image, video, or PDF
    if (this.selectedFile && this.selectedFile.type.startsWith('image/')) {
      this.isVideo = false;
      this.isPDF = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.mediaPreview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);  // Sanitize the image URL
        this.cdr.markForCheck();  // Manually trigger change detection
      };
      reader.readAsDataURL(this.selectedFile);
    } else if (this.selectedFile && this.selectedFile.type.startsWith('video/')) {
      this.isVideo = true;
      this.isPDF = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.mediaPreview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);  // Sanitize the video URL
        this.cdr.markForCheck();  // Manually trigger change detection
      };
      reader.readAsDataURL(this.selectedFile);
    } else if (this.selectedFile && this.selectedFile.type === 'application/pdf') {
      this.isPDF = true;
      this.isVideo = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.mediaPreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);  // Sanitize the PDF URL
        this.cdr.markForCheck();  // Manually trigger change detection
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      console.log(this.selectedFile);
    }
  }
}
