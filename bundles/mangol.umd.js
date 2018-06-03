(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/material'), require('openlayers'), require('hammerjs'), require('@angular/common'), require('@angular/cdk/collections'), require('rxjs/add/observable/of'), require('@angular/http'), require('rxjs/operators'), require('@angular/forms'), require('rxjs/add/operator/startWith'), require('rxjs/add/operator/map')) :
	typeof define === 'function' && define.amd ? define('mangol', ['exports', '@angular/core', 'rxjs', '@angular/material', 'openlayers', 'hammerjs', '@angular/common', '@angular/cdk/collections', 'rxjs/add/observable/of', '@angular/http', 'rxjs/operators', '@angular/forms', 'rxjs/add/operator/startWith', 'rxjs/add/operator/map'], factory) :
	(factory((global.mangol = {}),global.ng.core,global.rxjs,global.ng.material,global.openlayers,null,global.ng.common,global.ng.cdk.collections,global.Rx.Observable,global.ng.http,global.Rx.Observable.prototype,global.ng.forms));
}(this, (function (exports,core,rxjs,material,openlayers,hammerjs,common,collections,of,http,operators,forms) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}









function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var MangolMapService = /** @class */ (function () {
    function MangolMapService() {
        this.loadingTiles$ = new rxjs.BehaviorSubject([]);
        this.maps = [];
    }
    MangolMapService.prototype.getMaps = function () {
        return this.maps;
    };
    MangolMapService.prototype.getMapById = function (id) {
        var map$$1 = null;
        for (var i = 0; i < this.maps.length; i++) {
            if (this.maps[i].getTarget() === id) {
                map$$1 = this.maps[i];
                break;
            }
        }
        return map$$1;
    };
    MangolMapService.prototype.addMap = function (map$$1) {
        this.maps.push(map$$1);
    };
    MangolMapService.prototype.addTile = function (tile) {
        var loads = __spread(this.loadingTiles$.getValue());
        loads.push(tile);
        this.loadingTiles$.next(loads);
    };
    MangolMapService.prototype.removeTile = function (tile) {
        var loads = __spread(this.loadingTiles$.getValue());
        loads.splice(loads.indexOf(tile), 1);
        this.loadingTiles$.next(loads);
    };
    return MangolMapService;
}());
MangolMapService.decorators = [
    { type: core.Injectable },
];
MangolMapService.ctorParameters = function () { return []; };
var materialModules = [
    material.MatButtonModule,
    material.MatToolbarModule,
    material.MatIconModule,
    material.MatTooltipModule,
    material.MatSidenavModule,
    material.MatGridListModule,
    material.MatListModule,
    material.MatExpansionModule,
    material.MatCardModule,
    material.MatSliderModule,
    material.MatMenuModule,
    material.MatSlideToggleModule,
    material.MatChipsModule,
    material.MatFormFieldModule,
    material.MatAutocompleteModule,
    material.MatInputModule,
    material.MatDialogModule,
    material.MatSelectModule,
    material.MatTableModule,
    material.MatSnackBarModule,
    material.MatButtonToggleModule,
    material.MatDividerModule,
    material.MatProgressSpinnerModule,
    material.MatTabsModule,
    material.MatStepperModule,
    material.MatProgressBarModule
];
var MangolMaterialModule = /** @class */ (function () {
    function MangolMaterialModule() {
    }
    return MangolMaterialModule;
}());
MangolMaterialModule.decorators = [
    { type: core.NgModule, args: [{
                imports: materialModules,
                exports: materialModules
            },] },
];
var MangolLayer = /** @class */ (function () {
    function MangolLayer(options, mapService) {
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
    MangolLayer.prototype._configureTileLoad = function () {
        var _this = this;
        var source$$1 = this.layer.getSource();
        if (source$$1 instanceof openlayers.source.TileWMS ||
            source$$1 instanceof openlayers.source.OSM ||
            source$$1 instanceof openlayers.source.BingMaps ||
            source$$1 instanceof openlayers.source.TileArcGISRest ||
            source$$1 instanceof openlayers.source.TileImage ||
            source$$1 instanceof openlayers.source.TileJSON) {
            source$$1.on('tileloadstart', function (evt) {
                _this.mapService.addTile(evt.tile.getImage());
            });
            source$$1.on('tileloadend', function (evt) {
                _this.mapService.removeTile(evt.tile.getImage());
            });
            source$$1.on('tileloaderror', function (evt) {
                _this.mapService.removeTile(evt.tile.getImage());
            });
        }
        else if (source$$1 instanceof openlayers.source.ImageWMS ||
            source$$1 instanceof openlayers.source.ImageMapGuide ||
            source$$1 instanceof openlayers.source.ImageArcGISRest) {
            source$$1.on('imageloadstart', function (evt) {
                _this.mapService.addTile(evt.image.getImage());
            });
            source$$1.on('imageloadend', function (evt) {
                _this.mapService.removeTile(evt.image.getImage());
            });
            source$$1.on('imageloaderror', function (evt) {
                _this.mapService.removeTile(evt.image.getImage());
            });
        }
    };
    MangolLayer.prototype.getLayerVisibilityIcon = function () {
        return this.getVisible() ? 'visibility' : 'visibility_off';
    };
    MangolLayer.prototype.toggleLayerVisibility = function () {
        this.setVisible(!this.getVisible());
    };
    MangolLayer.prototype.getName = function () {
        return this.name;
    };
    MangolLayer.prototype.getLayer = function () {
        return this.layer;
    };
    MangolLayer.prototype.getOpacity = function () {
        return this.opacity;
    };
    MangolLayer.prototype.setOpacity = function (value) {
        this.opacity = value;
        this.layer.setOpacity(value);
    };
    MangolLayer.prototype.getVisible = function () {
        return this.visible;
    };
    MangolLayer.prototype.setVisible = function (value) {
        this.visible = value;
        this.layer.setVisible(value);
    };
    MangolLayer.prototype.getDescription = function () {
        return this.description;
    };
    MangolLayer.prototype.setDescription = function (description) {
        this.description = description;
    };
    MangolLayer.prototype.isQueryable = function () {
        return this.queryable;
    };
    MangolLayer.prototype.setQueryable = function (queryable) {
        this.queryable = queryable;
    };
    MangolLayer.prototype.getAttrColumns = function () {
        return this.attrColumns;
    };
    MangolLayer.prototype.setAttrColumns = function (cols) {
        this.attrColumns = cols;
    };
    return MangolLayer;
}());
var MangolLayerDetailsComponent = /** @class */ (function () {
    function MangolLayerDetailsComponent() {
        this.class = 'mangol-layer-details';
        this.detailsClosed = new core.EventEmitter();
    }
    MangolLayerDetailsComponent.prototype.ngOnInit = function () {
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
    };
    MangolLayerDetailsComponent.prototype.onSliderChange = function ($event) {
        var newValue = $event.value / 100;
        this.layer.opacity = newValue;
        this.layer.layer.setOpacity(newValue);
        this.sliderValue = parseInt((this.layer.opacity * 100).toString(), 0);
    };
    MangolLayerDetailsComponent.prototype.closeDetails = function () {
        this.detailsClosed.emit(null);
    };
    return MangolLayerDetailsComponent;
}());
MangolLayerDetailsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-layer-details',
                template: "<div>\n    <div *ngIf=\"detailType==='opacity'\"\n        class=\"details\">\n        <div class=\"details-title\">Opacity\n            <mat-icon matTooltip=\"Close details\"\n                matTooltipPosition=\"above\"\n                (click)=\"closeDetails()\">close</mat-icon>\n        </div>\n        <mat-slider #slider\n            color=\"primary\"\n            [thumbLabel]=\"sliderShowLabels\"\n            [min]=\"sliderMin\"\n            [max]=\"sliderMax\"\n            [step]=\"sliderStep\"\n            [value]=\"sliderValue\"\n            (change)=\"onSliderChange($event)\"></mat-slider>\n    </div>\n    <div *ngIf=\"detailType==='legend'\"\n        class=\"details\">\n        <div class=\"details-title\">Legend</div>\n        soon...\n    </div>\n</div>\n"
            },] },
];
MangolLayerDetailsComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "opts": [{ type: core.Input },],
    "layer": [{ type: core.Input },],
    "detailType": [{ type: core.Input },],
    "detailsClosed": [{ type: core.Output },],
};
var MangolLayergroup = /** @class */ (function () {
    function MangolLayergroup(options) {
        this.options = options;
        this.name = options.name;
        this.nestedLayers = [];
        this.nestedLayerGroups = [];
    }
    MangolLayergroup.prototype.getDetails = function () {
        if (this.options.hasOwnProperty('description')) {
            this.details = this.options.description;
        }
        else {
            var layerGroupLength = this.nestedLayerGroups.length;
            var layerLength = this.nestedLayers.length;
            var details = [];
            if (layerLength > 0) {
                details.push(layerLength + " layer" + (layerLength === 1 ? '' : 's'));
            }
            if (layerGroupLength > 0) {
                details.push(layerGroupLength + " layer group" + (layerGroupLength === 1 ? '' : 's'));
            }
            this.details = details.join(', ');
        }
    };
    MangolLayergroup.prototype.getName = function () {
        return this.name;
    };
    return MangolLayergroup;
}());
var MangolMap = /** @class */ (function (_super) {
    __extends(MangolMap, _super);
    function MangolMap(options, mapService) {
        var _this = _super.call(this, options) || this;
        _this.mapService = mapService;
        _this._layers = [];
        _this._layerGroups = [];
        _this._allLayers = [];
        return _this;
    }
    MangolMap.prototype.addLayersAndLayerGroups = function (layertree, parent) {
        var _this = this;
        if (layertree.hasOwnProperty('layers')) {
            layertree.layers.forEach(function (layer$$1) {
                _this._handleLayer(layer$$1, parent);
            });
        }
        if (layertree.hasOwnProperty('groups')) {
            layertree.groups.forEach(function (group) {
                _this._handleLayerGroup(group, parent);
            });
        }
    };
    MangolMap.prototype._handleLayer = function (layer$$1, parent) {
        var newLayer = new MangolLayer(Object.assign({}, layer$$1), this.mapService);
        if (parent === null) {
            this._layers.push(newLayer);
        }
        else {
            parent.nestedLayers.push(newLayer);
        }
        this._allLayers.push(newLayer);
        this.addLayer(newLayer.getLayer());
    };
    MangolMap.prototype._handleLayerGroup = function (group, parent) {
        var newLayerGroup = new MangolLayergroup(group);
        if (parent === null) {
            this._layerGroups.push(newLayerGroup);
        }
        else {
            parent.nestedLayerGroups.push(newLayerGroup);
        }
        if (group.hasOwnProperty('children')) {
            this.addLayersAndLayerGroups(group.children, newLayerGroup);
        }
        newLayerGroup.getDetails();
    };
    MangolMap.prototype.getMangolLayers = function () {
        return this._layers;
    };
    MangolMap.prototype.getMangolLayerGroups = function () {
        return this._layerGroups;
    };
    MangolMap.prototype.getMangolAllLayers = function () {
        return this._allLayers;
    };
    return MangolMap;
}(openlayers.Map));
var MangolLayertreeComponent = /** @class */ (function () {
    function MangolLayertreeComponent() {
        this.class = 'mangol-layertree';
    }
    MangolLayertreeComponent.prototype.ngOnInit = function () {
        this.layerGroups = this.map.getMangolLayerGroups();
        this.layers = this.map.getMangolLayers();
    };
    MangolLayertreeComponent.prototype.setMenuActive = function (type, layer$$1) {
        layer$$1.detailType = type;
        layer$$1.showDetails = true;
    };
    MangolLayertreeComponent.prototype.hideDetails = function (layer$$1) {
        layer$$1.detailType = null;
        layer$$1.showDetails = false;
    };
    return MangolLayertreeComponent;
}());
MangolLayertreeComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-layertree',
                template: "<mat-list dense>\n    <h3 matSubheader\n        *ngIf=\"layerGroups.length > 0\">LAYER GROUPS</h3>\n    <mat-accordion [multi]=\"isAccordionMulti\">\n        <mat-expansion-panel *ngFor=\"let layerGroup of layerGroups\">\n            <mat-expansion-panel-header>\n                <mat-panel-title>\n                    {{layerGroup.name}}\n                </mat-panel-title>\n                <mat-panel-description>\n                    {{layerGroup.details}}\n                </mat-panel-description>\n            </mat-expansion-panel-header>\n            <mat-list dense\n                *ngFor=\"let layer of layerGroup.nestedLayers\"\n                class=\"layer\">\n                <mat-list-item [ngClass]=\"{'toggled': layer.showDetails}\">\n                    <mat-slide-toggle color=\"primary\"\n                        [checked]=\"layer.visible\"\n                        (change)=\"layer.toggleLayerVisibility()\"\n                        matTooltip=\"Visibility\"\n                        matTooltipPosition=\"above\"></mat-slide-toggle>\n                    <mat-icon matListIcon\n                        matTooltip=\"Details\"\n                        matTooltipPosition=\"above\"\n                        (click)=\"layer.showDetails = true\"\n                        [matMenuTriggerFor]=\"menu\">more_vert</mat-icon>\n                    <p matLine\n                        class=\"layer-name\"> {{layer.name}} </p>\n                    <p matLine\n                        class=\"layer-description\">\n                        <span>{{layer.description}}</span>\n                    </p>\n                </mat-list-item>\n                <mat-menu #menu=\"matMenu\">\n                    <button mat-menu-item\n                        (click)=\"setMenuActive('opacity', layer)\">\n            <mat-icon>opacity</mat-icon>\n            <span>Opacity</span>\n          </button>\n                    <button mat-menu-item\n                        (click)=\"setMenuActive('legend', layer)\"\n                        disabled>\n            <mat-icon>view_list</mat-icon>\n            <span>Legend</span>\n          </button>\n                </mat-menu>\n                <mangol-layer-details [opts]=\"opts.details\"\n                    [layer]=\"layer\"\n                    [detailType]=\"layer.detailType\"\n                    *ngIf=\"layer.showDetails && layer.detailType !== null\"\n                    (detailsClosed)=\"hideDetails(layer)\"></mangol-layer-details>\n            </mat-list>\n        </mat-expansion-panel>\n    </mat-accordion>\n    <h3 matSubheader\n        *ngIf=\"layers.length > 0\">LAYERS</h3>\n    <mat-list dense\n        *ngFor=\"let layer of layers\"\n        class=\"layer\">\n        <mat-list-item [ngClass]=\"{'toggled': layer.showDetails}\">\n            <mat-slide-toggle color=\"primary\"\n                [checked]=\"layer.visible\"\n                (change)=\"layer.toggleLayerVisibility()\"\n                matTooltip=\"Visibility\"\n                matTooltipPosition=\"above\"></mat-slide-toggle>\n            <mat-icon matListIcon\n                matTooltip=\"Details\"\n                matTooltipPosition=\"above\"\n                (click)=\"layer.showDetails = true\"\n                [matMenuTriggerFor]=\"menu\">more_vert</mat-icon>\n            <p matLine\n                class=\"layer-name\"> {{layer.name}} </p>\n            <p matLine\n                class=\"layer-description\">\n                <span>{{layer.description}}</span>\n            </p>\n        </mat-list-item>\n        <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item\n                (click)=\"setMenuActive('opacity', layer)\">\n        <mat-icon>opacity</mat-icon>\n        <span>Opacity</span>\n      </button>\n            <button mat-menu-item\n                (click)=\"setMenuActive('legend', layer)\"\n                disabled>\n        <mat-icon>view_list</mat-icon>\n        <span>Legend</span>\n      </button>\n        </mat-menu>\n        <mangol-layer-details [opts]=\"opts.details\"\n            [layer]=\"layer\"\n            [detailType]=\"layer.detailType\"\n            *ngIf=\"layer.showDetails && layer.detailType !== null\"\n            (detailsClosed)=\"hideDetails(layer)\"></mangol-layer-details>\n    </mat-list>\n</mat-list>\n"
            },] },
];
MangolLayertreeComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "opts": [{ type: core.Input },],
    "map": [{ type: core.Input },],
    "isAccordionMulti": [{ type: core.Input },],
};
var MangolLayertreeModule = /** @class */ (function () {
    function MangolLayertreeModule() {
    }
    return MangolLayertreeModule;
}());
MangolLayertreeModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, MangolMaterialModule],
                exports: [MangolLayertreeComponent, MangolLayerDetailsComponent],
                declarations: [MangolLayertreeComponent, MangolLayerDetailsComponent]
            },] },
];
var MangolMeasureService = /** @class */ (function () {
    function MangolMeasureService() {
        this.activateState$ = new rxjs.BehaviorSubject(false);
    }
    return MangolMeasureService;
}());
MangolMeasureService.decorators = [
    { type: core.Injectable },
];
MangolMeasureService.ctorParameters = function () { return []; };
var MangolMeasureComponent = /** @class */ (function () {
    function MangolMeasureComponent(measureService) {
        var _this = this;
        this.measureService = measureService;
        this.class = 'mangol-measure';
        this.layer = null;
        this.selected = null;
        this.draw = null;
        this.buttons = [];
        this.value = null;
        this.activateStateSubscription = this.measureService.activateState$.subscribe(function (state) {
            if (state !== null) {
                if (state && _this.selected !== null) {
                    _this.activateDraw();
                }
                else {
                    _this.deactivateDraw();
                }
            }
        });
    }
    MangolMeasureComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.layer = new openlayers.layer.Vector({
            source: new openlayers.source.Vector(),
            style: function (feature) {
                return _this._getStyle(feature);
            }
        });
    };
    MangolMeasureComponent.prototype.ngOnDestroy = function () {
        this.deactivateDraw();
        if (this.activateStateSubscription) {
            this.activateStateSubscription.unsubscribe();
        }
    };
    MangolMeasureComponent.prototype.onToggleChange = function (evt) {
        this.selected = evt.value;
        this.measureService.activateState$.next(true);
    };
    MangolMeasureComponent.prototype.activateDraw = function () {
        var _this = this;
        this.deactivateDraw();
        this.map.addLayer(this.layer);
        this._setCursor(this.cursorStyle);
        this.draw = new openlayers.interaction.Draw({
            source: this.layer.getSource(),
            type: this.selected.geometryType,
            style: function (feature) {
                return _this._getStyle(feature);
            }
        });
        this.draw.on('drawstart', function (e) {
            _this.value = null;
            _this.layer.getSource().clear();
        });
        this.draw.on('drawend', function (e) {
            var feat = new openlayers.Feature({
                geometry: e.target
            });
            _this._getLengthOrArea(feat);
        });
        this.draw.setActive(true);
        this.map.addInteraction(this.draw);
    };
    MangolMeasureComponent.prototype.deactivateDraw = function () {
        this._setCursor('');
        this.value = null;
        try {
            this.map.removeInteraction(this.draw);
            this.layer.getSource().clear();
            this.map.removeLayer(this.layer);
        }
        catch (error) { }
    };
    MangolMeasureComponent.prototype.getDimension = function () {
        return this.selected.geometryType !== 'Polygon'
            ? "" + this.units
            : this.units + "&sup2;";
    };
    MangolMeasureComponent.prototype._setCursor = function (cursorType) {
        if (this.map) {
            var target = this.map.getTarget();
            var jTarget = typeof target === 'string' ? $('#' + target) : $(target);
            jTarget.css('cursor', cursorType);
        }
    };
    MangolMeasureComponent.prototype._getLengthOrArea = function (feature) {
        var value = '';
        var geom = feature.getGeometry();
        switch (this.selected.geometryType) {
            case 'LineString':
                try {
                    value = parseFloat(geom.getLength().toString())
                        .toFixed(this.precision)
                        .toString();
                }
                catch (error) { }
                break;
            case 'Polygon':
                try {
                    value = parseFloat(geom.getArea().toString())
                        .toFixed(this.precision)
                        .toString();
                }
                catch (error) { }
                break;
            case 'Circle':
                try {
                    value = parseFloat(geom.getRadius().toString())
                        .toFixed(this.precision)
                        .toString();
                }
                catch (error) { }
                break;
            default:
                break;
        }
        if (value !== '') {
            this.value = +value;
        }
        return value;
    };
    MangolMeasureComponent.prototype._getStyle = function (feature) {
        return [
            new openlayers.style.Style({
                fill: new openlayers.style.Fill({
                    color: this.fillColor
                })
            }),
            new openlayers.style.Style({
                stroke: new openlayers.style.Stroke({
                    color: this.strokeColor,
                    width: 2,
                    lineDash: [5, 5]
                }),
                text: new openlayers.style.Text({
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: this._getLengthOrArea(feature),
                    font: this.font,
                    fill: new openlayers.style.Fill({
                        color: this.textColor
                    }),
                    offsetX: 0,
                    offsetY: 0,
                    rotation: 0,
                    stroke: new openlayers.style.Stroke({
                        color: this.textOutlineColor,
                        width: 3
                    })
                })
            })
        ];
    };
    return MangolMeasureComponent;
}());
MangolMeasureComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-measure',
                template: "<div class=\"measure-container\">\n    <div class=\"subtitle\">\n        <span *ngIf=\"selected === null\">Please select a measure type:</span>\n        <span *ngIf=\"selected !== null\">Click on the map to start {{selected.title | lowercase}}</span>\n    </div>\n    <mat-button-toggle-group (change)=\"onToggleChange($event)\">\n        <mat-button-toggle *ngFor=\"let button of buttons\"\n            [value]=\"button\"\n            [matTooltip]=\"button.title\"\n            matTooltipPosition=\"below\">\n            <mat-icon [fontSet]=\"button.fontSet\"\n                [fontIcon]=\"button.fontIcon\"></mat-icon>\n        </mat-button-toggle>\n    </mat-button-toggle-group>\n    <div class=\"value-container\"\n        *ngIf=\"value !== null\">\n        <span>Value: </span>\n        <span class=\"value\">{{value}}</span>\n        <span class=\"value\"\n            [innerHTML]=\"getDimension()\"></span>\n    </div>\n</div>\n"
            },] },
];
MangolMeasureComponent.ctorParameters = function () { return [
    { type: MangolMeasureService, },
]; };
MangolMeasureComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "map": [{ type: core.Input },],
    "opts": [{ type: core.Input },],
};
var MangolMeasureModule = /** @class */ (function () {
    function MangolMeasureModule() {
    }
    return MangolMeasureModule;
}());
MangolMeasureModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, MangolMaterialModule],
                exports: [MangolMeasureComponent],
                declarations: [MangolMeasureComponent],
                providers: [MangolMeasureService]
            },] },
];
var MangolFeatureInfoTableDialogComponent = /** @class */ (function () {
    function MangolFeatureInfoTableDialogComponent(dialogRef, myData) {
        this.dialogRef = dialogRef;
        this.myData = myData;
        this.dataSource = new MangolFeatureInfoTableDialogDataSource();
        this.columns = myData.columns;
        this.layer = myData.layer;
        data = myData.data;
    }
    MangolFeatureInfoTableDialogComponent.prototype.ngOnInit = function () { };
    MangolFeatureInfoTableDialogComponent.prototype.getColumnLabel = function (column) {
        var label = column;
        var attrCols = this.layer.getAttrColumns();
        for (var i = 0; i < attrCols.length; i++) {
            if (attrCols[i].name === column && attrCols[i].hasOwnProperty('label')) {
                label = attrCols[i].label;
                break;
            }
        }
        return label;
    };
    return MangolFeatureInfoTableDialogComponent;
}());
MangolFeatureInfoTableDialogComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-feature-info-table-dialog',
                template: "<div class=\"table-container mat-elevation-z2\">\n    <mat-table #table\n        [dataSource]=\"dataSource\">\n        <ng-container *ngFor=\"let column of columns\"\n            [matColumnDef]=\"column\">\n            <mat-header-cell *matHeaderCellDef> {{getColumnLabel(column)}} </mat-header-cell>\n            <mat-cell *matCellDef=\"let element\"> {{element[column]}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"columns\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: columns; \"></mat-row>\n    </mat-table>\n</div>\n",
                styles: [],
                encapsulation: core.ViewEncapsulation.None
            },] },
];
MangolFeatureInfoTableDialogComponent.ctorParameters = function () { return [
    { type: material.MatDialogRef, },
    { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] },] },
]; };
var data = [];
var MangolFeatureInfoTableDialogDataSource = /** @class */ (function (_super) {
    __extends(MangolFeatureInfoTableDialogDataSource, _super);
    function MangolFeatureInfoTableDialogDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MangolFeatureInfoTableDialogDataSource.prototype.connect = function () {
        return rxjs.Observable.of(data);
    };
    MangolFeatureInfoTableDialogDataSource.prototype.disconnect = function () { };
    return MangolFeatureInfoTableDialogDataSource;
}(collections.DataSource));
var MangolFeatureInfoTableComponent = /** @class */ (function () {
    function MangolFeatureInfoTableComponent(iterableDiffers, dialog) {
        this.iterableDiffers = iterableDiffers;
        this.dialog = dialog;
        this.class = 'mat-feature-info-table';
        this.featureSelected = new core.EventEmitter();
        this.dataSource = new MangolFeatureInfoTableDataSource();
        this.iterableDiffer = this.iterableDiffers.find([]).create();
        this.displayedColumns = [];
        this.excludeColumns = ['geometry'];
    }
    MangolFeatureInfoTableComponent.prototype.ngOnInit = function () { };
    MangolFeatureInfoTableComponent.prototype.ngDoCheck = function () {
        var changes = this.iterableDiffer.diff(this.features);
        if (changes) {
            this._processFeatures();
        }
    };
    MangolFeatureInfoTableComponent.prototype.ngOnDestroy = function () {
        this.featureSelected.emit(null);
    };
    MangolFeatureInfoTableComponent.prototype.getColumnLabel = function (column) {
        var label = column;
        var attrCols = this.layer.getAttrColumns();
        for (var i = 0; i < attrCols.length; i++) {
            if (attrCols[i].name === column && attrCols[i].hasOwnProperty('label')) {
                label = attrCols[i].label;
                break;
            }
        }
        return label;
    };
    MangolFeatureInfoTableComponent.prototype._processFeatures = function () {
        var _this = this;
        data$1 = [];
        this.displayedColumns = [];
        this.features.forEach(function (feat) {
            var props = Object.assign({}, feat.getProperties());
            for (var key in props) {
                if (props.hasOwnProperty(key)) {
                    if (_this.excludeColumns.indexOf(key) !== -1) {
                        delete props[key];
                    }
                    else {
                        if (_this.displayedColumns.indexOf(key) === -1) {
                            _this.displayedColumns.push(key);
                        }
                    }
                }
            }
            data$1.push((Object.assign({}, props)));
        });
    };
    MangolFeatureInfoTableComponent.prototype.openTableDialog = function () {
        var dialogRef = this.dialog.open(MangolFeatureInfoTableDialogComponent, {
            width: '90vw',
            data: {
                columns: this.displayedColumns,
                layer: this.layer,
                data: data$1
            }
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    MangolFeatureInfoTableComponent.prototype.onRowClick = function (row, index) {
        this.featureSelected.emit(this.features[index]);
    };
    return MangolFeatureInfoTableComponent;
}());
MangolFeatureInfoTableComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-feature-info-table',
                template: "<button mat-button\n    color=\"primary\"\n    (click)=\"openTableDialog()\"\n    class=\"full-screen-button\">\n  <mat-icon>open_in_new</mat-icon>\n  Open full screen table</button>\n<div class=\"table-container mat-elevation-z2\">\n    <mat-table #table\n        [dataSource]=\"dataSource\">\n        <ng-container *ngFor=\"let column of displayedColumns\"\n            [matColumnDef]=\"column \">\n            <mat-header-cell *matHeaderCellDef> {{getColumnLabel(column)}} </mat-header-cell>\n            <mat-cell *matCellDef=\"let element\"> {{element[column]}} </mat-cell>\n        </ng-container>\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns; let i=index;\"\n            [ngStyle]=\"{'cursor': 'pointer'}\"\n            (click)=\"onRowClick(row, i)\"\n            [matTooltip]=\"'Tap to show feature on map'\"\n            matTooltipPosition=\"after\"></mat-row>\n    </mat-table>\n</div>\n"
            },] },
];
MangolFeatureInfoTableComponent.ctorParameters = function () { return [
    { type: core.IterableDiffers, },
    { type: material.MatDialog, },
]; };
MangolFeatureInfoTableComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "features": [{ type: core.Input },],
    "layer": [{ type: core.Input },],
    "featureSelected": [{ type: core.Output },],
};
var data$1 = [];
var MangolFeatureInfoTableDataSource = /** @class */ (function (_super) {
    __extends(MangolFeatureInfoTableDataSource, _super);
    function MangolFeatureInfoTableDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MangolFeatureInfoTableDataSource.prototype.connect = function () {
        return rxjs.Observable.of(data$1);
    };
    MangolFeatureInfoTableDataSource.prototype.disconnect = function () { };
    return MangolFeatureInfoTableDataSource;
}(collections.DataSource));
var MangolFeatureIntoService = /** @class */ (function () {
    function MangolFeatureIntoService(http$$1) {
        this.http = http$$1;
        this.activateState$ = new rxjs.BehaviorSubject(false);
    }
    MangolFeatureIntoService.prototype.getFeatureInfo = function (url) {
        var headers = new http.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .get(url, {
            headers: headers
        })
            .pipe(operators.map(function (response) {
            var resp = response.json();
            return resp;
        }), operators.catchError(function (error) {
            console.log(error);
            return rxjs.throwError(error);
        }));
    };
    return MangolFeatureIntoService;
}());
MangolFeatureIntoService.decorators = [
    { type: core.Injectable },
];
MangolFeatureIntoService.ctorParameters = function () { return [
    { type: http.Http, },
]; };
var MangolFeatureInfoComponent = /** @class */ (function () {
    function MangolFeatureInfoComponent(featureInfoService, snackBar) {
        var _this = this;
        this.featureInfoService = featureInfoService;
        this.snackBar = snackBar;
        this.class = 'mangol-feature-info';
        this.selected = null;
        this.geojson = new openlayers.format.GeoJSON();
        this.layers = [];
        this.selected = null;
        this.features = [];
        this.activateStateSubscription = this.featureInfoService.activateState$.subscribe(function (state) {
            if (state !== null) {
                _this._getQueryableLayers();
                if (state && _this.selected !== null) {
                    _this._activateClick(_this.selected.layer);
                }
                else {
                    _this._deactivateClick();
                }
            }
        });
    }
    MangolFeatureInfoComponent.prototype.ngOnInit = function () {
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
    };
    MangolFeatureInfoComponent.prototype.ngOnDestroy = function () {
        if (this.activateStateSubscription) {
            this.activateStateSubscription.unsubscribe();
        }
        this._removeHoverLayer();
        this._deactivateClick();
    };
    MangolFeatureInfoComponent.prototype.onSelectionChange = function (evt) {
        this.selected = evt.value;
        this.featureInfoService.activateState$.next(true);
    };
    MangolFeatureInfoComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    };
    MangolFeatureInfoComponent.prototype.onFeatureSelected = function (evt) {
        this.hoverLayer.getSource().clear();
        if (evt !== null) {
            var projCode = this.selected
                .getLayer()
                .getSource()
                .getProjection()
                .getCode();
            var viewProjCode = this.map
                .getView()
                .getProjection()
                .getCode();
            var feat = evt.clone();
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
    };
    MangolFeatureInfoComponent.prototype._addHoverLayer = function () {
        this.hoverLayer = new openlayers.layer.Vector({
            source: new openlayers.source.Vector()
        });
        if (this.opts.hasOwnProperty('hoverStyle')) {
            this.hoverLayer.setStyle(this.opts.hoverStyle);
        }
        if (this.highlightFeatures) {
            this.map.addLayer(this.hoverLayer);
        }
    };
    MangolFeatureInfoComponent.prototype._removeHoverLayer = function () {
        if (this.highlightFeatures) {
            this.map.removeLayer(this.hoverLayer);
        }
    };
    MangolFeatureInfoComponent.prototype._getQueryableLayers = function () {
        var _this = this;
        if (this.map) {
            this.layers = [];
            this.map.getMangolAllLayers().forEach(function (layer$$1) {
                if (layer$$1.isQueryable() && layer$$1.getVisible()) {
                    _this.layers.push(layer$$1);
                }
            });
        }
    };
    MangolFeatureInfoComponent.prototype._setCursor = function (cursorType) {
        if (this.map) {
            var target = this.map.getTarget();
            var jTarget = typeof target === 'string' ? $('#' + target) : $(target);
            jTarget.css('cursor', cursorType);
        }
    };
    MangolFeatureInfoComponent.prototype._getFeatureInfoUrl = function (source$$1, coordinate, resolution, srs) {
        var styles = source$$1.getParams().hasOwnProperty('STYLES')
            ? source$$1.getParams().STYLES
            : '';
        var url = source$$1.getGetFeatureInfoUrl(coordinate, resolution, srs, {
            INFO_FORMAT: 'application/json',
            FEATURE_COUNT: this.maxFeatures,
            STYLES: styles
        });
        return url;
    };
    MangolFeatureInfoComponent.prototype._deactivateClick = function () {
        this._setCursor('');
        if (this.clickEvent) {
            this.map.un('singleclick', this.clickEvent);
        }
    };
    MangolFeatureInfoComponent.prototype._activateClick = function (layer$$1) {
        var _this = this;
        this._deactivateClick();
        this._setCursor(this.cursorStyle);
        this.clickEvent = function (evt) {
            _this.features = [];
            if (layer$$1 instanceof openlayers.layer.Tile || layer$$1 instanceof openlayers.layer.Image) {
                var url = _this._getFeatureInfoUrl(layer$$1.getSource(), evt.coordinate, _this.map.getView().getResolution(), _this.map.getView().getProjection());
                if (url) {
                    _this.featureInfoService.getFeatureInfo(url).subscribe(function (data) {
                        if (data.hasOwnProperty('features')) {
                            _this.features = _this.geojson.readFeatures(data);
                            _this.openSnackBar(_this.features.length + " feature" + (_this.features.length === 1 ? '' : 's') + " found.", 'Close');
                        }
                    });
                }
            }
            else {
                _this.openSnackBar('Currently only WMS query is supported. Please select another layer!', 'Close');
            }
        };
        this.map.on('singleclick', this.clickEvent);
    };
    return MangolFeatureInfoComponent;
}());
MangolFeatureInfoComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-feature-info',
                template: "<div class=\"feature-info-container\">\n    <mat-form-field *ngIf=\"layers.length > 0\">\n        <mat-select [placeholder]=\"placeholder\"\n            (selectionChange)=\"onSelectionChange($event)\">\n            <mat-option *ngFor=\"let layer of layers\"\n                [value]=\"layer\">\n                {{ layer.getName() }}\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n    <div *ngIf=\"layers.length === 0\">There are no queryable layers visible at the moment.</div>\n    <div *ngIf=\"selected !== null && features.length === 0\">Click on the map to select a feature!</div>\n    <mangol-feature-info-table *ngIf=\"selected !== null && features.length > 0\"\n        [features]=\"features\"\n        [layer]=\"selected\"\n        (featureSelected)=\"onFeatureSelected($event)\"></mangol-feature-info-table>\n</div>\n"
            },] },
];
MangolFeatureInfoComponent.ctorParameters = function () { return [
    { type: MangolFeatureIntoService, },
    { type: material.MatSnackBar, },
]; };
MangolFeatureInfoComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "map": [{ type: core.Input },],
    "opts": [{ type: core.Input },],
};
var MangolFeatureInfoModule = /** @class */ (function () {
    function MangolFeatureInfoModule() {
    }
    return MangolFeatureInfoModule;
}());
MangolFeatureInfoModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    MangolFeatureInfoComponent,
                    MangolFeatureInfoTableComponent,
                    MangolFeatureInfoTableDialogComponent
                ],
                imports: [common.CommonModule, MangolMaterialModule, http.HttpModule],
                exports: [MangolFeatureInfoComponent, MangolFeatureInfoTableComponent],
                providers: [MangolFeatureIntoService],
                entryComponents: [MangolFeatureInfoTableDialogComponent]
            },] },
];
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value);
    };
    return KeysPipe;
}());
KeysPipe.decorators = [
    { type: core.Pipe, args: [{ name: 'keys', pure: false },] },
];
var MangolPrintComponent = /** @class */ (function () {
    function MangolPrintComponent() {
        this.class = 'mangol-print';
        this.selectedLayout = null;
        this.selectedDim = null;
        this.selectedResolution = null;
    }
    MangolPrintComponent.prototype.ngOnInit = function () {
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
    };
    MangolPrintComponent.prototype.print = function () {
        var map$$1 = this.map;
        var layout = this.selectedLayout;
        var format$$1 = this.selectedDim;
        var dim = this.dims[format$$1];
        var resolution = this.selectedResolution;
        var width = Math.round((layout.value === 'landscape' ? dim[0] : dim[1]) * resolution / 25.4);
        var height = Math.round((layout.value === 'landscape' ? dim[1] : dim[0]) * resolution / 25.4);
        var size = map$$1.getSize();
        var extent = map$$1.getView().calculateExtent(size);
        map$$1.once('postcompose', function (event) {
            var interval;
            interval = setInterval(function () {
                clearInterval(interval);
                var canvas = event['context']['canvas'];
                var data = canvas.toDataURL('image/jpeg');
                var pdf = new jsPDF(layout.value, undefined, format$$1);
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
    };
    MangolPrintComponent.prototype.onLayoutChange = function (evt) {
        this.selectedLayout = evt.value;
    };
    MangolPrintComponent.prototype.onSizeChange = function (evt) {
        this.selectedDim = evt.value;
    };
    MangolPrintComponent.prototype.onResolutionChange = function (evt) {
        this.selectedResolution = evt.value;
    };
    return MangolPrintComponent;
}());
MangolPrintComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-print',
                template: "<div class=\"form-container\">\n\n    <mat-form-field>\n        <mat-select placeholder=\"Layout\"\n            (selectionChange)=\"onLayoutChange($event)\">\n            <mat-option [value]=\"layout\"\n                *ngFor=\"let layout of layouts\">\n                {{layout.name}}\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n\n    <mat-form-field>\n        <mat-select placeholder=\"Size\"\n            (selectionChange)=\"onSizeChange($event)\">\n            <mat-option [value]=\"key\"\n                *ngFor=\"let key of dims | keys\">\n                {{key}} ({{dims[key][0]}} x {{dims[key][1]}} mm)\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n\n    <mat-form-field>\n        <mat-select placeholder=\"Resolution\"\n            (selectionChange)=\"onResolutionChange($event)\">\n            <mat-option [value]=\"r\"\n                *ngFor=\"let r of resolutions\">\n                {{r}}\n                <span matSuffix>dpi</span>\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n\n    <button mat-raised-button\n        color=\"primary\"\n        [disabled]=\"selectedLayout === null || selectedDim === null || selectedResolution === null\"\n        (click)=\"print()\">Print</button>\n</div>\n"
            },] },
];
MangolPrintComponent.ctorParameters = function () { return []; };
MangolPrintComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "map": [{ type: core.Input },],
};
var MangolPrintModule = /** @class */ (function () {
    function MangolPrintModule() {
    }
    return MangolPrintModule;
}());
MangolPrintModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    MangolMaterialModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule
                ],
                exports: [MangolPrintComponent],
                declarations: [MangolPrintComponent, KeysPipe]
            },] },
];
var MangolSidebarComponent = /** @class */ (function () {
    function MangolSidebarComponent(cdr, featureInfoService, measureService) {
        this.cdr = cdr;
        this.featureInfoService = featureInfoService;
        this.measureService = measureService;
        this.class = 'mangol-sidebar';
        this.selectedIndex = 0;
        this.items = [];
    }
    MangolSidebarComponent.prototype.ngOnInit = function () {
        this.sidebarClosed = false;
        if (this.options.hasOwnProperty('toolbar')) {
            for (var key in this.options.toolbar) {
                if (this.options.toolbar.hasOwnProperty(key)) {
                    var item = Object.assign({}, this.options.toolbar[key], { type: key });
                    this.items.push(item);
                }
            }
        }
        this.map.updateSize();
    };
    MangolSidebarComponent.prototype.ngDoCheck = function () {
        this.cdr.detectChanges();
    };
    MangolSidebarComponent.prototype.getTitle = function (item) {
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
    };
    MangolSidebarComponent.prototype.getFontSet = function (item) {
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
    };
    MangolSidebarComponent.prototype.getFontIcon = function (item) {
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
    };
    MangolSidebarComponent.prototype.toggleSidebar = function () {
        this.sidebarClosed = !this.sidebarClosed;
    };
    MangolSidebarComponent.prototype.onSelectedTabChange = function (evt) {
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
    };
    return MangolSidebarComponent;
}());
MangolSidebarComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-sidebar',
                template: "<div class=\"sidebar-outer\">\n    <mat-tab-group disableRipple=\"true\"\n        (selectedTabChange)=\"onSelectedTabChange($event)\">\n        <mat-tab *ngFor=\"let item of items; let i=index;\"\n            [disabled]=\"item.disabled\">\n            <ng-template mat-tab-label>\n                <mat-icon [fontSet]=\"getFontSet(item)\"\n                    [fontIcon]=\"getFontIcon(item)\"\n                    [color]=\"selectedIndex === i ? 'primary' : ''\"\n                    [matTooltip]=\"getTitle(item)\"\n                    matTooltipPosition=\"below\"></mat-icon>\n            </ng-template>\n            <div class=\"sidebar-content\">\n                <mat-toolbar>{{getTitle(item)}}</mat-toolbar>\n                <div class=\"sidebar-inner\"\n                    *ngIf=\"map\">\n                    <mangol-layertree *ngIf=\"item.type === 'layertree'\"\n                        [opts]=\"options.toolbar.layertree\"\n                        [map]=\"map\"\n                        [isAccordionMulti]=\"options.toolbar.layertree.isAccordionMulti\">\n                    </mangol-layertree>\n                    <mangol-feature-info *ngIf=\"item.type === 'featureinfo'\"\n                        [map]=\"map\"\n                        [opts]=\"options.toolbar.featureinfo\"></mangol-feature-info>\n                    <mangol-measure *ngIf=\"item.type === 'measure'\"\n                        [map]=\"map\"\n                        [opts]=\"options.toolbar.measure\">\n                    </mangol-measure>\n                    <mangol-print *ngIf=\"item.type === 'print'\"\n                        [map]=\"map\"></mangol-print>\n                </div>\n            </div>\n        </mat-tab>\n    </mat-tab-group>\n</div>\n",
                styles: ["@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);@import url(https://mapskincdn.appspot.com/1.0/mapskin.min.css);@import url(https://fonts.googleapis.com/css?family=Roboto+Mono:300,400);@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);@import url(https://mapskincdn.appspot.com/1.0/mapskin.min.css);@import url(https://fonts.googleapis.com/css?family=Roboto+Mono:300,400);.mat-elevation-z0{-webkit-box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{-webkit-box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{-webkit-box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{-webkit-box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12);box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{-webkit-box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12);box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{-webkit-box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{-webkit-box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12);box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{-webkit-box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{-webkit-box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12);box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{-webkit-box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12);box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{-webkit-box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{-webkit-box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12);box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{-webkit-box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12);box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{-webkit-box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12);box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{-webkit-box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12);box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{-webkit-box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{-webkit-box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12);box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{-webkit-box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12);box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{-webkit-box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12);box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{-webkit-box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12);box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{-webkit-box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12);box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{-webkit-box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12);box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{-webkit-box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12);box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{-webkit-box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;color:rgba(0,0,0,.87)}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif;color:rgba(0,0,0,.54)}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1000;display:-webkit-box;display:-ms-flexbox;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}.mat-badge-small .mat-badge-content{outline:solid 1px;border-radius:0}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}.mat-ripple-element{background-color:rgba(0,0,0,.1)}.mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled),.mat-option:focus:not(.mat-option-disabled),.mat-option:hover:not(.mat-option-disabled){background:rgba(0,0,0,.04)}.mat-option.mat-active{background:rgba(0,0,0,.04);color:rgba(0,0,0,.87)}.mat-option.mat-option-disabled{color:rgba(0,0,0,.38)}.mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color:#2196f3}.mat-accent .mat-option.mat-selected:not(.mat-option-disabled){color:#f44336}.mat-warn .mat-option.mat-selected:not(.mat-option-disabled){color:#ff5722}.mat-optgroup-disabled .mat-optgroup-label{color:rgba(0,0,0,.38)}.mat-pseudo-checkbox{color:rgba(0,0,0,.54)}.mat-pseudo-checkbox::after{color:#fafafa}.mat-accent .mat-pseudo-checkbox-checked,.mat-accent .mat-pseudo-checkbox-indeterminate,.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox-indeterminate{background:#f44336}.mat-primary .mat-pseudo-checkbox-checked,.mat-primary .mat-pseudo-checkbox-indeterminate{background:#2196f3}.mat-warn .mat-pseudo-checkbox-checked,.mat-warn .mat-pseudo-checkbox-indeterminate{background:#ff5722}.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled{background:#b0b0b0}.mat-app-background{background-color:#fafafa;color:rgba(0,0,0,.87)}.mat-theme-loaded-marker{display:none}.mat-autocomplete-panel{background:#fff;color:rgba(0,0,0,.87)}.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover){background:#fff}.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled){color:rgba(0,0,0,.87)}.mat-badge-accent .mat-badge-content{background:#f44336;color:#fff}.mat-badge-warn .mat-badge-content{color:#fff;background:#ff5722}.mat-badge{position:relative}.mat-badge-hidden .mat-badge-content{display:none}.mat-badge-content{color:#fff;background:#2196f3;position:absolute;text-align:center;display:inline-block;border-radius:50%;-webkit-transition:-webkit-transform .2s ease-in-out;transition:-webkit-transform .2s ease-in-out;transition:transform .2s ease-in-out;transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out;-webkit-transform:scale(.6);transform:scale(.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;pointer-events:none}.mat-badge-content.mat-badge-active{-webkit-transform:none;transform:none}.mat-badge-small .mat-badge-content{width:16px;height:16px;line-height:16px}.mat-badge-small.mat-badge-above .mat-badge-content{top:-8px}.mat-badge-small.mat-badge-below .mat-badge-content{bottom:-8px}.mat-badge-small.mat-badge-before{margin-left:16px}.mat-badge-small.mat-badge-before .mat-badge-content{left:-16px}[dir=rtl] .mat-badge-small.mat-badge-before{margin-left:0;margin-right:16px}[dir=rtl] .mat-badge-small.mat-badge-before .mat-badge-content{left:auto;right:-16px}.mat-badge-small.mat-badge-after{margin-right:16px}.mat-badge-small.mat-badge-after .mat-badge-content{right:-16px}[dir=rtl] .mat-badge-small.mat-badge-after{margin-right:0;margin-left:16px}[dir=rtl] .mat-badge-small.mat-badge-after .mat-badge-content{right:auto;left:-16px}.mat-badge-small.mat-badge-overlap.mat-badge-before{margin-left:8px}.mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-8px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-before{margin-left:0;margin-right:8px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-8px}.mat-badge-small.mat-badge-overlap.mat-badge-after{margin-right:8px}.mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-8px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-after{margin-right:0;margin-left:16px}[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-8px}.mat-badge-medium .mat-badge-content{width:22px;height:22px;line-height:22px}.mat-badge-medium.mat-badge-above .mat-badge-content{top:-11px}.mat-badge-medium.mat-badge-below .mat-badge-content{bottom:-11px}.mat-badge-medium.mat-badge-before{margin-left:22px}.mat-badge-medium.mat-badge-before .mat-badge-content{left:-22px}[dir=rtl] .mat-badge-medium.mat-badge-before{margin-left:0;margin-right:22px}[dir=rtl] .mat-badge-medium.mat-badge-before .mat-badge-content{left:auto;right:-22px}.mat-badge-medium.mat-badge-after{margin-right:22px}.mat-badge-medium.mat-badge-after .mat-badge-content{right:-22px}[dir=rtl] .mat-badge-medium.mat-badge-after{margin-right:0;margin-left:22px}[dir=rtl] .mat-badge-medium.mat-badge-after .mat-badge-content{right:auto;left:-22px}.mat-badge-medium.mat-badge-overlap.mat-badge-before{margin-left:11px}.mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-11px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-before{margin-left:0;margin-right:11px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-11px}.mat-badge-medium.mat-badge-overlap.mat-badge-after{margin-right:11px}.mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-11px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-after{margin-right:0;margin-left:22px}[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-11px}.mat-badge-large .mat-badge-content{width:28px;height:28px;line-height:28px}@media screen and (-ms-high-contrast:active){.mat-badge-large .mat-badge-content,.mat-badge-medium .mat-badge-content{outline:solid 1px;border-radius:0}}.mat-badge-large.mat-badge-above .mat-badge-content{top:-14px}.mat-badge-large.mat-badge-below .mat-badge-content{bottom:-14px}.mat-badge-large.mat-badge-before{margin-left:28px}.mat-badge-large.mat-badge-before .mat-badge-content{left:-28px}[dir=rtl] .mat-badge-large.mat-badge-before{margin-left:0;margin-right:28px}[dir=rtl] .mat-badge-large.mat-badge-before .mat-badge-content{left:auto;right:-28px}.mat-badge-large.mat-badge-after{margin-right:28px}.mat-badge-large.mat-badge-after .mat-badge-content{right:-28px}[dir=rtl] .mat-badge-large.mat-badge-after{margin-right:0;margin-left:28px}[dir=rtl] .mat-badge-large.mat-badge-after .mat-badge-content{right:auto;left:-28px}.mat-badge-large.mat-badge-overlap.mat-badge-before{margin-left:14px}.mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-14px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-before{margin-left:0;margin-right:14px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-14px}.mat-badge-large.mat-badge-overlap.mat-badge-after{margin-right:14px}.mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-14px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-after{margin-right:0;margin-left:28px}[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-14px}.mat-bottom-sheet-container{background:#fff;color:rgba(0,0,0,.87)}.mat-button,.mat-icon-button,.mat-stroked-button{color:inherit;background:0 0}.mat-button.mat-primary,.mat-icon-button.mat-primary,.mat-stroked-button.mat-primary{color:#2196f3}.mat-button.mat-accent,.mat-icon-button.mat-accent,.mat-stroked-button.mat-accent{color:#f44336}.mat-button.mat-warn,.mat-icon-button.mat-warn,.mat-stroked-button.mat-warn{color:#ff5722}.mat-button.mat-accent[disabled],.mat-button.mat-primary[disabled],.mat-button.mat-warn[disabled],.mat-button[disabled][disabled],.mat-icon-button.mat-accent[disabled],.mat-icon-button.mat-primary[disabled],.mat-icon-button.mat-warn[disabled],.mat-icon-button[disabled][disabled],.mat-stroked-button.mat-accent[disabled],.mat-stroked-button.mat-primary[disabled],.mat-stroked-button.mat-warn[disabled],.mat-stroked-button[disabled][disabled]{color:rgba(0,0,0,.26)}.mat-button.mat-primary .mat-button-focus-overlay,.mat-icon-button.mat-primary .mat-button-focus-overlay,.mat-stroked-button.mat-primary .mat-button-focus-overlay{background-color:rgba(33,150,243,.12)}.mat-button.mat-accent .mat-button-focus-overlay,.mat-icon-button.mat-accent .mat-button-focus-overlay,.mat-stroked-button.mat-accent .mat-button-focus-overlay{background-color:rgba(244,67,54,.12)}.mat-button.mat-warn .mat-button-focus-overlay,.mat-icon-button.mat-warn .mat-button-focus-overlay,.mat-stroked-button.mat-warn .mat-button-focus-overlay{background-color:rgba(255,87,34,.12)}.mat-button[disabled] .mat-button-focus-overlay,.mat-icon-button[disabled] .mat-button-focus-overlay,.mat-stroked-button[disabled] .mat-button-focus-overlay{background-color:transparent}.mat-button.mat-primary .mat-ripple-element,.mat-icon-button.mat-primary .mat-ripple-element,.mat-stroked-button.mat-primary .mat-ripple-element{background-color:rgba(33,150,243,.1)}.mat-button.mat-accent .mat-ripple-element,.mat-icon-button.mat-accent .mat-ripple-element,.mat-stroked-button.mat-accent .mat-ripple-element{background-color:rgba(244,67,54,.1)}.mat-button.mat-warn .mat-ripple-element,.mat-icon-button.mat-warn .mat-ripple-element,.mat-stroked-button.mat-warn .mat-ripple-element{background-color:rgba(255,87,34,.1)}.mat-fab,.mat-flat-button,.mat-mini-fab,.mat-raised-button{color:rgba(0,0,0,.87);background-color:#fff}.mat-fab.mat-accent,.mat-fab.mat-primary,.mat-fab.mat-warn,.mat-flat-button.mat-accent,.mat-flat-button.mat-primary,.mat-flat-button.mat-warn,.mat-mini-fab.mat-accent,.mat-mini-fab.mat-primary,.mat-mini-fab.mat-warn,.mat-raised-button.mat-accent,.mat-raised-button.mat-primary,.mat-raised-button.mat-warn{color:#fff}.mat-fab.mat-accent[disabled],.mat-fab.mat-primary[disabled],.mat-fab.mat-warn[disabled],.mat-fab[disabled][disabled],.mat-flat-button.mat-accent[disabled],.mat-flat-button.mat-primary[disabled],.mat-flat-button.mat-warn[disabled],.mat-flat-button[disabled][disabled],.mat-mini-fab.mat-accent[disabled],.mat-mini-fab.mat-primary[disabled],.mat-mini-fab.mat-warn[disabled],.mat-mini-fab[disabled][disabled],.mat-raised-button.mat-accent[disabled],.mat-raised-button.mat-primary[disabled],.mat-raised-button.mat-warn[disabled],.mat-raised-button[disabled][disabled]{color:rgba(0,0,0,.26);background-color:rgba(0,0,0,.12)}.mat-fab.mat-primary,.mat-flat-button.mat-primary,.mat-mini-fab.mat-primary,.mat-raised-button.mat-primary{background-color:#2196f3}.mat-fab.mat-accent,.mat-flat-button.mat-accent,.mat-mini-fab.mat-accent,.mat-raised-button.mat-accent{background-color:#f44336}.mat-fab.mat-warn,.mat-flat-button.mat-warn,.mat-mini-fab.mat-warn,.mat-raised-button.mat-warn{background-color:#ff5722}.mat-fab.mat-accent .mat-ripple-element,.mat-fab.mat-primary .mat-ripple-element,.mat-fab.mat-warn .mat-ripple-element,.mat-flat-button.mat-accent .mat-ripple-element,.mat-flat-button.mat-primary .mat-ripple-element,.mat-flat-button.mat-warn .mat-ripple-element,.mat-mini-fab.mat-accent .mat-ripple-element,.mat-mini-fab.mat-primary .mat-ripple-element,.mat-mini-fab.mat-warn .mat-ripple-element,.mat-raised-button.mat-accent .mat-ripple-element,.mat-raised-button.mat-primary .mat-ripple-element,.mat-raised-button.mat-warn .mat-ripple-element{background-color:rgba(255,255,255,.1)}.mat-icon-button.mat-primary .mat-ripple-element{background-color:rgba(33,150,243,.2)}.mat-icon-button.mat-accent .mat-ripple-element{background-color:rgba(244,67,54,.2)}.mat-icon-button.mat-warn .mat-ripple-element{background-color:rgba(255,87,34,.2)}.mat-button-toggle{color:rgba(0,0,0,.38)}.mat-button-toggle .mat-button-toggle-focus-overlay{background-color:rgba(0,0,0,.12)}.mat-button-toggle-checked{background-color:#e0e0e0;color:rgba(0,0,0,.54)}.mat-button-toggle-disabled{background-color:#eee;color:rgba(0,0,0,.26)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:#bdbdbd}.mat-card{background:#fff;color:rgba(0,0,0,.87)}.mat-card-subtitle{color:rgba(0,0,0,.54)}.mat-checkbox-frame{border-color:rgba(0,0,0,.54)}.mat-checkbox-checkmark{fill:#fafafa}.mat-checkbox-checkmark-path{stroke:#fafafa!important}.mat-checkbox-mixedmark{background-color:#fafafa}.mat-checkbox-checked.mat-primary .mat-checkbox-background,.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background{background-color:#2196f3}.mat-checkbox-checked.mat-accent .mat-checkbox-background,.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background{background-color:#f44336}.mat-checkbox-checked.mat-warn .mat-checkbox-background,.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background{background-color:#ff5722}.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background,.mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background{background-color:#b0b0b0}.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame{border-color:#b0b0b0}.mat-checkbox-disabled .mat-checkbox-label{color:#b0b0b0}.mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(33,150,243,.26)}.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(244,67,54,.26)}.mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(255,87,34,.26)}.mat-chip.mat-standard-chip{background-color:#e0e0e0;color:rgba(0,0,0,.87)}.mat-chip.mat-standard-chip .mat-chip-remove{color:rgba(0,0,0,.87);opacity:.4}.mat-chip.mat-standard-chip .mat-chip-remove:hover{opacity:.54}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary{background-color:#2196f3;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover{opacity:.54}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn{background-color:#ff5722;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover{opacity:.54}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent{background-color:#f44336;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover{opacity:.54}.mat-table{background:#fff}mat-footer-row,mat-header-row,mat-row,td.mat-cell,td.mat-footer-cell,th.mat-header-cell{border-bottom-color:rgba(0,0,0,.12)}.mat-header-cell{color:rgba(0,0,0,.54)}.mat-cell,.mat-footer-cell{color:rgba(0,0,0,.87)}.mat-calendar-arrow{border-top-color:rgba(0,0,0,.54)}.mat-datepicker-popup .mat-calendar-next-button,.mat-datepicker-popup .mat-calendar-previous-button,.mat-datepicker-toggle{color:rgba(0,0,0,.54)}.mat-calendar-table-header{color:rgba(0,0,0,.38)}.mat-calendar-table-header-divider::after{background:rgba(0,0,0,.12)}.mat-calendar-body-label{color:rgba(0,0,0,.54)}.mat-calendar-body-cell-content{color:rgba(0,0,0,.87);border-color:transparent}.mat-calendar-body-disabled>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){color:rgba(0,0,0,.38)}.cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){background-color:rgba(0,0,0,.04)}.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,.38)}.mat-calendar-body-disabled>.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,.18)}.mat-calendar-body-selected{background-color:#2196f3;color:#fff}.mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(33,150,243,.4)}.mat-calendar-body-today.mat-calendar-body-selected{-webkit-box-shadow:inset 0 0 0 1px #fff;box-shadow:inset 0 0 0 1px #fff}.mat-datepicker-content{background-color:#fff;color:rgba(0,0,0,.87)}.mat-datepicker-content.mat-accent .mat-calendar-body-selected{background-color:#f44336;color:#fff}.mat-datepicker-content.mat-accent .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(244,67,54,.4)}.mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected{-webkit-box-shadow:inset 0 0 0 1px #fff;box-shadow:inset 0 0 0 1px #fff}.mat-datepicker-content.mat-warn .mat-calendar-body-selected{background-color:#ff5722;color:#fff}.mat-datepicker-content.mat-warn .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(255,87,34,.4)}.mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected{-webkit-box-shadow:inset 0 0 0 1px #fff;box-shadow:inset 0 0 0 1px #fff}.mat-datepicker-toggle-active{color:#2196f3}.mat-datepicker-toggle-active.mat-accent{color:#f44336}.mat-datepicker-toggle-active.mat-warn{color:#ff5722}.mat-dialog-container{background:#fff;color:rgba(0,0,0,.87)}.mat-divider{border-top-color:rgba(0,0,0,.12)}.mat-divider-vertical{border-right-color:rgba(0,0,0,.12)}.mat-expansion-panel{background:#fff;color:rgba(0,0,0,.87)}.mat-action-row{border-top-color:rgba(0,0,0,.12)}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused,.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:rgba(0,0,0,.04)}.mat-expansion-panel-header-title{color:rgba(0,0,0,.87)}.mat-expansion-indicator::after,.mat-expansion-panel-header-description{color:rgba(0,0,0,.54)}.mat-expansion-panel-header[aria-disabled=true]{color:rgba(0,0,0,.26)}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title{color:inherit}.mat-form-field-label,.mat-hint{color:rgba(0,0,0,.6)}.mat-form-field.mat-focused .mat-form-field-label{color:#2196f3}.mat-form-field.mat-focused .mat-form-field-label.mat-accent{color:#f44336}.mat-form-field.mat-focused .mat-form-field-label.mat-warn{color:#ff5722}.mat-focused .mat-form-field-required-marker{color:#f44336}.mat-form-field-ripple{background-color:rgba(0,0,0,.87)}.mat-form-field.mat-focused .mat-form-field-ripple{background-color:#2196f3}.mat-form-field.mat-focused .mat-form-field-ripple.mat-accent{background-color:#f44336}.mat-form-field.mat-focused .mat-form-field-ripple.mat-warn{background-color:#ff5722}.mat-form-field.mat-form-field-invalid .mat-form-field-label,.mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker,.mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent{color:#ff5722}.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{background-color:#ff5722}.mat-error{color:#ff5722}.mat-form-field-appearance-legacy .mat-form-field-label,.mat-form-field-appearance-legacy .mat-hint{color:rgba(0,0,0,.54)}.mat-form-field-appearance-legacy .mat-form-field-underline{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.42)),color-stop(33%,rgba(0,0,0,.42)),color-stop(0,transparent));background-image:linear-gradient(to right,rgba(0,0,0,.42) 0,rgba(0,0,0,.42) 33%,transparent 0);background-size:4px 100%;background-repeat:repeat-x}.mat-form-field-appearance-standard .mat-form-field-underline{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.42)),color-stop(33%,rgba(0,0,0,.42)),color-stop(0,transparent));background-image:linear-gradient(to right,rgba(0,0,0,.42) 0,rgba(0,0,0,.42) 33%,transparent 0);background-size:4px 100%;background-repeat:repeat-x}.mat-form-field-appearance-fill .mat-form-field-flex{background-color:rgba(0,0,0,.04)}.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex{background-color:rgba(0,0,0,.02)}.mat-form-field-appearance-fill .mat-form-field-underline::before{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,.38)}.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before{background-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em;color:rgba(0,0,0,.12)}.mat-form-field-appearance-outline .mat-form-field-outline-thick{color:rgba(0,0,0,.87)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{color:#2196f3}.mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick{color:#f44336}.mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick{color:#ff5722}.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,.38)}.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline{color:rgba(0,0,0,.06)}.mat-icon.mat-primary{color:#2196f3}.mat-icon.mat-accent{color:#f44336}.mat-icon.mat-warn{color:#ff5722}.mat-input-element:disabled{color:rgba(0,0,0,.38)}.mat-input-element{caret-color:#2196f3}.mat-input-element::-ms-input-placeholder{color:rgba(0,0,0,.42)}.mat-input-element::placeholder{color:rgba(0,0,0,.42)}.mat-input-element::-moz-placeholder{color:rgba(0,0,0,.42)}.mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,.42)}.mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,.42)}.mat-accent .mat-input-element{caret-color:#f44336}.mat-form-field-invalid .mat-input-element,.mat-warn .mat-input-element{caret-color:#ff5722}.mat-list .mat-list-item,.mat-list .mat-list-option,.mat-nav-list .mat-list-item,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-item,.mat-selection-list .mat-list-option{color:rgba(0,0,0,.87)}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500;color:rgba(0,0,0,.54)}.mat-list-item-disabled{background-color:#eee}.mat-list-option.mat-list-item-focus,.mat-list-option:hover,.mat-nav-list .mat-list-item.mat-list-item-focus,.mat-nav-list .mat-list-item:hover{background:rgba(0,0,0,.04)}.mat-menu-panel{background:#fff}.mat-menu-item{background:0 0;color:rgba(0,0,0,.87)}.mat-menu-item[disabled],.mat-menu-item[disabled]::after{color:rgba(0,0,0,.38)}.mat-menu-item .mat-icon:not([color]),.mat-menu-item-submenu-trigger::after{color:rgba(0,0,0,.54)}.mat-menu-item-highlighted:not([disabled]),.mat-menu-item.cdk-keyboard-focused:not([disabled]),.mat-menu-item.cdk-program-focused:not([disabled]),.mat-menu-item:hover:not([disabled]){background:rgba(0,0,0,.04)}.mat-paginator{background:#fff}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{color:rgba(0,0,0,.54)}.mat-paginator-decrement,.mat-paginator-increment{border-top:2px solid rgba(0,0,0,.54);border-right:2px solid rgba(0,0,0,.54)}.mat-paginator-first,.mat-paginator-last{border-top:2px solid rgba(0,0,0,.54)}.mat-icon-button[disabled] .mat-paginator-decrement,.mat-icon-button[disabled] .mat-paginator-first,.mat-icon-button[disabled] .mat-paginator-increment,.mat-icon-button[disabled] .mat-paginator-last{border-color:rgba(0,0,0,.38)}.mat-progress-bar-background{fill:#bbdefb}.mat-progress-bar-buffer{background-color:#bbdefb}.mat-progress-bar-fill::after{background-color:#2196f3}.mat-progress-bar.mat-accent .mat-progress-bar-background{fill:#ffcdd2}.mat-progress-bar.mat-accent .mat-progress-bar-buffer{background-color:#ffcdd2}.mat-progress-bar.mat-accent .mat-progress-bar-fill::after{background-color:#f44336}.mat-progress-bar.mat-warn .mat-progress-bar-background{fill:#ffccbc}.mat-progress-bar.mat-warn .mat-progress-bar-buffer{background-color:#ffccbc}.mat-progress-bar.mat-warn .mat-progress-bar-fill::after{background-color:#ff5722}.mat-progress-spinner circle,.mat-spinner circle{stroke:#2196f3}.mat-progress-spinner.mat-accent circle,.mat-spinner.mat-accent circle{stroke:#f44336}.mat-progress-spinner.mat-warn circle,.mat-spinner.mat-warn circle{stroke:#ff5722}.mat-radio-outer-circle{border-color:rgba(0,0,0,.54)}.mat-radio-disabled .mat-radio-outer-circle{border-color:rgba(0,0,0,.38)}.mat-radio-disabled .mat-radio-inner-circle,.mat-radio-disabled .mat-radio-ripple .mat-ripple-element{background-color:rgba(0,0,0,.38)}.mat-radio-disabled .mat-radio-label-content{color:rgba(0,0,0,.38)}.mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle{border-color:#2196f3}.mat-radio-button.mat-primary .mat-radio-inner-circle{background-color:#2196f3}.mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element{background-color:rgba(33,150,243,.26)}.mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle{border-color:#f44336}.mat-radio-button.mat-accent .mat-radio-inner-circle{background-color:#f44336}.mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element{background-color:rgba(244,67,54,.26)}.mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle{border-color:#ff5722}.mat-radio-button.mat-warn .mat-radio-inner-circle{background-color:#ff5722}.mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element{background-color:rgba(255,87,34,.26)}.mat-select-content,.mat-select-panel-done-animating{background:#fff}.mat-select-value{color:rgba(0,0,0,.87)}.mat-select-placeholder{color:rgba(0,0,0,.42)}.mat-select-disabled .mat-select-value{color:rgba(0,0,0,.38)}.mat-select-arrow{color:rgba(0,0,0,.54)}.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple){background:rgba(0,0,0,.12)}.mat-form-field.mat-focused.mat-primary .mat-select-arrow{color:#2196f3}.mat-form-field.mat-focused.mat-accent .mat-select-arrow{color:#f44336}.mat-form-field .mat-select.mat-select-invalid .mat-select-arrow,.mat-form-field.mat-focused.mat-warn .mat-select-arrow{color:#ff5722}.mat-form-field .mat-select.mat-select-disabled .mat-select-arrow{color:rgba(0,0,0,.38)}.mat-drawer-container{background-color:#fafafa;color:rgba(0,0,0,.87)}.mat-drawer{background-color:#fff;color:rgba(0,0,0,.87)}.mat-drawer.mat-drawer-push{background-color:#fff}.mat-drawer-backdrop.mat-drawer-shown{background-color:rgba(0,0,0,.6)}.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#f44336}.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(244,67,54,.5)}.mat-slide-toggle:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}.mat-slide-toggle .mat-ripple-element{background-color:rgba(244,67,54,.12)}.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#2196f3}.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(33,150,243,.5)}.mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}.mat-slide-toggle.mat-primary .mat-ripple-element{background-color:rgba(33,150,243,.12)}.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#ff5722}.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(255,87,34,.5)}.mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}.mat-slide-toggle.mat-warn .mat-ripple-element{background-color:rgba(255,87,34,.12)}.mat-disabled .mat-slide-toggle-thumb{background-color:#bdbdbd}.mat-disabled .mat-slide-toggle-bar{background-color:rgba(0,0,0,.1)}.mat-slide-toggle-thumb{background-color:#fafafa}.mat-slide-toggle-bar{background-color:rgba(0,0,0,.38)}.mat-slider-track-background{background-color:rgba(0,0,0,.26)}.mat-primary .mat-slider-thumb,.mat-primary .mat-slider-thumb-label,.mat-primary .mat-slider-track-fill{background-color:#2196f3}.mat-primary .mat-slider-thumb-label-text{color:#fff}.mat-accent .mat-slider-thumb,.mat-accent .mat-slider-thumb-label,.mat-accent .mat-slider-track-fill{background-color:#f44336}.mat-accent .mat-slider-thumb-label-text{color:#fff}.mat-warn .mat-slider-thumb,.mat-warn .mat-slider-thumb-label,.mat-warn .mat-slider-track-fill{background-color:#ff5722}.mat-warn .mat-slider-thumb-label-text{color:#fff}.mat-slider-focus-ring{background-color:rgba(244,67,54,.2)}.cdk-focused .mat-slider-track-background,.mat-slider:hover .mat-slider-track-background{background-color:rgba(0,0,0,.38)}.mat-slider-disabled .mat-slider-thumb,.mat-slider-disabled .mat-slider-track-background,.mat-slider-disabled .mat-slider-track-fill,.mat-slider-disabled:hover .mat-slider-track-background{background-color:rgba(0,0,0,.26)}.mat-slider-min-value .mat-slider-focus-ring{background-color:rgba(0,0,0,.12)}.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label{background-color:rgba(0,0,0,.87)}.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label{background-color:rgba(0,0,0,.26)}.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb{border-color:rgba(0,0,0,.26);background-color:transparent}.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb{border-color:rgba(0,0,0,.38)}.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb{border-color:rgba(0,0,0,.26)}.mat-slider-has-ticks .mat-slider-wrapper::after{border-color:rgba(0,0,0,.7)}.mat-slider-horizontal .mat-slider-ticks{background-image:repeating-linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent);background-image:-moz-repeating-linear-gradient(.0001deg,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent)}.mat-slider-vertical .mat-slider-ticks{background-image:repeating-linear-gradient(to bottom,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent)}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused,.mat-step-header:hover{background-color:rgba(0,0,0,.04)}.mat-step-header .mat-step-label,.mat-step-header .mat-step-optional{color:rgba(0,0,0,.38)}.mat-step-header .mat-step-icon{background-color:#2196f3;color:#fff}.mat-step-header .mat-step-icon-not-touched{background-color:rgba(0,0,0,.38);color:#fff}.mat-step-header .mat-step-label.mat-step-label-active{color:rgba(0,0,0,.87)}.mat-stepper-horizontal,.mat-stepper-vertical{background-color:#fff}.mat-stepper-vertical-line::before{border-left-color:rgba(0,0,0,.12)}.mat-stepper-horizontal-line{border-top-color:rgba(0,0,0,.12)}.mat-tab-header,.mat-tab-nav-bar{border-bottom:1px solid rgba(0,0,0,.12)}.mat-tab-group-inverted-header .mat-tab-header,.mat-tab-group-inverted-header .mat-tab-nav-bar{border-top:1px solid rgba(0,0,0,.12);border-bottom:none}.mat-tab-label,.mat-tab-link{color:rgba(0,0,0,.87)}.mat-tab-label.mat-tab-disabled,.mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,.38)}.mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.87)}.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.38)}.mat-tab-group[class*=mat-background-] .mat-tab-header,.mat-tab-nav-bar[class*=mat-background-]{border-bottom:none;border-top:none}.mat-tab-group.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(187,222,251,.3)}.mat-tab-group.mat-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary .mat-ink-bar{background-color:#2196f3}.mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar{background-color:#fff}.mat-tab-group.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,205,210,.3)}.mat-tab-group.mat-accent .mat-ink-bar,.mat-tab-nav-bar.mat-accent .mat-ink-bar{background-color:#f44336}.mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar,.mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar{background-color:#fff}.mat-tab-group.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,204,188,.3)}.mat-tab-group.mat-warn .mat-ink-bar,.mat-tab-nav-bar.mat-warn .mat-ink-bar{background-color:#ff5722}.mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar,.mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar{background-color:#fff}.mat-tab-group.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(187,222,251,.3)}.mat-tab-group.mat-background-primary .mat-tab-header,.mat-tab-group.mat-background-primary .mat-tab-links,.mat-tab-nav-bar.mat-background-primary .mat-tab-header,.mat-tab-nav-bar.mat-background-primary .mat-tab-links{background-color:#2196f3}.mat-tab-group.mat-background-primary .mat-tab-label,.mat-tab-group.mat-background-primary .mat-tab-link,.mat-tab-nav-bar.mat-background-primary .mat-tab-label,.mat-tab-nav-bar.mat-background-primary .mat-tab-link{color:#fff}.mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron{border-color:#fff}.mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-primary .mat-ripple-element,.mat-tab-nav-bar.mat-background-primary .mat-ripple-element{background-color:rgba(255,255,255,.12)}.mat-tab-group.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,205,210,.3)}.mat-tab-group.mat-background-accent .mat-tab-header,.mat-tab-group.mat-background-accent .mat-tab-links,.mat-tab-nav-bar.mat-background-accent .mat-tab-header,.mat-tab-nav-bar.mat-background-accent .mat-tab-links{background-color:#f44336}.mat-tab-group.mat-background-accent .mat-tab-label,.mat-tab-group.mat-background-accent .mat-tab-link,.mat-tab-nav-bar.mat-background-accent .mat-tab-label,.mat-tab-nav-bar.mat-background-accent .mat-tab-link{color:#fff}.mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron{border-color:#fff}.mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-accent .mat-ripple-element,.mat-tab-nav-bar.mat-background-accent .mat-ripple-element{background-color:rgba(255,255,255,.12)}.mat-tab-group.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,204,188,.3)}.mat-tab-group.mat-background-warn .mat-tab-header,.mat-tab-group.mat-background-warn .mat-tab-links,.mat-tab-nav-bar.mat-background-warn .mat-tab-header,.mat-tab-nav-bar.mat-background-warn .mat-tab-links{background-color:#ff5722}.mat-tab-group.mat-background-warn .mat-tab-label,.mat-tab-group.mat-background-warn .mat-tab-link,.mat-tab-nav-bar.mat-background-warn .mat-tab-label,.mat-tab-nav-bar.mat-background-warn .mat-tab-link{color:#fff}.mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron{border-color:#fff}.mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-warn .mat-ripple-element,.mat-tab-nav-bar.mat-background-warn .mat-ripple-element{background-color:rgba(255,255,255,.12)}.mat-toolbar{background:#f5f5f5;color:rgba(0,0,0,.87)}.mat-toolbar.mat-primary{background:#2196f3;color:#fff}.mat-toolbar.mat-accent{background:#f44336;color:#fff}.mat-toolbar.mat-warn{background:#ff5722;color:#fff}.mat-toolbar .mat-focused .mat-form-field-ripple,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-form-field-underline{background-color:currentColor}.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-select-value{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-tooltip{background:rgba(97,97,97,.9)}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif;background:#fff}.mat-tree-node{font-weight:400;font-size:14px;color:rgba(0,0,0,.87)}.mat-snack-bar-container{background:#323232;color:#fff}.mat-simple-snackbar-action{color:#f44336}.ol-box{-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px;border:2px solid #00f}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:rgba(0,60,136,.3);border-radius:4px;bottom:8px;left:8px;padding:2px;position:absolute}.ol-scale-line-inner{border:1px solid #eee;border-top:none;color:#eee;font-size:10px;text-align:center;margin:1px;will-change:contents,width}.ol-overlay-container{will-change:left,right,top,bottom}.ol-unsupported{display:none}.ol-unselectable,.ol-viewport{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-selectable{-webkit-touch-callout:default;-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.ol-grabbing{cursor:-webkit-grabbing;cursor:grabbing}.ol-grab{cursor:move;cursor:-webkit-grab;cursor:grab}.ol-control{position:absolute;background-color:rgba(255,255,255,.4);border-radius:4px;padding:2px}.ol-control:hover{background-color:rgba(255,255,255,.6)}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;-webkit-transition:opacity .25s linear,visibility 0s linear;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;-webkit-transition:opacity .25s linear,visibility 0s linear .25s;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}@media print{.ol-control{display:none}}.ol-control button{display:block;margin:1px;padding:0;color:#fff;text-decoration:none;text-align:center;height:1.375em;width:1.375em;line-height:.4em;border:none}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;font-size:1.2em;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:focus,.ol-control button:hover{text-decoration:none;background-color:#1a78c2!important}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em)}.ol-attribution ul{margin:0;padding:0 .5em;font-size:.7rem;line-height:1.375em;color:#000;text-shadow:0 0 2px #fff}.ol-attribution li{display:inline;list-style:none;line-height:inherit}.ol-attribution li:not(:last-child):after{content:\" \"}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button,.ol-attribution ul{display:inline-block}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution.ol-logo-only ul{display:block}.ol-attribution:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0;height:1.1em;line-height:1em}.ol-attribution.ol-logo-only{background:0 0;bottom:.4em;height:1.1em;line-height:1em}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:inline-block}.ol-overviewmap .ol-overviewmap-map{border:1px solid #7b98bc;height:150px;margin:2px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:1px;left:2px;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-overviewmap-box{border:2px dotted rgba(0,60,136,.7)}.ol-overviewmap .ol-overviewmap-box:hover{cursor:move}@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:local(\"Material Icons\"),local(\"MaterialIcons-Regular\"),url(https://fonts.gstatic.com/s/materialicons/v19/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format(\"woff2\"),url(https://fonts.gstatic.com/s/materialicons/v28/2fcrYFNaTjcS6g4U3t-Y5ewrjPiaoEww8AihgqWRJAo.woff) format(\"woff\")}.material-icons{font-family:'Material Icons';font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;font-feature-settings:'liga';-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased}html{-webkit-box-sizing:border-box;box-sizing:border-box}*,::after,::before{-webkit-box-sizing:inherit;box-sizing:inherit}body{color:#484848;font-family:-apple-system,BlinkMacSystemFont,\"Avenir Next\",Avenir,\"Segoe UI\",\"Lucida Grande\",\"Helvetica Neue\",Helvetica,\"Fira Sans\",Roboto,Noto,\"Droid Sans\",Cantarell,Oxygen,Ubuntu,\"Franklin Gothic Medium\",\"Century Gothic\",\"Liberation Sans\",sans-serif;font-size:1em;line-height:1.5}h1,h2,h3,h4,h5,h6{font-family:-apple-system,BlinkMacSystemFont,\"Avenir Next\",Avenir,\"Segoe UI\",\"Lucida Grande\",\"Helvetica Neue\",Helvetica,\"Fira Sans\",Roboto,Noto,\"Droid Sans\",Cantarell,Oxygen,Ubuntu,\"Franklin Gothic Medium\",\"Century Gothic\",\"Liberation Sans\",sans-serif;font-size:1.25em;line-height:1.2;margin:0 0 .75em}p{margin:0 0 .75em}a{color:#2196f3;text-decoration:none;-webkit-transition:color 150ms ease;transition:color 150ms ease}a:active,a:focus,a:hover{color:#1971b6}hr{border-bottom:1px solid #ddd;border-left:0;border-right:0;border-top:0;margin:1.5em 0}.ribbon-box{height:100px;width:100px;border:none;position:relative}.ribbon-wrapper{height:85px;width:85px;overflow:hidden;position:absolute;right:-1px;top:-1px}.ribbon-wrapper .ribbon{background-color:#484848;-webkit-box-shadow:0 0 3px rgba(0,0,0,.3);box-shadow:0 0 3px rgba(0,0,0,.3);color:#fff;font-size:.8em;left:-5px;line-height:1.5em;padding:2px 7px;position:relative;text-align:center;top:15px;-webkit-transform:rotate(45deg);transform:rotate(45deg);width:120px}.ribbon-wrapper .ribbon:focus,.ribbon-wrapper .ribbon:hover{background-color:#3a3a3a}.ribbon-wrapper .ribbon a{cursor:pointer;color:#fff}.mat-autocomplete-panel .mat-option .mat-option-text .details{color:#aaa;font-style:italic}.cdk-overlay-container .cdk-overlay-pane{max-width:100vw!important}.cdk-overlay-container .cdk-overlay-pane .mat-dialog-container{padding:0!important}.ol-control button{background-color:#2196f3!important;font-weight:400!important;font-family:-apple-system,BlinkMacSystemFont,\"Avenir Next\",Avenir,\"Segoe UI\",\"Lucida Grande\",\"Helvetica Neue\",Helvetica,\"Fira Sans\",Roboto,Noto,\"Droid Sans\",Cantarell,Oxygen,Ubuntu,\"Franklin Gothic Medium\",\"Century Gothic\",\"Liberation Sans\",sans-serif!important;font-size:1.5em!important;border-radius:3px!important}.ol-rotate,.ol-zoom{display:none!important}.mangol{max-width:100%;margin-left:auto;margin-right:auto;height:100%!important}.mangol::after{clear:both;content:\"\";display:block}.mangol .mangol-content{height:100%}.mangol .ol-viewport{height:100%!important}.mangol .mat-drawer-container{width:100%;height:100%}.mangol .mat-drawer-container mat-drawer{width:450px;min-width:200px;max-width:450px;-webkit-box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mangol .mat-drawer-container .mat-drawer-backdrop.mat-drawer-shown{display:none!important}.mangol-map{z-index:0;width:100%;height:100%;display:block}.mangol-map .custom-buttons{position:absolute;z-index:20}.mangol-map .custom-buttons .mat-ripple-background,.mangol-map .custom-buttons .mat-ripple-foreground{display:none!important}.mangol-map .custom-buttons .sidebar{margin-top:3em;margin-left:1em;top:6em;left:.5em}.mangol-map .custom-buttons .zoom-in{margin-top:1em;margin-left:1em}.mangol-map .custom-buttons .full-screen,.mangol-map .custom-buttons .zoom-out{margin-left:1em;margin-top:.5em}.mangol-map .mangol-map-div{height:100%;overflow:hidden}.mangol-map .mangol-map-controllers{position:absolute;padding:1em;z-index:2;right:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex}.mangol-map .mangol-map-controllers .mangol-mouse-position{position:relative;margin-left:1em}.mangol-map .mangol-map-controllers .mangol-scale-line{position:relative}.mangol-map .mangol-map-controllers .mangol-scale-line .ol-scale-line{position:relative;background-color:rgba(0,0,0,0);bottom:initial;left:initial;padding:initial}.mangol-map .mangol-map-controllers .mangol-scale-line .ol-scale-line .ol-scale-line-inner{font-family:'Roboto Mono',monospace;font-weight:300;font-size:13px;border:1px solid #fff;border-top:none;border-left:none;border-right:none;color:#fff;margin:initial}.mangol-map .mangol-quick-search{width:50%;min-width:100px;max-width:300px;position:absolute;padding:1em;top:0;right:0;z-index:3}.mangol-map .mangol-quick-search .quicksearch-outer{position:relative;background:#fff;border-radius:24px;padding:5px 20px}.mangol-map .mangol-quick-search .quicksearch-outer .quicksearch-form .mat-form-field{width:100%}.mangol-map .mangol-quick-search .quicksearch-outer .quicksearch-form .mat-form-field-prefix .mat-icon{font-size:100%;margin-right:3px}.mangol-map .mangol-quick-search .quicksearch-outer input{-webkit-box-shadow:none;box-shadow:none}.mangol-sidebar{z-index:200;vertical-align:top;background-color:#fff;height:100%}.mangol-sidebar .sidebar-outer{display:table;width:100%;table-layout:fixed;padding:0;height:100%}.mangol-sidebar .sidebar-outer .close-button{float:right;width:1em}.mangol-sidebar .sidebar-outer .sidebar-main{max-height:200px;vertical-align:top;padding:0 5px;font-size:.8em;background-color:#fff}.mangol-sidebar .sidebar-outer .sidebar-main .sidebar-title .mat-toolbar{background-color:#fafafa;border:1px solid #eee;margin-bottom:3px}.mangol-sidebar .sidebar-outer .sidebar-main .sidebar-content button{text-transform:uppercase}.mangol-sidebar .sidebar-outer .sidebar-main .sidebar-content .dev{color:#999;padding-top:5px}.mangol-toolbar{display:table-cell;width:16.66667%;height:100%;background-color:#fff;color:#2196f3;border-right:1px solid rgba(0,0,0,.15);text-align:center}.mangol-toolbar .toolbar-div{min-height:2em}.mangol-toolbar .toolbar-div .mat-list .mat-list-item{padding:0!important}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content{padding:0}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab{-webkit-box-shadow:none;box-shadow:none;background-color:#fff;margin-left:auto;margin-right:auto}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab.active .mat-icon{color:#2196f3}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab:not([disabled]):hover{-webkit-box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:background .4s cubic-bezier(.25,.8,.25,1),-webkit-box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),-webkit-box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mangol-toolbar .toolbar-div .mat-list .mat-list-item .mat-list-item-content button.mat-mini-fab .mat-icon{color:#484848;font-size:1em;line-height:1.7em}.mangol-layertree{color:#484848}.mangol-layertree .mat-list.layer{border:1px solid #eee;padding-top:0;margin-top:3px}.mangol-layertree .mat-list .toggled{background-color:#f5f5f5}.mangol-layertree .mat-list .mat-subheader{color:#2196f3}.mangol-layertree .mat-expansion-panel{-webkit-box-shadow:none!important;box-shadow:none!important;border:1px solid #eee}.mangol-layertree .mat-expansion-panel:not(.mat-expanded){margin-bottom:4px}.mangol-layertree .mat-expansion-panel .mat-expansion-panel-header .mat-content{display:initial}.mangol-layertree .mat-list-item:hover{background-color:#f5f5f5}.mangol-layertree .mat-list-item .mat-icon{cursor:pointer}.mangol-layertree .layer-name{font-size:13px!important}.mangol-layertree .layer-description{color:rgba(0,0,0,.54);font-size:13px!important}.mangol-layer-details .details{padding:16px}.mangol-layer-details .details .details-title{padding-bottom:20px}.mangol-layer-details .details .details-title .mat-icon{float:right;cursor:pointer}.mangol-layer-details .details .mat-slider{width:100%}.mangol-print .mat-ripple-background,.mangol-print .mat-ripple-foreground{display:none!important}.mangol-print .form-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:10px}.mangol-print .form-container button{margin-top:10px}.mangol-print .form-container>*{width:100%}.mangol-measure .measure-container{padding:10px}.mangol-measure .measure-container .subtitle{padding-bottom:10px}.mangol-measure .measure-container .value-container{padding-top:10px}.mangol-measure .measure-container .value-container .value{color:#2196f3}.mangol-measure .measure-container .mat-button-toggle-group,.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle{width:100%}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle .mat-button-toggle-label .mat-button-toggle-label-content{width:100%;text-align:center}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle .mat-icon{text-align:center;font-size:large;color:#484848}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle.mat-button-toggle-checked{background-color:#fafafa}.mangol-measure .measure-container .mat-button-toggle-group .mat-button-toggle.mat-button-toggle-checked .mat-icon{color:#2196f3}.mangol-dialog .mangol,.mangol-dialog .mangol .mangol-content,.mangol-dialog .mangol .ol-viewport{height:100%!important}.mangol-feature-info .feature-info-container{padding:10px}.mangol-feature-info .feature-info-container .mat-form-field{width:100%}.mangol-feature-info .mat-feature-info-table .table-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mangol-feature-info .full-screen-button{width:100%;margin-bottom:20px}.mangol-pointer{cursor:pointer}:host{display:block}.sidebar-outer /deep/.mat-tab-label,.sidebar-outer /deep/.mat-tab-label-active{min-width:80px!important;padding:3px!important;margin:3px!important}.mat-tab-group{height:100%}.mat-tab-group /deep/.mat-tab-body-wrapper{height:100%}.sidebar-content{height:100%}.sidebar-content .sidebar-inner{padding:10px 5px}.mat-icon{font-size:16px;height:16px;width:16px;line-height:16px;vertical-align:middle}"],
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
MangolSidebarComponent.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: MangolFeatureIntoService, },
    { type: MangolMeasureService, },
]; };
MangolSidebarComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "options": [{ type: core.Input },],
    "map": [{ type: core.Input },],
};
var MangolSidebarModule = /** @class */ (function () {
    function MangolSidebarModule() {
    }
    return MangolSidebarModule;
}());
MangolSidebarModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
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
var MangolDialogComponent = /** @class */ (function () {
    function MangolDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.class = 'mangol-dialog';
        this.config = this.data.config;
    }
    MangolDialogComponent.prototype.ngAfterViewInit = function () { };
    return MangolDialogComponent;
}());
MangolDialogComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-dialog',
                template: "<mangol *ngIf=\"config\"\n    [config]=\"config\"></mangol>\n"
            },] },
];
MangolDialogComponent.ctorParameters = function () { return [
    { type: material.MatDialogRef, },
    { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] },] },
]; };
MangolDialogComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
};
var MangolMapComponent = /** @class */ (function () {
    function MangolMapComponent(dialog) {
        this.dialog = dialog;
        this.class = 'mangol-map';
        this.mapCreated = new core.EventEmitter();
        this.sidebarToggled = new core.EventEmitter();
        this.defaultConfig = ({
            map: {
                target: null,
                renderer: 'canvas',
                view: {
                    projection: 'EPSG:900913',
                    center: openlayers.proj.fromLonLat([19.39563, 47.16846], 'EPSG:900913'),
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
    MangolMapComponent.prototype.ngOnInit = function () {
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
        this.view = new openlayers.View({
            projection: this.config.map.view.projection,
            center: this.config.map.view.center,
            zoom: this.config.map.view.zoom,
            resolutions: this.config.map.view && this.config.map.view.resolutions
                ? this.config.map.view.resolutions
                : this.defaultConfig.map.view.resolutions
        });
    };
    MangolMapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.map = new MangolMap({
                renderer: _this.renderer,
                layers: [],
                target: _this.config.map.target,
                view: _this.view
            }, _this.mapService);
            if (_this.config.map.hasOwnProperty('layertree')) {
                _this.map.addLayersAndLayerGroups(_this.config.map.layertree, null);
            }
            _this.mapService.addMap(_this.map);
            _this.mapCreated.emit(_this.map);
        }, 0);
    };
    MangolMapComponent.prototype.zoomIn = function () {
        this.view.animate({
            zoom: this.view.getZoom() + 1,
            duration: this.zoomDuration
        });
    };
    MangolMapComponent.prototype.zoomOut = function () {
        this.view.animate({
            zoom: this.view.getZoom() - 1,
            duration: this.zoomDuration
        });
    };
    MangolMapComponent.prototype.fullScreen = function () {
        var confOverride = ({
            map: Object.assign({}, this.config.map, { target: this.config.map.target + '-dialog', controllers: Object.assign({}, this.config.map.controllers, { fullScreen: undefined }) })
        });
        var dialogConfig = Object.assign({}, this.config, confOverride);
        var dialogRef = this.dialog.open(MangolDialogComponent, {
            width: '95%',
            height: '95%',
            data: { config: dialogConfig }
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    MangolMapComponent.prototype.toggleSidebar = function () {
        this.sidebarOpened = !this.sidebarOpened;
        this.sidebarToggled.emit();
    };
    return MangolMapComponent;
}());
MangolMapComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-map',
                template: "<div class=\"custom-buttons\">\n    <div class=\"zoom-in\"\n        (click)=\"zoomIn()\">\n        <button mat-mini-fab\n            color=\"primary\"\n            matTooltip=\"Zoom in\"\n            matTooltipPosition=\"right\"\n            class=\"mat-elevation-z2\">\n      <mat-icon class=\"mat-12\">add</mat-icon>\n    </button>\n    </div>\n    <div class=\"zoom-out\"\n        (click)=\"zoomOut()\"\n        matTooltip=\"Zoom out\"\n        matTooltipPosition=\"right\">\n        <button mat-mini-fab\n            color=\"primary\"\n            class=\"mat-elevation-z2\">\n      <mat-icon class=\"mat-24\">remove</mat-icon>\n    </button>\n    </div>\n    <div *ngIf=\"map && config && config.map && config.map.controllers && config.map.controllers.fullScreen\"\n        class=\"full-screen\"\n        (click)=\"fullScreen()\"\n        matTooltip=\"Full screen\"\n        matTooltipPosition=\"right\">\n        <button mat-mini-fab\n            color=\"primary\"\n            class=\"mat-elevation-z2\">\n      <mat-icon class=\"mat-24\">fullscreen</mat-icon>\n    </button>\n    </div>\n    <div class=\"sidebar\"\n        *ngIf=\"config.sidebar && config.sidebar.collapsible\"\n        (click)=\"toggleSidebar()\">\n        <button mat-mini-fab\n            color=\"primary\"\n            [matTooltip]=\"sidebarOpened ? 'Hide sidebar' : 'Show sidebar'\"\n            matTooltipPosition=\"right\"\n            class=\"mat-elevation-z2\">\n      <mat-icon class=\"mat-24\">{{sidebarOpened ? 'chevron_left' : 'chevron_right'}}</mat-icon>\n    </button>\n    </div>\n</div>\n<mangol-tile-load *ngIf=\"map && config && config.map && config.map.controllers && config.map.controllers.tileLoad\"\n    [tiles]=\"loadingTiles$ | async\"></mangol-tile-load>\n<div class=\"mangol-map-controllers\"\n    *ngIf=\"map && config && config.map && config.map.controllers\">\n    <mangol-scale-line *ngIf=\"config.map.controllers.scaleLine\"\n        [map]=\"map\"\n        [opts]=\"config.map.controllers.scaleLine\"></mangol-scale-line>\n    <mangol-mouse-position *ngIf=\"config.map.controllers.mousePosition\"\n        [map]=\"map\"\n        [opts]=\"config.map.controllers.mousePosition\"></mangol-mouse-position>\n</div>\n<mangol-quick-search *ngIf=\"map && config && config.map && config.map.controllers && config.map.controllers.quickSearch\"\n    [opts]=\"config.map.controllers.quickSearch\"\n    [map]=\"map\"></mangol-quick-search>\n\n<div [attr.id]=\"config.map.target\"\n    class=\"mangol-map-div\"></div>\n"
            },] },
];
MangolMapComponent.ctorParameters = function () { return [
    { type: material.MatDialog, },
]; };
MangolMapComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "config": [{ type: core.Input },],
    "mapService": [{ type: core.Input },],
    "mapCreated": [{ type: core.Output },],
    "sidebarToggled": [{ type: core.Output },],
};
var MangolMousePositionComponent = /** @class */ (function () {
    function MangolMousePositionComponent() {
        this.class = 'mangol-mouse-position';
        this.coordinates = [];
    }
    MangolMousePositionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.precision = this.opts.hasOwnProperty('precision')
            ? this.opts.precision
            : 2;
        this.coordinates = this._formatCoordinates(this.map.getView().getCenter());
        this.pointerMoveListener = this.map.on('pointermove', function (evt) {
            if (evt.dragging) {
                return;
            }
            else {
                _this.coordinates = _this._formatCoordinates(evt.coordinate);
            }
        });
    };
    MangolMousePositionComponent.prototype.ngOnDestroy = function () {
        this.map.un('pointermove', this.pointerMoveListener);
    };
    MangolMousePositionComponent.prototype._formatCoordinates = function (coords) {
        var _this = this;
        var formattedCoords = [];
        coords.forEach(function (coord) {
            coord = parseFloat(coord).toFixed(_this.precision);
            formattedCoords.push(coord);
        });
        return formattedCoords;
    };
    return MangolMousePositionComponent;
}());
MangolMousePositionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-mouse-position',
                template: "<mat-chip-list *ngIf=\"coordinates.length === 2\">\n    <mat-chip color=\"primary\"\n        selected=\"true\"\n        class=\"mat-elevation-z2\">{{coordinates.join(', ')}}</mat-chip>\n</mat-chip-list>\n",
                styles: [":host{display:block}.mat-chip{font-family:'Roboto Mono',monospace;font-weight:300;text-align:center}"]
            },] },
];
MangolMousePositionComponent.ctorParameters = function () { return []; };
MangolMousePositionComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "map": [{ type: core.Input },],
    "opts": [{ type: core.Input },],
};
var MangolQuickSearchComponent = /** @class */ (function () {
    function MangolQuickSearchComponent() {
        this.class = 'mangol-quick-search';
        this.formControl = new forms.FormControl();
    }
    MangolQuickSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.placeholder = this.opts.hasOwnProperty('placeholder')
            ? this.opts.placeholder
            : 'Quicksearch';
        this.items = this.opts.hasOwnProperty('items') ? this.opts.items : [];
        this.filteredOptionsObservable = this.formControl.valueChanges
            .startWith('')
            .map(function (val) { return _this._filter(val); });
        this.filteredOptions = [];
    };
    MangolQuickSearchComponent.prototype._filter = function (val) {
        this.filteredOptions = this.items.filter(function (option) { return option.text.toLowerCase().indexOf(val.toLowerCase()) === 0; });
        return this.filteredOptions;
    };
    MangolQuickSearchComponent.prototype.onOptionSeleted = function ($event) {
        var selected = null;
        for (var i = 0; i < this.filteredOptions.length; i++) {
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
    };
    MangolQuickSearchComponent.prototype._zoomToCoordinates = function (selected) {
        this.map.getView().animate({
            center: selected.coordinates
        });
    };
    MangolQuickSearchComponent.prototype._zoomToExtent = function (selected) {
        this.map.getView().fit(selected.extent, {
            duration: 500
        });
    };
    return MangolQuickSearchComponent;
}());
MangolQuickSearchComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-quick-search',
                template: "<div class=\"quicksearch-outer mat-elevation-z2\">\n    <form class=\"quicksearch-form\">\n        <mat-form-field>\n            <input type=\"search\"\n                aria-label=\"Number\"\n                matInput\n                [formControl]=\"formControl\"\n                [matAutocomplete]=\"auto\"\n                [placeholder]=\"placeholder\">\n            <span matPrefix>\n        <mat-icon fontIcon=\"ms-zoom\" fontSet=\"ms\"></mat-icon>\n      </span>\n            <mat-autocomplete #auto=\"matAutocomplete\"\n                (optionSelected)=\"onOptionSeleted($event)\">\n                <mat-option *ngFor=\"let option of filteredOptionsObservable | async\"\n                    [value]=\"option.text\">\n                    <span>{{ option.text }}</span>\n                    <span *ngIf=\"option.details\">\n            <span>|</span>\n                    <small class=\"details\">{{option.details}}</small>\n                    </span>\n                </mat-option>\n            </mat-autocomplete>\n        </mat-form-field>\n    </form>\n</div>\n"
            },] },
];
MangolQuickSearchComponent.ctorParameters = function () { return []; };
MangolQuickSearchComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "map": [{ type: core.Input },],
    "opts": [{ type: core.Input },],
};
var MangolScaleLineComponent = /** @class */ (function () {
    function MangolScaleLineComponent() {
        this.class = 'mangol-scale-line';
    }
    MangolScaleLineComponent.prototype.ngOnInit = function () {
        this.target = this.map.getTarget() + '-scale-line';
    };
    MangolScaleLineComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var scaleLineControl = new openlayers.control.ScaleLine({
            target: document.getElementById(this.target),
            units: this.opts.hasOwnProperty('units') ? this.opts.units : 'metric'
        });
        setTimeout(function () {
            _this.map.addControl(scaleLineControl);
        }, 0);
    };
    return MangolScaleLineComponent;
}());
MangolScaleLineComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-scale-line',
                template: "<mat-chip-list>\n    <mat-chip color=\"primary\"\n        selected=\"true\"\n        class=\"mat-elevation-z2\">\n        <div [attr.id]=\"target\"></div>\n    </mat-chip>\n</mat-chip-list>\n"
            },] },
];
MangolScaleLineComponent.ctorParameters = function () { return []; };
MangolScaleLineComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "map": [{ type: core.Input },],
    "opts": [{ type: core.Input },],
};
var TileLoadComponent = /** @class */ (function () {
    function TileLoadComponent() {
    }
    TileLoadComponent.prototype.ngOnInit = function () { };
    return TileLoadComponent;
}());
TileLoadComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol-tile-load',
                template: "<div [hidden]=\"tiles.length === 0\">\n    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n</div>\n\n",
                styles: [":host{display:block;position:absolute;bottom:0;z-index:20;left:0;width:100%}"]
            },] },
];
TileLoadComponent.ctorParameters = function () { return []; };
TileLoadComponent.propDecorators = {
    "tiles": [{ type: core.Input },],
};
var MangolMapModule = /** @class */ (function () {
    function MangolMapModule() {
    }
    return MangolMapModule;
}());
MangolMapModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    MangolMaterialModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule
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
var MangolComponent = /** @class */ (function () {
    function MangolComponent(mapService) {
        this.mapService = mapService;
        this.class = 'mangol';
        this.mapReady = new core.EventEmitter();
        this.containerReady = false;
        this.service = this.mapService;
        this.defaultMap = {
            renderer: 'canvas',
            target: 'demo-simple-map',
            view: {
                projection: 'EPSG:900913',
                center: openlayers.proj.fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:900913'),
                zoom: 7
            },
            layertree: {
                layers: [
                    {
                        name: 'OpenStreetMap layer',
                        layer: new openlayers.layer.Tile({
                            source: new openlayers.source.OSM()
                        })
                    }
                ]
            }
        };
    }
    MangolComponent.prototype.ngOnInit = function () {
        if (typeof this.config === 'undefined') {
            this.config = ({
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
        catch (error) {
            this.isOpened = true;
        }
    };
    MangolComponent.prototype.mapCreated = function (map$$1) {
        this.map = map$$1;
        this.map.updateSize();
        var ready = ({
            mapService: this.service,
            config: this.config
        });
        this.mapReady.emit(ready);
    };
    MangolComponent.prototype.sidebarToggled = function () {
        this.isOpened = !this.isOpened;
    };
    MangolComponent.prototype.updateMap = function () {
        var _this = this;
        setTimeout(function () {
            _this.map.updateSize();
        }, 0);
    };
    return MangolComponent;
}());
MangolComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'mangol',
                template: "<div class=\"mangol-content\">\n    <mat-drawer-container autosize>\n        <mat-drawer #start\n            *ngIf=\"config.sidebar && sidebarMode && map\"\n            position=\"start\"\n            (opened)=\"updateMap()\"\n            (closed)=\"isOpened=false\"\n            (openedChange)=\"updateMap()\"\n            opened=\"{{isOpened}}\"\n            mode=\"{{sidebarMode}}\"\n            disableClose>\n            <mangol-sidebar [options]=\"config.sidebar\"\n                [map]=\"map\">\n            </mangol-sidebar>\n        </mat-drawer>\n        <mangol-map *ngIf=\"config.map\"\n            [config]=\"config\"\n            [mapService]=\"service\"\n            (mapCreated)=\"mapCreated($event)\"\n            (sidebarToggled)=\"sidebarToggled($event)\">\n        </mangol-map>\n    </mat-drawer-container>\n</div>\n",
                providers: [MangolMapService]
            },] },
];
MangolComponent.ctorParameters = function () { return [
    { type: MangolMapService, },
]; };
MangolComponent.propDecorators = {
    "class": [{ type: core.HostBinding, args: ['class',] },],
    "config": [{ type: core.Input },],
    "mapReady": [{ type: core.Output },],
};
var MangolModule = /** @class */ (function () {
    function MangolModule() {
    }
    return MangolModule;
}());
MangolModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    MangolMaterialModule,
                    MangolMapModule,
                    MangolSidebarModule
                ],
                declarations: [MangolComponent, MangolDialogComponent],
                exports: [MangolComponent, MangolDialogComponent],
                entryComponents: [MangolDialogComponent]
            },] },
];

