import { Site } from "infra/src/web/site";
import { GetEventByPathOutput } from "usecase/src/get_event_by_path";

export class GetEventByPathPresenter {
  private event: { name: string; description: string } | null | undefined;
  constructor() {
    this.event = undefined;
  }
  render = async (output: GetEventByPathOutput): Promise<void> => {
    this.event = output.event;
  };
  getHtml = (
    imageURL: string,
    url: string
  ): {
    status: string;
    statusDescription: string;
    headers: {
      "content-type": { key: string; value: string }[];
    };
    body: string;
  } | null => {
    if (this.event === undefined) {
      return null;
    }
    const body = generateContent({
      title: Site.getEventPageTitle(this.event),
      description: Site.getEventPageDescription(this.event),
      imageURL: imageURL,
      mimeType: "image/jpg",
      width: 1200,
      height: 630,
      url,
    });
    return {
      status: "200",
      statusDescription: "OK",
      headers: {
        "content-type": [
          {
            key: "Content-Type",
            value: "text/html",
          },
        ],
      },
      body,
    };
  };
}

const generateContent = (args: {
  title: string;
  description: string;
  imageURL: string;
  mimeType: string;
  width: number;
  height: number;
  url: string;
}) => {
  const { title, description, imageURL, mimeType, width, height, url } = args;
  return `
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>${title}</title>
  <meta content="${description}" name="description">
  <meta content="${url}" property="og:url" />
  <meta content="article" property="og:type" />
  <meta content="ja_JP" property="og:locale" />
  <meta content="${title}" property="og:title" />
  <meta content="${description}" property="og:description" />
  <meta content="${width}" property="og:image:width" />
  <meta content="${height}" property="og:image:height" />
  <meta content="${imageURL}" property="og:image" />
  <meta content="${imageURL}" property="og:image:secure_url" />
  <meta content="${mimeType}" property="og:image:type" />
  <meta content="summary_large_image" property="twitter:card" />
  <meta content="${title}" property="twitter:title" />
  <meta content="${description}" property="twitter:description" />
  <meta content="${imageURL}" property="twitter:image" />
</head>
<body>
</body>
</html>
`;
};
