import { DataSource } from '@angular/cdk/collections';
import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { MangolLayer } from './../../classes/layer.class';
import { MangolFeatureInfoTableElement } from './feature-info-table-element.interface';
import 'rxjs/add/observable/of';
export declare class MangolFeatureInfoTableDialogComponent implements OnInit {
    dialogRef: MatDialogRef<MangolFeatureInfoTableDialogComponent>;
    myData: any;
    dataSource: MangolFeatureInfoTableDialogDataSource;
    columns: any[];
    layer: MangolLayer;
    constructor(dialogRef: MatDialogRef<MangolFeatureInfoTableDialogComponent>, myData: any);
    ngOnInit(): void;
    getColumnLabel(column: string): string;
}
export declare class MangolFeatureInfoTableDialogDataSource extends DataSource<any> {
    connect(): Observable<MangolFeatureInfoTableElement[]>;
    disconnect(): void;
}
