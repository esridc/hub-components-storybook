import { SYMBOL_STATE } from '../utils/utils';
import { defaultLayerThemeOptions } from './index';
export default function (state = SYMBOL_STATE.DEFAULT, properties = defaultLayerThemeOptions.polygon) {
  const { activeColor, color, hoverColor, width } = properties;
  let strokeColor = color;
  if (state === SYMBOL_STATE.HOVER) {
    strokeColor = hoverColor;
  }
  else if (state === SYMBOL_STATE.ACTIVE) {
    strokeColor = activeColor;
  }
  return {
    type: 'simple-fill',
    color: [
      ...color,
      0.15
    ],
    outline: {
      color: [
        ...strokeColor,
        1
      ],
      width
    }
  };
}
