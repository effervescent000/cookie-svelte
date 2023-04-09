import { expect, test } from '@playwright/test';

import { LocalStoragePage } from '../test-utils/local-storage-page.js';

const SELECTED_CLASS = /border-dark-blue/;
const UNSELECTED_CLASS = /border-white/;

test.describe('tests re: profile functionality', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});
	test.afterEach(async ({ page }) => {
		const ls = new LocalStoragePage(page);
		await ls.clearStorage();
	});

	test('can add a new profile', async ({ page }) => {
		await page.getByTestId('new-profile-btn').click();
		await expect(page.getByTestId('profile-0')).toBeVisible();
	});

	test('persists a profile through page loads', async ({ page }) => {
		await page.getByTestId('new-profile-btn').click();
		await page.reload();
		await expect(page.getByTestId('profile-0')).toBeVisible();
	});

	test('can change active profile', async ({ page }) => {
		// const ls = new LocalStoragePage(page);
		// await ls.createLocalStorage('two-empty-profiles');
		await page.getByTestId('new-profile-btn').click();
		await page.waitForTimeout(50);
		await page.getByTestId('new-profile-btn').click();
		await page.waitForTimeout(50);
		const profileOne = page.getByTestId('profile-1');
		await expect(profileOne).toHaveClass(SELECTED_CLASS);
		await expect(page.getByTestId('profile-0')).toHaveClass(UNSELECTED_CLASS);
	});

	test('persists active profile selection', async ({ page }) => {
		await page.getByTestId('new-profile-btn').click();
		await page.waitForTimeout(50);
		await page.getByTestId('new-profile-btn').click();
		await page.waitForTimeout(50);
		await page.reload();

		const profileOne = page.getByTestId('profile-1');
		await expect(profileOne).toHaveClass(SELECTED_CLASS);
		await expect(page.getByTestId('profile-0')).toHaveClass(UNSELECTED_CLASS);
	});

	test('persists version data', async ({ page }) => {
		await page.getByTestId('new-profile-btn').click();
		await page.getByRole('button', { name: 'VI', exact: true }).click();
		await page.getByRole('button', { name: 'X/Y' }).click();
		await page.reload();
		await expect(page.getByRole('button', { name: 'X/Y' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'X/Y' })).toHaveClass(/underline/);
	});
});
