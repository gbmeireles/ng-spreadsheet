import { Component, OnInit } from '@angular/core';
import {ActiveCellManager } from '../../Services/Managers/ActiveCellManager';

@Component({
    moduleId: module.id,
    selector: 'GgDetailsBar',
    templateUrl: 'DetailsBar.html',
    styleUrls: ['DetailsBar.css'],
})
export class DetailsBarComponent implements OnInit {
    private activeCellData: string = 'Selecione uma célula';
    constructor(private activeCellManager: ActiveCellManager) { }

    ngOnInit() {
        this.activeCellManager.subscribe((activeCell) => {
            if (activeCell.formattedData == undefined) {
                this.activeCellData = activeCell.data;
            } else {
                this.activeCellData = activeCell.formattedData;
            }
        });
    }

}