const getAccessIcon = (access) => {
  let icon;
  switch (access) {
    case 'public':
      icon = 'globe';
      break;
    case 'org':
      icon = 'organization';
      break;
    case 'shared':
      icon = 'users';
      break;
    case 'private':
      icon = 'user';
      break;
  }
  return icon;
};

export { getAccessIcon as g };
