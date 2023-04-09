export const makeLookup = <T extends Record<string, any>, K extends keyof T>(
	list: T[],
	key: K,
	pluckKey?: keyof T
) => list.reduce((acc, cur) => ({ ...acc, [cur[key]]: pluckKey ? cur[pluckKey] : cur }), {});

export const properCase = (str: string) =>
	str.replace(/-/g, ' ').replace(/\b\S/g, (match: string) => match.charAt(0).toUpperCase());

export const wrapData = (data: any) => ({ data });
