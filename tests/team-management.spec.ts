import { expect, test } from '@playwright/test';

import { LocalStoragePage } from '../test-utils/local-storage-page.js';

test.describe('tests re: managing teams', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/team');
	});

	test('can add a pokemon to the bench via click', async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.createLocalStorage('two-empty-profiles');

		await page.getByTestId('mini-card-abra').getByTestId('add-pokemon').click();
		await expect(page.getByTestId('poke-card-abra')).toBeVisible();
	});

	test('can delete a pokemon from the bench', async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.createLocalStorage('single-pokemon-in-bench');

		await page.getByTestId('mini-card-abra').getByTestId('add-pokemon').click();
		await page.getByTestId('poke-card-abra').getByTestId('delete').click();
		await expect(page.getByTestId('poke-card-abra')).not.toBeVisible();
	});

	test('can move a pokemon into team via click', async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.createLocalStorage('single-pokemon-in-bench');

		await page.getByTestId('mini-card-abra').getByTestId('add-pokemon').click();
		await page
			.getByTestId('frame-bench')
			.getByTestId('poke-card-abra')
			.getByTestId('bench-to-team')
			.click();
		await expect(page.getByTestId('frame-team').getByTestId('poke-card-abra')).toBeVisible();
	});
});
