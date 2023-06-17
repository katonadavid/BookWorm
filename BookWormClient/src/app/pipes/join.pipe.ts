import { Pipe, PipeTransform } from "@angular/core";
import { Creator } from "../models/Creator";

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform{

  transform(creator: Creator) {
    console.log(creator);

    return `${creator.firstName}${creator.middleName ? ' ' + creator.middleName + ' ' : ' '}${creator.lastName}`;
  }
}
