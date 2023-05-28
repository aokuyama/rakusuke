import * as dotenv from "dotenv";
import { getEventByPath } from "./controller/get_event_by_path";
import { container } from "./registry";
import { GetEventByPathPresenter } from "./presenter/get_event_by_path";

export const handler = async (event: any) => {
  dotenv.config({ override: true });
  const urlPrefix = process.env.SITE_DOMAIN
    ? "https://" + process.env.SITE_DOMAIN
    : null;
  const presenter = new GetEventByPathPresenter();
  container.register("GetEventByPathPresenter", {
    useValue: presenter,
  });
  const request = event.Records[0].cf.request;
  await getEventByPath(request);
  const url = urlPrefix
    ? `${urlPrefix}${request.uri}?${request.querystring}`
    : "";
  const imageUrl = urlPrefix ? `${urlPrefix}/img/ogp.jpg` : "";
  return presenter.getHtml(imageUrl, url) || request;
};
