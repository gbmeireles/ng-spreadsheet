import {
    Component,
    ComponentRef,
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
} from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import {
    Cell,
    GridCell,
    ContentTypeEnum,
} from '../../Model/Model';
import {
    EVENT_EMITTER_TOKEN,
    Event,
    ColumnResizedEvent,
    ColumnMovedEvent,
} from '../../Events/Events';
import {
    GridDataManager,
    ColumnPositionInformationMapManager,
    ActiveCellManager,
    ColumnDefinitionListManager,
    CellPositionUpdater,
    CellListMapManager,
    CellNavigator,
    GridComponentManager,
} from '../../Services/Services';
import {
    EditableComponent,
    ViewableComponent,
} from '../Model/CustomComponent';
import { Subscription } from 'rxjs/Subscription';

import { IsCellActiveChecker } from './IsCellActiveChecker';

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

GgCellComponent {
    padding: 2px;
}

:host.is-custom GgCellComponent {
    padding: 0px;
}
`;

@Component({
    selector: 'GgCell',
    template: '<GgCellComponent ref-cellComponent>{{data}}</GgCellComponent>',
    styles: [css],
})
export class CellComponent implements OnInit, OnDestroy, Cell, AfterViewInit {
    @Input('cell') gridCell: GridCell;
    @Input('rowData') rowData: any;
    @Input('index') index: number;
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

    private unregisterActiveCellSubscription: () => void;
    private unregisterEditableComponentActiveCellSubscription: () => void;
    private eventEmitterSubscription: Subscription;

    constructor(private dcl: DynamicComponentLoader,
        private el: ElementRef,
        private app: ApplicationRef,
        private gridDataManager: GridDataManager,
        private columnPositionInformationMapManager: ColumnPositionInformationMapManager,
        private cellPositionUpdater: CellPositionUpdater,
        private cellListMapManager: CellListMapManager,
        private cellNavigationManager: CellNavigator,
        private activeCellManager: ActiveCellManager,
        private cdr: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef,
        private gridComponentManager: GridComponentManager,
        private isCellActiveChecker: IsCellActiveChecker,
        @Inject(EVENT_EMITTER_TOKEN) private eventEmitter: EventEmitter<Event>) {
    }

    @HostListener('click', ['$event'])
    onClick(evt) {
        this.cellNavigationManager.goTo(this.gridCell.rowIndex, this.gridCell.columnIndex);
    }

    @HostListener('dblclick', ['$event'])
    onDoubleClick(evt) {
        this.cellNavigationManager.goTo(this.gridCell.rowIndex, this.gridCell.columnIndex);
        this.goToEditMode();
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['gridCell']) {
            this.initCell(this.gridCell);
        }
    }

    ngOnInit() {
        this.eventEmitterSubscription = this.eventEmitter.subscribe((evt: Event) => {
            switch (evt.type) {
                case ColumnResizedEvent.type:
                case ColumnMovedEvent.type:
                    this.cellPositionUpdater.update(this, this.columnPositionInformationMapManager.get());
                    break;
                default:
                    break;
            }
        });
        this.unregisterActiveCellSubscription = this.activeCellManager.subscribe((activeCell) => {
            this.isActive = this.isCellActiveChecker.check(this.gridCell);
        });
    }

    ngAfterViewInit() {
        this.initCell(this.gridCell);
        this.cellListMapManager.addCell(this);

        if (this.gridCell.cellType === ContentTypeEnum.Title) {
            return;
        }
    }

    goToEditMode() {
        if (this.gridCell.editableComponentType && !this.isEditing) {
            this.isCustom = true;
            this.cdr.markForCheck();
            this.isEditing = true;
            this.clear();
            var gridData = this.gridDataManager.get();
            var gridComponent = this.gridComponentManager.get();
            this.dcl.loadNextToLocation(this.gridCell.editableComponentType, this.cellViewContainer,
                ReflectiveInjector.resolve(gridData.providerList || [])).then((componentRef: ComponentRef<EditableComponent>) => {
                    this.editComponent = componentRef;
                    componentRef.instance.onEditStarted(gridComponent, this.gridCell, this.rowData);
                    this.unregisterEditableComponentActiveCellSubscription = this.activeCellManager.subscribe(() => {
                        this.unregisterEditableComponentActiveCellSubscription();
                        componentRef.instance.onEditDone(gridComponent, this.gridCell, this.rowData);
                        this.goToViewMode();
                    });
                    componentRef.onDestroy(() => {
                        gridComponent.onGridEvent.emit({
                            eventType: 'EditDone',
                            eventData: {
                                gridComponent: gridComponent,
                                gridData: gridData,
                                rowData: this.rowData,
                                gridCell: this.gridCell,
                            },
                        });
                        this.isEditing = false;
                        if (this.unregisterEditableComponentActiveCellSubscription) {
                            this.unregisterEditableComponentActiveCellSubscription();
                        }
                    });
                });
        } else {
            this.isCustom = false;
        }
    }

    cancelEdit() {
        if (this.editComponent) {
            var editableComponent = <EditableComponent>this.editComponent.instance;
            var gridComponent = this.gridComponentManager.get();
            editableComponent.onCancelEdit(gridComponent, this.gridCell, this.rowData);
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
            var gridData = this.gridDataManager.get();
            var gridComponent = this.gridComponentManager.get();
            this.dcl.loadNextToLocation(this.gridCell.viewableComponentType, this.cellViewContainer,
                ReflectiveInjector.resolve(gridData.providerList)).then((componentRef: ComponentRef<ViewableComponent>) => {
                    if (this.viewComponent) {
                        this.viewComponent.destroy();
                    }
                    this.viewComponent = componentRef;
                    componentRef.instance.onRowInit(gridComponent, this.gridCell, this.rowData);
                });
        } else if (this.gridCell.formattedData !== undefined) {
            this.isCustom = false;
            this.data = this.gridCell.formattedData;
        } else {
            this.isCustom = false;
            this.data = this.gridCell.data;
        }
    }

    getScrollWidth() {
        return this.el.nativeElement.scrollWidth;
    }

    ngOnDestroy() {
        this.cellListMapManager.removeCell(this);
        this.eventEmitterSubscription.unsubscribe();
        this.unregisterActiveCellSubscription();
    }

    private initCell(gridCell: GridCell) {
        this.gridColumnIndex = gridCell.columnIndex;
        this.style = gridCell.cellStyle;
        var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
        this.cellPositionUpdater.update(this, columnPositionInformationMap);
        if (gridCell.isEditing) {
            this.goToEditMode();
        } else {
            this.goToViewMode();
        }
        if (this.index === 0 && columnPositionInformationMap && columnPositionInformationMap[this.gridColumnIndex]) {
            this.marginLeft = columnPositionInformationMap[this.gridColumnIndex].left;
        }
        this.isActive = this.isCellActiveChecker.check(gridCell);
    }

    private clear() {
        this.data = null;
        if (this.unregisterEditableComponentActiveCellSubscription) {
            this.unregisterEditableComponentActiveCellSubscription();
        }
        if (this.viewComponent) {
            this.viewComponent.destroy();
        }
        if (this.editComponent) {
            this.editComponent.destroy();
        }
        if (this.cellViewContainer) {
            this.cellViewContainer.clear();
        }
    }
}