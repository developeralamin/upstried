// import ReactGA from 'react-ga4';

// const eventHandler = (category: string, action: any) => {
//   // ReactGA.event({
//   //   category,
//   //   action,
//   // });

//

const eventHandler = (action: string, parameters: any) => {
  window.gtag('event', action, parameters);
};

export default eventHandler;
