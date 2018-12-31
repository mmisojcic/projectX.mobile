import { EventEmitter } from '@angular/core';
import { PopupData } from './popup.data';

export class PopupService {
    open: EventEmitter<boolean> = new EventEmitter();

    private popupData: PopupData;
    public getPopupData() {
        return this.popupData;
    }

    openPopup(title: string, message: string) {
        this.popupData = new PopupData(title, message);
        this.open.emit(true);
    }

    closePopup() {
        this.open.emit(false);
    }
}
