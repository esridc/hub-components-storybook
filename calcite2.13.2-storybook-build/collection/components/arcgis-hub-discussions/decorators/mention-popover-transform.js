import { mentionPopoverTransform } from "../utils/mentions";
export default function MentionPopoverTransformDecoratorFactory() {
  function MentionPopoverTransformDecorator(_target, _propertyKey, descriptor) {
    const { get: original } = descriptor;
    const get = function MentionPopoverTransform() {
      const result = original.call(this);
      return mentionPopoverTransform(result, this.post, this.postCreator, this.postMentionedUsers, this.channel);
    };
    return Object.assign(Object.assign({}, descriptor), { get });
  }
  return MentionPopoverTransformDecorator;
}
