import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Page = ({ title, children }) => {
  // Update document title on component mount and whenever `title` changes
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <Helmet>
        {/* <title>{title}</title> */}
        <title>Expo</title>

      </Helmet>
      {children}
    </div>
  );
};

export default Page;
