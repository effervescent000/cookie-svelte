import { readFileSync } from 'fs';

import type { Page } from 'playwright-core';

export class LocalStoragePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async createLocalStorage(file: string) {
		try {
			const fixtureData = JSON.parse(
				readFileSync(`./test-utils/fixtures/${file}.json`, { encoding: 'utf-8' })
			);
			await this.page.evaluate((data) => {
				Object.entries(data).forEach(([key, value]) => {
					localStorage.setItem(key, JSON.stringify(value));
				});
			}, fixtureData);
			await this.page.reload();
		} catch (error) {
			console.log('error setting localStorage', error);
		}
	}

	async clearStorage() {
		await this.page.evaluate(() => localStorage.clear());
	}
}
