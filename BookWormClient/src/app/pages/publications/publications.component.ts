import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
import { Publication } from 'src/app/models/Publication';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  dataSource: PublicationDataSource;
  displayedColumns = ["image", "title", "creator", "release", "language", "type", "action"];

  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.dataSource = new PublicationDataSource(this.dataService, this.notificationService);
    this.dataSource.loadPublications();
    this.dataSource.loading$.subscribe(x => console.log(x))
  }

  deletePublication(publication: Publication) {
    console.log(publication);

    if (publication.id) {
      this.dataService.deleteBook(publication.id).subscribe((...a) => {
        console.log(a);

      })
    }
  }

}

class PublicationDataSource extends DataSource<Publication> {

  public noData = false;
  private publicationsSubject = new BehaviorSubject<Publication[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService, private notificationService: NotificationService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Publication[]> {
    return this.publicationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.publicationsSubject.complete();
    this.loadingSubject.complete();
  }

  loadPublications() {
    this.loadingSubject.next(true);
    this.noData = false;

    this.dataService.getBooks()
    .pipe(
      tap((data => {
        if(data.length === 0) {
          this.noData = true;
        }
      })),
      catchError(() => {
        this.noData = true;
        this.notificationService.openSnackBar("An error occurred");
        return [];
      }),
      finalize(() => this.loadingSubject.next(false)),
    )
    .subscribe(books => this.publicationsSubject.next(books));
  }
}
