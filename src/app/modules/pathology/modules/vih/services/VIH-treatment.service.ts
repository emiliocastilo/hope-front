import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VIHTreatmentService {
    // private vihDataPath: string = '../../../../../../assets/data/vih';
    private vihDataPath: string = '/data/vih';
    constructor(private _httpClient: HttpClient) { }

    public getGuidelines() {
        return this._httpClient.get(`${this.vihDataPath}/guidelines.json`);
    }

}
