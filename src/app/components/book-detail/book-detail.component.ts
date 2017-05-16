import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { Response }  from "@angular/http";
import { HttpAuthInterceptorService } from '../../services/httpAuthInterceptor/http-auth-interceptor.service';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  error = {};
  book = {};
  showAuthorDetails = false;
  
  constructor(private route: ActivatedRoute,private router: Router, private bookService: BookService, 
              private httpAuthInterceptor : HttpAuthInterceptorService) { }

  ngOnInit() {
    this.getBookDetail(this.route.snapshot.params['id']);
  }

  getBookDetail(id) {
    this.bookService.showBookById(id).then((res) => {
      if(res !== null)  {
        this.book = res;
        console.log(this.book);
      }
      else{
        this.error['status'] = 200;
        this.error['statusText'] = 'No Data Found Against Id : ' + id; 
      } 
    }, (err : Response) =>{
      err['errorMessage'] = err.json().err.errorMessage;
      this.error = err;
      swal(
          'Error !',
          this.error['errorMessage'],
          'error'
        )
    })
  }

  deleteBook(id) {
    let that = this;
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        that.bookService.deleteBook(id).then((result) => {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        that.router.navigate(['/books']);
        }, (err : Response) => {
          err['errorMessage'] = err.json().err.errorMessage;
          this.error = err;
          swal(
              'Error !',
              this.error['errorMessage'],
              'error'
            )
        })
      })
    
    }

}
