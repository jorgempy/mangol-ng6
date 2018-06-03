import { EventEmitter, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { MangolConfigToolbarLayertreeDetails } from '../../interfaces/config-toolbar.interface';
import { MangolLayer } from './../../classes/layer.class';
export declare class MangolLayerDetailsComponent implements OnInit {
    class: string;
    opts: MangolConfigToolbarLayertreeDetails;
    layer: MangolLayer;
    detailType: string;
    detailsClosed: EventEmitter<any>;
    sliderMin: number;
    sliderMax: number;
    sliderStep: number;
    sliderShowLabels: boolean;
    sliderValue: number;
    ngOnInit(): void;
    onSliderChange($event: MatSliderChange): void;
    closeDetails(): void;
}
