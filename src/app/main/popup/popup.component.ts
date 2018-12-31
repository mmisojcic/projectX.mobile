import { PopupService } from './popup.service';
import { PopupData } from './popup.data';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
    popupData: PopupData;

    constructor(private popupService: PopupService) {}

    close() {
        this.popupService.closePopup();
    }

    ngOnInit() {
        this.popupData = this.popupService.getPopupData();
    }
}
