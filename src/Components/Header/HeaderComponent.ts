import { HostBinding, HostListener, Component, Input, ElementRef, OnDestroy  } from '@angular/core';

import {
    RowHeightManager,
} from '../../Services/Services';
import { NumberRowListComponent } from '../../Components/NumberRowList/NumberRowListComponent';
import { HeaderSectionComponent } from '../../Components/Header/HeaderSection/HeaderSectionComponent';
import { RowListComponent } from '../../Components/RowList/RowListComponent';
import { GridSection } from '../../Model/GridSection';
import { GridRow } from '../../Model/GridRow';

@Component({
    moduleId: module.id,
    selector: 'GgHeader',
    templateUrl: 'Header.html',
    styleUrls: ['Header.css'],
    directives: [NumberRowListComponent, HeaderSectionComponent, RowListComponent],
})
export class HeaderComponent implements OnDestroy {
    @HostBinding('style.height') height: number;
    @Input('rowCount') rowCount: number;
    @Input('numberTitleRowList') numberTitleRowList: GridRow[];
    @Input('gridSectionList') gridSectionList: GridSection[];

    private unsubscribeToRowHeightManagerChanges: () => void;

    constructor(private rowHeightManager: RowHeightManager) {
        this.unsubscribeToRowHeightManagerChanges =
            this.rowHeightManager.subscribe(rowHeight => this.updateHeight());
    }

    ngOnChanges() {
        this.updateHeight();
    }

    ngOnDestroy() {
        this.unsubscribeToRowHeightManagerChanges();
    }

    private updateHeight() {
        this.height = this.rowCount * this.rowHeightManager.get() + 20;
    }
}