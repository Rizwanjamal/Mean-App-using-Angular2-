import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { default as swal } from 'sweetalert2'

// Http Interceptor
import { HttpInterceptorModule, HttpInterceptorService,  } from 'ng-http-interceptor';

//To Prevent 404 Error
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//Bootstrap Imports
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

//Routing Module
import { RouterModule, Routes } from '@angular/router';

//Services
import { BookService } from './services/book/book.service';
import { AuthorService } from './services/author/author.service';
import { UserService } from './services/user/user.service';
import { HttpAuthInterceptorService } from './services/httpAuthInterceptor/http-auth-interceptor.service';

//Components
import { AppComponent } from './app.component';
import { BookComponent } from '../app/components/book/book.component';
import { BookDetailComponent } from '../app/components/book-detail/book-detail.component';
import { BookCreateComponent } from '../app/components/book-create/book-create.component';
import { BookEditComponent } from '../app/components/book-edit/book-edit.component';
import { AuthorCreateComponent } from '../app/components/author-create/author-create.component';
import { NotFoundComponent } from '../app/components/not-found/not-found.component';
import { LoginComponent } from '../app/components/login/login.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { FooterComponent } from '../app/components/footer/footer.component';

import { AuthGuard } from '../app/authGuard/auth.guard';

const appRoutes : Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full' },
  { path : 'login', component: LoginComponent },
  { path : 'books', component : BookComponent, canActivate: [AuthGuard] },
  { path : 'book-details/:id', component: BookDetailComponent },
  { path : 'book-create', component: BookCreateComponent, canActivate: [AuthGuard] },
  { path : 'book-edit/:id', component: BookEditComponent },
  { path : 'author-create', component: AuthorCreateComponent, canActivate: [AuthGuard]},
  { path : '404', component: NotFoundComponent },
  { path : '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    AuthorCreateComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpInterceptorModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot()
  ],
  providers: [
    BookService,
    AuthorService,
    UserService,
    AuthGuard,
    HttpAuthInterceptorService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
