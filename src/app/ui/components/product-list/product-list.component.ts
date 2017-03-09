import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProductSearchService } from '../../../data/product-search.service';
import { ProductLoaderService } from '../../../data/product-loader.service';

@Component({
    selector: 'y-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges {

    model;
    
    @ViewChild('sidenav') sidenav: MdSidenav;

    @Input() useGrid;
    @Input() query;
    @Input() categoryCode;
    @Input() brandCode;

    subject;
    config;
    
    constructor(
        protected productLoader: ProductLoaderService,
        protected searchService: ProductSearchService
    ) {
        this.config = this.searchService.createConfig();
        this.subject = new BehaviorSubject<any>({});
        this.subject.subscribe((result) => {
            this.model = result;
        });
    }
    

    ngOnChanges() {
        
        if (this.categoryCode) {
            this.query = ':relevance:category:' + this.categoryCode;
            // this.productLoader.categorySearch(this.categoryCode, this.brandCode).subscribe((result) => {
            //     // console.log(result);
            //     this.model = result;
            // });
        }

        if (this.query) {
            this.search(this.query);
        }

        // this.cd.markForCheck();
    }

    toggleSidenav() {
        this.sidenav.toggle();
    }
    
    onFilter(query: string) {
        this.search(query);
        // this.productLoader.query(query).subscribe((result) => {
        //     console.log(result);
        //     this.model = result;
        // });
    }

    protected search(query) {
        this.searchService.searchProducts(query, this.config, this.subject);
    }
}