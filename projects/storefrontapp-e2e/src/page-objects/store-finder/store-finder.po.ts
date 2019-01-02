import {
  browser,
  ElementFinder,
  ElementArrayFinder,
  by,
  element
} from 'protractor';
import { AppPage } from '../app.po';
import { E2EUtil } from '../../e2e-util';

export class StoreFinderPage extends AppPage {
  readonly YPAGE = 'cx-store-finder-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly storeDetails: ElementFinder = this.page.element(
    by.css('.storeInfo')
  );
  readonly storeDetailsTitle: ElementFinder = this.storeDetails.element(
    by.css('h2')
  );
  readonly searchInput: ElementFinder = this.page.element(
    by.css('.cx-store-finder-search input[type="text"]')
  );
  readonly searchBtn: ElementFinder = this.page.element(
    by.css('.cx-store-finder-search .cx-store-finder-search__button')
  );
  readonly viewAllStoresBtn: ElementFinder = this.page.element(
    by.css('.cx-store-finder-search a.cx-store-finder-search__links.btn-link')
  );
  readonly countryList: ElementFinder = this.page.element(
    by.css('.cx-store-finder-search .cx-store-finder-list-count')
  );
  readonly storeList: ElementFinder = this.page.element(
    by.css('ul.stores-grid')
  );
  readonly countryListRow: ElementArrayFinder = this.page.all(
    by.css('.cx-store-finder-list-count__country-set')
  );

  async waitForCountryRow() {
    await E2EUtil.wait4VisibleElement(
      this.page.element(by.css('.cx-store-finder-list-count__country-set'))
    );
  }

  async navigateTo() {
    await browser.get('/store-finder');
    await this.waitForReady();
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.page);
  }
}
