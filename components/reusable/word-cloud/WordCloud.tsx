import React, { useEffect, useRef } from 'react';
import styles from './wordCloud.module.scss';
import dynamic from 'next/dynamic';
import { BorderColor } from '../card/Card';
import { WordCloudResType } from '../../../types/companies';
const ReactWordCloud = dynamic(() => import('react-d3-cloud'), {
  ssr: false,
});
import debounce from 'lodash/debounce';
import useCompanies from '../../../providers/CompaniesProvider';

type WordCloudType = {
  title?: string;
  titleColor: BorderColor;
  words: WordCloudResType;
};

const colorHexValues = [
  '#25e85f',
  '#3772ff',
  '#e71d36',
  '#ffa630',
  '#7b4173',
  '#de9ed6',
  '#843c39',
  '#9c9ede',
  '#6b6ecf',
  '#f46036',
];

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDefaultWidth = (displayedCompanies: number) => {
  if (typeof window === 'undefined') return 375;

  return window.innerWidth > 1090
    ? 1090 / displayedCompanies - 23 // should be 528
    : window.innerWidth / displayedCompanies - 40;
};

const WordCloud = ({ words }: WordCloudType) => {
  const { displayedCompanies } = useCompanies();

  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(getDefaultWidth(displayedCompanies));

  const formattedWords: { text: string; value: number }[] =
    words && typeof words.results !== 'undefined'
      ? words.results.slice(0, 150).map((word) => {
          return { text: word.word, value: word.score };
        })
      : [];

  const maxWordValue = formattedWords.reduce(
    (max, word) => (word.value > max ? word.value : max),
    0
  );

  const normalizedWordValue = formattedWords.map((word) => {
    return { ...word, value: word.value * (600 / maxWordValue) };
  });

  const handleWidthChange = () => {
    const newWidth = ref.current?.offsetWidth || 0;
    if (newWidth !== width) {
      setWidth(newWidth);
    }
  };

  const debouncedHandleResize = debounce(() => handleWidthChange(), 100);

  useEffect(() => {
    handleWidthChange();
  }, [displayedCompanies]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', debouncedHandleResize);
    }
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <div className={styles.wordCloudWrapper} ref={ref}>
      <ReactWordCloud
        data={normalizedWordValue}
        width={width / 2}
        height={150}
        font="GalanoGrotesque"
        fontWeight={600}
        fill={() => colorHexValues[getRandomNumber(0, colorHexValues.length - 1)]}
        padding={2}
      />
    </div>
  );
};

export default WordCloud;
