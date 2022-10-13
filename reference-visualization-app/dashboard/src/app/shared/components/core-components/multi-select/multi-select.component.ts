import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  @Input() list: any[];
  @Input() text: any;
  @Input() width1;
  @Input() width2;
  @Input() from: string = '';

  @Output() shareCheckedList = new EventEmitter();
  @Output() clearSuccessors = new EventEmitter();

  status;
  checkedList: any[];
  currentSelected: {};
  maxSelections: any;
  setAlert: boolean = false;
  constructor() {
    this.checkedList = [];
  }
  showDropDown;

  getSelectedValue(id, status, a) {
    var index;

    if (this.text !== "State") {
      if (!status) {
        index = this.checkedList.indexOf(id);
        this.checkedList.splice(index, 1);
      }

      if (this.checkedList.length <= 9) {
        if (status) {
          this.checkedList.push(id);
        }

        if (this.checkedList.length == 0) {
          this.shareCheckedlist();
        } else {
          this.clearSuccessors.emit(this.text);
        }
      } else {
        a.status = false;
        alert("You can not select more than 10 options");
      }
    } else {
      if (status) {
        this.checkedList.push(id);
      } else {
        index = this.checkedList.indexOf(id);
        this.checkedList.splice(index, 1);
      }

      if (this.checkedList.length == 0) {
        this.shareCheckedlist();
      }
    }
  }

  resetSelected() {
    this.checkedList = [];
  }

  getSelected() {
    this.shareCheckedlist();
  }
  shareCheckedlist() {
    this.shareCheckedList.emit(this.checkedList);
  }

  clearSelections() {    
    this.clearSuccessors.emit(this.text);
    this.shareCheckedList.emit(this.checkedList);
  }

  onItemsSelected(event): void {
    if (event && event.length === 0) {
      this.shareCheckedList.emit(this.checkedList);
    }
    else if(event.length > 9){
      this.maxSelections = 10;
      if(this.setAlert){
        alert('you cannot select more than 10 options')
      }
      else {
        this.setAlert = true;
      }
    }
    else{
      this.setAlert = false;
      this.maxSelections = undefined;
    }
  }

  ngOnInit() {
  }
}
