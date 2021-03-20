import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowComponent } from './borrow.component';
import { BorrowService } from './borrow.service';
import { observable, of as observableOf } from 'rxjs';

const mockBookDetailObject = {
  'book_id': '9781593275846',
  'title': 'Eloquent JavaScript, Second Edition',
  'sub_title': 'A Modern Introduction to Programming',
  'author': 'Marijn Haverbeke',
  'published': '2014-12-14T00:00:00.000Z',
  'publisher': 'No Starch Press',
  'pages': 472,
  'description': 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
  'status': 'Available',
  'return_due_date': '',
  'user_borrowed': '',
  'fine': ''
};

class MockAppService {
  borrowBooks () {/** */}
  getBookDetails () {/** */}

}

fdescribe('BorrowComponent', () => {
  let component: BorrowComponent;
  let fixture: ComponentFixture<BorrowComponent>;
  let booksService: BorrowService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowComponent ],
      providers: [
      {provide: BorrowService, useClass: MockAppService}
      ]
    })
    .compileComponents();
    booksService = TestBed.get(BorrowService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBookDetails', () => {
    const id = '123';
    spyOn(booksService, 'getBookDetails').and.returnValue(observableOf(mockBookDetailObject));
    component.getBooksDetails(id);
    expect(component.bookDetail).toBeDefined();
  })

  it('should call borrowButtonClick', () => {
    component.userData = {
      id: '123',
      borrowedBooks: 2
    }
    spyOn(component, 'getBooksDetails');
    spyOn(booksService, 'borrowBooks').and.returnValue(observableOf(true));
    const result = component.borrowButtonClick(mockBookDetailObject);
    expect(component.getBooksDetails).toHaveBeenCalled();
    expect(result).toBeTruthy();
  })

});
