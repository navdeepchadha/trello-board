import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.sass']
})
export class AddCardComponent implements OnInit {

  public cardTitle: string = '';
  public cardDescp: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  addCard(form){
    let values = {
      subTitle: form.value.title,
      desc: form.value.desc
    }
    this.activeModal.close(values);
  }

}
