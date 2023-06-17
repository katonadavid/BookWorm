import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { BehaviorSubject, catchError, finalize, merge, Observable, tap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { Language } from 'src/app/models/Language';
import { Publication } from 'src/app/models/Publication';
import { PublicationTableRequestDTO } from 'src/app/models/PublicationTableRequestDTO';
import { PublicationType } from 'src/app/models/PublicationType';
import { SortOrder } from 'src/app/models/SortOrder';
import { NotificationService } from 'src/app/services/notification.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: PublicationDataSource;
  displayedColumns = ["image", "title", "creator", "release", "language", "type", "action"];
  defaultPageSize = 10;
  languages = Language;
  publicationTypes = PublicationType;


  constructor(private publicationService: PublicationService, private notificationService: NotificationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new PublicationDataSource(this.publicationService, this.notificationService);
    this.dataSource.loadPublications({
      pageIndex: 0,
      pageSize: this.defaultPageSize
    });
  }

  ngAfterViewInit(): void {
      this.paginator.page.subscribe((event: PageEvent) => {

      })

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page).subscribe(() => this.loadLessonsPage());
  }

  loadLessonsPage() {
    this.dataSource.loadPublications({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortOrder: this.sort.direction == 'asc' ? SortOrder.Ascending : SortOrder.Descending,
      sortColumn: this.sort.
    });
  }

  deletePublication(publication: Publication) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: "Do you really want to delete this book?"
      }
    });

    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed && publication.id) {
        this.publicationService.deletePublication(publication.id).subscribe((...a) => {
          console.log(a);
          this.dataSource.loadPublications({
            pageIndex: 0,
            pageSize: 10
          });
        })
      }
    })
  }
}

class PublicationDataSource extends DataSource<Publication> {

  public noData = false;
  private totalItems: number;
  private publicationsSubject = new BehaviorSubject<Publication[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private publicationService: PublicationService, private notificationService: NotificationService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Publication[]> {
    return this.publicationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.publicationsSubject.complete();
    this.loadingSubject.complete();
  }

  loadPublications(request: PublicationTableRequestDTO) {
    this.loadingSubject.next(true);
    this.noData = false;

    this.publicationService.getPublications(
      {
        pageIndex: request.pageIndex,
        pageSize: request.pageSize,
        sortColumn: request.sortColumn,
        sortOrder: request.sortOrder
      }
    )
    .pipe(
      tap((data => {
        this.totalItems = data.totalItems ?? 0;
        if(data.totalItems === 0) {
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
    .subscribe(response => this.publicationsSubject.next(response.results!));
  }

  getItemCount() {
    return this.totalItems;
  }
}
