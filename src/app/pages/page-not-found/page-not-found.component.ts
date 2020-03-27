import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'not-found-cmp',
    templateUrl: './page-not-found.html'
})
export class PageNotFoundComponent implements OnInit {

    ngOnInit() {
        console.log('ngOnInIt Page Not Found Component')
    }

}