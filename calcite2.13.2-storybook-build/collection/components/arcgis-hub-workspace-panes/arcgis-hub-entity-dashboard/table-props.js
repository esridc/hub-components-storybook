// TODO: better way to get translations? these consts won't be changing otherwise
export const errorTableColumns = (intl) => {
  return [
    {
      key: "timestamp",
      header: intl.t('activityLogSection.table.columnHeaders.datetime'),
      cellWidth: "max-content"
    },
    {
      key: "layerId",
      header: intl.t('activityLogSection.table.columnHeaders.layer'),
      cellWidth: "3rem"
    },
    {
      key: "message",
      header: intl.t('activityLogSection.table.columnHeaders.message'),
      multilineCellEllipsis: {
        collapseEnabled: true,
        collapseIcon: null,
        collapseText: intl.t('activityLogSection.table.collapseText'),
        expandEnabled: true,
        expandIcon: null,
        expandText: intl.t('activityLogSection.table.expandText'),
        lines: 2,
        tooltipEnabled: false,
        tooltipPlacement: null,
        tooltipText: null
      }
    }
  ];
};
export const errorTableHelpState = (intl) => {
  return {
    heading: intl.t('activityLogSection.table.noRecentErrors'),
    icon: "check-circle" // TODO: make smaller if we can, right now the icon is too big and hardcoded
  };
};
export const ERROR_TABLE_PAGE_SIZE = 10;
