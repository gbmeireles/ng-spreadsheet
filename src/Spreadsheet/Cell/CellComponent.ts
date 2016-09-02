import {
    Component,
    ComponentRef,
    forwardRef,
    ComponentFactoryResolver,
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
    SpreadsheetCell,
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
    overflow: hidden;
    white-space: nowrap;
    -moz-text-overflow: ellipsis;
    text-overflow: ellipsis;
    height: 100%;
    position: absolute;
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
    @Input('cell') spreadsheetCell: SpreadsheetCell;
    @Input('rowData') rowData: any;
    @Input('rowHeight') rowHeight: number;
    @Input('index') index: number;
    @Input('columnPositionInformationMap') columnPositionInformationMap: ColumnPositionInformationMap;
    @Input('spreadsheetSectionScrollLeft') spreadsheetSectionScrollLeft: number;
    @Input('activeCellLocation') activeCellLocation: CellLocation;
    @HostBinding('style.zIndex') zIndex: number = 1;
    @HostBinding('style.height.px') @HostBinding('style.lineHeight.px') height: number;
    @HostBinding('style.width.px') width: number;
    @HostBinding('style.left.px') left: number;
    @HostBinding('style.margin-left.px') marginLeft: number;
    @HostBinding('class.is-active') isActive: boolean = false;
    @HostBinding('class.is-custom') isCustom: boolean = false;
    @HostBinding('class') style;
    @ViewChild('cellComponent', { read: ViewContainerRef }) cellViewContainer: ViewContainerRef;
    spreadsheetColumnIndex: number;
    data: any;
    isEditing: boolean = false;
    private viewComponent: ComponentRef<ViewableComponent>;
    private editComponent: ComponentRef<EditableComponent>;

    constructor(private resolver: ComponentFactoryResolver,
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

    @HostListener('mousedown', ['$event'])
    onClick(evt) {
        if (!this.spreadsheetCell) {
            return;
        }
        this.eventEmitter.emit(new GoToCellLocationAction(this.spreadsheetCell.rowIndex, this.spreadsheetCell.columnIndex, true));
    }

    @HostListener('dblclick', ['$event'])
    onDoubleClick(evt) {
        if (!this.spreadsheetCell) {
            return;
        }
        this.eventEmitter.emit(new GoToCellLocationAction(this.spreadsheetCell.rowIndex, this.spreadsheetCell.columnIndex, true));
        this.goToEditMode();
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (!this.spreadsheetCell) {
            this.clear();
            this.data = null;
            this.zIndex = 0;
            this.isActive = false;
            this.style = 'is-empty';
            return;
        }
        if (changes['spreadsheetCell']) {
            this.initCell(this.spreadsheetCell);
        }
        if (changes['spreadsheetCell'] || changes['rowHeight']) {
            this.height = this.spreadsheetCell.rowspan * this.rowHeight;
        }
        if (changes['rowData'] || changes['spreadsheetSectionScrollLeft'] || changes['columnPositionInformationMap']) {
            if (this.columnPositionInformationMap) {
                this.width = 0;
                var index = 0;
                while (index < this.spreadsheetCell.colspan) {
                    let columnPositionInformation = this.columnPositionInformationMap[this.spreadsheetColumnIndex + index];
                    this.width += columnPositionInformation ? columnPositionInformation.width : 0;
                    index++;
                }
            }
        }
        if (changes['spreadsheetCell'] || changes['rowData'] || changes['spreadsheetSectionScrollLeft'] || changes['columnPositionInformationMap']) {
            let columnPositionInformation = this.columnPositionInformationMap[this.spreadsheetColumnIndex];
            var left = columnPositionInformation ? columnPositionInformation.left : 0;
            // if (this.index === 0) {
            //     this.marginLeft = columnPositionInformation ? columnPositionInformation.left : 0;
            // }
            this.left = left;
        }
        if (changes['activeCellLocation']) {
            this.isActive = this.isCellActiveChecker.check(this.spreadsheetCell, this.activeCellLocation);
            if (this.editComponent && !this.isActive) {
                this.editComponent.instance.onEditDone(this.rowData);
                this.goToViewMode();
            }
            this.updateZIndex();
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.cellManager.addCell(this);

        if (!this.spreadsheetCell) {
            this.style = 'is-empty';
            return;
        }
        this.initCell(this.spreadsheetCell);
    }

    getElement(): HTMLElement {
        return this.el.nativeElement;
    }

    goToEditMode() {
        if (this.spreadsheetCell.editableComponentType && !this.isEditing) {
            this.isCustom = true;
            this.cdr.markForCheck();
            this.isEditing = true;
            this.clear();

            var factory = this.resolver.resolveComponentFactory<EditableComponent>(<any>this.spreadsheetCell.editableComponentType);
            var componentRef = this.cellViewContainer.createComponent(factory);
            this.editComponent = componentRef;
            componentRef.instance.onEditStarted(this.rowData);
            componentRef.onDestroy(() => {
                this.isEditing = false;
                this.bodySectionComponent.focus();
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
        if (this.spreadsheetCell.viewableComponentType) {
            if (!this.cellViewContainer) {
                return;
            }
            this.isCustom = true;
            this.cdr.markForCheck();
            var factory = this.resolver.resolveComponentFactory(this.spreadsheetCell.viewableComponentType);
            var componentRef = this.cellViewContainer.createComponent(factory);
            if (this.viewComponent) {
                this.viewComponent.destroy();
            }
            this.viewComponent = componentRef;
            componentRef.instance.onRowInit(this.rowData);

        } else if (this.spreadsheetCell.formatData !== undefined) {
            this.isCustom = false;
            this.data = this.spreadsheetCell.formatData(this.spreadsheetCell.data);
        } else {
            this.isCustom = false;
            this.data = this.spreadsheetCell.data;
        }
    }

    getScrollWidth() {
        return this.el.nativeElement.scrollWidth;
    }

    ngOnDestroy() {
        this.cellManager.removeCell(this);
    }

    private initCell(spreadsheetCell: SpreadsheetCell) {
        this.spreadsheetColumnIndex = spreadsheetCell.columnIndex;
        this.style = spreadsheetCell.cellStyle;

        if (spreadsheetCell.isEditing) {
            this.goToEditMode();
        } else {
            this.goToViewMode();
        }

        this.isActive = this.isCellActiveChecker.check(spreadsheetCell, this.activeCellLocation);
        if (this.isActive && this.style) {
            this.style += ' is-active';
        }
        this.updateZIndex();
    }

    private updateZIndex() {
        this.zIndex = 1;
        if (this.spreadsheetCell.rowspan > 1) {
            this.zIndex = 2;
        } else if (this.spreadsheetCell.colspan > 1) {
            this.zIndex = 3;
        }
        if (this.isActive) {
            this.zIndex = 4;
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