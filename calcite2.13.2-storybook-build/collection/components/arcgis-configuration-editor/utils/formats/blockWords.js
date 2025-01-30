export const blockWords = {
  validate: (data) => {
    if (!data.length) {
      return true;
    }
    const trimmed = data.trim();
    const rawStrings = trimmed.split(',');
    const toValidUnique = (acc, str) => {
      const trimmed = str.trim();
      return trimmed && acc.indexOf(trimmed) === -1
        ? [...acc, trimmed]
        : acc;
    };
    const { length: numValid } = rawStrings.reduce(toValidUnique, []);
    return numValid <= 20 && rawStrings.length === numValid;
  },
};
