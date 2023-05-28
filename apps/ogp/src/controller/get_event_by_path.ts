import { container } from "../registry";
import { GetEventByPathInteractor } from "usecase/src/get_event_by_path";
import { Site } from "infra/src/web/site";

export const getEventByPath = async (request: any) => {
  const uri = request.uri;
  const userAgent = request.headers["user-agent"][0].value;

  if (!Site.isBot(userAgent)) {
    console.log("not bot:" + userAgent);
    return null;
  }
  if (!Site.isEventPagePath(uri)) {
    console.log("not ogp:" + uri);
    return null;
  }

  const path = Site.parseEventPathQuery(request.querystring);
  if (!path) {
    return null;
  }

  const GetEventByPath = container.resolve(GetEventByPathInteractor);
  await GetEventByPath.handle({ path: path });
};
