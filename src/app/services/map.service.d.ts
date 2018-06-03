import { BehaviorSubject } from 'rxjs';
import { MangolMap } from '../classes/map.class';
export declare class MangolMapService {
    maps: MangolMap[];
    loadingTiles$: BehaviorSubject<string[]>;
    constructor();
    /**
     * Retrieves all the maps
     */
    getMaps(): MangolMap[];
    /**
     * Returns a map object from the maps array
     */
    getMapById(id: string): MangolMap;
    /**
     * Adds a new map to the maps array
     */
    addMap(map: MangolMap): void;
    /**
     * When a tile/image starts loading, add the meta information to the loadingTiles BehaviorSubject
     * @param tile
     */
    addTile(tile: string): void;
    /**
     * After a tile/image load end, the meta information of it should be deleted from the loadingTiles BehaviorSubject
     * @param tile
     */
    removeTile(tile: string): void;
}
