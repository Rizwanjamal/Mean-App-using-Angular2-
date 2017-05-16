import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { AuthorService } from '../../services/author/author.service';
import { HttpAuthInterceptorService } from '../../services/httpAuthInterceptor/http-auth-interceptor.service';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

   errors: any;
   book = {};
   authors : any;

  constructor(private bookService: BookService, private authorService: AuthorService, private router: Router, 
              private route: ActivatedRoute, private httpAuthInterceptor : HttpAuthInterceptorService) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
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

  getBook(id) {
    this.bookService.showBookById(id).then((res) => {
      this.book = res;
      this.book['author'] = res['author']['_id'];
      console.log(this.book);
    }, (err) => {
      console.log(err);
    })
  }

  updateBook(id) {
    this.bookService.updateBook(id, this.book).then((result) => {
      if(result['_id']){
        let id = result['_id'];
        swal(
          'Book Updated!',
          'Book updated successfully!',
          'success'
        )
        this.router.navigate(['/book-details', id]);
      }
      else{
        this.errors = result;
        console.log('errors :', this.errors);
      }
    }, (err) => {
        swal(
          'Book Not Updated!',
          'Something Went Wrong!',
          'error'
        )
      console.log(err);
    });
  }



}
