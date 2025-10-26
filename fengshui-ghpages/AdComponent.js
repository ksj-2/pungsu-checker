import React, { useEffect, useRef } from 'react';

const AdComponent = ({ adSlot, isMultiplex = false }) => {
    const adRef = useRef(null);
    const hasPushed = useRef(false);

    useEffect(() => {
        const currentAdRef = adRef.current;
        if (!currentAdRef) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the ad slot is visible in the viewport and has a calculated width
                if (entry.isIntersecting && entry.boundingClientRect.width > 0 && !hasPushed.current) {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        hasPushed.current = true; // Mark as pushed to prevent duplicates
                    } catch (e) {
                        console.error(`AdSense push error for slot ${adSlot}:`, e);
                    }
                    // Stop observing once the ad is pushed
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        observer.observe(currentAdRef);

        return () => {
            if (currentAdRef) {
                observer.unobserve(currentAdRef);
            }
        };
    }, [adSlot]);

    return (
        <div ref={adRef} className="w-full my-3 mx-auto text-center overflow-hidden min-h-[50px]">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-1819982598567420"
                data-ad-slot={adSlot}
                data-ad-format={isMultiplex ? 'autorelaxed' : 'auto'}
                data-full-width-responsive="true"
                key={adSlot} 
            ></ins>
        </div>
    );
};

export default AdComponent;