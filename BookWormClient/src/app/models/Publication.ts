

/* tslint:disable */
/* eslint-disable */
/* auto-generated file. do not modify */



import { PublicationType } from './PublicationType';
import { Language } from './Language';
import { Publisher } from './Publisher';
import { Creator } from './Creator';

export class Publication {
    id?: string;
    title?: string;
    publicationType?: PublicationType;
    language?: Language;
    publisher?: Publisher;
    publicationYear?: number;
    imageLink?: string;
    creators?: Creator[];
    
}
