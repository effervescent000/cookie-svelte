import { expect, test } from '@playwright/test';

import { LocalStoragePage } from '../test-utils/local-storage-page.js';

test.describe('tests re: filtering and browsing pokemon', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('results initially load', async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.createLocalStorage('two-empty-profiles');

		await page.waitForTimeout(1000);
		await expect(page.getByTestId('mini-card-abra')).toBeVisible();
	});

	test('can filter by name', async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.createLocalStorage('two-empty-profiles');

		await page.getByTestId('name-filter').type('c');
		await expect(page.getByTestId('mini-card-abra')).not.toBeVisible();

		await page.getByTestId('name-filter').press('Backspace');
		await expect(page.getByTestId('mini-card-abra')).toBeVisible();
	});

	test('can filter by type', async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.createLocalStorage('two-empty-profiles');

		await page.getByTestId('type-1-filter').selectOption('ghost');
		await expect(page.getByTestId('mini-card-abra')).not.toBeVisible();
		await page.getByTestId('type-1-filter').selectOption('');
		await expect(page.getByTestId('mini-card-abra')).toBeVisible();

		await page.getByTestId('type-2-filter').selectOption('ghost');
		await expect(page.getByTestId('mini-card-abra')).not.toBeVisible();
	});
});
