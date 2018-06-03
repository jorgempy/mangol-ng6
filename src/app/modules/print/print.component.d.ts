import { OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { MangolMap } from '../../classes/map.class';
export interface Layout {
    name: string;
    value: string;
}
export declare class MangolPrintComponent implements OnInit {
    class: string;
    map: MangolMap;
    layouts: Layout[];
    dims: any;
    resolutions: number[];
    selectedLayout: Layout;
    selectedDim: string;
    selectedResolution: number;
    constructor();
    ngOnInit(): void;
    print(): void;
    onLayoutChange(evt: MatSelectChange): void;
    onSizeChange(evt: MatSelectChange): void;
    onResolutionChange(evt: MatSelectChange): void;
}
