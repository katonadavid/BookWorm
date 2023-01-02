

/* tslint:disable */
/* eslint-disable */
/* auto-generated file. do not modify */



import { PublicationType } from './PublicationType';
import { Creator } from './Creator';
import { Language } from './Language';
import { Publisher } from './Publisher';

export class Publication {
    id?: number;
    title?: string;
    publicationType?: PublicationType;
    creators?: Creator[];
    language?: Language;
    publisher?: Publisher;
    publicationYear?: number;
    imageLink?: string;
    
}
