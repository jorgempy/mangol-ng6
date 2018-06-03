import { OnInit } from '@angular/core';
import { MangolLayergroup } from '../../classes/layergroup.class';
import { MangolMap } from '../../classes/map.class';
import { MangolLayer } from './../../classes/layer.class';
import { MangolConfigLayertreeItem } from './../../interfaces/config-toolbar.interface';
export declare class MangolLayertreeComponent implements OnInit {
    class: string;
    opts: MangolConfigLayertreeItem;
    map: MangolMap;
    isAccordionMulti: boolean;
    layerGroups: MangolLayergroup[];
    layers: MangolLayer[];
    ngOnInit(): void;
    setMenuActive(type: string, layer: MangolLayer): void;
    hideDetails(layer: MangolLayer): void;
}
