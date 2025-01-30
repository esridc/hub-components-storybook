const buttonColorToKind = (color) => {
  switch (color) {
    case 'blue':
      return 'brand';
    case 'red':
      return 'danger';
    default:
      return color;
  }
};

export { buttonColorToKind as b };
