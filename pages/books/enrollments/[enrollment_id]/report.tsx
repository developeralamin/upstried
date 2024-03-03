import React from 'react';

import Layout from '../../../../hoc/layout/Layout';

// import { isAuthorized } from '../../../../services/cookieHandler';
import { isAuthenticated } from '../../../../services/authentication';
import ReportContent from '../../../../components/enrollmentReport/Report';
import { HOME_ROUTE } from '../../../../config/endpoints';

const Report = () => {
  React.useEffect(() => {
    if (!isAuthenticated()) {
      window.localStorage.setItem('redirect_url', document.URL);
      window.location.href = HOME_ROUTE;
    }
  }, []);
  return (
    <Layout>
      <ReportContent />
    </Layout>
  );
};

export default Report;
