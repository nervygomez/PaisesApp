import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit, OnDestroy {


  @Input() placeholder: string = ''
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  termino: string = '';
  subject = new Subject<string>();

  ngOnInit(): void {
    this.subject
      .pipe(debounceTime(600))
      .subscribe(val => {
        this.onDebounce.emit(val)
      })
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  presskeys() {
    this.subject.next(this.termino)
  }
}
