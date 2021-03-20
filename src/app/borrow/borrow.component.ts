import { Component, Input, OnInit } from '@angular/core';
import { BooksModel } from '../bookModel';
import { BorrowService } from './borrow.service';
import { UserModel } from '../userModel';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent implements OnInit {

  @Input() userData: UserModel;
  bookDetail: BooksModel;
  success1: false;
  success: 'Success';

  constructor(private booksService: BorrowService) {}
  
  ngOnInit() {
  }

  getBooksDetails (id: string) {
    this.booksService.getBookDetails(id).subscribe(result => {
      this.bookDetail = result;
    })
  }

  borrowButtonClick (bookDetail: BooksModel) {
    const numWeeks = 2;
    this.getBooksDetails(bookDetail.book_id);
    if( bookDetail.status !== 'AVAILABLE') {
      return 'Book is not available in library';
    }
    if(this.userData.borrowedBooks >= 3) {
      return 'Cannot borrow more than 3 books';
    } else {
      bookDetail.user_borrowed = this.userData.id;
      const date = new Date();
      const returnDate = new Date(date.setDate(date.getDate() + numWeeks*7));
      bookDetail.return_due_date = returnDate.toDateString();
      bookDetail.status = 'BORROWED';
      this.booksService.borrowBooks(bookDetail).subscribe(result => {
        if(result) {
          this.success1 = result;
        } else {
          return 'some error';
        }
      });
    }
  }

}
