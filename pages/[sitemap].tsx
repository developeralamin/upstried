import SitemapAPI from '../api/sitemap/request';
import { SITE_URL } from '../config/endpoints';
import ServerAuthorsAPI from '../api/authors/request';
import { getAuthorUrl, getTipsDetailsLink } from '../services/util';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const Sitemap = () => {};

const findPageNumber = (url: string) =>
  url.replace('/', '').replace('.xml', '').split('-')[2] || '1';

const sanitizeUrl = (url: string) => url.replace('&', '&amp;');

const generateTipsPageDetailsSitemap = async (pageNumber: number) => {
  const tipsResponse = await SitemapAPI.getTips({
    page: pageNumber,
  });
  const tipsData = (tipsResponse.data || [])
    .map((tips: any) => {
      return `
      <url>
        <loc>${getTipsDetailsLink(tips.slug, tips.id)}</loc>
        <lastmod>${tips.updated_at}</lastmod>
        <image:image>
          <image:loc>${tips.thumbnail}</image:loc>
          <image:caption><![CDATA[${tips.title}]]></image:caption>
        </image:image>
      </url>
    `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${tipsData}
    </urlset>
  `;
};

const generateTipsPagesSitemap = async () => {
  const tipsResponse = await SitemapAPI.getTips({});
  if (tipsResponse.status === 200) {
    const totalPages = Math.ceil(tipsResponse.total / tipsResponse.per_page);
    let content = '';

    for (let i = 1; i <= totalPages; i++) {
      content += `<sitemap>
        <loc>${SITE_URL + '/sitemap-tips-' + i}.xml</loc>
      </sitemap>`;
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${content}
      </sitemapindex>
    `;

    return sitemap;
  }
};

const generateAuthorPageDetailsSitemap = async (pageNumber: number) => {
  const authorsResponse = await SitemapAPI.getAuthors({
    page: pageNumber,
  });
  const authorData = (authorsResponse?.data || [])
    .map((author: any) => {
      return `
        <url>
          <loc>${getAuthorUrl(author.username)}</loc>
          <lastmod>${author.updated_at}</lastmod>
          <image:image>
            <image:loc>${author.avatar || ''}</image:loc>
            <image:caption><![CDATA[${author.name}]]></image:caption>
          </image:image>
        </url>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${authorData}
    </urlset>
  `;
};

const generateAuthorPagesSitemap = async () => {
  const authorsResponse: any = await SitemapAPI.getAuthors({});

  const totalPages = Math.ceil(
    authorsResponse.total / authorsResponse.per_page
  );
  let content = '';
  for (let i = 1; i <= totalPages; i++) {
    content += `<sitemap>
      <loc>${SITE_URL + '/sitemap-authors-' + i}.xml</loc>
    </sitemap>`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${content}
  </sitemapindex>
  `;
  return sitemap;
};

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
            <loc>${SITE_URL}/sitemap-tips.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${SITE_URL}/sitemap-authors.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
    </sitemapindex>
`;
  return sitemap;
};

export const getServerSideProps = async ({ res, req }: any) => {
  const { url } = req;
  let sitemap: any = '';
  const link = url;
  if (url.startsWith('/sitemap-tips-')) {
    const pageNumber = parseInt(findPageNumber(url));
    sitemap = await generateTipsPageDetailsSitemap(pageNumber);
  } else if (url.startsWith('/sitemap-authors-')) {
    const pageNumber = parseInt(findPageNumber(url));
    sitemap = await generateAuthorPageDetailsSitemap(pageNumber);
  } else {
    switch (link) {
      case '/sitemap.xml':
        sitemap = generateSitemap();
        break;
      case '/sitemap-authors.xml':
        sitemap = await generateAuthorPagesSitemap();
        break;
      case '/sitemap-tips.xml':
        sitemap = await generateTipsPagesSitemap();
        break;

      default:
        break;
    }
  }
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
