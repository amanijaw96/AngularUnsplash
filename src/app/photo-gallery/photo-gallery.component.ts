import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  @Input() products;

  load = false;
  removeSkeleton(id) {
    console.log(id);
    this.load = true;
    document.getElementById(id).style.display = 'block';
    document.getElementById(id + '_skeleton').style.display = 'none';
  }
  constructor() {}
  ngOnInit(): void {
    console.log(this.products);
  }
}
