import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { Router } from '@angular/router';
import { HttpAuthInterceptorService } from '../../services/httpAuthInterceptor/http-auth-interceptor.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;

  constructor(private bookService : BookService,  private httpAuthInterceptor : HttpAuthInterceptorService) { }

  ngOnInit() {
    this.getBookList();
  }

  getBookList(){
    this.bookService.getAllBooks().then((res) => {
      this.books = res;
    }, (err) => {
      console.log(err);
    });
  }

}
