import React from 'react';
import { render } from 'react-dom';

import Slider from './Slider/Slider';

const IMAGE_DATA = [
  {
    src: require('./images/1.png'),
    alt: 'images-1',
  },
  {
    src: require('./images/2.png'),
    alt: 'images-2',
  },
  {
    src: require('./images/3.png'),
    alt: 'images-3',
  },
  {
    src: require('./images/4.png'),
    alt: 'images-4',
  },
];

render(
  <Slider
    items={IMAGE_DATA}
    speed={1.2}
    delay={2.1}
    pause={true}
    autoplay={true}
    dots={true}
    arrows={true}
  />,
  document.getElementById('root')
);
