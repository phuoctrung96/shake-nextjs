import { FC, SVGAttributes, HTMLAttributes, CSSProperties } from 'react';
import * as Icons from './iconsList';
import { iconTypes } from './iconTypes';

type BaseIconType = {
  name: iconTypes;
  className?: string;
  rest?: HTMLAttributes<{}>;
  style?: CSSProperties;
};

export interface TIconList {
  [key: string]: FC<SVGAttributes<SVGElement>> | undefined;
}

const Icon = ({ name, className = '', rest, style }: BaseIconType) => {
  const iconsList: TIconList = Icons;

  const Component = iconsList[name];

  if (!Component) return null;

  return <Component className={`icon ${className}`} style={style} {...rest}></Component>;
};

export default Icon;
