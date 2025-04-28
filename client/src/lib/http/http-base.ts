import axios, { AxiosRequestConfig } from "axios";

export async function httpBase<TResult>(
	url: string,
	requestInit: AxiosRequestConfig,
	bearer?: string,
): Promise<TResult> {
	requestInit.headers = {
		...requestInit.headers,
		"Content-Type": "application/json",
		Authorization: `Bearer ${bearer}`,
	};
	const response = await axios<TResult>(url, requestInit);
	return response.data;
}
