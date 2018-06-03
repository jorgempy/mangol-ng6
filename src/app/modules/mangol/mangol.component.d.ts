import { EventEmitter, OnInit } from '@angular/core';
import { MangolMap } from '../../classes/map.class';
import { MangolConfigMap } from '../../interfaces/config-map.interface';
import { MangolConfig } from '../../interfaces/config.interface';
import { MangolReady } from '../../interfaces/ready.interface';
import { MangolMapService } from './../../services/map.service';
export declare class MangolComponent implements OnInit {
    private mapService;
    class: string;
    config: MangolConfig;
    mapReady: EventEmitter<MangolReady>;
    containerReady: boolean;
    map: MangolMap;
    isOpened: boolean;
    service: MangolMapService;
    sidebarMode: string;
    defaultMap: MangolConfigMap;
    constructor(mapService: MangolMapService);
    ngOnInit(): void;
    mapCreated(map: MangolMap): void;
    sidebarToggled(): void;
    updateMap(): void;
}
