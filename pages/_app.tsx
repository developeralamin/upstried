import 'antd/dist/antd.css';
import { AppProps } from 'next/app';
import Error from 'next/error';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { CookiesProvider } from 'react-cookie';
import './../styles/react-sortable-tree.scss';
import './../styles/icons/style.css';
import './style.scss';
import 'draft-js/dist/Draft.css';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID as string);
  }, []);

  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
};

export default MyApp;
