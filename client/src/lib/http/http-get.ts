import { httpBase } from "./http-base";

export async function httpGet<TResult>(
	url: string,
	bearer?: string,
	params?: Record<string, string | null>,
	headers?: Record<string, string | null>,
): Promise<TResult> {
	return await httpBase<TResult>(url, {
		method: "get",
		params: params,
		headers: {
			...headers,
		},
	},bearer);
}
