import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { AuthorService } from '../../services/author/author.service';
import { Response }  from "@angular/http";
import { HttpAuthInterceptorService } from '../../services/httpAuthInterceptor/http-auth-interceptor.service';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  error = {};
  book = {};
  authors : any;
  loading = false;

  constructor(private bookService: BookService, private authorService: AuthorService, private router: Router,
              private httpAuthInterceptor : HttpAuthInterceptorService) { }

  ngOnInit() {
    this.getAuthors();
  }

  //Get Authors
  getAuthors() {
    this.authorService.getAllAuthors().then((authorsList) => {
      this.authors = authorsList;
      console.log(this.authors);
    }, (err) => {
      console.log(err);
    });
  }

  //Save Book
  saveBook() {
    this.loading = true; 
    this.bookService.saveBook(this.book).then((result) => {
      swal(
        'Book Saved Successfully !',
        'saved successfully !',
        'success'
      )
      let id = result['_id'];
      this.router.navigate(['/book-details', id]);
         
    }, (err : Response) => {
      err['errorMessage'] = err.json().err.errorMessage;
      this.loading = false;
      this.error = err;
     
      if(this.error['status'] === 400){
        swal({
          title: '<i>Error! </i><u>'+this.error['errorMessage']['param']+'</u>',
          type: 'error',
          html: this.error['errorMessage']['msg'],
          showConfirmButton: true,
          showCloseButton: true
        })
      }
      else {
        swal(
          'Error !',
          this.error['errorMessage'],
          'error'
        )
      }
      
    });
  }

}
