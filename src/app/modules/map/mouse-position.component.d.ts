import { OnDestroy, OnInit } from '@angular/core';
import { MangolMap } from '../../classes/map.class';
import { MangolConfigMapControllerMousePosition } from '../../interfaces/config-map-controllers.interface';
export declare class MangolMousePositionComponent implements OnInit, OnDestroy {
    class: string;
    map: MangolMap;
    opts: MangolConfigMapControllerMousePosition;
    coordinates: number[];
    precision: number;
    pointerMoveListener: any;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _formatCoordinates(coords);
}
