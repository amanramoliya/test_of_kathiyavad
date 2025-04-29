import { httpBase } from "./http-base";

export async function httpPost<TBody, TResult>(
  url: string,
  body: TBody,
  bearer?: string
): Promise<TResult> {
  return httpBase<TResult>(
    url,
    {
      method: "post",
      data: body,
    },
    bearer
  );
}
