import { ProjectEditorTypes } from './ProjectSchema-060a6b72.js';
import { InitiativeEditorTypes } from './InitiativeSchema-4fb31f85.js';
import { SiteEditorTypes } from './SiteSchema-3e282ce1.js';
import { DiscussionEditorTypes } from './DiscussionSchema-6e5016d0.js';
import { PageEditorTypes } from './PageSchema-4cbe3bd9.js';
import { ContentEditorTypes } from './ContentSchema-d913d8e9.js';
import { TemplateEditorTypes } from './TemplateSchema-83e65297.js';
import { GroupEditorTypes } from './GroupSchema-13ff9290.js';
import { InitiativeTemplateEditorTypes } from './InitiativeTemplateSchema-bf5d8531.js';
import { SurveyEditorTypes } from './SurveySchema-0fcb1d64.js';
import { EventEditorTypes } from './EventSchemaCreate-2f6ba245.js';
import { UserEditorTypes } from './UserSchema-abc4f738.js';

const validEntityEditorTypes = [
    ...ProjectEditorTypes,
    ...ContentEditorTypes,
    ...InitiativeEditorTypes,
    ...SiteEditorTypes,
    ...DiscussionEditorTypes,
    ...PageEditorTypes,
    ...TemplateEditorTypes,
    ...GroupEditorTypes,
    ...InitiativeTemplateEditorTypes,
    ...SurveyEditorTypes,
    ...EventEditorTypes,
    ...UserEditorTypes,
];
const validStatCardEditorTypes = ["hub:card:stat"];
const validFollowCardEditorTypes = ["hub:card:follow"];
/** Defines the possible editor type values for an event gallery card. These
 * correspond to the supported/defined uiSchema configurations. This should
 * have its own signature in the getEditorConfig function.
 */
const validEventGalleryCardEditorTypes = [
    "hub:card:eventGallery",
];
const validCardEditorTypes = [
    ...validStatCardEditorTypes,
    ...validFollowCardEditorTypes,
    ...validEventGalleryCardEditorTypes,
];
const validEditorTypes = [
    ...validEntityEditorTypes,
    ...validCardEditorTypes,
];
var UiSchemaRuleEffects;
(function (UiSchemaRuleEffects) {
    UiSchemaRuleEffects["SHOW"] = "SHOW";
    UiSchemaRuleEffects["HIDE"] = "HIDE";
    UiSchemaRuleEffects["DISABLE"] = "DISABLE";
    UiSchemaRuleEffects["ENABLE"] = "ENABLE";
    UiSchemaRuleEffects["NONE"] = "";
    UiSchemaRuleEffects["RESET"] = "RESET";
})(UiSchemaRuleEffects || (UiSchemaRuleEffects = {}));
var UiSchemaElementTypes;
(function (UiSchemaElementTypes) {
    UiSchemaElementTypes["section"] = "Section";
    UiSchemaElementTypes["control"] = "Control";
    UiSchemaElementTypes["layout"] = "Layout";
    UiSchemaElementTypes["slot"] = "Slot";
    UiSchemaElementTypes["notice"] = "Notice";
})(UiSchemaElementTypes || (UiSchemaElementTypes = {}));
var UiSchemaSectionTypes;
(function (UiSchemaSectionTypes) {
    UiSchemaSectionTypes["accordion"] = "accordion";
    UiSchemaSectionTypes["accordionItem"] = "accordionItem";
    UiSchemaSectionTypes["block"] = "block";
    UiSchemaSectionTypes["stepper"] = "stepper";
    UiSchemaSectionTypes["step"] = "step";
    UiSchemaSectionTypes["subblock"] = "subblock";
    UiSchemaSectionTypes["card"] = "card";
})(UiSchemaSectionTypes || (UiSchemaSectionTypes = {}));
var UiSchemaMessageTypes;
(function (UiSchemaMessageTypes) {
    UiSchemaMessageTypes["error"] = "ERROR";
    UiSchemaMessageTypes["success"] = "SUCCESS";
    UiSchemaMessageTypes["custom"] = "CUSTOM";
})(UiSchemaMessageTypes || (UiSchemaMessageTypes = {}));

export { UiSchemaRuleEffects as U, UiSchemaElementTypes as a, UiSchemaMessageTypes as b, UiSchemaSectionTypes as c, validEntityEditorTypes as d, validStatCardEditorTypes as e, validFollowCardEditorTypes as f, validEventGalleryCardEditorTypes as g, validCardEditorTypes as h, validEditorTypes as v };
