import { Observable } from 'rxjs';
import { AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MangolMap } from '../../classes/map.class';
import { MangolConfig } from './../../interfaces/config.interface';
import { MangolMapService } from './../../services/map.service';
import * as ol from 'openlayers';
export declare class MangolMapComponent implements AfterViewInit, OnInit {
    dialog: MatDialog;
    class: string;
    config: MangolConfig;
    mapService: MangolMapService;
    mapCreated: EventEmitter<MangolMap>;
    sidebarToggled: EventEmitter<{}>;
    loadingTiles$: Observable<string[]>;
    map: MangolMap;
    view: ol.View;
    renderer: string;
    zoomDuration: number;
    sidebarOpened: boolean;
    defaultConfig: MangolConfig;
    constructor(dialog: MatDialog);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    zoomIn(): void;
    zoomOut(): void;
    fullScreen(): void;
    toggleSidebar(): void;
}
