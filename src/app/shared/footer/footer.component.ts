import { Component } from "@angular/core"

@Component({
    templateUrl: './footer.html',
    selector: 'footer-cmp'
})

export class FooterComponent  {
    now : Date = new Date();
}