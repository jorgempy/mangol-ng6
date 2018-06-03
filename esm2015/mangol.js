import { Injectable, NgModule, Component, EventEmitter, HostBinding, Input, Output, Inject, ViewEncapsulation, IterableDiffers, Pipe, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule, MatProgressBarModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { source, Map, layer, interaction, Feature, style, format, proj, View, control } from 'openlayers';
import 'hammerjs';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';
import { Headers, Http, HttpModule } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolMapService {
    constructor() {
        this.loadingTiles$ = new BehaviorSubject([]);
        this.maps = [];
    }
    /**
     * Retrieves all the maps
     * @return {?}
     */
    getMaps() {
        return this.maps;
    }
    /**
     * Returns a map object from the maps array
     * @param {?} id
     * @return {?}
     */
    getMapById(id) {
        let /** @type {?} */ map$$1 = null;
        for (let /** @type {?} */ i = 0; i < this.maps.length; i++) {
            if (this.maps[i].getTarget() === id) {
                map$$1 = this.maps[i];
                break;
            }
        }
        return map$$1;
    }
    /**
     * Adds a new map to the maps array
     * @param {?} map
     * @return {?}
     */
    addMap(map$$1) {
        this.maps.push(map$$1);
    }
    /**
     * When a tile/image starts loading, add the meta information to the loadingTiles BehaviorSubject
     * @param {?} tile
     * @return {?}
     */
    addTile(tile) {
        const /** @type {?} */ loads = [...this.loadingTiles$.getValue()];
        loads.push(tile);
        this.loadingTiles$.next(loads);
    }
    /**
     * After a tile/image load end, the meta information of it should be deleted from the loadingTiles BehaviorSubject
     * @param {?} tile
     * @return {?}
     */
    removeTile(tile) {
        const /** @type {?} */ loads = [...this.loadingTiles$.getValue()];
        loads.splice(loads.indexOf(tile), 1);
        this.loadingTiles$.next(loads);
    }
}
MangolMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MangolMapService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const materialModules = [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatSliderModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressBarModule
];
class MangolMaterialModule {
}
MangolMaterialModule.decorators = [
    { type: NgModule, args: [{
                imports: materialModules,
                exports: materialModules
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolLayer {
    /**
     * @param {?} options
     * @param {?} mapService
     */
    constructor(options, mapService) {
        this.mapService = mapService;
        this.name = options.name;
        this.showDetails = false;
        this.layer = options.layer;
        this.setOpacity(options.hasOwnProperty('opacity') ? options.opacity : 1.0);
        this.setVisible(options.hasOwnProperty('visible') ? options.visible : true);
        this.setDescription(options.hasOwnProperty('description') ? options.description : null);
        this.setQueryable(options.hasOwnProperty('queryable') ? options.queryable : false);
        this.setAttrColumns(options.hasOwnProperty('attrColumns') ? options.attrColumns : []);
        this._configureTileLoad();
    }
    /**
     * @return {?}
     */
    _configureTileLoad() {
        const /** @type {?} */ source$$1 = this.layer.getSource();
        if (source$$1 instanceof source.TileWMS ||
            source$$1 instanceof source.OSM ||
            source$$1 instanceof source.BingMaps ||
            source$$1 instanceof source.TileArcGISRest ||
            source$$1 instanceof source.TileImage ||
            source$$1 instanceof source.TileJSON) {
            source$$1.on('tileloadstart', (evt) => {
                this.mapService.addTile(evt.tile.getImage());
            });
            source$$1.on('tileloadend', (evt) => {
                this.mapService.removeTile(evt.tile.getImage());
            });
            source$$1.on('tileloaderror', (evt) => {
                this.mapService.removeTile(evt.tile.getImage());
            });
        }
        else if (source$$1 instanceof source.ImageWMS ||
            source$$1 instanceof source.ImageMapGuide ||
            source$$1 instanceof source.ImageArcGISRest) {
            source$$1.on('imageloadstart', (evt) => {
                this.mapService.addTile(evt.image.getImage());
            });
            source$$1.on('imageloadend', (evt) => {
                this.mapService.removeTile(evt.image.getImage());
            });
            source$$1.on('imageloaderror', (evt) => {
                this.mapService.removeTile(evt.image.getImage());
            });
        }
    }
    /**
     * @return {?}
     */
    getLayerVisibilityIcon() {
        return this.getVisible() ? 'visibility' : 'visibility_off';
    }
    /**
     * @return {?}
     */
    toggleLayerVisibility() {
        this.setVisible(!this.getVisible());
    }
    /**
     * @return {?}
     */
    getName() {
        return this.name;
    }
    /**
     * @return {?}
     */
    getLayer() {
        return this.layer;
    }
    /**
     * @return {?}
     */
    getOpacity() {
        return this.opacity;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setOpacity(value) {
        this.opacity = value;
        this.layer.setOpacity(value);
    }
    /**
     * @return {?}
     */
    getVisible() {
        return this.visible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setVisible(value) {
        this.visible = value;
        this.layer.setVisible(value);
    }
    /**
     * @return {?}
     */
    getDescription() {
        return this.description;
    }
    /**
     * @param {?} description
     * @return {?}
     */
    setDescription(description) {
        this.description = description;
    }
    /**
     * @return {?}
     */
    isQueryable() {
        return this.queryable;
    }
    /**
     * @param {?} queryable
     * @return {?}
     */
    setQueryable(queryable) {
        this.queryable = queryable;
    }
    /**
     * @return {?}
     */
    getAttrColumns() {
        return this.attrColumns;
    }
    /**
     * @param {?} cols
     * @return {?}
     */
    setAttrColumns(cols) {
        this.attrColumns = cols;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolLayerDetailsComponent {
    constructor() {
        this.class = 'mangol-layer-details';
        this.detailsClosed = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.sliderMin = 0;
        this.sliderMax = 100;
        this.sliderValue = parseInt((this.layer.opacity * 100).toString(), 0);
        this.sliderStep =
            this.opts &&
                this.opts.hasOwnProperty('opacity') &&
                this.opts.opacity.hasOwnProperty('sliderStep')
                ? this.opts.opacity.sliderStep
                : 1;
        this.sliderShowLabels =
            this.opts &&
                this.opts.hasOwnProperty('opacity') &&
                this.opts.opacity.hasOwnProperty('showLabels')
                ? this.opts.opacity.showLabels
                : true;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSliderChange($event) {
        const /** @type {?} */ newValue = $event.value / 100;
        this.layer.opacity = newValue;
        this.layer.layer.setOpacity(newValue);
        this.sliderValue = parseInt((this.layer.opacity * 100).toString(), 0);
    }
    /**
     * @return {?}
     */
    closeDetails() {
        this.detailsClosed.emit(null);
    }
}
MangolLayerDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-layer-details',
                template: `<div>
    <div *ngIf="detailType==='opacity'"
        class="details">
        <div class="details-title">Opacity
            <mat-icon matTooltip="Close details"
                matTooltipPosition="above"
                (click)="closeDetails()">close</mat-icon>
        </div>
        <mat-slider #slider
            color="primary"
            [thumbLabel]="sliderShowLabels"
            [min]="sliderMin"
            [max]="sliderMax"
            [step]="sliderStep"
            [value]="sliderValue"
            (change)="onSliderChange($event)"></mat-slider>
    </div>
    <div *ngIf="detailType==='legend'"
        class="details">
        <div class="details-title">Legend</div>
        soon...
    </div>
</div>
`
            },] },
];
/** @nocollapse */
MangolLayerDetailsComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "opts": [{ type: Input },],
    "layer": [{ type: Input },],
    "detailType": [{ type: Input },],
    "detailsClosed": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolLayergroup {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        this.name = options.name;
        this.nestedLayers = [];
        this.nestedLayerGroups = [];
    }
    /**
     * @return {?}
     */
    getDetails() {
        if (this.options.hasOwnProperty('description')) {
            this.details = this.options.description;
        }
        else {
            const /** @type {?} */ layerGroupLength = this.nestedLayerGroups.length;
            const /** @type {?} */ layerLength = this.nestedLayers.length;
            const /** @type {?} */ details = [];
            if (layerLength > 0) {
                details.push(`${layerLength} layer${layerLength === 1 ? '' : 's'}`);
            }
            if (layerGroupLength > 0) {
                details.push(`${layerGroupLength} layer group${layerGroupLength === 1 ? '' : 's'}`);
            }
            this.details = details.join(', ');
        }
    }
    /**
     * @return {?}
     */
    getName() {
        return this.name;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolMap extends Map {
    /**
     * @param {?} options
     * @param {?} mapService
     */
    constructor(options, mapService) {
        super(options);
        this.mapService = mapService;
        this._layers = [];
        this._layerGroups = [];
        this._allLayers = [];
    }
    /**
     * @param {?} layertree
     * @param {?} parent
     * @return {?}
     */
    addLayersAndLayerGroups(layertree, parent) {
        if (layertree.hasOwnProperty('layers')) {
            layertree.layers.forEach((layer$$1) => {
                this._handleLayer(layer$$1, parent);
            });
        }
        if (layertree.hasOwnProperty('groups')) {
            layertree.groups.forEach((group) => {
                this._handleLayerGroup(group, parent);
            });
        }
    }
    /**
     * @param {?} layer
     * @param {?} parent
     * @return {?}
     */
    _handleLayer(layer$$1, parent) {
        const /** @type {?} */ newLayer = new MangolLayer(Object.assign({}, layer$$1), this.mapService);
        // if the parent is null then it is the root element
        if (parent === null) {
            this._layers.push(newLayer);
        }
        else {
            parent.nestedLayers.push(newLayer);
        }
        // add layer to the map (ol.Map function)
        this._allLayers.push(newLayer);
        this.addLayer(newLayer.getLayer());
    }
    /**
     * @param {?} group
     * @param {?} parent
     * @return {?}
     */
    _handleLayerGroup(group, parent) {
        const /** @type {?} */ newLayerGroup = new MangolLayergroup(group);
        // if the parent is null then it is the root element
        if (parent === null) {
            this._layerGroups.push(newLayerGroup);
        }
        else {
            parent.nestedLayerGroups.push(newLayerGroup);
        }
        // recursively load subgroups and sublayers
        if (group.hasOwnProperty('children')) {
            this.addLayersAndLayerGroups(group.children, newLayerGroup);
        }
        newLayerGroup.getDetails();
    }
    /**
     * @return {?}
     */
    getMangolLayers() {
        return this._layers;
    }
    /**
     * @return {?}
     */
    getMangolLayerGroups() {
        return this._layerGroups;
    }
    /**
     * @return {?}
     */
    getMangolAllLayers() {
        return this._allLayers;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolLayertreeComponent {
    constructor() {
        this.class = 'mangol-layertree';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layerGroups = this.map.getMangolLayerGroups();
        this.layers = this.map.getMangolLayers();
    }
    /**
     * @param {?} type
     * @param {?} layer
     * @return {?}
     */
    setMenuActive(type, layer$$1) {
        layer$$1.detailType = type;
        layer$$1.showDetails = true;
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    hideDetails(layer$$1) {
        layer$$1.detailType = null;
        layer$$1.showDetails = false;
    }
}
MangolLayertreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-layertree',
                template: `<mat-list dense>
    <h3 matSubheader
        *ngIf="layerGroups.length > 0">LAYER GROUPS</h3>
    <mat-accordion [multi]="isAccordionMulti">
        <mat-expansion-panel *ngFor="let layerGroup of layerGroups">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    {{layerGroup.name}}
                </mat-panel-title>
                <mat-panel-description>
                    {{layerGroup.details}}
                </mat-panel-description>
            </mat-expansion-panel-header>
            <mat-list dense
                *ngFor="let layer of layerGroup.nestedLayers"
                class="layer">
                <mat-list-item [ngClass]="{'toggled': layer.showDetails}">
                    <mat-slide-toggle color="primary"
                        [checked]="layer.visible"
                        (change)="layer.toggleLayerVisibility()"
                        matTooltip="Visibility"
                        matTooltipPosition="above"></mat-slide-toggle>
                    <mat-icon matListIcon
                        matTooltip="Details"
                        matTooltipPosition="above"
                        (click)="layer.showDetails = true"
                        [matMenuTriggerFor]="menu">more_vert</mat-icon>
                    <p matLine
                        class="layer-name"> {{layer.name}} </p>
                    <p matLine
                        class="layer-description">
                        <span>{{layer.description}}</span>
                    </p>
                </mat-list-item>
                <mat-menu #menu="matMenu">
                    <button mat-menu-item
                        (click)="setMenuActive('opacity', layer)">
            <mat-icon>opacity</mat-icon>
            <span>Opacity</span>
          </button>
                    <button mat-menu-item
                        (click)="setMenuActive('legend', layer)"
                        disabled>
            <mat-icon>view_list</mat-icon>
            <span>Legend</span>
          </button>
                </mat-menu>
                <mangol-layer-details [opts]="opts.details"
                    [layer]="layer"
                    [detailType]="layer.detailType"
                    *ngIf="layer.showDetails && layer.detailType !== null"
                    (detailsClosed)="hideDetails(layer)"></mangol-layer-details>
            </mat-list>
        </mat-expansion-panel>
    </mat-accordion>
    <h3 matSubheader
        *ngIf="layers.length > 0">LAYERS</h3>
    <mat-list dense
        *ngFor="let layer of layers"
        class="layer">
        <mat-list-item [ngClass]="{'toggled': layer.showDetails}">
            <mat-slide-toggle color="primary"
                [checked]="layer.visible"
                (change)="layer.toggleLayerVisibility()"
                matTooltip="Visibility"
                matTooltipPosition="above"></mat-slide-toggle>
            <mat-icon matListIcon
                matTooltip="Details"
                matTooltipPosition="above"
                (click)="layer.showDetails = true"
                [matMenuTriggerFor]="menu">more_vert</mat-icon>
            <p matLine
                class="layer-name"> {{layer.name}} </p>
            <p matLine
                class="layer-description">
                <span>{{layer.description}}</span>
            </p>
        </mat-list-item>
        <mat-menu #menu="matMenu">
            <button mat-menu-item
                (click)="setMenuActive('opacity', layer)">
        <mat-icon>opacity</mat-icon>
        <span>Opacity</span>
      </button>
            <button mat-menu-item
                (click)="setMenuActive('legend', layer)"
                disabled>
        <mat-icon>view_list</mat-icon>
        <span>Legend</span>
      </button>
        </mat-menu>
        <mangol-layer-details [opts]="opts.details"
            [layer]="layer"
            [detailType]="layer.detailType"
            *ngIf="layer.showDetails && layer.detailType !== null"
            (detailsClosed)="hideDetails(layer)"></mangol-layer-details>
    </mat-list>
</mat-list>
`
            },] },
];
/** @nocollapse */
MangolLayertreeComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "opts": [{ type: Input },],
    "map": [{ type: Input },],
    "isAccordionMulti": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolLayertreeModule {
}
MangolLayertreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MangolMaterialModule],
                exports: [MangolLayertreeComponent, MangolLayerDetailsComponent],
                declarations: [MangolLayertreeComponent, MangolLayerDetailsComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolMeasureService {
    constructor() {
        this.activateState$ = new BehaviorSubject(false);
    }
}
MangolMeasureService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MangolMeasureService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class MangolMeasureComponent {
    /**
     * @param {?} measureService
     */
    constructor(measureService) {
        this.measureService = measureService;
        this.class = 'mangol-measure';
        this.layer = null;
        this.selected = null;
        this.draw = null;
        this.buttons = [];
        this.value = null;
        this.activateStateSubscription = this.measureService.activateState$.subscribe(state => {
            if (state !== null) {
                if (state && this.selected !== null) {
                    this.activateDraw();
                }
                else {
                    this.deactivateDraw();
                }
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Read user-defined parameters
        this.precision =
            this.opts && this.opts.hasOwnProperty('precision')
                ? this.opts.precision
                : 2;
        this.cursorStyle =
            this.opts && this.opts.hasOwnProperty('cursorStyle')
                ? this.opts.cursorStyle
                : 'crosshair';
        this.fillColor =
            this.opts && this.opts.hasOwnProperty('fillColor')
                ? this.opts.fillColor
                : [255, 255, 255, 0.5];
        this.strokeColor =
            this.opts && this.opts.hasOwnProperty('strokeColor')
                ? this.opts.strokeColor
                : [72, 72, 72, 1];
        this.textColor =
            this.opts && this.opts.hasOwnProperty('textColor')
                ? this.opts.textColor
                : [this.strokeColor[0], this.strokeColor[1], this.strokeColor[2], 1];
        this.textOutlineColor =
            this.opts && this.opts.hasOwnProperty('textOutlineColor')
                ? this.opts.textOutlineColor
                : [this.fillColor[0], this.fillColor[1], this.fillColor[2], 0.7];
        this.font =
            this.opts && this.opts.hasOwnProperty('font')
                ? this.opts.font
                : 'normal 14px Arial';
        this.units = this.map
            .getView()
            .getProjection()
            .getUnits();
        this.buttons = [
            {
                title: 'Measure distance',
                value: 'line',
                geometryType: 'LineString',
                fontSet: 'ms',
                fontIcon: 'ms-measure-distance'
            },
            {
                title: 'Measure area',
                value: 'area',
                geometryType: 'Polygon',
                fontSet: 'ms',
                fontIcon: 'ms-measure-area'
            },
            {
                title: 'Meesure radius',
                value: 'radius',
                geometryType: 'Circle',
                fontSet: 'ms',
                fontIcon: 'ms-geolocation'
            }
        ];
        this.layer = new layer.Vector({
            source: new source.Vector(),
            style: (feature) => {
                return this._getStyle(feature);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.deactivateDraw();
        if (this.activateStateSubscription) {
            this.activateStateSubscription.unsubscribe();
        }
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onToggleChange(evt) {
        this.selected = evt.value;
        this.measureService.activateState$.next(true);
    }
    /**
     * @return {?}
     */
    activateDraw() {
        this.deactivateDraw();
        this.map.addLayer(this.layer);
        this._setCursor(this.cursorStyle);
        this.draw = new interaction.Draw({
            source: this.layer.getSource(),
            type: this.selected.geometryType,
            style: (feature) => {
                return this._getStyle(feature);
            }
        });
        this.draw.on('drawstart', (e) => {
            this.value = null;
            this.layer.getSource().clear();
        });
        this.draw.on('drawend', (e) => {
            const /** @type {?} */ feat = new Feature({
                geometry: e.target
            });
            this._getLengthOrArea(feat);
        });
        this.draw.setActive(true);
        this.map.addInteraction(this.draw);
    }
    /**
     * @return {?}
     */
    deactivateDraw() {
        this._setCursor('');
        this.value = null;
        try {
            this.map.removeInteraction(this.draw);
            this.layer.getSource().clear();
            this.map.removeLayer(this.layer);
        }
        catch (/** @type {?} */ error) { }
    }
    /**
     * @return {?}
     */
    getDimension() {
        return this.selected.geometryType !== 'Polygon'
            ? `${this.units}`
            : `${this.units}&sup2;`;
    }
    /**
     * @param {?} cursorType
     * @return {?}
     */
    _setCursor(cursorType) {
        if (this.map) {
            const /** @type {?} */ target = this.map.getTarget();
            // jQuery hack to convert the mouse cursor to a crosshair
            const /** @type {?} */ jTarget = typeof target === 'string' ? $('#' + target) : $(target);
            jTarget.css('cursor', cursorType);
        }
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    _getLengthOrArea(feature) {
        let /** @type {?} */ value = '';
        const /** @type {?} */ geom = feature.getGeometry();
        switch (this.selected.geometryType) {
            case 'LineString':
                try {
                    value = parseFloat(geom.getLength().toString())
                        .toFixed(this.precision)
                        .toString();
                }
                catch (/** @type {?} */ error) { }
                break;
            case 'Polygon':
                try {
                    value = parseFloat(geom.getArea().toString())
                        .toFixed(this.precision)
                        .toString();
                }
                catch (/** @type {?} */ error) { }
                break;
            case 'Circle':
                try {
                    value = parseFloat(geom.getRadius().toString())
                        .toFixed(this.precision)
                        .toString();
                }
                catch (/** @type {?} */ error) { }
                break;
            default:
                break;
        }
        if (value !== '') {
            this.value = +value;
        }
        return value;
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    _getStyle(feature) {
        return [
            new style.Style({
                fill: new style.Fill({
                    color: this.fillColor
                })
            }),
            new style.Style({
                stroke: new style.Stroke({
                    color: this.strokeColor,
                    width: 2,
                    lineDash: [5, 5]
                }),
                text: new style.Text({
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: this._getLengthOrArea(feature),
                    font: this.font,
                    fill: new style.Fill({
                        color: this.textColor
                    }),
                    offsetX: 0,
                    offsetY: 0,
                    rotation: 0,
                    stroke: new style.Stroke({
                        color: this.textOutlineColor,
                        width: 3
                    })
                })
            })
        ];
    }
}
MangolMeasureComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-measure',
                template: `<div class="measure-container">
    <div class="subtitle">
        <span *ngIf="selected === null">Please select a measure type:</span>
        <span *ngIf="selected !== null">Click on the map to start {{selected.title | lowercase}}</span>
    </div>
    <mat-button-toggle-group (change)="onToggleChange($event)">
        <mat-button-toggle *ngFor="let button of buttons"
            [value]="button"
            [matTooltip]="button.title"
            matTooltipPosition="below">
            <mat-icon [fontSet]="button.fontSet"
                [fontIcon]="button.fontIcon"></mat-icon>
        </mat-button-toggle>
    </mat-button-toggle-group>
    <div class="value-container"
        *ngIf="value !== null">
        <span>Value: </span>
        <span class="value">{{value}}</span>
        <span class="value"
            [innerHTML]="getDimension()"></span>
    </div>
</div>
`
            },] },
];
/** @nocollapse */
MangolMeasureComponent.ctorParameters = () => [
    { type: MangolMeasureService, },
];
MangolMeasureComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "map": [{ type: Input },],
    "opts": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolMeasureModule {
}
MangolMeasureModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MangolMaterialModule],
                exports: [MangolMeasureComponent],
                declarations: [MangolMeasureComponent],
                providers: [MangolMeasureService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolFeatureInfoTableDialogComponent {
    /**
     * @param {?} dialogRef
     * @param {?} myData
     */
    constructor(dialogRef, myData) {
        this.dialogRef = dialogRef;
        this.myData = myData;
        this.dataSource = new MangolFeatureInfoTableDialogDataSource();
        this.columns = myData.columns;
        this.layer = myData.layer;
        data = myData.data;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} column
     * @return {?}
     */
    getColumnLabel(column) {
        let /** @type {?} */ label = column;
        const /** @type {?} */ attrCols = this.layer.getAttrColumns();
        for (let /** @type {?} */ i = 0; i < attrCols.length; i++) {
            if (attrCols[i].name === column && attrCols[i].hasOwnProperty('label')) {
                label = attrCols[i].label;
                break;
            }
        }
        return label;
    }
}
MangolFeatureInfoTableDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-feature-info-table-dialog',
                template: `<div class="table-container mat-elevation-z2">
    <mat-table #table
        [dataSource]="dataSource">
        <ng-container *ngFor="let column of columns"
            [matColumnDef]="column">
            <mat-header-cell *matHeaderCellDef> {{getColumnLabel(column)}} </mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element[column]}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: columns; "></mat-row>
    </mat-table>
</div>
`,
                styles: [],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
MangolFeatureInfoTableDialogComponent.ctorParameters = () => [
    { type: MatDialogRef, },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
];
let data = [];
class MangolFeatureInfoTableDialogDataSource extends DataSource {
    /**
     * @return {?}
     */
    connect() {
        return Observable.of(data);
    }
    /**
     * @return {?}
     */
    disconnect() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolFeatureInfoTableComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} dialog
     */
    constructor(iterableDiffers, dialog) {
        this.iterableDiffers = iterableDiffers;
        this.dialog = dialog;
        this.class = 'mat-feature-info-table';
        this.featureSelected = new EventEmitter();
        this.dataSource = new MangolFeatureInfoTableDataSource();
        this.iterableDiffer = this.iterableDiffers.find([]).create();
        this.displayedColumns = [];
        this.excludeColumns = ['geometry'];
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngDoCheck() {
        const /** @type {?} */ changes = this.iterableDiffer.diff(this.features);
        if (changes) {
            this._processFeatures();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.featureSelected.emit(null);
    }
    /**
     * @param {?} column
     * @return {?}
     */
    getColumnLabel(column) {
        let /** @type {?} */ label = column;
        const /** @type {?} */ attrCols = this.layer.getAttrColumns();
        for (let /** @type {?} */ i = 0; i < attrCols.length; i++) {
            if (attrCols[i].name === column && attrCols[i].hasOwnProperty('label')) {
                label = attrCols[i].label;
                break;
            }
        }
        return label;
    }
    /**
     * @return {?}
     */
    _processFeatures() {
        data$1 = [];
        this.displayedColumns = [];
        this.features.forEach((feat) => {
            const /** @type {?} */ props = Object.assign({}, feat.getProperties());
            for (const /** @type {?} */ key in props) {
                if (props.hasOwnProperty(key)) {
                    if (this.excludeColumns.indexOf(key) !== -1) {
                        delete props[key];
                    }
                    else {
                        // Populate the table columns
                        if (this.displayedColumns.indexOf(key) === -1) {
                            this.displayedColumns.push(key);
                        }
                    }
                }
            }
            data$1.push(/** @type {?} */ (Object.assign({}, props)));
        });
    }
    /**
     * @return {?}
     */
    openTableDialog() {
        const /** @type {?} */ dialogRef = this.dialog.open(MangolFeatureInfoTableDialogComponent, {
            width: '90vw',
            data: {
                columns: this.displayedColumns,
                layer: this.layer,
                data: data$1
            }
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    /**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    onRowClick(row, index) {
        this.featureSelected.emit(this.features[index]);
    }
}
MangolFeatureInfoTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-feature-info-table',
                template: `<button mat-button
    color="primary"
    (click)="openTableDialog()"
    class="full-screen-button">
  <mat-icon>open_in_new</mat-icon>
  Open full screen table</button>
<div class="table-container mat-elevation-z2">
    <mat-table #table
        [dataSource]="dataSource">
        <ng-container *ngFor="let column of displayedColumns"
            [matColumnDef]="column ">
            <mat-header-cell *matHeaderCellDef> {{getColumnLabel(column)}} </mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element[column]}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns; let i=index;"
            [ngStyle]="{'cursor': 'pointer'}"
            (click)="onRowClick(row, i)"
            [matTooltip]="'Tap to show feature on map'"
            matTooltipPosition="after"></mat-row>
    </mat-table>
</div>
`
            },] },
];
/** @nocollapse */
MangolFeatureInfoTableComponent.ctorParameters = () => [
    { type: IterableDiffers, },
    { type: MatDialog, },
];
MangolFeatureInfoTableComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "features": [{ type: Input },],
    "layer": [{ type: Input },],
    "featureSelected": [{ type: Output },],
};
let data$1 = [];
class MangolFeatureInfoTableDataSource extends DataSource {
    /**
     * @return {?}
     */
    connect() {
        return Observable.of(data$1);
    }
    /**
     * @return {?}
     */
    disconnect() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolFeatureIntoService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.activateState$ = new BehaviorSubject(false);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getFeatureInfo(url) {
        const /** @type {?} */ headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .get(url, {
            headers: headers
        })
            .pipe(map((response) => {
            const /** @type {?} */ resp = response.json();
            return resp;
        }), catchError((error) => {
            console.log(error);
            return throwError(error);
        }));
    }
}
MangolFeatureIntoService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MangolFeatureIntoService.ctorParameters = () => [
    { type: Http, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolFeatureInfoComponent {
    /**
     * @param {?} featureInfoService
     * @param {?} snackBar
     */
    constructor(featureInfoService, snackBar) {
        this.featureInfoService = featureInfoService;
        this.snackBar = snackBar;
        this.class = 'mangol-feature-info';
        this.selected = null;
        this.geojson = new format.GeoJSON();
        this.layers = [];
        this.selected = null;
        this.features = [];
        this.activateStateSubscription = this.featureInfoService.activateState$.subscribe(state => {
            if (state !== null) {
                this._getQueryableLayers();
                if (state && this.selected !== null) {
                    this._activateClick(this.selected.layer);
                }
                else {
                    this._deactivateClick();
                }
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.maxFeatures =
            this.opts && this.opts.hasOwnProperty('maxFeatures')
                ? this.opts.maxFeatures
                : 10;
        this.cursorStyle =
            this.opts && this.opts.hasOwnProperty('cursorStyle')
                ? this.opts.cursorStyle
                : 'crosshair';
        this.placeholder =
            this.opts && this.opts.hasOwnProperty('placeholder')
                ? this.opts.placeholder
                : 'Select query layer';
        this.zoomOnRowClick =
            this.opts && this.opts.hasOwnProperty('zoomOnRowClick')
                ? this.opts.zoomOnRowClick
                : true;
        this.highlightFeatures =
            this.opts && this.opts.hasOwnProperty('highlightFeatures')
                ? this.opts.highlightFeatures
                : true;
        this._addHoverLayer();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.activateStateSubscription) {
            this.activateStateSubscription.unsubscribe();
        }
        this._removeHoverLayer();
        this._deactivateClick();
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onSelectionChange(evt) {
        this.selected = evt.value;
        this.featureInfoService.activateState$.next(true);
    }
    /**
     * @param {?} message
     * @param {?} action
     * @return {?}
     */
    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onFeatureSelected(evt) {
        this.hoverLayer.getSource().clear();
        if (evt !== null) {
            const /** @type {?} */ projCode = this.selected
                .getLayer()
                .getSource()
                .getProjection()
                .getCode();
            const /** @type {?} */ viewProjCode = this.map
                .getView()
                .getProjection()
                .getCode();
            const /** @type {?} */ feat = evt.clone();
            if (projCode !== viewProjCode) {
                feat.setGeometry(feat.getGeometry().transform(projCode, viewProjCode));
            }
            this.hoverLayer.getSource().addFeature(feat);
            if (this.zoomOnRowClick) {
                this.map.getView().fit(feat.getGeometry().getExtent(), {
                    duration: 500
                });
            }
        }
    }
    /**
     * @return {?}
     */
    _addHoverLayer() {
        this.hoverLayer = new layer.Vector({
            source: new source.Vector()
        });
        if (this.opts.hasOwnProperty('hoverStyle')) {
            this.hoverLayer.setStyle(this.opts.hoverStyle);
        }
        if (this.highlightFeatures) {
            this.map.addLayer(this.hoverLayer);
        }
    }
    /**
     * @return {?}
     */
    _removeHoverLayer() {
        if (this.highlightFeatures) {
            this.map.removeLayer(this.hoverLayer);
        }
    }
    /**
     * @return {?}
     */
    _getQueryableLayers() {
        if (this.map) {
            this.layers = [];
            this.map.getMangolAllLayers().forEach((layer$$1) => {
                if (layer$$1.isQueryable() && layer$$1.getVisible()) {
                    this.layers.push(layer$$1);
                }
            });
        }
    }
    /**
     * @param {?} cursorType
     * @return {?}
     */
    _setCursor(cursorType) {
        if (this.map) {
            const /** @type {?} */ target = this.map.getTarget();
            // jQuery hack to convert the mouse cursor to a crosshair
            const /** @type {?} */ jTarget = typeof target === 'string' ? $('#' + target) : $(target);
            jTarget.css('cursor', cursorType);
        }
    }
    /**
     * @param {?} source
     * @param {?} coordinate
     * @param {?} resolution
     * @param {?} srs
     * @return {?}
     */
    _getFeatureInfoUrl(source$$1, coordinate, resolution, srs) {
        const /** @type {?} */ styles = source$$1.getParams().hasOwnProperty('STYLES')
            ? source$$1.getParams().STYLES
            : '';
        const /** @type {?} */ url = source$$1.getGetFeatureInfoUrl(coordinate, resolution, srs, {
            INFO_FORMAT: 'application/json',
            FEATURE_COUNT: this.maxFeatures,
            STYLES: styles
        });
        return url;
    }
    /**
     * @return {?}
     */
    _deactivateClick() {
        this._setCursor('');
        if (this.clickEvent) {
            this.map.un('singleclick', this.clickEvent);
        }
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    _activateClick(layer$$1) {
        this._deactivateClick();
        this._setCursor(this.cursorStyle);
        this.clickEvent = (evt) => {
            this.features = [];
            if (layer$$1 instanceof layer.Tile || layer$$1 instanceof layer.Image) {
                const /** @type {?} */ url = this._getFeatureInfoUrl(layer$$1.getSource(), evt.coordinate, this.map.getView().getResolution(), this.map.getView().getProjection());
                if (url) {
                    this.featureInfoService.getFeatureInfo(url).subscribe((data) => {
                        if (data.hasOwnProperty('features')) {
                            // convert the GeoJSON response to Feature array
                            this.features = this.geojson.readFeatures(data);
                            this.openSnackBar(`${this.features.length} feature${this.features.length === 1 ? '' : 's'} found.`, 'Close');
                        }
                    });
                }
            }
            else {
                this.openSnackBar('Currently only WMS query is supported. Please select another layer!', 'Close');
            }
        };
        this.map.on('singleclick', this.clickEvent);
    }
}
MangolFeatureInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-feature-info',
                template: `<div class="feature-info-container">
    <mat-form-field *ngIf="layers.length > 0">
        <mat-select [placeholder]="placeholder"
            (selectionChange)="onSelectionChange($event)">
            <mat-option *ngFor="let layer of layers"
                [value]="layer">
                {{ layer.getName() }}
            </mat-option>
        </mat-select>
    </mat-form-field>
    <div *ngIf="layers.length === 0">There are no queryable layers visible at the moment.</div>
    <div *ngIf="selected !== null && features.length === 0">Click on the map to select a feature!</div>
    <mangol-feature-info-table *ngIf="selected !== null && features.length > 0"
        [features]="features"
        [layer]="selected"
        (featureSelected)="onFeatureSelected($event)"></mangol-feature-info-table>
</div>
`
            },] },
];
/** @nocollapse */
MangolFeatureInfoComponent.ctorParameters = () => [
    { type: MangolFeatureIntoService, },
    { type: MatSnackBar, },
];
MangolFeatureInfoComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "map": [{ type: Input },],
    "opts": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolFeatureInfoModule {
}
MangolFeatureInfoModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MangolFeatureInfoComponent,
                    MangolFeatureInfoTableComponent,
                    MangolFeatureInfoTableDialogComponent
                ],
                imports: [CommonModule, MangolMaterialModule, HttpModule],
                exports: [MangolFeatureInfoComponent, MangolFeatureInfoTableComponent],
                providers: [MangolFeatureIntoService],
                entryComponents: [MangolFeatureInfoTableDialogComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class KeysPipe {
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    transform(value, args = null) {
        return Object.keys(value);
    }
}
KeysPipe.decorators = [
    { type: Pipe, args: [{ name: 'keys', pure: false },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class MangolPrintComponent {
    constructor() {
        this.class = 'mangol-print';
        this.selectedLayout = null;
        this.selectedDim = null;
        this.selectedResolution = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layouts = [
            {
                name: 'Landscape',
                value: 'landscape'
            },
            {
                name: 'Portrait',
                value: 'portrait'
            }
        ];
        this.resolutions = [72, 100, 150, 300];
        this.dims = {
            A5: [210, 148],
            A4: [297, 210],
            A3: [420, 297],
            A2: [594, 420],
            A1: [841, 594],
            A0: [1189, 841]
        };
    }
    /**
     * @return {?}
     */
    print() {
        const /** @type {?} */ map$$1 = this.map;
        const /** @type {?} */ layout = this.selectedLayout;
        const /** @type {?} */ format$$1 = this.selectedDim;
        const /** @type {?} */ dim = this.dims[format$$1];
        const /** @type {?} */ resolution = this.selectedResolution;
        const /** @type {?} */ width = Math.round((layout.value === 'landscape' ? dim[0] : dim[1]) * resolution / 25.4);
        const /** @type {?} */ height = Math.round((layout.value === 'landscape' ? dim[1] : dim[0]) * resolution / 25.4);
        const /** @type {?} */ size = map$$1.getSize();
        const /** @type {?} */ extent = map$$1.getView().calculateExtent(size);
        map$$1.once('postcompose', (event) => {
            let /** @type {?} */ interval;
            interval = setInterval(function () {
                clearInterval(interval);
                const /** @type {?} */ canvas = event['context']['canvas'];
                const /** @type {?} */ data = canvas.toDataURL('image/jpeg');
                const /** @type {?} */ pdf = new jsPDF(layout.value, undefined, format$$1);
                pdf.addImage(data, 'JPEG', 0, 0, layout.value === 'landscape' ? dim[0] : dim[1], layout.value === 'landscape' ? dim[1] : dim[0]);
                pdf.save('map.pdf');
                map$$1.setSize(size);
                map$$1.getView().fit(extent);
                map$$1.renderSync();
            }, 5000);
        });
        map$$1.setSize([width, height]);
        map$$1.getView().fit(extent);
        map$$1.renderSync();
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onLayoutChange(evt) {
        this.selectedLayout = evt.value;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onSizeChange(evt) {
        this.selectedDim = evt.value;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onResolutionChange(evt) {
        this.selectedResolution = evt.value;
    }
}
MangolPrintComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-print',
                template: `<div class="form-container">

    <mat-form-field>
        <mat-select placeholder="Layout"
            (selectionChange)="onLayoutChange($event)">
            <mat-option [value]="layout"
                *ngFor="let layout of layouts">
                {{layout.name}}
            </mat-option>
        </mat-select>
    </mat-form-field>

    <mat-form-field>
        <mat-select placeholder="Size"
            (selectionChange)="onSizeChange($event)">
            <mat-option [value]="key"
                *ngFor="let key of dims | keys">
                {{key}} ({{dims[key][0]}} x {{dims[key][1]}} mm)
            </mat-option>
        </mat-select>
    </mat-form-field>

    <mat-form-field>
        <mat-select placeholder="Resolution"
            (selectionChange)="onResolutionChange($event)">
            <mat-option [value]="r"
                *ngFor="let r of resolutions">
                {{r}}
                <span matSuffix>dpi</span>
            </mat-option>
        </mat-select>
    </mat-form-field>

    <button mat-raised-button
        color="primary"
        [disabled]="selectedLayout === null || selectedDim === null || selectedResolution === null"
        (click)="print()">Print</button>
</div>
`
            },] },
];
/** @nocollapse */
MangolPrintComponent.ctorParameters = () => [];
MangolPrintComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "map": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolPrintModule {
}
MangolPrintModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MangolMaterialModule,
                    FormsModule,
                    ReactiveFormsModule
                ],
                exports: [MangolPrintComponent],
                declarations: [MangolPrintComponent, KeysPipe]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolSidebarComponent {
    /**
     * @param {?} cdr
     * @param {?} featureInfoService
     * @param {?} measureService
     */
    constructor(cdr, featureInfoService, measureService) {
        this.cdr = cdr;
        this.featureInfoService = featureInfoService;
        this.measureService = measureService;
        this.class = 'mangol-sidebar';
        this.selectedIndex = 0;
        this.items = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.sidebarClosed = false;
        if (this.options.hasOwnProperty('toolbar')) {
            for (const /** @type {?} */ key in this.options.toolbar) {
                if (this.options.toolbar.hasOwnProperty(key)) {
                    const /** @type {?} */ item = Object.assign({}, this.options.toolbar[key], { type: key });
                    this.items.push(item);
                }
            }
        }
        this.map.updateSize();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.cdr.detectChanges();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTitle(item) {
        if (item.hasOwnProperty('title')) {
            return item.title;
        }
        switch (item.type) {
            case 'layertree':
                return 'Layertree';
            case 'featureinfo':
                return 'Feature information';
            case 'measure':
                return 'Measure';
            case 'print':
                return 'Print to file';
            default:
                return null;
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getFontSet(item) {
        if (item.hasOwnProperty('fontSet')) {
            return item.fontSet;
        }
        switch (item.type) {
            case 'layertree':
                return 'ms';
            case 'featureinfo':
                return 'ms';
            case 'measure':
                return 'ms';
            case 'print':
                return 'ms';
            default:
                return 'ms';
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getFontIcon(item) {
        if (item.hasOwnProperty('fontIcon')) {
            return item.fontIcon;
        }
        switch (item.type) {
            case 'layertree':
                return 'ms-layers';
            case 'featureinfo':
                return 'ms-information';
            case 'measure':
                return 'ms-measure-distance';
            case 'print':
                return 'ms-printer';
            default:
                return null;
        }
    }
    /**
     * @return {?}
     */
    toggleSidebar() {
        this.sidebarClosed = !this.sidebarClosed;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onSelectedTabChange(evt) {
        switch (this.items[this.selectedIndex].type) {
            case 'featureinfo':
                this.featureInfoService.activateState$.next(false);
                break;
            case 'measure':
                this.measureService.activateState$.next(false);
                break;
            default:
                break;
        }
        this.selectedIndex = evt.index;
        switch (this.items[this.selectedIndex].type) {
            case 'featureinfo':
                this.featureInfoService.activateState$.next(true);
                break;
            case 'measure':
                this.measureService.activateState$.next(true);
                break;
            default:
                break;
        }
    }
}
MangolSidebarComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-sidebar',
                template: `<div class="sidebar-outer">
    <mat-tab-group disableRipple="true"
        (selectedTabChange)="onSelectedTabChange($event)">
        <mat-tab *ngFor="let item of items; let i=index;"
            [disabled]="item.disabled">
            <ng-template mat-tab-label>
                <mat-icon [fontSet]="getFontSet(item)"
                    [fontIcon]="getFontIcon(item)"
                    [color]="selectedIndex === i ? 'primary' : ''"
                    [matTooltip]="getTitle(item)"
                    matTooltipPosition="below"></mat-icon>
            </ng-template>
            <div class="sidebar-content">
                <mat-toolbar>{{getTitle(item)}}</mat-toolbar>
                <div class="sidebar-inner"
                    *ngIf="map">
                    <mangol-layertree *ngIf="item.type === 'layertree'"
                        [opts]="options.toolbar.layertree"
                        [map]="map"
                        [isAccordionMulti]="options.toolbar.layertree.isAccordionMulti">
                    </mangol-layertree>
                    <mangol-feature-info *ngIf="item.type === 'featureinfo'"
                        [map]="map"
                        [opts]="options.toolbar.featureinfo"></mangol-feature-info>
                    <mangol-measure *ngIf="item.type === 'measure'"
                        [map]="map"
                        [opts]="options.toolbar.measure">
                    </mangol-measure>
                    <mangol-print *ngIf="item.type === 'print'"
                        [map]="map"></mangol-print>
                </div>
            </div>
        </mat-tab>
    </mat-tab-group>
</div>
`,
                styles: [`@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);@import url(https://mapskincdn.appspot.com/1.0/mapskin.min.css);@import url(https://fonts.googleapis.com/css?family=Roboto+Mono:300,400);@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);@import url(https://mapskincdn.appspot.com/1.0/mapskin.min.css);@import url(https://fonts.googleapis.com/css?family=Roboto+Mono:300,400);.mat-elevation-z0{-webkit-box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{-webkit-box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{-webkit-box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{-webkit-box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12);box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{-webkit-box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12);box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{-webkit-box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{-webkit-box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12);box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{-webkit-box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{-webkit-box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12);box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{-webkit-box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12);box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{-webkit-box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{-webkit-box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12);box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{-webkit-box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12);box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{-webkit-box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12);box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{-webkit-box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12);box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{-webkit-box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{-webkit-box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12);box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{-webkit-box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12);box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{-webkit-box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12);box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{-webkit-box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12);box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{-webkit-box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12);box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{-webkit-box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12);box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{-webkit-box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12);box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{-webkit-box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,"Helvetica Neue",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,"Helvetica Neue",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif}.mat-expansion-panel-header{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px;color:rgba(0,0,0,.87)}.mat-optgroup-label{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif;color:rgba(0,0,0,.54)}.mat-simple-snackbar{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1000;display:-webkit-box;display:-ms-flexbox;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}.mat-badge-small .mat-badge-content{outline:solid 1px;border-radius:0}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}.mat-ripple-element{background-color:rgba(0,0,0,.1)}.mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled),.mat-option:focus:not(.mat-option-disabled),.mat-option:hover:not(.mat-option-disabled){background:rgba(0,0,0,.04)}.mat-option.mat-active{background:rgba(0,0,0,.04);color:rgba(0,0,0,.87)}.mat-option.mat-option-disabled{color:rgba(0,0,0,.38)}.mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color:#2196f3}.mat-accent .mat-option.mat-selected:not(.mat-option-disabled){color:#f44336}.mat-warn .mat-option.mat-selected:not(.mat-option-disabled){color:#ff5722}.mat-optgroup-disabled .mat-optgroup-label{color:rgba(0,0,0,.38)}.mat-pseudo-checkbox{color:rgba(0,0,0,.54)}.mat-pseudo-checkbox::after{color:#fafafa}.mat-accent .mat-pseudo-checkbox-checked,.mat-accent .mat-pseudo-checkbox-indeterminate,.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox-indeterminate{background:#f44336}.mat-primary .mat-pseudo-checkbox-checked,.mat-primary .mat-pseudo-checkbox-indeterminate{background:#2196f3}.mat-warn .mat-pseudo-checkbox-checked,.mat-warn .mat-pseudo-checkbox-indeterminate{background:#ff5722}.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled{background:#b0b0b0}.mat-app-background{background-color:#fafafa;color:rgba(0,0,0,.87)}.mat-theme-loaded-marker{display:none}.mat-autocomplete-panel{background:#fff;color:rgba(0,0,0,.87)}.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover){background:#fff}.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled){color:rgba(0,0,0,.87)}.mat-badge-accent .mat-badge-content{background:#f44336;color:#fff}.mat-badge-warn .mat-badge-content{color:#fff;background:#ff5722}.mat-badge{position:relative}.mat-badge-hidden .mat-badge-content{display:none}.mat-badge-content{color:#fff;background:#2196f3;position:absolute;text-align:center;display:inline-block;border-radius:50%;-webkit-transition:-webkit-transform .2s ease-in-out;transition:-webkit-transform .2s ease-in-out;transition:transform .2s ease-in-out;transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out;-webkit-transform:scale(.6);transform:scale(.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;pointer-events:none}.mat-badge-content.mat-badge-active{-webkit-transform:none;transform:none}.mat-badge-small .mat-badge-content{width:16px;height:16px;line-height:16px}.mat-badge-small.mat-badge-above .mat-badge-content{top:-8px}.mat-badge-small.mat-badge-below .mat-badge-content{bottom:-8px}.mat-badge-small.mat-badge-before{margin-left:16px}.mat-badge-small.mat-badge-before .mat-badge-content{left:-16px}[dir=rtl] .mat-badge-small.mat-badge-before{margin-left:0;margin-right:16px}[dir=rtl] .mat-badge-small.mat-badge-before .mat-badge-content{left:auto;right:-16px}.mat-badge-small.mat-badge-after{margin-right:16px}.mat-badge-small.mat-badge-after .mat-badge-content{right:-16px}[dir=rtl] .mat-badge-small.mat-badge-after{margin-right:0;margin-left:16px}[dir=rtl] .mat-badge-small.mat-badge-after .mat-badge-content{right:auto;left:-16px}.mat-badge-small.mat-badge-overlap.mat-badge-before{margin-left:8px}.mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-8px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-before{margin-left:0;margin-right:8px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-8px}.mat-badge-small.mat-badge-overlap.mat-badge-after{margin-right:8px}.mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-8px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-after{margin-right:0;margin-left:16px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-8px}.mat-badge-medium .mat-badge-content{width:22px;height:22px;line-height:22px}.mat-badge-medium.mat-badge-above .mat-badge-content{top:-11px}.mat-badge-medium.mat-badge-below .mat-badge-content{bottom:-11px}.mat-badge-medium.mat-badge-before{margin-left:22px}.mat-badge-medium.mat-badge-before .mat-badge-content{left:-22px}[dir=rtl] .mat-badge-medium.mat-badge-before{margin-left:0;margin-right:22px}[dir=rtl] .mat-badge-medium.mat-badge-before .mat-badge-content{left:auto;right:-22px}.mat-badge-medium.mat-badge-after{margin-right:22px}.mat-badge-medium.mat-badge-after .mat-badge-content{right:-22px}[dir=rtl] .mat-badge-medium.mat-badge-after{margin-right:0;margin-left:22px}[dir=rtl] .mat-badge-medium.mat-badge-after .mat-badge-content{right:auto;left:-22px}.mat-badge-medium.mat-badge-overlap.mat-badge-before{margin-left:11px}.mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-11px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-before{margin-left:0;margin-right:11px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-11px}.mat-badge-medium.mat-badge-overlap.mat-badge-after{margin-right:11px}.mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-11px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-after{margin-right:0;margin-left:22px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-11px}.mat-badge-large .mat-badge-content{width:28px;height:28px;line-height:28px}@media screen and (-ms-high-contrast:active){.mat-badge-large .mat-badge-content,.mat-badge-medium .mat-badge-content{outline:solid 1px;border-radius:0}}.mat-badge-large.mat-badge-above .mat-badge-content{top:-14px}.mat-badge-large.mat-badge-below .mat-badge-content{bottom:-14px}.mat-badge-large.mat-badge-before{margin-left:28px}.mat-badge-large.mat-badge-before .mat-badge-content{left:-28px}[dir=rtl] .mat-badge-large.mat-badge-before{margin-left:0;margin-right:28px}[dir=rtl] .mat-badge-large.mat-badge-before .mat-badge-content{left:auto;right:-28px}.mat-badge-large.mat-badge-after{margin-right:28px}.mat-badge-large.mat-badge-after .mat-badge-content{right:-28px}[dir=rtl] .mat-badge-large.mat-badge-after{margin-right:0;margin-left:28px}[dir=rtl] .mat-badge-large.mat-badge-after .mat-badge-content{right:auto;left:-28px}.mat-badge-large.mat-badge-overlap.mat-badge-before{margin-left:14px}.mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-14px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-before{margin-left:0;margin-right:14px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-14px}.mat-badge-large.mat-badge-overlap.mat-badge-after{margin-right:14px}.mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-14px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-after{margin-right:0;margin-left:28px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-14px}.mat-bottom-sheet-container{background:#fff;color:rgba(0,0,0,.87)}.mat-button,.mat-icon-button,.mat-stroked-button{color:inherit;background:0 0}.mat-button.mat-primary,.mat-icon-button.mat-primary,.mat-stroked-button.mat-primary{color:#2196f3}.mat-button.mat-accent,.mat-icon-button.mat-accent,.mat-stroked-button.mat-accent{color:#f44336}.mat-button.mat-warn,.mat-icon-button.mat-warn,.mat-stroked-button.mat-warn{color:#ff5722}.mat-button.mat-accent[disabled],.mat-button.mat-primary[disabled],.mat-button.mat-warn[disabled],.mat-button[disabled][disabled],.mat-icon-button.mat-accent[disabled],.mat-icon-button.mat-primary[disabled],.mat-icon-button.mat-warn[disabled],.mat-icon-button[disabled][disabled],.mat-stroked-button.mat-accent[disabled],.mat-stroked-button.mat-primary[disabled],.mat-stroked-button.mat-warn[disabled],.mat-stroked-button[disabled][disabled]{color:rgba(0,0,0,.26)}.mat-button.mat-primary .mat-button-focus-overlay,.mat-icon-button.mat-primary .mat-button-focus-overlay,.mat-stroked-button.mat-primary .mat-button-focus-overlay{background-color:rgba(33,150,243,.12)}.mat-button.mat-accent .mat-button-focus-overlay,.mat-icon-button.mat-accent .mat-button-focus-overlay,.mat-stroked-button.mat-accent .mat-button-focus-overlay{background-color:rgba(244,67,54,.12)}.mat-button.mat-warn .mat-button-focus-overlay,.mat-icon-button.mat-warn .mat-button-focus-overlay,.mat-stroked-button.mat-warn .mat-button-focus-overlay{background-color:rgba(255,87,34,.12)}.mat-button[disabled] .mat-button-focus-overlay,.mat-icon-button[disabled] .mat-button-focus-overlay,.mat-stroked-button[disabled] .mat-button-focus-overlay{background-color:transparent}.mat-button.mat-primary .mat-ripple-element,.mat-icon-button.mat-primary .mat-ripple-element,.mat-stroked-button.mat-primary .mat-ripple-element{background-color:rgba(33,150,243,.1)}.mat-button.mat-accent .mat-ripple-element,.mat-icon-button.mat-accent .mat-ripple-element,.mat-stroked-button.mat-accent .mat-ripple-element{background-color:rgba(244,67,54,.1)}.mat-button.mat-warn .mat-ripple-element,.mat-icon-button.mat-warn .mat-ripple-element,.mat-stroked-button.mat-warn .mat-ripple-element{background-color:rgba(255,87,34,.1)}.mat-fab,.mat-flat-button,.mat-mini-fab,.mat-raised-button{color:rgba(0,0,0,.87);background-color:#fff}.mat-fab.mat-accent,.mat-fab.mat-primary,.mat-fab.mat-warn,.mat-flat-button.mat-accent,.mat-flat-button.mat-primary,.mat-flat-button.mat-warn,.mat-mini-fab.mat-accent,.mat-mini-fab.mat-primary,.mat-mini-fab.mat-warn,.mat-raised-button.mat-accent,.mat-raised-button.mat-primary,.mat-raised-button.mat-warn{color:#fff}.mat-fab.mat-accent[disabled],.mat-fab.mat-primary[disabled],.mat-fab.mat-warn[disabled],.mat-fab[disabled][disabled],.mat-flat-button.mat-accent[disabled],.mat-flat-button.mat-primary[disabled],.mat-flat-button.mat-warn[disabled],.mat-flat-button[disabled][disabled],.mat-mini-fab.mat-accent[disabled],.mat-mini-fab.mat-primary[disabled],.mat-mini-fab.mat-warn[disabled],.mat-mini-fab[disabled][disabled],.mat-raised-button.mat-accent[disabled],.mat-raised-button.mat-primary[disabled],.mat-raised-button.mat-warn[disabled],.mat-raised-button[disabled][disabled]{color:rgba(0,0,0,.26);background-color:rgba(0,0,0,.12)}.mat-fab.mat-primary,.mat-flat-button.mat-primary,.mat-mini-fab.mat-primary,.mat-raised-button.mat-primary{background-color:#2196f3}.mat-fab.mat-accent,.mat-flat-button.mat-accent,.mat-mini-fab.mat-accent,.mat-raised-button.mat-accent{background-color:#f44336}.mat-fab.mat-warn,.mat-flat-button.mat-warn,.mat-mini-fab.mat-warn,.mat-raised-button.mat-warn{background-color:#ff5722}.mat-fab.mat-accent .mat-ripple-element,.mat-fab.mat-primary .mat-ripple-element,.mat-fab.mat-warn .mat-ripple-element,.mat-flat-button.mat-accent .mat-ripple-element,.mat-flat-button.mat-primary .mat-ripple-element,.mat-flat-button.mat-warn .mat-ripple-element,.mat-mini-fab.mat-accent .mat-ripple-element,.mat-mini-fab.mat-primary .mat-ripple-element,.mat-mini-fab.mat-warn .mat-ripple-element,.mat-raised-button.mat-accent .mat-ripple-element,.mat-raised-button.mat-primary .mat-ripple-element,.mat-raised-button.mat-warn .mat-ripple-element{background-color:rgba(255,255,255,.1)}.mat-icon-button.mat-primary .mat-ripple-element{background-color:rgba(33,150,243,.2)}.mat-icon-button.mat-accent .mat-ripple-element{background-color:rgba(244,67,54,.2)}.mat-icon-button.mat-warn .mat-ripple-element{background-color:rgba(255,87,34,.2)}.mat-button-toggle{color:rgba(0,0,0,.38)}.mat-button-toggle .mat-button-toggle-focus-overlay{background-color:rgba(0,0,0,.12)}.mat-button-toggle-checked{background-color:#e0e0e0;color:rgba(0,0,0,.54)}.mat-button-toggle-disabled{background-color:#eee;color:rgba(0,0,0,.26)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:#bdbdbd}.mat-card{background:#fff;color:rgba(0,0,0,.87)}.mat-card-subtitle{color:rgba(0,0,0,.54)}.mat-checkbox-frame{border-color:rgba(0,0,0,.54)}.mat-checkbox-checkmark{fill:#fafafa}.mat-checkbox-checkmark-path{stroke:#fafafa!important}.mat-checkbox-mixedmark{background-color:#fafafa}.mat-checkbox-checked.mat-primary .mat-checkbox-background,.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background{background-color:#2196f3}.mat-checkbox-checked.mat-accent .mat-checkbox-background,.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background{background-color:#f44336}.mat-checkbox-checked.mat-warn .mat-checkbox-background,.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background{background-color:#ff5722}.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background,.mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background{background-color:#b0b0b0}.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame{border-color:#b0b0b0}.mat-checkbox-disabled .mat-checkbox-label{color:#b0b0b0}.mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(33,150,243,.26)}.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(244,67,54,.26)}.mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(255,87,34,.26)}.mat-chip.mat-standard-chip{background-color:#e0e0e0;color:rgba(0,0,0,.87)}.mat-chip.mat-standard-chip .mat-chip-remove{color:rgba(0,0,0,.87);opacity:.4}.mat-chip.mat-standard-chip .mat-chip-remove:hover{opacity:.54}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary{background-color:#2196f3;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover{opacity:.54}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn{background-color:#ff5722;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover{opacity:.54}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent{background-color:#f44336;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover{opacity:.54}.mat-table{background:#fff}mat-footer-row,mat-header-row,mat-row,td.mat-cell,td.mat-footer-cell,th.mat-header-cell{border-bottom-color:rgba(0,0,0,.12)}.mat-header-cell{color:rgba(0,0,0,.54)}.mat-cell,.mat-footer-cell{color:rgba(0,0,0,.87)}.mat-calendar-arrow{border-top-color:rgba(0,0,0,.54)}.mat-datepicker-popup .mat-calendar-next-button,.mat-datepicker-popup .mat-calendar-previous-button,.mat-datepicker-toggle{color:rgba(0,0,0,.54)}.mat-calendar-table-header{color:rgba(0,0,0,.38)}.mat-calendar-table-header-divider::after{background:rgba(0,0,0,.12)}.mat-calendar-body-label{color:rgba(0,0,0,.54)}.mat-calendar-body-cell-content{color:rgba(0,0,0,.87);border-color:transparent}.mat-calendar-body-disabled>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){color:rgba(0,0,0,.38)}.cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){background-color:rgba(0,0,0,.04)}.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,.38)}.mat-calendar-body-disabled>.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,.18)}.mat-calendar-body-selected{background-color:#2196f3;color:#fff}.mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(33,150,243,.4)}.mat-calendar-body-today.mat-calendar-body-selected{-webkit-box-shadow:inset 0 0 0 1px #fff;box-shadow:inset 0 0 0 1px #fff}.mat-datepicker-content{background-color:#fff;color:rgba(0,0,0,.87)}.mat-datepicker-content.mat-accent .mat-calendar-body-selected{background-color:#f44336;color:#fff}.mat-datepicker-content.mat-accent .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(244,67,54,.4)}.mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected{-webkit-box-shadow:inset 0 0 0 1px #fff;box-shadow:inset 0 0 0 1px #fff}.mat-datepicker-content.mat-warn .mat-calendar-body-selected{background-color:#ff5722;color:#fff}.mat-datepicker-content.mat-warn .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(255,87,34,.4)}.mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected{-webkit-box-shadow:inset 0 0 0 1px #fff;box-shadow:inset 0 0 0 1px #fff}.mat-datepicker-toggle-active{color:#2196f3}.mat-datepicker-toggle-active.mat-accent{color:#f44336}.mat-datepicker-toggle-active.mat-warn{color:#ff5722}.mat-dialog-container{background:#fff;color:rgba(0,0,0,.87)}.mat-divider{border-top-color:rgba(0,0,0,.12)}.mat-divider-vertical{border-right-color:rgba(0,0,0,.12)}.mat-expansion-panel{background:#fff;color:rgba(0,0,0,.87)}.mat-action-row{border-top-color:rgba(0,0,0,.12)}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused,.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:rgba(0,0,0,.04)}.mat-expansion-panel-header-title{color:rgba(0,0,0,.87)}.mat-expansion-indicator::after,.mat-expansion-panel-header-description{color:rgba(0,0,0,.54)}.mat-expansion-panel-header[aria-disabled=true]{color:rgba(0,0,0,.26)}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title{color:inherit}.mat-form-field-label,.mat-hint{color:rgba(0,0,0,.6)}.mat-form-field.mat-focused .mat-form-field-label{color:#2196f3}.mat-form-field.mat-focused .mat-form-field-label.mat-accent{color:#f44336}.mat-form-field.mat-focused .mat-form-field-label.mat-warn{color:#ff5722}.mat-focused .mat-form-field-required-marker{color:#f44336}.mat-form-field-ripple{background-color:rgba(0,0,0,.87)}.mat-form-field.mat-focused .mat-form-field-ripple{background-color:#2196f3}.mat-form-field.mat-focused .mat-form-field-ripple.mat-accent{background-color:#f44336}.mat-form-field.mat-focused .mat-form-field-ripple.mat-warn{background-color:#ff5722}.mat-form-field.mat-form-field-invalid .mat-form-field-label,.mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker,.mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent{color:#ff5722}.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{background-color:#ff5722}.mat-error{color:#ff5722}.mat-form-field-appearance-legacy .mat-form-field-label,.mat-form-field-appearance-legacy .mat-hint{color:rgba(0,0,0,.54)}.mat-form-field-appearance-legacy .mat-form-field-underline{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.42)),color-stop(33%,rgba(0,0,0,.42)),color-stop(0,transparent));background-image:linear-gradient(to right,rgba(0,0,0,.42) 0,rgba(0,0,0,.42) 33%,transparent 0);background-size:4px 100%;background-repeat:repeat-x}.mat-form-field-appearance-standard .mat-form-field-underline{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.42)),color-stop(33%,rgba(0,0,0,.42)),color-stop(0,transparent));background-image:linear-gradient(to right,rgba(0,0,0,.42) 0,rgba(0,0,0,.42) 33%,transparent 0);background-size:4px 100%;background-repeat:repeat-x}.mat-form-field-appearance-fill .mat-form-field-flex{background-color:rgba(0,0,0,.04)}.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex{background-color:rgba(0,0,0,.02)}.mat-form-field-appearance-fill .mat-form-field-underline::before{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,.38)}.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before{background-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em;color:rgba(0,0,0,.12)}.mat-form-field-appearance-outline .mat-form-field-outline-thick{color:rgba(0,0,0,.87)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{color:#2196f3}.mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick{color:#f44336}.mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick{color:#ff5722}.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,.38)}.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline{color:rgba(0,0,0,.06)}.mat-icon.mat-primary{color:#2196f3}.mat-icon.mat-accent{color:#f44336}.mat-icon.mat-warn{color:#ff5722}.mat-input-element:disabled{color:rgba(0,0,0,.38)}.mat-input-element{caret-color:#2196f3}.mat-input-element::-ms-input-placeholder{color:rgba(0,0,0,.42)}.mat-input-element::placeholder{color:rgba(0,0,0,.42)}.mat-input-element::-moz-placeholder{color:rgba(0,0,0,.42)}.mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,.42)}.mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,.42)}.mat-accent .mat-input-element{caret-color:#f44336}.mat-form-field-invalid .mat-input-element,.mat-warn .mat-input-element{caret-color:#ff5722}.mat-list .mat-list-item,.mat-list .mat-list-option,.mat-nav-list .mat-list-item,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-item,.mat-selection-list .mat-list-option{color:rgba(0,0,0,.87)}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500;color:rgba(0,0,0,.54)}.mat-list-item-disabled{background-color:#eee}.mat-list-option.mat-list-item-focus,.mat-list-option:hover,.mat-nav-list .mat-list-item.mat-list-item-focus,.mat-nav-list .mat-list-item:hover{background:rgba(0,0,0,.04)}.mat-menu-panel{background:#fff}.mat-menu-item{background:0 0;color:rgba(0,0,0,.87)}.mat-menu-item[disabled],.mat-menu-item[disabled]::after{color:rgba(0,0,0,.38)}.mat-menu-item .mat-icon:not([color]),.mat-menu-item-submenu-trigger::after{color:rgba(0,0,0,.54)}.mat-menu-item-highlighted:not([disabled]),.mat-menu-item.cdk-keyboard-focused:not([disabled]),.mat-menu-item.cdk-program-focused:not([disabled]),.mat-menu-item:hover:not([disabled]){background:rgba(0,0,0,.04)}.mat-paginator{background:#fff}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{color:rgba(0,0,0,.54)}.mat-paginator-decrement,.mat-paginator-increment{border-top:2px solid rgba(0,0,0,.54);border-right:2px solid rgba(0,0,0,.54)}.mat-paginator-first,.mat-paginator-last{border-top:2px solid rgba(0,0,0,.54)}.mat-icon-button[disabled] .mat-paginator-decrement,.mat-icon-button[disabled] .mat-paginator-first,.mat-icon-button[disabled] .mat-paginator-increment,.mat-icon-button[disabled] .mat-paginator-last{border-color:rgba(0,0,0,.38)}.mat-progress-bar-background{fill:#bbdefb}.mat-progress-bar-buffer{background-color:#bbdefb}.mat-progress-bar-fill::after{background-color:#2196f3}.mat-progress-bar.mat-accent .mat-progress-bar-background{fill:#ffcdd2}.mat-progress-bar.mat-accent .mat-progress-bar-buffer{background-color:#ffcdd2}.mat-progress-bar.mat-accent .mat-progress-bar-fill::after{background-color:#f44336}.mat-progress-bar.mat-warn .mat-progress-bar-background{fill:#ffccbc}.mat-progress-bar.mat-warn .mat-progress-bar-buffer{background-color:#ffccbc}.mat-progress-bar.mat-warn .mat-progress-bar-fill::after{background-color:#ff5722}.mat-progress-spinner circle,.mat-spinner circle{stroke:#2196f3}.mat-progress-spinner.mat-accent circle,.mat-spinner.mat-accent circle{stroke:#f44336}.mat-progress-spinner.mat-warn circle,.mat-spinner.mat-warn circle{stroke:#ff5722}.mat-radio-outer-circle{border-color:rgba(0,0,0,.54)}.mat-radio-disabled .mat-radio-outer-circle{border-color:rgba(0,0,0,.38)}.mat-radio-disabled .mat-radio-inner-circle,.mat-radio-disabled .mat-radio-ripple .mat-ripple-element{background-color:rgba(0,0,0,.38)}.mat-radio-disabled .mat-radio-label-content{color:rgba(0,0,0,.38)}.mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle{border-color:#2196f3}.mat-radio-button.mat-primary .mat-radio-inner-circle{background-color:#2196f3}.mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element{background-color:rgba(33,150,243,.26)}.mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle{border-color:#f44336}.mat-radio-button.mat-accent .mat-radio-inner-circle{background-color:#f44336}.mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element{background-color:rgba(244,67,54,.26)}.mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle{border-color:#ff5722}.mat-radio-button.mat-warn .mat-radio-inner-circle{background-color:#ff5722}.mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element{background-color:rgba(255,87,34,.26)}.mat-select-content,.mat-select-panel-done-animating{background:#fff}.mat-select-value{color:rgba(0,0,0,.87)}.mat-select-placeholder{color:rgba(0,0,0,.42)}.mat-select-disabled .mat-select-value{color:rgba(0,0,0,.38)}.mat-select-arrow{color:rgba(0,0,0,.54)}.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple){background:rgba(0,0,0,.12)}.mat-form-field.mat-focused.mat-primary .mat-select-arrow{color:#2196f3}.mat-form-field.mat-focused.mat-accent .mat-select-arrow{color:#f44336}.mat-form-field .mat-select.mat-select-invalid .mat-select-arrow,.mat-form-field.mat-focused.mat-warn .mat-select-arrow{color:#ff5722}.mat-form-field .mat-select.mat-select-disabled .mat-select-arrow{color:rgba(0,0,0,.38)}.mat-drawer-container{background-color:#fafafa;color:rgba(0,0,0,.87)}.mat-drawer{background-color:#fff;color:rgba(0,0,0,.87)}.mat-drawer.mat-drawer-push{background-color:#fff}.mat-drawer-backdrop.mat-drawer-shown{background-color:rgba(0,0,0,.6)}.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#f44336}.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(244,67,54,.5)}.mat-slide-toggle:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}.mat-slide-toggle .mat-ripple-element{background-color:rgba(244,67,54,.12)}.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#2196f3}.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(33,150,243,.5)}.mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}.mat-slide-toggle.mat-primary .mat-ripple-element{background-color:rgba(33,150,243,.12)}.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#ff5722}.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(255,87,34,.5)}.mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}.mat-slide-toggle.mat-warn .mat-ripple-element{background-color:rgba(255,87,34,.12)}.mat-disabled .mat-slide-toggle-thumb{background-color:#bdbdbd}.mat-disabled .mat-slide-toggle-bar{background-color:rgba(0,0,0,.1)}.mat-slide-toggle-thumb{background-color:#fafafa}.mat-slide-toggle-bar{background-color:rgba(0,0,0,.38)}.mat-slider-track-background{background-color:rgba(0,0,0,.26)}.mat-primary .mat-slider-thumb,.mat-primary .mat-slider-thumb-label,.mat-primary .mat-slider-track-fill{background-color:#2196f3}.mat-primary .mat-slider-thumb-label-text{color:#fff}.mat-accent .mat-slider-thumb,.mat-accent .mat-slider-thumb-label,.mat-accent .mat-slider-track-fill{background-color:#f44336}.mat-accent .mat-slider-thumb-label-text{color:#fff}.mat-warn .mat-slider-thumb,.mat-warn .mat-slider-thumb-label,.mat-warn .mat-slider-track-fill{background-color:#ff5722}.mat-warn .mat-slider-thumb-label-text{color:#fff}.mat-slider-focus-ring{background-color:rgba(244,67,54,.2)}.cdk-focused .mat-slider-track-background,.mat-slider:hover .mat-slider-track-background{background-color:rgba(0,0,0,.38)}.mat-slider-disabled .mat-slider-thumb,.mat-slider-disabled .mat-slider-track-background,.mat-slider-disabled .mat-slider-track-fill,.mat-slider-disabled:hover .mat-slider-track-background{background-color:rgba(0,0,0,.26)}.mat-slider-min-value .mat-slider-focus-ring{background-color:rgba(0,0,0,.12)}.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label{background-color:rgba(0,0,0,.87)}.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label{background-color:rgba(0,0,0,.26)}.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb{border-color:rgba(0,0,0,.26);background-color:transparent}.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb{border-color:rgba(0,0,0,.38)}.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb{border-color:rgba(0,0,0,.26)}.mat-slider-has-ticks .mat-slider-wrapper::after{border-color:rgba(0,0,0,.7)}.mat-slider-horizontal .mat-slider-ticks{background-image:repeating-linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent);background-image:-moz-repeating-linear-gradient(.0001deg,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent)}.mat-slider-vertical .mat-slider-ticks{background-image:repeating-linear-gradient(to bottom,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent)}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused,.mat-step-header:hover{background-color:rgba(0,0,0,.04)}.mat-step-header .mat-step-label,.mat-step-header .mat-step-optional{color:rgba(0,0,0,.38)}.mat-step-header .mat-step-icon{background-color:#2196f3;color:#fff}.mat-step-header .mat-step-icon-not-touched{background-color:rgba(0,0,0,.38);color:#fff}.mat-step-header .mat-step-label.mat-step-label-active{color:rgba(0,0,0,.87)}.mat-stepper-horizontal,.mat-stepper-vertical{background-color:#fff}.mat-stepper-vertical-line::before{border-left-color:rgba(0,0,0,.12)}.mat-stepper-horizontal-line{border-top-color:rgba(0,0,0,.12)}.mat-tab-header,.mat-tab-nav-bar{border-bottom:1px solid rgba(0,0,0,.12)}.mat-tab-group-inverted-header .mat-tab-header,.mat-tab-group-inverted-header .mat-tab-nav-bar{border-top:1px solid rgba(0,0,0,.12);border-bottom:none}.mat-tab-label,.mat-tab-link{color:rgba(0,0,0,.87)}.mat-tab-label.mat-tab-disabled,.mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,.38)}.mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.87)}.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.38)}.mat-tab-group[class*=mat-background-] .mat-tab-header,.mat-tab-nav-bar[class*=mat-background-]{border-bottom:none;border-top:none}.mat-tab-group.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(187,222,251,.3)}.mat-tab-group.mat-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary .mat-ink-bar{background-color:#2196f3}.mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar{background-color:#fff}.mat-tab-group.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,205,210,.3)}.mat-tab-group.mat-accent .mat-ink-bar,.mat-tab-nav-bar.mat-accent .mat-ink-bar{background-color:#f44336}.mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar,.mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar{background-color:#fff}.mat-tab-group.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,204,188,.3)}.mat-tab-group.mat-warn .mat-ink-bar,.mat-tab-nav-bar.mat-warn .mat-ink-bar{background-color:#ff5722}.mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar,.mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar{background-color:#fff}.mat-tab-group.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(187,222,251,.3)}.mat-tab-group.mat-background-primary .mat-tab-header,.mat-tab-group.mat-background-primary .mat-tab-links,.mat-tab-nav-bar.mat-background-primary .mat-tab-header,.mat-tab-nav-bar.mat-background-primary .mat-tab-links{background-color:#2196f3}.mat-tab-group.mat-background-primary .mat-tab-label,.mat-tab-group.mat-background-primary .mat-tab-link,.mat-tab-nav-bar.mat-background-primary .mat-tab-label,.mat-tab-nav-bar.mat-background-primary .mat-tab-link{color:#fff}.mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron{border-color:#fff}.mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-primary .mat-ripple-element,.mat-tab-nav-bar.mat-background-primary .mat-ripple-element{background-color:rgba(255,255,255,.12)}.mat-tab-group.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,205,210,.3)}.mat-tab-group.mat-background-accent .mat-tab-header,.mat-tab-group.mat-background-accent .mat-tab-links,.mat-tab-nav-bar.mat-background-accent .mat-tab-header,.mat-tab-nav-bar.mat-background-accent .mat-tab-links{background-color:#f44336}.mat-tab-group.mat-background-accent .mat-tab-label,.mat-tab-group.mat-background-accent .mat-tab-link,.mat-tab-nav-bar.mat-background-accent .mat-tab-label,.mat-tab-nav-bar.mat-background-accent .mat-tab-link{color:#fff}.mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron{border-color:#fff}.mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-accent .mat-ripple-element,.mat-tab-nav-bar.mat-background-accent .mat-ripple-element{background-color:rgba(255,255,255,.12)}.mat-tab-group.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,204,188,.3)}.mat-tab-group.mat-background-warn .mat-tab-header,.mat-tab-group.mat-background-warn .mat-tab-links,.mat-tab-nav-bar.mat-background-warn .mat-tab-header,.mat-tab-nav-bar.mat-background-warn .mat-tab-links{background-color:#ff5722}.mat-tab-group.mat-background-warn .mat-tab-label,.mat-tab-group.mat-background-warn .mat-tab-link,.mat-tab-nav-bar.mat-background-warn .mat-tab-label,.mat-tab-nav-bar.mat-background-warn .mat-tab-link{color:#fff}.mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron{border-color:#fff}.mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-warn .mat-ripple-element,.mat-tab-nav-bar.mat-background-warn .mat-ripple-element{background-color:rgba(255,255,255,.12)}.mat-toolbar{background:#f5f5f5;color:rgba(0,0,0,.87)}.mat-toolbar.mat-primary{background:#2196f3;color:#fff}.mat-toolbar.mat-accent{background:#f44336;color:#fff}.mat-toolbar.mat-warn{background:#ff5722;color:#fff}.mat-toolbar .mat-focused .mat-form-field-ripple,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-form-field-underline{background-color:currentColor}.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-select-value{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-tooltip{background:rgba(97,97,97,.9)}.mat-tree{font-family:Roboto,"Helvetica Neue",sans-serif;background:#fff}.mat-tree-node{font-weight:400;font-size:14px;color:rgba(0,0,0,.87)}.mat-snack-bar-container{background:#323232;color:#fff}.mat-simple-snackbar-action{color:#f44336}.ol-box{-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px;border:2px solid #00f}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:rgba(0,60,136,.3);border-radius:4px;bottom:8px;left:8px;padding:2px;position:absolute}.ol-scale-line-inner{border:1px solid #eee;border-top:none;color:#eee;font-size:10px;text-align:center;margin:1px;will-change:contents,width}.ol-overlay-container{will-change:left,right,top,bottom}.ol-unsupported{display:none}.ol-unselectable,.ol-viewport{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-selectable{-webkit-touch-callout:default;-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.ol-grabbing{cursor:-webkit-grabbing;cursor:grabbing}.ol-grab{cursor:move;cursor:-webkit-grab;cursor:grab}.ol-control{position:absolute;background-color:rgba(255,255,255,.4);border-radius:4px;padding:2px}.ol-control:hover{background-color:rgba(255,255,255,.6)}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;-webkit-transition:opacity .25s linear,visibility 0s linear;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;-webkit-transition:opacity .25s linear,visibility 0s linear .25s;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}@media print{.ol-control{display:none}}.ol-control button{display:block;margin:1px;padding:0;color:#fff;text-decoration:none;text-align:center;height:1.375em;width:1.375em;line-height:.4em;border:none}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;font-size:1.2em;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:focus,.ol-control button:hover{text-decoration:none;background-color:#1a78c2!important}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em)}.ol-attribution ul{margin:0;padding:0 .5em;font-size:.7rem;line-height:1.375em;color:#000;text-shadow:0 0 2px #fff}.ol-attribution li{display:inline;list-style:none;line-height:inherit}.ol-attribution li:not(:last-child):after{content:" "}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button,.ol-attribution ul{display:inline-block}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution.ol-logo-only ul{display:block}.ol-attribution:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0;height:1.1em;line-height:1em}.ol-attribution.ol-logo-only{background:0 0;bottom:.4em;height:1.1em;line-height:1em}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:inline-block}.ol-overviewmap .ol-overviewmap-map{border:1px solid #7b98bc;height:150px;margin:2px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:1px;left:2px;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-overviewmap-box{border:2px dotted rgba(0,60,136,.7)}.ol-overviewmap .ol-overviewmap-box:hover{cursor:move}@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:local("Material Icons"),local("MaterialIcons-Regular"),url(https://fonts.gstatic.com/s/materialicons/v19/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format("woff2"),url(https://fonts.gstatic.com/s/materialicons/v28/2fcrYFNaTjcS6g4U3t-Y5ewrjPiaoEww8AihgqWRJAo.woff) format("woff")}.material-icons{font-family:'Material Icons';font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;font-feature-settings:'liga';-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased}html{-webkit-box-sizing:border-box;box-sizing:border-box}*,::after,::before{-webkit-box-sizing:inherit;box-sizing:inherit}body{color:#484848;font-family:-apple-system,BlinkMacSystemFont,"Avenir Next",Avenir,"Segoe UI","Lucida Grande","Helvetica Neue",Helvetica,"Fira Sans",Roboto,Noto,"Droid Sans",Cantarell,Oxygen,Ubuntu,"Franklin Gothic Medium","Century Gothic","Liberation Sans",sans-serif;font-size:1em;line-height:1.5}h1,h2,h3,h4,h5,h6{font-family:-apple-system,BlinkMacSystemFont,"Avenir Next",Avenir,"Segoe UI","Lucida Grande","Helvetica Neue",Helvetica,"Fira Sans",Roboto,Noto,"Droid Sans",Cantarell,Oxygen,Ubuntu,"Franklin Gothic Medium","Century Gothic","Liberation Sans",sans-serif;font-size:1.25em;line-height:1.2;margin:0 0 .75em}p{margin:0 0 .75em}a{color:#2196f3;text-decoration:none;-webkit-transition:color 150ms ease;transition:color 150ms ease}a:active,a:focus,a:hover{color:#1971b6}hr{border-bottom:1px solid #ddd;border-left:0;border-right:0;border-top:0;margin:1.5em 0}.ribbon-box{height:100px;width:100px;border:none;position:relative}.ribbon-wrapper{height:85px;width:85px;overflow:hidden;position:absolute;right:-1px;top:-1px}.ribbon-wrapper .ribbon{background-color:#484848;-webkit-box-shadow:0 0 3px rgba(0,0,0,.3);box-shadow:0 0 3px rgba(0,0,0,.3);color:#fff;font-size:.8em;left:-5px;line-height:1.5em;padding:2px 7px;position:relative;text-align:center;top:15px;-webkit-transform:rotate(45deg);transform:rotate(45deg);width:120px}.ribbon-wrapper .ribbon:focus,.ribbon-wrapper .ribbon:hover{background-color:#3a3a3a}.ribbon-wrapper .ribbon a{cursor:pointer;color:#fff}.mat-autocomplete-panel .mat-option .mat-option-text .details{color:#aaa;font-style:italic}.cdk-overlay-container .cdk-overlay-pane{max-width:100vw!important}.cdk-overlay-container .cdk-overlay-pane .mat-dialog-container{padding:0!important}.ol-control button{background-color:#2196f3!important;font-weight:400!important;font-family:-apple-system,BlinkMacSystemFont,"Avenir Next",Avenir,"Segoe UI","Lucida Grande","Helvetica Neue",Helvetica,"Fira Sans",Roboto,Noto,"Droid Sans",Cantarell,Oxygen,Ubuntu,"Franklin Gothic Medium","Century Gothic","Liberation Sans",sans-serif!important;font-size:1.5em!important;border-radius:3px!important}.ol-rotate,.ol-zoom{display:none!important}.mangol{max-width:100%;margin-left:auto;margin-right:auto;height:100%!important}.mangol::after{clear:both;content:"";display:block}.mangol .mangol-content{height:100%}.mangol .ol-viewport{height:100%!important}.mangol .mat-drawer-container{width:100%;height:100%}.mangol .mat-drawer-container mat-drawer{width:450px;min-width:200px;max-width:450px;-webkit-box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mangol .mat-drawer-container .mat-drawer-backdrop.mat-drawer-shown{display:none!important}.mangol-map{z-index:0;width:100%;height:100%;display:block}.mangol-map .custom-buttons{position:absolute;z-index:20}.mangol-map .custom-buttons .mat-ripple-background,.mangol-map .custom-buttons .mat-ripple-foreground{display:none!important}.mangol-map .custom-buttons .sidebar{margin-top:3em;margin-left:1em;top:6em;left:.5em}.mangol-map .custom-buttons .zoom-in{margin-top:1em;margin-left:1em}.mangol-map .custom-buttons .full-screen,.mangol-map .custom-buttons .zoom-out{margin-left:1em;margin-top:.5em}.mangol-map .mangol-map-div{height:100%;overflow:hidden}.mangol-map .mangol-map-controllers{position:absolute;padding:1em;z-index:2;right:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex}.mangol-map .mangol-map-controllers .mangol-mouse-position{position:relative;margin-left:1em}.mangol-map .mangol-map-controllers .mangol-scale-line{position:relative}.mangol-map .mangol-map-controllers .mangol-scale-line .ol-scale-line{position:relative;background-color:rgba(0,0,0,0);bottom:initial;left:initial;padding:initial}.mangol-map .mangol-map-controllers .mangol-scale-line .ol-scale-line .ol-scale-line-inner{font-family:'Roboto Mono',monospace;font-weight:300;font-size:13px;border:1px solid #fff;border-top:none;border-left:none;border-right:none;color:#fff;margin:initial}.mangol-map .mangol-quick-search{width:50%;min-width:100px;max-width:300px;position:absolute;padding:1em;top:0;right:0;z-index:3}.mangol-map .mangol-quick-search .quicksearch-outer{position:relative;background:#fff;border-radius:24px;padding:5px 20px}.mangol-map .mangol-quick-search .quicksearch-outer .quicksearch-form .mat-form-field{width:100%}.mangol-map .mangol-quick-search .quicksearch-outer .quicksearch-form .mat-form-field-prefix .mat-icon{font-size:100%;margin-right:3px}.mangol-map .mangol-quick-search .quicksearch-outer input{-webkit-box-shadow:none;box-shadow:none}.mangol-sidebar{z-index:200;vertical-align:top;background-color:#fff;height:100%}.mangol-sidebar .sidebar-outer{display:table;width:100%;table-layout:fixed;padding:0;height:100%}.mangol-sidebar .sidebar-outer .close-button{float:right;width:1em}.mangol-sidebar .sidebar-outer .sidebar-main{max-height:200px;vertical-align:top;padding:0 5px;font-size:.8em;background-color:#fff}.mangol-sidebar .sidebar-outer .sidebar-main .sidebar-title .mat-toolbar{background-color:#fafafa;border:1px solid #eee;margin-bottom:3px}.mangol-sidebar .sidebar-outer .sidebar-main .sidebar-content button{text-transform:uppercase}.mangol-sidebar .sidebar-outer .sidebar-main .sidebar-content .dev{color:#999;padding-top:5px}.mangol-toolbar{display:table-cell;width:16.66667%;height:100%;background-color:#fff;color:#2196f3;border-right:1px solid rgba(0,0,0,.15);text-align:center}.mangol-toolbar .toolbar-div{min-height:2em}.mangol-toolbar .toolbar-div .mat-list .mat-list-item{padding:0!important}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content{padding:0}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab{-webkit-box-shadow:none;box-shadow:none;background-color:#fff;margin-left:auto;margin-right:auto}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab.active .mat-icon{color:#2196f3}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab:not([disabled]):hover{-webkit-box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),-webkit-box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),-webkit-box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab .mat-icon{color:#484848;font-size:1em;line-height:1.7em}.mangol-layertree{color:#484848}.mangol-layertree .mat-list.layer{border:1px solid #eee;padding-top:0;margin-top:3px}.mangol-layertree .mat-list .toggled{background-color:#f5f5f5}.mangol-layertree .mat-list .mat-subheader{color:#2196f3}.mangol-layertree .mat-expansion-panel{-webkit-box-shadow:none!important;box-shadow:none!important;border:1px solid #eee}.mangol-layertree .mat-expansion-panel:not(.mat-expanded){margin-bottom:4px}.mangol-layertree .mat-expansion-panel .mat-expansion-panel-header .mat-content{display:initial}.mangol-layertree .mat-list-item:hover{background-color:#f5f5f5}.mangol-layertree .mat-list-item .mat-icon{cursor:pointer}.mangol-layertree .layer-name{font-size:13px!important}.mangol-layertree .layer-description{color:rgba(0,0,0,.54);font-size:13px!important}.mangol-layer-details .details{padding:16px}.mangol-layer-details .details .details-title{padding-bottom:20px}.mangol-layer-details .details .details-title .mat-icon{float:right;cursor:pointer}.mangol-layer-details .details .mat-slider{width:100%}.mangol-print .mat-ripple-background,.mangol-print .mat-ripple-foreground{display:none!important}.mangol-print .form-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:10px}.mangol-print .form-container button{margin-top:10px}.mangol-print .form-container>*{width:100%}.mangol-measure .measure-container{padding:10px}.mangol-measure .measure-container .subtitle{padding-bottom:10px}.mangol-measure .measure-container .value-container{padding-top:10px}.mangol-measure .measure-container .value-container .value{color:#2196f3}.mangol-measure .measure-container .mat-button-toggle-group,.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle{width:100%}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle .mat-button-toggle-label .mat-button-toggle-label-content{width:100%;text-align:center}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle .mat-icon{text-align:center;font-size:large;color:#484848}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle.mat-button-toggle-checked{background-color:#fafafa}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle.mat-button-toggle-checked .mat-icon{color:#2196f3}.mangol-dialog .mangol,.mangol-dialog .mangol .mangol-content,.mangol-dialog .mangol .ol-viewport{height:100%!important}.mangol-feature-info .feature-info-container{padding:10px}.mangol-feature-info .feature-info-container .mat-form-field{width:100%}.mangol-feature-info .mat-feature-info-table .table-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mangol-feature-info .full-screen-button{width:100%;margin-bottom:20px}.mangol-pointer{cursor:pointer}:host{display:block}.sidebar-outer /deep/.mat-tab-label,.sidebar-outer /deep/.mat-tab-label-active{min-width:80px!important;padding:3px!important;margin:3px!important}.mat-tab-group{height:100%}.mat-tab-group /deep/.mat-tab-body-wrapper{height:100%}.sidebar-content{height:100%}.sidebar-content .sidebar-inner{padding:10px 5px}.mat-icon{font-size:16px;height:16px;width:16px;line-height:16px;vertical-align:middle}`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MangolSidebarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: MangolFeatureIntoService, },
    { type: MangolMeasureService, },
];
MangolSidebarComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "options": [{ type: Input },],
    "map": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolSidebarModule {
}
MangolSidebarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MangolMaterialModule,
                    MangolLayertreeModule,
                    MangolPrintModule,
                    MangolMeasureModule,
                    MangolFeatureInfoModule
                ],
                exports: [MangolSidebarComponent],
                declarations: [MangolSidebarComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolDialogComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.class = 'mangol-dialog';
        this.config = this.data.config;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() { }
}
MangolDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-dialog',
                template: `<mangol *ngIf="config"
    [config]="config"></mangol>
`
            },] },
];
/** @nocollapse */
MangolDialogComponent.ctorParameters = () => [
    { type: MatDialogRef, },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
];
MangolDialogComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolMapComponent {
    /**
     * @param {?} dialog
     */
    constructor(dialog) {
        this.dialog = dialog;
        this.class = 'mangol-map';
        this.mapCreated = new EventEmitter();
        this.sidebarToggled = new EventEmitter();
        this.defaultConfig = /** @type {?} */ ({
            map: {
                target: null,
                renderer: 'canvas',
                view: {
                    projection: 'EPSG:900913',
                    center: proj.fromLonLat([19.39563, 47.16846], 'EPSG:900913'),
                    zoom: 7,
                    resolutions: undefined,
                    zoomDuration: 500
                }
            },
            sidebar: {
                opened: true
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadingTiles$ = this.mapService.loadingTiles$;
        this.sidebarOpened =
            this.config &&
                this.config.hasOwnProperty('sidebar') &&
                this.config.sidebar.hasOwnProperty('opened')
                ? this.config.sidebar.opened
                : this.defaultConfig.sidebar.opened;
        this.renderer =
            this.config &&
                this.config.hasOwnProperty('map') &&
                this.config.map.hasOwnProperty('renderer')
                ? this.config.map.renderer
                : this.defaultConfig.map.renderer;
        this.zoomDuration =
            this.config.map.view.zoomDuration ||
                this.defaultConfig.map.view.zoomDuration;
        this.view = new View({
            projection: this.config.map.view.projection,
            center: this.config.map.view.center,
            zoom: this.config.map.view.zoom,
            resolutions: this.config.map.view && this.config.map.view.resolutions
                ? this.config.map.view.resolutions
                : this.defaultConfig.map.view.resolutions
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            // create the MangolMap instance (extends ol.Map)
            this.map = new MangolMap({
                renderer: this.renderer,
                layers: [],
                target: this.config.map.target,
                view: this.view
            }, this.mapService);
            // consume layer and layergroup parameters
            if (this.config.map.hasOwnProperty('layertree')) {
                this.map.addLayersAndLayerGroups(this.config.map.layertree, null);
            }
            // register the map in the injectable mapService
            this.mapService.addMap(this.map);
            this.mapCreated.emit(this.map);
        }, 0);
    }
    /**
     * @return {?}
     */
    zoomIn() {
        this.view.animate({
            zoom: this.view.getZoom() + 1,
            duration: this.zoomDuration
        });
    }
    /**
     * @return {?}
     */
    zoomOut() {
        this.view.animate({
            zoom: this.view.getZoom() - 1,
            duration: this.zoomDuration
        });
    }
    /**
     * @return {?}
     */
    fullScreen() {
        // some parameters are needet to override: the map target and the fullScreen controller
        const /** @type {?} */ confOverride = /** @type {?} */ ({
            map: Object.assign({}, this.config.map, { target: this.config.map.target + '-dialog', controllers: Object.assign({}, this.config.map.controllers, { fullScreen: undefined }) })
        });
        const /** @type {?} */ dialogConfig = Object.assign({}, this.config, confOverride);
        const /** @type {?} */ dialogRef = this.dialog.open(MangolDialogComponent, {
            width: '95%',
            height: '95%',
            data: { config: dialogConfig }
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    /**
     * @return {?}
     */
    toggleSidebar() {
        this.sidebarOpened = !this.sidebarOpened;
        this.sidebarToggled.emit();
    }
}
MangolMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-map',
                template: `<div class="custom-buttons">
    <div class="zoom-in"
        (click)="zoomIn()">
        <button mat-mini-fab
            color="primary"
            matTooltip="Zoom in"
            matTooltipPosition="right"
            class="mat-elevation-z2">
      <mat-icon class="mat-12">add</mat-icon>
    </button>
    </div>
    <div class="zoom-out"
        (click)="zoomOut()"
        matTooltip="Zoom out"
        matTooltipPosition="right">
        <button mat-mini-fab
            color="primary"
            class="mat-elevation-z2">
      <mat-icon class="mat-24">remove</mat-icon>
    </button>
    </div>
    <div *ngIf="map && config && config.map && config.map.controllers && config.map.controllers.fullScreen"
        class="full-screen"
        (click)="fullScreen()"
        matTooltip="Full screen"
        matTooltipPosition="right">
        <button mat-mini-fab
            color="primary"
            class="mat-elevation-z2">
      <mat-icon class="mat-24">fullscreen</mat-icon>
    </button>
    </div>
    <div class="sidebar"
        *ngIf="config.sidebar && config.sidebar.collapsible"
        (click)="toggleSidebar()">
        <button mat-mini-fab
            color="primary"
            [matTooltip]="sidebarOpened ? 'Hide sidebar' : 'Show sidebar'"
            matTooltipPosition="right"
            class="mat-elevation-z2">
      <mat-icon class="mat-24">{{sidebarOpened ? 'chevron_left' : 'chevron_right'}}</mat-icon>
    </button>
    </div>
</div>
<mangol-tile-load *ngIf="map && config && config.map && config.map.controllers && config.map.controllers.tileLoad"
    [tiles]="loadingTiles$ | async"></mangol-tile-load>
<div class="mangol-map-controllers"
    *ngIf="map && config && config.map && config.map.controllers">
    <mangol-scale-line *ngIf="config.map.controllers.scaleLine"
        [map]="map"
        [opts]="config.map.controllers.scaleLine"></mangol-scale-line>
    <mangol-mouse-position *ngIf="config.map.controllers.mousePosition"
        [map]="map"
        [opts]="config.map.controllers.mousePosition"></mangol-mouse-position>
</div>
<mangol-quick-search *ngIf="map && config && config.map && config.map.controllers && config.map.controllers.quickSearch"
    [opts]="config.map.controllers.quickSearch"
    [map]="map"></mangol-quick-search>

<div [attr.id]="config.map.target"
    class="mangol-map-div"></div>
`
            },] },
];
/** @nocollapse */
MangolMapComponent.ctorParameters = () => [
    { type: MatDialog, },
];
MangolMapComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "config": [{ type: Input },],
    "mapService": [{ type: Input },],
    "mapCreated": [{ type: Output },],
    "sidebarToggled": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolMousePositionComponent {
    constructor() {
        this.class = 'mangol-mouse-position';
        this.coordinates = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.precision = this.opts.hasOwnProperty('precision')
            ? this.opts.precision
            : 2;
        this.coordinates = this._formatCoordinates(this.map.getView().getCenter());
        this.pointerMoveListener = this.map.on('pointermove', (evt) => {
            if (evt.dragging) {
                return;
            }
            else {
                this.coordinates = this._formatCoordinates(evt.coordinate);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.map.un('pointermove', this.pointerMoveListener);
    }
    /**
     * @param {?} coords
     * @return {?}
     */
    _formatCoordinates(coords) {
        const /** @type {?} */ formattedCoords = [];
        coords.forEach((coord) => {
            coord = parseFloat(coord).toFixed(this.precision);
            formattedCoords.push(coord);
        });
        return formattedCoords;
    }
}
MangolMousePositionComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-mouse-position',
                template: `<mat-chip-list *ngIf="coordinates.length === 2">
    <mat-chip color="primary"
        selected="true"
        class="mat-elevation-z2">{{coordinates.join(', ')}}</mat-chip>
</mat-chip-list>
`,
                styles: [`:host{display:block}.mat-chip{font-family:'Roboto Mono',monospace;font-weight:300;text-align:center}`]
            },] },
];
/** @nocollapse */
MangolMousePositionComponent.ctorParameters = () => [];
MangolMousePositionComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "map": [{ type: Input },],
    "opts": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolQuickSearchComponent {
    constructor() {
        this.class = 'mangol-quick-search';
        this.formControl = new FormControl();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.placeholder = this.opts.hasOwnProperty('placeholder')
            ? this.opts.placeholder
            : 'Quicksearch';
        this.items = this.opts.hasOwnProperty('items') ? this.opts.items : [];
        this.filteredOptionsObservable = this.formControl.valueChanges
            .startWith('')
            .map(val => this._filter(val));
        this.filteredOptions = [];
    }
    /**
     * @param {?} val
     * @return {?}
     */
    _filter(val) {
        this.filteredOptions = this.items.filter((option) => option.text.toLowerCase().indexOf(val.toLowerCase()) === 0);
        return this.filteredOptions;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onOptionSeleted($event) {
        let /** @type {?} */ selected = null;
        for (let /** @type {?} */ i = 0; i < this.filteredOptions.length; i++) {
            if (this.filteredOptions[i].text === $event.option.value) {
                selected = this.filteredOptions[i];
                break;
            }
        }
        if (selected.hasOwnProperty('extent')) {
            this._zoomToExtent(selected);
        }
        else if (selected.hasOwnProperty('coordinates')) {
            this._zoomToCoordinates(selected);
        }
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    _zoomToCoordinates(selected) {
        this.map.getView().animate({
            center: selected.coordinates
        });
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    _zoomToExtent(selected) {
        this.map.getView().fit(selected.extent, {
            duration: 500
        });
    }
}
MangolQuickSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-quick-search',
                template: `<div class="quicksearch-outer mat-elevation-z2">
    <form class="quicksearch-form">
        <mat-form-field>
            <input type="search"
                aria-label="Number"
                matInput
                [formControl]="formControl"
                [matAutocomplete]="auto"
                [placeholder]="placeholder">
            <span matPrefix>
        <mat-icon fontIcon="ms-zoom" fontSet="ms"></mat-icon>
      </span>
            <mat-autocomplete #auto="matAutocomplete"
                (optionSelected)="onOptionSeleted($event)">
                <mat-option *ngFor="let option of filteredOptionsObservable | async"
                    [value]="option.text">
                    <span>{{ option.text }}</span>
                    <span *ngIf="option.details">
            <span>|</span>
                    <small class="details">{{option.details}}</small>
                    </span>
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>
    </form>
</div>
`
            },] },
];
/** @nocollapse */
MangolQuickSearchComponent.ctorParameters = () => [];
MangolQuickSearchComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "map": [{ type: Input },],
    "opts": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolScaleLineComponent {
    constructor() {
        this.class = 'mangol-scale-line';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.target = this.map.getTarget() + '-scale-line';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ scaleLineControl = new control.ScaleLine({
            target: document.getElementById(this.target),
            units: this.opts.hasOwnProperty('units') ? this.opts.units : 'metric'
        });
        setTimeout(() => {
            this.map.addControl(scaleLineControl);
        }, 0);
    }
}
MangolScaleLineComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-scale-line',
                template: `<mat-chip-list>
    <mat-chip color="primary"
        selected="true"
        class="mat-elevation-z2">
        <div [attr.id]="target"></div>
    </mat-chip>
</mat-chip-list>
`
            },] },
];
/** @nocollapse */
MangolScaleLineComponent.ctorParameters = () => [];
MangolScaleLineComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "map": [{ type: Input },],
    "opts": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TileLoadComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
TileLoadComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol-tile-load',
                template: `<div [hidden]="tiles.length === 0">
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
</div>

`,
                styles: [`:host{display:block;position:absolute;bottom:0;z-index:20;left:0;width:100%}`]
            },] },
];
/** @nocollapse */
TileLoadComponent.ctorParameters = () => [];
TileLoadComponent.propDecorators = {
    "tiles": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolMapModule {
}
MangolMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MangolMaterialModule,
                    FormsModule,
                    ReactiveFormsModule
                ],
                exports: [
                    MangolMapComponent,
                    MangolMousePositionComponent,
                    MangolScaleLineComponent,
                    MangolQuickSearchComponent
                ],
                declarations: [
                    MangolMapComponent,
                    MangolMousePositionComponent,
                    MangolScaleLineComponent,
                    MangolQuickSearchComponent,
                    TileLoadComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolComponent {
    /**
     * @param {?} mapService
     */
    constructor(mapService) {
        this.mapService = mapService;
        this.class = 'mangol';
        this.mapReady = new EventEmitter();
        this.containerReady = false;
        this.service = this.mapService;
        this.defaultMap = {
            renderer: 'canvas',
            target: 'demo-simple-map',
            view: {
                projection: 'EPSG:900913',
                center: proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
                zoom: 7
            },
            layertree: {
                layers: [
                    {
                        name: 'OpenStreetMap layer',
                        layer: new layer.Tile({
                            source: new source.OSM()
                        })
                    }
                ]
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Generate a default config if there is none
        if (typeof this.config === 'undefined') {
            this.config = /** @type {?} */ ({
                map: this.defaultMap
            });
        }
        else if (this.config && !this.config.hasOwnProperty('map')) {
            this.config.map = this.defaultMap;
        }
        this.sidebarMode =
            this.config &&
                this.config.hasOwnProperty('sidebar') &&
                this.config.sidebar.hasOwnProperty('mode')
                ? this.config.sidebar.mode
                : 'side';
        try {
            this.isOpened = this.config.sidebar.opened;
        }
        catch (/** @type {?} */ error) {
            this.isOpened = true;
        }
    }
    /**
     * @param {?} map
     * @return {?}
     */
    mapCreated(map$$1) {
        this.map = map$$1;
        this.map.updateSize();
        const /** @type {?} */ ready = /** @type {?} */ ({
            mapService: this.service,
            config: this.config
        });
        this.mapReady.emit(ready);
    }
    /**
     * @return {?}
     */
    sidebarToggled() {
        this.isOpened = !this.isOpened;
    }
    /**
     * @return {?}
     */
    updateMap() {
        setTimeout(() => {
            this.map.updateSize();
        }, 0);
    }
}
MangolComponent.decorators = [
    { type: Component, args: [{
                selector: 'mangol',
                template: `<div class="mangol-content">
    <mat-drawer-container autosize>
        <mat-drawer #start
            *ngIf="config.sidebar && sidebarMode && map"
            position="start"
            (opened)="updateMap()"
            (closed)="isOpened=false"
            (openedChange)="updateMap()"
            opened="{{isOpened}}"
            mode="{{sidebarMode}}"
            disableClose>
            <mangol-sidebar [options]="config.sidebar"
                [map]="map">
            </mangol-sidebar>
        </mat-drawer>
        <mangol-map *ngIf="config.map"
            [config]="config"
            [mapService]="service"
            (mapCreated)="mapCreated($event)"
            (sidebarToggled)="sidebarToggled($event)">
        </mangol-map>
    </mat-drawer-container>
</div>
`,
                providers: [MangolMapService]
            },] },
];
/** @nocollapse */
MangolComponent.ctorParameters = () => [
    { type: MangolMapService, },
];
MangolComponent.propDecorators = {
    "class": [{ type: HostBinding, args: ['class',] },],
    "config": [{ type: Input },],
    "mapReady": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MangolModule {
}
MangolModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MangolMaterialModule,
                    MangolMapModule,
                    MangolSidebarModule
                ],
                declarations: [MangolComponent, MangolDialogComponent],
                exports: [MangolComponent, MangolDialogComponent],
                entryComponents: [MangolDialogComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { MangolMapService, MangolModule, MangolMaterialModule as ɵa, KeysPipe as ɵn, MangolFeatureInfoTableDialogComponent as ɵv, MangolFeatureInfoTableComponent as ɵu, MangolFeatureInfoComponent as ɵs, MangolFeatureInfoModule as ɵr, MangolFeatureIntoService as ɵt, MangolLayerDetailsComponent as ɵk, MangolLayertreeComponent as ɵj, MangolLayertreeModule as ɵi, MangolDialogComponent as ɵy, MangolComponent as ɵx, MangolMapComponent as ɵc, MangolMapModule as ɵb, MangolMousePositionComponent as ɵd, MangolQuickSearchComponent as ɵf, MangolScaleLineComponent as ɵe, TileLoadComponent as ɵg, MangolMeasureComponent as ɵp, MangolMeasureModule as ɵo, MangolMeasureService as ɵq, MangolPrintComponent as ɵm, MangolPrintModule as ɵl, MangolSidebarComponent as ɵw, MangolSidebarModule as ɵh };
//# sourceMappingURL=mangol.js.map
