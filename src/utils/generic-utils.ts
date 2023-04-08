export const makeLookup = <T extends Record<string, any>, K extends keyof T>(
	list: T[],
	key: K,
	pluckKey?: keyof T
) => list.reduce((acc, cur) => ({ ...acc, [cur[key]]: pluckKey ? cur[pluckKey] : cur }), {});
