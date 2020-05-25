import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'genderFormatter',
})
export class GenderFormatter implements PipeTransform {
  constructor(private _translate: TranslateService) {}

  transform(genderKey: any): any {
    let result;
    this._translate.get(genderKey).subscribe((res) => {
      result = res;
    });
    return result;
  }
}
