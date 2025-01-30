import { SYMBOL_STATE } from '../utils/utils';
import { defaultLayerThemeOptions } from './index';
export default function (state = SYMBOL_STATE.DEFAULT, properties = defaultLayerThemeOptions.point) {
  const { activeColor, color, hoverColor } = properties;
  let strokeColor = color;
  if (state === SYMBOL_STATE.HOVER) {
    strokeColor = hoverColor;
  }
  else if (state === SYMBOL_STATE.ACTIVE) {
    strokeColor = activeColor;
  }
  return {
    type: 'text',
    color: [
      ...strokeColor,
      0.9
    ],
    text: `\ue61d`,
    font: {
      size: 24,
      family: 'CalciteWebCoreIcons'
    }
  };
}
