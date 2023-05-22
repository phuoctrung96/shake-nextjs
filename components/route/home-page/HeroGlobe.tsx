import React, { useRef, forwardRef } from 'react';
import styles from './heroGlobe.module.scss';
import dynamic from 'next/dynamic';
import { locationsData } from './arcsData';

const GlobeTmpl = dynamic(() => import('../../reusable/globe/Globe'), {
  ssr: false,
});

const Globe = forwardRef(function globeFn(props: any, ref) {
  return <GlobeTmpl {...props} forwardRef={ref} />;
});

const getEndLocation = (startLocation: any): any => {
  const endLocation = locationsData[Math.floor(Math.random() * locationsData.length)];
  if (endLocation === startLocation) {
    return getEndLocation(startLocation);
  }

  return endLocation;
};

const totalArcs = 20;

const getArcsData = () => {
  const arcsData = [];

  for (let i = 0; i < totalArcs; i++) {
    const startLocation = locationsData[Math.floor(Math.random() * locationsData.length)];
    const endLocation = getEndLocation(startLocation);

    arcsData.push({
      startLat: startLocation.lat,
      startLng: startLocation.lng,
      endLat: endLocation.lat,
      endLng: endLocation.lng,
    });
  }

  return arcsData;
};

type HeroGlobeType = {
  className?: string;
};

const getAltitude = (): number | void => {
  if (typeof window === 'undefined') return;

  const windowWidth = window.innerWidth;
  let altitude = 3.5;

  if (windowWidth >= 768 && windowWidth < 992) {
    altitude = 2.5;
  } else if (windowWidth >= 992 && windowWidth < 1200) {
    altitude = 1.8;
  } else if (windowWidth >= 1200) {
    altitude = 2;
  }

  return altitude;
};

const HeroGlobe = ({ className = '' }: HeroGlobeType) => {
  const globeEl = useRef<any>();

  const initGlobe = () => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.2;
      globeEl.current.pointOfView({ lat: 20.6, lng: -75.5, altitude: getAltitude() });
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().enableRotate = true;
    }
  };

  return typeof window === 'undefined' ? null : (
    <div className={`${styles.globeWrapper} ${className}`}>
      <Globe
        className={styles.globe}
        ref={globeEl}
        onGlobeReady={() => initGlobe()}
        globeImageUrl="/images/world-map-3.png"
        arcsData={getArcsData()}
        arcColor={() => '#fff'}
        arcStroke={0.3}
        arcAltitude={0.25}
        arcAltitudeAutoScale={0.5}
        arcDashLength={() => Math.random() + 0.5}
        arcDashGap={() => Math.random() + 1}
        arcDashAnimateTime={() => Math.random() * 5000 + 1500}
        animateIn={false}
        backgroundColor="rgba(0, 0, 0, 0)"
        showAtmosphere={false}
        enablePointerInteraction={false}
        width={1000}
      />
    </div>
  );
};

export default HeroGlobe;
