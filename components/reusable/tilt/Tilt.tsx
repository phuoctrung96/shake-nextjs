import React, { useEffect, useRef, ReactNode } from 'react';
import VanillaTilt, { HTMLVanillaTiltElement, TiltOptions } from 'vanilla-tilt';

interface RefObject extends HTMLDivElement {
  vanillaTilt: HTMLVanillaTiltElement['vanillaTilt'];
}

type TiltProps = {
  options: TiltOptions;
  children: ReactNode;
};

const Tilt = ({ options, children, ...rest }: TiltProps) => {
  const tiltRef = useRef<RefObject>(null);

  useEffect(() => {
    const element = tiltRef.current;

    if (element) {
      VanillaTilt.init(element, options);
    }

    () => {
      if (element) {
        element.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} {...rest}>
      {children}
    </div>
  );
};

export default Tilt;
