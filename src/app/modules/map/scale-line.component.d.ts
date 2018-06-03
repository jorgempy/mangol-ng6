import { AfterViewInit, OnInit } from '@angular/core';
import { MangolMap } from '../../classes/map.class';
import { MangolConfigMapControllerScaleLine } from './../../interfaces/config-map-controllers.interface';
export declare class MangolScaleLineComponent implements OnInit, AfterViewInit {
    class: string;
    map: MangolMap;
    opts: MangolConfigMapControllerScaleLine;
    target: string;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
