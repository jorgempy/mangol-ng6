import { MangolConfig } from './../../interfaces/config.interface';
import { AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class MangolDialogComponent implements AfterViewInit {
    dialogRef: MatDialogRef<MangolDialogComponent>;
    data: any;
    class: string;
    config: MangolConfig;
    constructor(dialogRef: MatDialogRef<MangolDialogComponent>, data: any);
    ngAfterViewInit(): void;
}
