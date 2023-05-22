import { useEffect, RefObject } from 'react';

export const useScript = (
  url: string,
  attributes: Map<string, string>,
  ref: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;

    for (let [key, value] of attributes) {
      script.setAttribute(key, value);
    }

    script.async = true;

    const element = ref.current;

    if (element) {
      element.appendChild(script);
    }

    return () => {
      element?.removeChild(script);
    };
  }, [url, attributes, ref]);
};
