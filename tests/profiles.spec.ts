import { expect, test } from '@playwright/test';

test.describe('tests re: profile functionality', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('can add a new profile', async ({ page }) => {
		await page.getByTestId('new-profile-btn').click();
		await expect(page.getByTestId('profile-0')).toBeVisible();
	});
});
