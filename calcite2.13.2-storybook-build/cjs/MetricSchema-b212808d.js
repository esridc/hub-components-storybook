'use strict';

const enums = require('./enums-0160df9d.js');

var LAYOUTS;
(function (LAYOUTS) {
    LAYOUTS["simple"] = "simple";
    LAYOUTS["informational"] = "informational";
})(LAYOUTS || (LAYOUTS = {}));
var SCALE;
(function (SCALE) {
    SCALE["small"] = "s";
    SCALE["medium"] = "m";
    SCALE["large"] = "l";
})(SCALE || (SCALE = {}));
var UNIT_POSITIONS;
(function (UNIT_POSITIONS) {
    UNIT_POSITIONS["before"] = "before";
    UNIT_POSITIONS["after"] = "after";
    UNIT_POSITIONS["below"] = "below";
})(UNIT_POSITIONS || (UNIT_POSITIONS = {}));
var VISUAL_INTEREST;
(function (VISUAL_INTEREST) {
    VISUAL_INTEREST["none"] = "none";
    VISUAL_INTEREST["icon"] = "icon";
})(VISUAL_INTEREST || (VISUAL_INTEREST = {}));
exports.ICONS = void 0;
(function (ICONS) {
    ICONS["caretUp"] = "caret-up";
    ICONS["caretDown"] = "caret-down";
    ICONS["caretDouble"] = "caret-double-horizontal";
})(exports.ICONS || (exports.ICONS = {}));
exports.SOURCE = void 0;
(function (SOURCE) {
    SOURCE["dynamic"] = "dynamic";
    SOURCE["static"] = "static";
    SOURCE["itemQuery"] = "itemQuery";
})(exports.SOURCE || (exports.SOURCE = {}));

const MetricSchema = {
    type: "object",
    required: [],
    properties: {
        type: {
            type: "string",
            enum: Object.keys(exports.SOURCE),
            default: exports.SOURCE.dynamic,
        },
        cardTitle: {
            type: "string",
        },
        value: {},
        valueType: {
            type: "string",
            default: "string",
            enum: ["string", "number", "date"],
        },
        dynamicMetric: {
            type: "object",
        },
        allowUnitFormatting: {
            type: "boolean",
            default: false,
        },
        unit: {
            type: "string",
        },
        unitPosition: {
            type: "string",
            default: UNIT_POSITIONS.after,
            enum: Object.keys(UNIT_POSITIONS),
        },
        serverTimeout: {
            type: "number",
            maximum: 95,
            minimum: 5,
            default: 10,
        },
        subtitle: {
            type: "string",
        },
        trailingText: {
            type: "string",
        },
        textAlign: {
            type: "string",
            default: enums.ALIGNMENTS.start,
        },
        allowLink: {
            type: "boolean",
            default: false,
        },
        allowDynamicLink: {
            type: "boolean",
            default: true,
        },
        sourceLink: {
            type: "string",
        },
        sourceTitle: {
            type: "string",
        },
        valueColor: {
            type: "string",
        },
        layout: {
            type: "string",
            default: LAYOUTS.simple,
            enum: Object.keys(LAYOUTS),
        },
        dropShadow: {
            type: "string",
            default: enums.DROP_SHADOWS.none,
            enum: Object.keys(enums.DROP_SHADOWS),
        },
        icon: {
            type: "string",
            default: exports.ICONS.caretUp,
            enum: Object.values(exports.ICONS),
        },
        visualInterest: {
            type: "string",
            default: VISUAL_INTEREST.none,
            enum: Object.keys(VISUAL_INTEREST),
        },
        shareable: {
            type: "boolean",
            default: false,
        },
        shareableByValue: {
            type: "boolean",
            default: false,
        },
        shareableOnHover: {
            type: "boolean",
            default: true,
        },
        popoverText: {
            type: "string",
        },
        publisherText: {
            type: "string",
        },
    },
    allOf: [
        { $ref: "#/definitions/if-source-title-then-source-link" },
        { $ref: "#/definitions/value-type-value-mapping" },
        { $ref: "#/definitions/if-static-then-url-format" },
    ],
    definitions: {
        // TODO: reimplement popover with layouts release
        "if-source-title-then-source-link": {
            if: {
                type: "object",
                properties: { sourceTitle: { not: { const: "" } } },
                required: ["sourceTitle"],
            },
            then: {
                required: ["sourceLink"],
            },
        },
        "value-type-value-mapping": {
            if: {
                type: "object",
                properties: {
                    valueType: { enum: ["string", "date"] },
                },
            },
            then: {
                type: "object",
                properties: { value: { type: "string" } },
            },
            else: {
                type: "object",
                properties: { value: { type: "number" } },
            },
        },
        "if-static-then-url-format": {
            if: {
                type: "object",
                properties: {
                    type: { const: exports.SOURCE.static },
                },
            },
            then: {
                type: "object",
                properties: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    sourceLink: { format: "url" },
                },
            },
        },
    },
};

const MetricSchema$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MetricSchema: MetricSchema
});

exports.MetricSchema = MetricSchema;
exports.MetricSchema$1 = MetricSchema$1;
