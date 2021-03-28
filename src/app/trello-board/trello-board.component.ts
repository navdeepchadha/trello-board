import { AddListComponent } from './add-list/add-list.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddCardComponent } from './add-card/add-card.component';

@Component({
  selector: 'app-trello-board',
  templateUrl: './trello-board.component.html',
  styleUrls: ['./trello-board.component.sass']
})
export class TrelloBoardComponent implements OnInit {

  public trelloList: Array<any> = [];
  private modalRef: any;
  private ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: true,
    centered: true,
    size: 'lg',
    scrollable: true
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.trelloList = localStorage.getItem('TrelloList') ? JSON.parse(localStorage.getItem('TrelloList')) : [];
    // this.trelloList = [{
    //   title: 'Teams',
    //   uid: 'uid' + Date.now(),
    //   list: [{
    //     subTitle: 'Product',
    //     id: 'id' + Date.now(),
    //     desc: '3 pending tasks to be picked'
    //   },
    //   {
    //     subTitle: 'Sales',
    //     id: 'id' + Date.now(),
    //     desc: 'Send Proposal'
    //   }]
    // }, {
    //   title: 'Product',
    //   uid: 'uid' + Date.now(),
    //   list: [{
    //     subTitle: 'UAT',
    //     id: 'id' + Date.now(),
    //     desc: 'Ask team to set up testing infra'
    //   }]
    // }]
  }

  trackByListId(index: number, item: any): string {
    return item.uid;
  }

  trackByTaskId(index: number, item: any): string {
    return item.id;
  }

  removeListItem(id) {
    let index = this.trelloList.findIndex(x => x.uid === id);
    if (index !== -1) {
      this.trelloList.splice(index, 1);
      this.setDataToLocalStorage();
    }
  }

  removeTaskItem(uid, id) {
    let listIndex = this.trelloList.findIndex(x => x.uid === uid);
    if (listIndex !== -1) {
      let taskIndex = this.trelloList[listIndex].list.findIndex(x => x.id === id);
      if (taskIndex !== -1) {
        this.trelloList[listIndex].list.splice(taskIndex, 1);
        this.setDataToLocalStorage();
      }
    }
  }

  addList() {
    this.modalRef = this.modalService.open(AddListComponent, this.ngbModalOptions).result
      .then((res: boolean) => {
        if (res) {
          this.trelloList.push(res);
          this.setDataToLocalStorage();
        }
      })
      .catch(() => {
      });
  }

  addCard(list) {
    this.modalRef = this.modalService.open(AddCardComponent, this.ngbModalOptions).result
      .then((res: boolean) => {
        if (res) {
          res['id'] = Date.now()
          list.push(res);
          this.setDataToLocalStorage();
        }
      })
      .catch(() => {
      });
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev, item, task) {
    ev.dataTransfer.setData("json", JSON.stringify({
      uid: item.uid,
      task: task
    }));
  }

  drop(ev, item) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("json"));
    let listIndex = this.trelloList.findIndex(x => x.uid === data.uid);
    if (listIndex !== -1) {
      let taskIndex = this.trelloList[listIndex].list.findIndex(x => x.id === data.task.id);
      if (taskIndex !== -1) {
        this.trelloList[listIndex].list.splice(taskIndex, 1);
      }
    }
    item.list.unshift(data.task);
    this.setDataToLocalStorage();
  }

  setDataToLocalStorage() {
    localStorage.setItem('TrelloList', JSON.stringify(this.trelloList));
  }

}
