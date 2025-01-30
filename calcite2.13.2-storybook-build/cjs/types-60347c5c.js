'use strict';

const ProjectSchema = require('./ProjectSchema-d1b6b7cf.js');
const InitiativeSchema = require('./InitiativeSchema-5a0a1956.js');
const SiteSchema = require('./SiteSchema-85074143.js');
const DiscussionSchema = require('./DiscussionSchema-24407ed6.js');
const PageSchema = require('./PageSchema-f15eb977.js');
const ContentSchema = require('./ContentSchema-92224d5f.js');
const TemplateSchema = require('./TemplateSchema-d46d6f3b.js');
const GroupSchema = require('./GroupSchema-e21948a6.js');
const InitiativeTemplateSchema = require('./InitiativeTemplateSchema-c5d2cb31.js');
const SurveySchema = require('./SurveySchema-9ec907b6.js');
const EventSchemaCreate = require('./EventSchemaCreate-bf05e6ea.js');
const UserSchema = require('./UserSchema-5e3cafa7.js');

const validEntityEditorTypes = [
    ...ProjectSchema.ProjectEditorTypes,
    ...ContentSchema.ContentEditorTypes,
    ...InitiativeSchema.InitiativeEditorTypes,
    ...SiteSchema.SiteEditorTypes,
    ...DiscussionSchema.DiscussionEditorTypes,
    ...PageSchema.PageEditorTypes,
    ...TemplateSchema.TemplateEditorTypes,
    ...GroupSchema.GroupEditorTypes,
    ...InitiativeTemplateSchema.InitiativeTemplateEditorTypes,
    ...SurveySchema.SurveyEditorTypes,
    ...EventSchemaCreate.EventEditorTypes,
    ...UserSchema.UserEditorTypes,
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
exports.UiSchemaRuleEffects = void 0;
(function (UiSchemaRuleEffects) {
    UiSchemaRuleEffects["SHOW"] = "SHOW";
    UiSchemaRuleEffects["HIDE"] = "HIDE";
    UiSchemaRuleEffects["DISABLE"] = "DISABLE";
    UiSchemaRuleEffects["ENABLE"] = "ENABLE";
    UiSchemaRuleEffects["NONE"] = "";
    UiSchemaRuleEffects["RESET"] = "RESET";
})(exports.UiSchemaRuleEffects || (exports.UiSchemaRuleEffects = {}));
exports.UiSchemaElementTypes = void 0;
(function (UiSchemaElementTypes) {
    UiSchemaElementTypes["section"] = "Section";
    UiSchemaElementTypes["control"] = "Control";
    UiSchemaElementTypes["layout"] = "Layout";
    UiSchemaElementTypes["slot"] = "Slot";
    UiSchemaElementTypes["notice"] = "Notice";
})(exports.UiSchemaElementTypes || (exports.UiSchemaElementTypes = {}));
exports.UiSchemaSectionTypes = void 0;
(function (UiSchemaSectionTypes) {
    UiSchemaSectionTypes["accordion"] = "accordion";
    UiSchemaSectionTypes["accordionItem"] = "accordionItem";
    UiSchemaSectionTypes["block"] = "block";
    UiSchemaSectionTypes["stepper"] = "stepper";
    UiSchemaSectionTypes["step"] = "step";
    UiSchemaSectionTypes["subblock"] = "subblock";
    UiSchemaSectionTypes["card"] = "card";
})(exports.UiSchemaSectionTypes || (exports.UiSchemaSectionTypes = {}));
exports.UiSchemaMessageTypes = void 0;
(function (UiSchemaMessageTypes) {
    UiSchemaMessageTypes["error"] = "ERROR";
    UiSchemaMessageTypes["success"] = "SUCCESS";
    UiSchemaMessageTypes["custom"] = "CUSTOM";
})(exports.UiSchemaMessageTypes || (exports.UiSchemaMessageTypes = {}));

exports.validCardEditorTypes = validCardEditorTypes;
exports.validEditorTypes = validEditorTypes;
exports.validEntityEditorTypes = validEntityEditorTypes;
exports.validEventGalleryCardEditorTypes = validEventGalleryCardEditorTypes;
exports.validFollowCardEditorTypes = validFollowCardEditorTypes;
exports.validStatCardEditorTypes = validStatCardEditorTypes;
