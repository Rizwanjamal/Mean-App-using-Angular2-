import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author/author.service';
import { Response }  from "@angular/http";
import { HttpAuthInterceptorService } from '../../services/httpAuthInterceptor/http-auth-interceptor.service';
import { default as swal } from 'sweetalert2'

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {

  loading = false;
  error = {};
  author = {};

  constructor(private authorService: AuthorService, private router: Router, private httpAuthInterceptor : HttpAuthInterceptorService) { }

  ngOnInit() {
  }

  saveAuthor() {
    this.loading = true; 
     this.authorService.saveAuthor(this.author).then((result) => {
      swal(
        'Author Saved Successfully !',
        'saved successfully !',
        'success'
      )
      let id = result['_id'];
      this.router.navigate(['/books']);
         
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
