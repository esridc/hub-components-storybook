import { PostStatus } from "@esri/hub-common";
import { highlightWords } from "../../../utils/string";
export default function HighlightBlockedWordsDecoratorFactory(idPrefix, componentClassName) {
  function HighlightBlockedWordsDecorator(_target, _propertyKey, descriptor) {
    const { get: original } = descriptor;
    const get = function HighlightBlockedWords(...args) {
      var _a;
      const result = original.apply(this, args);
      return (result && this.post.status !== PostStatus.APPROVED)
        ? highlightWords(result, (_a = this.channel.blockWords) !== null && _a !== void 0 ? _a : [], idPrefix, componentClassName, this.intl, {
          labelKey: 'blockedWordTooltipLabel',
          textKey: 'blockedWordTooltipText'
        })
        : result;
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return HighlightBlockedWordsDecorator;
}
