import { Item } from "@/components/items/interfaces/item.interface";
import { getItemsQueryKey } from "@/components/items/query/query-keys";
import { httpGet } from "@/lib/http/http-get";
import { useQuery } from "@tanstack/react-query";

const getItems = async (url:string) => {
	return httpGet<Item[]>(url);
}

export const useGetItems = () => {

	return useQuery<Item[]>({
		queryKey: getItemsQueryKey(),
		queryFn: async (
		) => {
			return  await getItems("http://localhost:5000/items/");
		},
	});
};