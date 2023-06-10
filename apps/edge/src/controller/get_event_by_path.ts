import { container } from "../registry";
import { GetEventByPathPresenter } from "../presenter/get_event_by_path";
import { Site } from "infra/src/web/site";
import { GetEventByPathInteractor } from "usecase/src/get_event_by_path";

export const getEventByPath = async (event: any) => {
  const request = event.Records[0].cf.request;
  // parse event
  const path = request.uri;
  let eventPath: string | null = null;
  const p = Site.parseEventPathByPath(path);
  if (p) {
    request.uri = Site.eventPagePath();
    request.querystring = Site.addEventPathQuery(request.querystring, p);
    // ↑このquerystringはcloudfrontでは意図したように動かなかった（恐らくオリジンにクエリが渡されていない）
    // web useEvent.ts内のparseEventPathByPathで対処した。
    eventPath = p;
  } else {
    if (Site.isEventPagePath(path)) {
      eventPath = Site.parseEventPathByQuery(request.querystring);
    }
  }
  if (!eventPath) {
    return request;
  }
  // bot
  const userAgent = request.headers["user-agent"][0].value;
  if (!Site.isBot(userAgent)) {
    console.log("not bot:" + userAgent);
    return request;
  }
  // get event
  const presenter = new GetEventByPathPresenter();
  container.register("GetEventByPathPresenter", {
    useValue: presenter,
  });
  const GetEventByPath = container.resolve(GetEventByPathInteractor);
  await GetEventByPath.handle({ path: eventPath });

  const url = Site.getEventPageUri(eventPath);
  const imageUrl = Site.getPageUri("img/ogp.jpg");
  return presenter.getHtml(imageUrl, url) || request;
};
