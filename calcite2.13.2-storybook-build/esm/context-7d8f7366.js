const bind = (context, ...methodNames) => {
  methodNames.forEach(methodName => {
    if (typeof context[methodName] !== 'function') {
      throw new Error(`Cannot bind context. ${methodName} must be a function`);
    }
    context[methodName] = context[methodName].bind(context);
  });
};

export { bind as b };
