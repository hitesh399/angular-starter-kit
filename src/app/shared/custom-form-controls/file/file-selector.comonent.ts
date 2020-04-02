import { Component, Input } from "@angular/core";
import { ImageSelectorComponent } from '../image/image-selector.component';

@Component({
    template: `<div class="custom-file-selector">
    <input multiple type="file" [accept]="accept" style="display:none" [id]="ID" (change)="onFileChange($event)" />
    <ng-template #defaultTpl>
    <span  (click)="openBrowser($event)">
        Choose
    </span>
    </ng-template>
    <ng-container *ngTemplateOutlet="template ? template: defaultTpl; context: {$implicit: openBrowser}"></ng-container>
    </div>`,
    selector: 'file-selector'
})
export class FileSelectorComponent extends ImageSelectorComponent {
    @Input() accept: string = ''
}