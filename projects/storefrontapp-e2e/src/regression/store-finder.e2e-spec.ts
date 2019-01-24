import { StoreFinderPage } from '../page-objects/store-finder/store-finder.po';
import { HomePage } from '../page-objects/home.po';
import { by, browser } from 'protractor';

import { E2EUtil } from '../e2e-util';

describe('Store Finder interactions', () => {
  let home: HomePage;
  let storeFinderPage: StoreFinderPage;

  beforeEach(async () => {
    home = new HomePage();
    storeFinderPage = new StoreFinderPage();
  });

  /**
   * Check if header correctly redirects to store finder
   */
  it('should go to storefinder via header', async () => {
    await home.navigateTo();
    await home.header.goToStoreFinder();
    await storeFinderPage.waitForReady();
  });

  /**
   * Should search store finder with string
   */
  // TODO: Wait for #751
  xit('should go to storefinder and search for Tokyo', async () => {
    await home.navigateTo();
    await storeFinderPage.navigateTo();
    await E2EUtil.fillInput(storeFinderPage.searchInput, 'Tokyo');
    await storeFinderPage.searchBtn.click();
  });

  xit('should go to storefinder and show search results', async () => {
    await home.navigateTo();
    await storeFinderPage.navigateTo();
    await E2EUtil.fillInput(storeFinderPage.searchInput, 'Tokyo');
    await storeFinderPage.searchBtn.click();
    const results = await storeFinderPage.countryListRow;

    expect(results.length).toBeGreaterThan(0);
  });

  xit('should go to storefinder and search for Tokyo', async () => {
    await home.navigateTo();
    await storeFinderPage.navigateTo();
    await E2EUtil.fillInput(storeFinderPage.searchInput, 'Tokyo');
    await storeFinderPage.searchBtn.click();
    await storeFinderPage.waitForCountryRow();
    const results = await storeFinderPage.countryListRow;

    expect(results.length).toBe(10);
  });

  /**
   * Should show all stores
   */
  it('should go to storefinder and show list of results', async () => {
    await home.navigateTo();
    await storeFinderPage.navigateTo();
    await storeFinderPage.viewAllStoresBtn.click();
    await storeFinderPage.waitForCountryRow();
    const rows = await storeFinderPage.countryListRow;
    expect(rows.length).toBe(3);
  });

  /**
   * Should list Canada stores via 'view all stores' btn
   */
  it('should go to storefinder and navigate to the details', async () => {
    await home.navigateTo();
    await storeFinderPage.navigateTo();
    await storeFinderPage.viewAllStoresBtn.click();
    await storeFinderPage.waitForCountryRow();
    const UsaRow = await storeFinderPage.countryListRow.get(1);
    await UsaRow.all(by.css('.btn-link.cx-store-finder-list-count__item-link'))
      .get(1)
      .click();

    const storeList = await storeFinderPage.storeList;
    await E2EUtil.wait4VisibleElement(storeList);
    const oneStore = await storeList.all(by.css('li')).first();
    const newYorkStoreBtn = oneStore.element(
      by.css('.cx-store-finder-list-item__display-name')
    );
    expect(await newYorkStoreBtn.getText()).toBe('New York Store');
    newYorkStoreBtn.click();

    await storeFinderPage.waitForStoreDetails();
    expect(await browser.getCurrentUrl()).toBe(
      'http://localhost:4200/store-finder/country/US/region/US-NY/shop_new_york_1'
    );
    expect(await storeFinderPage.storeDetailsTitle.getText()).toBe(
      'New York Store'
    );
    expect(await storeFinderPage.storeDetailsAddress.getText()).toContain(
      'New York, New York, 10002'
    );
    expect(await storeFinderPage.storeDetailsSchedule.getText()).toContain(
      'Store hours'
    );
    expect(await storeFinderPage.storeDetailsMap.isPresent()).toBeTruthy();
  });
});
