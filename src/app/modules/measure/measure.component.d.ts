import { Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import * as ol from 'openlayers';
import { MangolMap } from '../../classes/map.class';
import { MangolConfigMeasureItem } from '../../interfaces/config-toolbar.interface';
import { MangolMeasureService } from './measure.service';
export interface MeasureButton {
    title: string;
    value: string;
    geometryType: any;
    fontSet: string;
    fontIcon: string;
}
export declare class MangolMeasureComponent implements OnInit, OnDestroy {
    private measureService;
    class: string;
    map: MangolMap;
    opts: MangolConfigMeasureItem;
    precision: number;
    cursorStyle: string;
    fillColor: [number, number, number, number];
    strokeColor: [number, number, number, number];
    textColor: [number, number, number, number];
    textOutlineColor: [number, number, number, number];
    font: string;
    buttons: MeasureButton[];
    layer: ol.layer.Vector;
    selected: MeasureButton;
    draw: ol.interaction.Draw;
    value: number;
    units: string;
    activateStateSubscription: Subscription;
    constructor(measureService: MangolMeasureService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onToggleChange(evt: MatButtonToggleChange): void;
    activateDraw(): void;
    deactivateDraw(): void;
    getDimension(): string;
    private _setCursor(cursorType);
    private _getLengthOrArea(feature);
    private _getStyle(feature);
}
