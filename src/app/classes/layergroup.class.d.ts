import { MangolLayer } from './layer.class';
import { MangolConfigLayerGroup } from '../interfaces/config-layers.inteface';
export declare class MangolLayergroup {
    options: MangolConfigLayerGroup;
    name: string;
    details: string;
    nestedLayers: MangolLayer[];
    nestedLayerGroups: MangolLayergroup[];
    constructor(options: MangolConfigLayerGroup);
    getDetails(): void;
    getName(): string;
}
