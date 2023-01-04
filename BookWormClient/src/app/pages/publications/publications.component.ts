import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, catchError, finalize, Observable, tap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
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

  constructor(private dataService: DataService, private notificationService: NotificationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new PublicationDataSource(this.dataService, this.notificationService);
    this.dataSource.loadPublications();
  }

  deletePublication(publication: Publication) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: "Do you really want to delete this book?"
      }
    });

    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed && publication.id) {
        this.dataService.deleteBook(publication.id).subscribe((...a) => {
          console.log(a);
          this.dataSource.loadPublications();
        })
      }
    })
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
