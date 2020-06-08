import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products;
  search = new FormControl('');
  searchValue = '';
  show = false;

  searchChange(event, val, type) {
    console.log(event.target.id);
    if (type === 'button') {
      this.searchValue = val;
      this.getData(val);
    } else {
      this.searchValue = event.target.value;
      this.getData(event.target.value);
    }
  }

  getData(search: string) {
    this.apiService.get(search).subscribe(data => {
      if (data['results'] !== undefined) {
        this.products = data['results'];
      } else {
        this.products = data;
      }
    });
  }

  showMenu(event) {
    if (this.show == false) {
      document.getElementById('options_menu').classList.remove('d-none');
      this.show = true;
    } else {
      document.getElementById('options_menu').classList.add('d-none');
      this.show = false;
    }
  }

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getData(this.searchValue);
  }
}
