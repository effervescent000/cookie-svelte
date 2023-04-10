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
});
