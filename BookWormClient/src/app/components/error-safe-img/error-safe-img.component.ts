import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-error-safe-img',
  templateUrl: './error-safe-img.component.html',
  styleUrls: ['./error-safe-img.component.scss']
})
export class ErrorSafeImgComponent implements AfterViewInit{
  @ViewChild("img")
  img: ElementRef<HTMLImageElement>;

  @Input()
  src: string;

  @Input()
  height: number;

  @Input()
  width: number;

  errorImg = false;

  ngAfterViewInit() {
    this.img.nativeElement.onerror = () => {
      if (!this.errorImg) {
        this.errorImg = true;
        this.img.nativeElement.src = "/assets/img/no-image.svg";
      }
    }
  }
}
