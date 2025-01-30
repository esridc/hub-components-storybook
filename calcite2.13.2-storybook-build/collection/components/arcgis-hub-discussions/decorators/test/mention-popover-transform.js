var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as mentionUtils from "../../utils/mentions";
import MentionPopoverTransform from '../mention-popover-transform';
import { cloneObject } from "@esri/hub-common";
import { CHANNEL, CONTEXT, POST, CREATOR, MENTIONEDUSERS } from "./fixtures";
describe('add mention popovers decorator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should call mentionPopoverTransform with the returned value and post properties', async () => {
    const computed = `hello <calcite-link data-mention='user_4'>@user_4</calcite-link>`;
    const expected = `hello <arcgis-hub-discussions-mention-popover><calcite-link data-mention='user_4'>@user_4</calcite-link></arcgis-hub-discussions-mention-popover>`;
    const mentionPopoverTransformSpy = jest.spyOn(mentionUtils, 'mentionPopoverTransform').mockReturnValue(expected);
    class MyClass {
      constructor() {
        this.username = 'user_4';
        this.post = cloneObject(POST);
        this.postCreator = cloneObject(CREATOR);
        this.postMentionedUsers = cloneObject(MENTIONEDUSERS);
        this.channel = cloneObject(CHANNEL);
        this.context = cloneObject(CONTEXT);
      }
      get computed() {
        return `hello <calcite-link data-mention='${this.username}'>@${this.username}</calcite-link>`;
      }
    }
    __decorate([
      MentionPopoverTransform()
    ], MyClass.prototype, "computed", null);
    const instance = new MyClass();
    const result = instance.computed;
    expect(mentionPopoverTransformSpy).toHaveBeenCalledTimes(1);
    expect(mentionPopoverTransformSpy).toHaveBeenCalledWith(computed, instance.post, instance.postCreator, instance.postMentionedUsers, instance.channel, instance.context);
    expect(result).toEqual(expected);
  });
});
