import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';

export default class TableActionsBuilder {
  constructor() {
    this.actions = [];
  }

  private actions: TableActionsModel[];

  private addEdit() {
    const editObject = new TableActionsModel('edit', 'fa fa-pencil');

    this.actions.push(editObject);
  }

  private addDelete() {
    const deleteObject = new TableActionsModel('delete', 'fa fa-close cfa-red');

    this.actions.push(deleteObject);
  }

  private addDetail() {
    const detailObject = new TableActionsModel('detail', 'fa fa-eye');

    this.actions.push(detailObject);
  }

  public getEditAndDelete(): TableActionsModel[] {
    this.addEdit();
    this.addDelete();

    return this.actions;
  }

  public getDetail(): TableActionsModel[] {
    this.addDetail();

    return this.actions;
  }

  public getDetailAndDelete(): TableActionsModel[] {
    this.addDetail();
    this.addDelete();

    return this.actions;
  }

  public getAllActions(): TableActionsModel[] {
    this.addEdit();
    this.addDetail();
    this.addDelete();

    return this.actions;
  }
}
