import {
    Component,
    ComponentRef,
    forwardRef,
    DynamicComponentLoader,
    Input,
    ElementRef,
    Injector,
    HostBinding,
    HostListener,
    ChangeDetectorRef,
    SimpleChange,
    ApplicationRef,
    ViewChild,
    ReflectiveInjector,
    AfterViewInit,
    ViewContainerRef,
    Inject,
    EventEmitter,
    OnInit,
    OnDestroy,
    Optional,
} from '@angular/core';
import {
    Cell,
    GridCell,
    ColumnPositionInformationMap,
    ContentTypeEnum,
    CellLocation,
} from '../../Model/Model';
import {
    DISPATCHER_TOKEN,
    Action,
    UpdateColumnSizeAction,
    GoToCellLocationAction,
} from '../../Events/Events';
import {
    CellPositionUpdater,
    CellManager,
} from '../../Services/Services';
import {
    EditableComponent,
    ViewableComponent,
} from '../Model/CustomComponent';
import { Subscription } from 'rxjs/Subscription';

import { IsCellActiveChecker } from './IsCellActiveChecker';
import { SpreadsheetState } from '../SpreadsheetState';
import { BodySectionComponent } from '../BodySectionComponent';

const css = `
:host {
    display: block;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    -moz-text-overflow: ellipsis;
    text-overflow: ellipsis;
    height: 100%;
    position: relative;
}

CellComponent {
    padding: 2px;
}

:host.is-custom CellComponent {
    padding: 0px;
}
`;

@Component({
    selector: 'Cell',
    template: '<CellComponent ref-cellComponent>{{data}}</CellComponent>',
    styles: [css],
})
export class CellComponent implements OnInit, OnDestroy, Cell, AfterViewInit {
    @Input('cell') gridCell: GridCell;
    @Input('rowData') rowData: any;
    @Input('index') index: number;
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
    @Input('gridSectionScrollLeft') gridSectionScrollLeft: number;
    @Input('activeCellLocation') activeCellLocation: CellLocation;
    @HostBinding('style.width') width: number;
    @HostBinding('style.margin-left.px') marginLeft: number;
    @HostBinding('class.is-active') isActive: boolean = false;
    @HostBinding('class.is-custom') isCustom: boolean = false;
    @HostBinding('class') style;
    @ViewChild('cellComponent', { read: ViewContainerRef }) cellViewContainer: ViewContainerRef;
    left: number;
    gridColumnIndex: number;
    data: any;
    isEditing: boolean = false;
    private viewComponent: ComponentRef<ViewableComponent>;
    private editComponent: ComponentRef<EditableComponent>;

    constructor(private dcl: DynamicComponentLoader,
        private el: ElementRef,
        private app: ApplicationRef,
        private cellPositionUpdater: CellPositionUpdater,
        private cdr: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef,
        private isCellActiveChecker: IsCellActiveChecker,
        private cellManager: CellManager,
        private spreadsheetState: SpreadsheetState,
        @Inject(DISPATCHER_TOKEN) private eventEmitter: EventEmitter<Action>,
        @Optional() @Inject(forwardRef(() => BodySectionComponent)) private bodySectionComponent: BodySectionComponent) {
    }

    @HostListener('click', ['$event'])
    onClick(evt) {
        this.eventEmitter.emit(new GoToCellLocationAction(this.gridCell.rowIndex, this.gridCell.columnIndex, true));
    }

    @HostListener('dblclick', ['$event'])
    onDoubleClick(evt) {
        this.eventEmitter.emit(new GoToCellLocationAction(this.gridCell.rowIndex, this.gridCell.columnIndex, true));
        this.goToEditMode();
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (!this.gridCell) {
            console.warn('GridCell not defined');
            return;
        }
        if (changes['gridCell']) {
            this.initCell(this.gridCell);
        }
        if (changes['rowData'] || changes['gridSectionScrollLeft'] || changes['columnPositionInformationMap']) {
            if (this.columnPositionInformationMap) {
                this.width = 0;
                var index = 0;
                while (index < this.gridCell.colspan) {
                    let columnPositionInformation = this.columnPositionInformationMap[this.gridColumnIndex + index];
                    this.width += columnPositionInformation ? columnPositionInformation.width : 0;
                    index++;
                }

                if (this.index === 0) {
                    let columnPositionInformation = this.columnPositionInformationMap[this.gridColumnIndex];
                    this.marginLeft = columnPositionInformation ? columnPositionInformation.left : 0;
                }
            }
        }
        if (changes['activeCellLocation']) {
            this.isActive = this.isCellActiveChecker.check(this.gridCell, this.activeCellLocation);
            if (this.editComponent && !this.isActive) {
                this.editComponent.instance.onEditDone(this.rowData);
                this.goToViewMode();
            }
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.cellManager.addCell(this);
        this.initCell(this.gridCell);
    }

    goToEditMode() {
        if (this.gridCell.editableComponentType && !this.isEditing) {
            this.isCustom = true;
            this.cdr.markForCheck();
            this.isEditing = true;
            this.clear();
            this.dcl.loadNextToLocation(this.gridCell.editableComponentType, this.cellViewContainer)
                .then((componentRef: ComponentRef<EditableComponent>) => {
                    this.editComponent = componentRef;
                    componentRef.instance.onEditStarted(this.rowData);
                    componentRef.onDestroy(() => {
                        this.isEditing = false;
                        this.bodySectionComponent.focus();
                    });
                });
        } else {
            this.isCustom = false;
        }
    }

    cancelEdit() {
        if (this.editComponent) {
            var editableComponent = <EditableComponent>this.editComponent.instance;
            editableComponent.onCancelEdit(this.rowData);
            this.goToViewMode();
        }
    }

    goToViewMode() {
        this.clear();
        if (this.gridCell.viewableComponentType) {
            if (!this.cellViewContainer) {
                return;
            }
            this.isCustom = true;
            this.cdr.markForCheck();
            this.dcl.loadNextToLocation(this.gridCell.viewableComponentType, this.cellViewContainer)
                .then((componentRef: ComponentRef<ViewableComponent>) => {
                    if (this.viewComponent) {
                        this.viewComponent.destroy();
                    }
                    this.viewComponent = componentRef;
                    componentRef.instance.onRowInit(this.rowData);
                });
        } else if (this.gridCell.formatData !== undefined) {
            this.isCustom = false;
            this.data = this.gridCell.formatData(this.gridCell.data);
        } else {
            this.isCustom = false;
            this.data = this.gridCell.data;
        }
    }

    getScrollWidth() {
        return this.el.nativeElement.scrollWidth;
    }

    ngOnDestroy() {
        this.cellManager.removeCell(this);
    }

    private initCell(gridCell: GridCell) {
        this.gridColumnIndex = gridCell.columnIndex;
        this.style = gridCell.cellStyle;

        if (gridCell.isEditing) {
            this.goToEditMode();
        } else {
            this.goToViewMode();
        }

        this.isActive = this.isCellActiveChecker.check(gridCell, this.activeCellLocation);
        if (this.isActive && this.style) {
            this.style += ' is-active';
        }
    }

    private clear() {
        this.data = null;
        if (this.viewComponent) {
            this.viewComponent.destroy();
        }
        if (this.editComponent) {
            this.editComponent.destroy();
            this.editComponent = null;
        }
        if (this.cellViewContainer) {
            this.cellViewContainer.clear();
        }
    }
}