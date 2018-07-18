import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent implements OnInit, OnChanges {

  @Input() length = 1;
  @Input() pageSize = 5;
  @Input() range = 3;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  pages: number[];
  totalPages: number;

  constructor() { }

  ngOnInit() {
    this.totalPages = this.getTotalPages(this.length, this.pageSize);
    this.getPages();
  }
  ngOnChanges() {
    this.getPages();
  }
  selectPage(page: number, event) {
    event.preventDefault();
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit(page);
    }
  }
  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }
  getPages() {
    this.totalPages = this.getTotalPages(this.length, this.pageSize);
    this.pages = this.getRange(this.currentPage)
      .filter(page => this.isValidPageNumber(page, this.totalPages));
  }
  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(limit, 1) / Math.max(size, 1));
  }
  getRange(pageIndex: number): number[] {
    const range = new Array();
    for (let i = pageIndex - 3; i <= pageIndex + 3; ++i) {
      range.push(i);
    }
    return range;
  }
}
