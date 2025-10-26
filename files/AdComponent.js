import React, { useEffect } from 'react';

const AdComponent = ({ adSlot, isMultiplex = false }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && adSlot) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, [adSlot]);

  if (!adSlot) return null;

  if (isMultiplex) {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-1819982598567420"
        data-ad-slot={adSlot}
      ></ins>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1819982598567420"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdComponent;
