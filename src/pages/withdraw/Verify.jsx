import React, { useEffect } from 'react';
import { Veriff } from '@veriff/js-sdk';

const Verify = () => {
  const apiKey = '6a3aac70-7bd4-4fd8-a1d9-3d062cdc1936';

  return (
    <div>
      <h1>KYC Verification with Veriff</h1>
      <VeriffKYCComponent apiKey={apiKey} />
    </div>
  );
};




const VeriffKYCComponent = ({ apiKey }) => {
  useEffect(() => {
    const veriff = Veriff({
      apiKey: apiKey,
      parentId: 'veriff-root',
      onSession: function(err, response) {
        // received the response, verification can be started now
        console.log(response);
      }
    });

    veriff.mount();

    return () => {
      // Clean up if necessary
    };
  }, [apiKey]);

  return <div id="veriff-root" />;
};
export default Verify;


