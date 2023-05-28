import * as dotenv from "dotenv";
import { getEventByPath } from "./controller/get_event_by_path";
import { container } from "./registry";
import { GetEventByPathPresenter } from "./presenter/get_event_by_path";
const URL_PREFIX = "https://staging.raku.day";

export const handler = async (event: any) => {
  dotenv.config({ override: true });
  const presenter = new GetEventByPathPresenter();
  container.register("GetEventByPathPresenter", {
    useValue: presenter,
  });
  const request = event.Records[0].cf.request;
  await getEventByPath(request);
  const url = `${URL_PREFIX}${request.uri}?${request.querystring}`;
  const imageUrl = `${URL_PREFIX}/img/ogp.jpg`;
  return presenter.getHtml(imageUrl, url) || request;
};
