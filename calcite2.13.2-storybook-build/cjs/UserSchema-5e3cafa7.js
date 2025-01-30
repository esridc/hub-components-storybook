'use strict';

const UserEditorTypes = ["hub:user:settings"];
/**
 * Defines the JSON schema for a Hub User's editable fields.
 */
const UserSchema = {
    type: "object",
    properties: {
        settings: {
            type: "object",
            properties: {
                preview: {
                    type: "object",
                    properties: {
                        workspace: {
                            type: "boolean",
                            default: false,
                        },
                    },
                },
            },
        },
        hubOrgSettings: {
            type: "object",
            properties: {
                showInformationalBanner: {
                    type: "boolean",
                    default: false,
                },
                enableTermsAndConditions: {
                    type: "boolean",
                    default: false,
                },
                termsAndConditions: {
                    type: "string",
                    default: "",
                },
                enableSignupText: {
                    type: "boolean",
                    default: false,
                },
                signupText: {
                    type: "string",
                    default: "",
                },
            },
        },
    },
};

exports.UserEditorTypes = UserEditorTypes;
exports.UserSchema = UserSchema;