exports.MangolMapService = MangolMapService;
exports.MangolModule = MangolModule;
exports.ɵa = MangolMaterialModule;
exports.ɵn = KeysPipe;
exports.ɵv = MangolFeatureInfoTableDialogComponent;
exports.ɵu = MangolFeatureInfoTableComponent;
exports.ɵs = MangolFeatureInfoComponent;
exports.ɵr = MangolFeatureInfoModule;
exports.ɵt = MangolFeatureIntoService;
exports.ɵk = MangolLayerDetailsComponent;
exports.ɵj = MangolLayertreeComponent;
exports.ɵi = MangolLayertreeModule;
exports.ɵy = MangolDialogComponent;
exports.ɵx = MangolComponent;
exports.ɵc = MangolMapComponent;
exports.ɵb = MangolMapModule;
exports.ɵd = MangolMousePositionComponent;
exports.ɵf = MangolQuickSearchComponent;
exports.ɵe = MangolScaleLineComponent;
exports.ɵg = TileLoadComponent;
exports.ɵp = MangolMeasureComponent;
exports.ɵo = MangolMeasureModule;
exports.ɵq = MangolMeasureService;
exports.ɵm = MangolPrintComponent;
exports.ɵl = MangolPrintModule;
exports.ɵw = MangolSidebarComponent;
exports.ɵh = MangolSidebarModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mangol.umd.js.map
