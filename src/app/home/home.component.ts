import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products;
  search = new FormControl('');
  searchValue = '';
  show = false;
  page = 1;
  TotalPages = 400;

  searchChange(event, val, type) {
    console.log(event.target.id);
    if (type === 'button') {
      this.search.setValue('');
      this.getData(val, this.page);
      this.searchValue = val;
    } else {
      this.searchValue = event.target.value;
      this.getData(event.target.value, this.page);
    }
  }

  getData(search: string, page) {
    this.apiService.get(search, page).subscribe((data) => {
      if (data['results'] !== undefined) {
        this.products = data['results'];
        this.TotalPages = data['total_pages'];
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

  pageChange(event) {
    this.getData(this.searchValue, event['pageIndex'] + 1);
  }

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getData(this.searchValue, this.page);
  }
}
