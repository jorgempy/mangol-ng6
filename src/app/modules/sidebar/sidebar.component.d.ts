import { MangolMeasureService } from './../measure/measure.service';
import { MangolFeatureIntoService } from './../featureinfo/feature-info.service';
import { ChangeDetectorRef, DoCheck, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { MangolMap } from '../../classes/map.class';
import { MangolConfigSidebar } from '../../interfaces/config-sidebar.interface';
import { MangolConfigToolbarItem } from '../../interfaces/config-toolbar.interface';
export declare class MangolSidebarComponent implements OnInit, DoCheck {
    private cdr;
    private featureInfoService;
    private measureService;
    class: string;
    options: MangolConfigSidebar;
    map: MangolMap;
    sidebarClosed: boolean;
    selectedIndex: number;
    items: MangolConfigToolbarItem[];
    constructor(cdr: ChangeDetectorRef, featureInfoService: MangolFeatureIntoService, measureService: MangolMeasureService);
    ngOnInit(): void;
    ngDoCheck(): void;
    getTitle(item: MangolConfigToolbarItem): string;
    getFontSet(item: MangolConfigToolbarItem): string;
    getFontIcon(item: MangolConfigToolbarItem): string;
    toggleSidebar(): any;
    onSelectedTabChange(evt: MatTabChangeEvent): void;
}
