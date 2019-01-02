import { Subject } from 'rxjs';

export class NavigationService {
	loadValue: Subject<Data> = new Subject();
	showMenuButton: Subject<boolean> = new Subject();

	selectMenuItem(index: number, value: boolean) {
		const data = new Data(index, value);
		this.loadValue.next(data);
	}
}
export class Data {
	constructor(public index: number, public value: boolean) {}
}
