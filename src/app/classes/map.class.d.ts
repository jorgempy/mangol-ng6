import * as ol from 'openlayers';
import { MangolConfigLayertree } from '../interfaces/config-layers.inteface';
import { MangolMapService } from '../services/map.service';
import { MangolLayer } from './layer.class';
import { MangolLayergroup } from './layergroup.class';
export declare class MangolMap extends ol.Map {
    private mapService;
    private _layers;
    private _layerGroups;
    private _allLayers;
    constructor(options: any, mapService: MangolMapService);
    addLayersAndLayerGroups(layertree: MangolConfigLayertree, parent: MangolLayergroup): void;
    private _handleLayer(layer, parent);
    private _handleLayerGroup(group, parent);
    getMangolLayers(): MangolLayer[];
    getMangolLayerGroups(): MangolLayergroup[];
    getMangolAllLayers(): MangolLayer[];
}
