import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.sass']
})
export class AddListComponent implements OnInit {

  public listTitle: string = '';
  public listCards: Array<any> = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  addCardsToList(listcontent) {
    let obj = {
      subTitle: '',
      id: 'id' + Date.now(),
      desc: ''
    }
    this.listCards.push(obj);
    listcontent.scrollTop = listcontent.scrollHeight + 100;
  }

  removeCardsFromList(index) {
    this.listCards.splice(index, 1);
  }

  addList() {
    let values = {
      title: this.listTitle,
      uid: 'uid' + Date.now(),
      list: this.listCards
    }
    this.activeModal.close(values);
  }

  checkCardList() {
    if (this.listCards.length > 0) {
      let test = this.listCards.some(d => !d.subTitle || !d.desc)
      if (test) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
