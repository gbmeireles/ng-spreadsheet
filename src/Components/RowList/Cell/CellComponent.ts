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
    Renderer,
    ViewChild,
    ReflectiveInjector,
    AfterViewInit,
    ViewContainerRef,
} from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import {
    Cell,
    GridCell,
    ContentTypeEnum,
} from '../../../Model/Model';
import {
    GridDataManager,
    ColumnPositionInformationMapManager,
    ActiveCellManager,
    ColumnDefinitionListManager,
    CellPositionUpdater,
    CellListMapManager,
    CellNavigator,
    GridComponentManager,
} from '../../../Services/Services';
import {
    EditableComponent,
    ViewableComponent,
} from '../../../Model/CustomComponent/CustomComponent';

@Component({
    selector: 'GgCell',
    template: '<GgCellComponent ref-cellComponent>{{data}}</GgCellComponent>',
})
export class CellComponent implements OnInit, OnDestroy, Cell, AfterViewInit {
    @Input('cell') gridCell: GridCell;
    @Input('rowData') rowData: any;
    @Input('index') index: number;
    @HostBinding('style.width') width: number;
    @HostBinding('class.is-active') isActive: boolean = false;
    @HostBinding('class') style;
    @ViewChild('cellComponent', { read: ViewContainerRef }) cellViewContainer: ViewContainerRef;
    left: number;
    columnIndex: number;
    data: any;
    isEditing: boolean = false;
    private viewComponent: ComponentRef<ViewableComponent>;
    private editComponent: ComponentRef<EditableComponent>;

    private unregisterColumnPositionInformationMapSubscription: () => void;
    private unregisterActiveCellSubscription: () => void;
    private unregisterEditableComponentActiveCellSubscription: () => void;

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
        private renderer: Renderer,
        private viewContainerRef: ViewContainerRef,
        private gridComponentManager: GridComponentManager) {
        this.unregisterColumnPositionInformationMapSubscription =
            this.columnPositionInformationMapManager.subscribe((columnPositionInformationMap) => {
                this.cellPositionUpdater.update(this, columnPositionInformationMap);
            });

        this.unregisterActiveCellSubscription = this.activeCellManager.subscribe((activeCell) => {
            this.updadteIsActiveStatus(this.gridCell);
        });
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
            this.cdr.markForCheck();
            this.isEditing = true;
            this.clear();
            var gridData = this.gridDataManager.get();
            var gridComponent = this.gridComponentManager.get();
            this.dcl.loadNextToLocation(this.gridCell.editableComponentType, this.cellViewContainer,
                ReflectiveInjector.resolve(gridData.providerList)).then((componentRef: ComponentRef<EditableComponent>) => {
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
            this.cdr.markForCheck();
            var gridData = this.gridDataManager.get();
            var gridComponent = this.gridComponentManager.get();
            this.dcl.loadNextToLocation(this.gridCell.viewableComponentType, this.cellViewContainer,
                ReflectiveInjector.resolve(gridData.providerList)).then((componentRef: ComponentRef<ViewableComponent>) => {
                    this.viewComponent = componentRef;
                    componentRef.instance.onRowInit(gridComponent, this.gridCell, this.rowData);
                });
        } else if (this.gridCell.formattedData !== undefined) {
            this.data = this.gridCell.formattedData;
        } else {
            this.data = this.gridCell.data;
        }
    }

    getScrollWidth() {
        return this.el.nativeElement.scrollWidth;
    }

    ngOnDestroy() {
        this.cellListMapManager.removeCell(this);
        this.unregisterColumnPositionInformationMapSubscription();
        this.unregisterActiveCellSubscription();
    }

    private initCell(gridCell: GridCell) {
        this.columnIndex = gridCell.columnIndex;
        this.style = gridCell.cellStyle;
        var columnPositionInformationMap = this.columnPositionInformationMapManager.get();
        this.cellPositionUpdater.update(this, columnPositionInformationMap);
        if (gridCell.isEditing) {
            this.goToEditMode();
        } else {
            this.goToViewMode();
        }
        if (this.index === 0) {
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-left', `${columnPositionInformationMap[this.columnIndex].left}px`);
        }
        this.updadteIsActiveStatus(gridCell);
    }

    private updadteIsActiveStatus(gridCell: GridCell) {
        var activeCell = this.activeCellManager.get();
        if (!gridCell || activeCell == null) {
            this.isActive = false;
        } else if (activeCell.rowIndex !== gridCell.rowIndex) {
            this.isActive = false;
        } else if (activeCell.columnIndex !== gridCell.columnIndex) {
            this.isActive = false;
        } else {
            this.isActive = true;
        }
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