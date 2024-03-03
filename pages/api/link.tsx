import axios from 'axios';
import attachmentHandler from '../../services/attachmentHandler';

interface resultInterface {
  url: string | null;
  resourceUrl: string;
  type: string | null;
  vendor: string | undefined;
}

export default async function handler(req: any, res: any) {
  let result: resultInterface = {
    url: '',
    resourceUrl: '',
    type: '',
    vendor: '',
  };
  let status = 200;
  const { url } = req.query;
  try {
    const response: any = await axios.get(req.query.url);
    const keys = JSON.parse(req.query.keys);

    keys.forEach((key: any) => {
      switch (key) {
        case 'og:image':
          result['url'] = response.data.match(
            /<meta property="og:image" content="(.*?)"/
          )[1];
          break;
        default:
          break;
      }
    });
  } catch (error) {
    result['url'] = null;
    status = 404;
  }
  result = {
    ...result,
    resourceUrl: url,
    type: attachmentHandler.getMediaTypeFromLink(url),
    vendor: attachmentHandler.getMediaVendorFromLink(url),
  };
  res.status(status).json({ ...result });
}
