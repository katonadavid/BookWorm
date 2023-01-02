import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publication } from 'src/app/models/Publication';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  dataSource: PublicationDataSource;
  displayedColumns = ["image", "title", "creator", "release", "language", "type", "action"];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataSource = new PublicationDataSource(this.dataService);
    this.dataSource.loadPublications();
  }

  deletePublication(publication: Publication) {
    console.log(publication);
  }

}

class PublicationDataSource extends DataSource<Publication> {

  private publicationsSubject = new BehaviorSubject<Publication[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService) {
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

    this.dataService.getBooks().subscribe(books => this.publicationsSubject.next(books));
  }
}
