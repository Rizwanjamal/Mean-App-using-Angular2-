import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class BookService {

  constructor(private http : Http) { }

//GET ALL BOOKS
  getAllBooks() {
    return new Promise((resolve, reject) => {
      this.http.get('/book')
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

//SHOW SINGLE BOOK BY ID
  showBookById(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/book/' + id)
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }

//SAVE BOOK
  saveBook(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/book', data)
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

//UPDATE BOOK 
  updateBook(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put('/book/' + id , data)
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

//DELETE BOOK 
  deleteBook(id) {
    return new Promise((resolve, reject) => {
      this.http.delete('/book/' + id)
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}

