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

export { buildSchema };
