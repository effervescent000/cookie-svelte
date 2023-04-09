import { expect, test } from '@playwright/test';

import { LocalStoragePage } from '../test-utils/local-storage-page';

test.describe('tests re: managing teams', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/team');
	});

	test('can add a pokemon to the bench via click', async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.createLocalStorage('two-empty-profiles');
		await page.getByTestId('mini-card-abra').locator('i').click();
		await expect(page.getByTestId('poke-card-abra')).toBeVisible();
	});
});
