import { MangolConfigLayer, MangolConfigLayerColumn } from '../interfaces/config-layers.inteface';
import { MangolMapService } from '../services/map.service';
export declare class MangolLayer {
    private mapService;
    name: string;
    layer: any;
    opacity: number;
    visible: boolean;
    description: string;
    showDetails: boolean;
    detailType: string;
    queryable: boolean;
    attrColumns: MangolConfigLayerColumn[];
    constructor(options: MangolConfigLayer, mapService: MangolMapService);
    private _configureTileLoad();
    getLayerVisibilityIcon(): "visibility" | "visibility_off";
    toggleLayerVisibility(): void;
    getName(): string;
    getLayer(): any;
    getOpacity(): number;
    setOpacity(value: number): void;
    getVisible(): boolean;
    setVisible(value: boolean): void;
    getDescription(): string;
    setDescription(description: string): void;
    isQueryable(): boolean;
    setQueryable(queryable: boolean): void;
    getAttrColumns(): MangolConfigLayerColumn[];
    setAttrColumns(cols: MangolConfigLayerColumn[]): void;
}