export class RowDataModel {
    constructor(
        public columns: Array<any> = new Array<any>()
    ) { }

    public pushColumn(value:any){
        this.columns.push(value);
    }

    public popColumn(){
        this.columns.pop();
    }
}