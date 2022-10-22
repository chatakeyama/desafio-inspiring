import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() emitSearchValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  search = (event?: Event): void => {
    event ? this.emitSearchValue.emit((event.target as HTMLInputElement).value) : ''
  }

}