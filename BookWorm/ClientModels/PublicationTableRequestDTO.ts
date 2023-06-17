

/* tslint:disable */
/* eslint-disable */
/* auto-generated file. do not modify */



import { Creator } from './Creator';
import { Language } from './Language';
import { PublicationType } from './PublicationType';
import { PublicationTableSortColumn } from './PublicationTableSortColumn';
import { SortOrder } from './SortOrder';

export class PublicationTableRequestDTO {
    textFilter?: string;
    creatorFilter?: Creator;
    yearFilter?: number;
    languageFilter?: Language;
    publicationTypeFilter?: PublicationType;
    pageIndex?: number;
    pageSize?: number;
    sortColumn?: PublicationTableSortColumn;
    sortOrder?: SortOrder;
    
}
