'use strict';

const buildSchema = () => {
    return {
        properties: {
            allowRegistration: {
                type: "boolean",
                enum: [true, false],
                default: true,
            },
            notifyAttendees: {
                type: "boolean",
                enum: [true, false],
                default: true,
            },
        },
    };
};

exports.buildSchema = buildSchema;
