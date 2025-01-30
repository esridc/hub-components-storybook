import { T as TIMELINE_STAGE_STATUSES } from './IHubTimeline-0350fa19.js';

const getIconForStatus = (status) => {
  let icon;
  switch (status) {
    case TIMELINE_STAGE_STATUSES.notStarted:
      icon = 'circle';
      break;
    case TIMELINE_STAGE_STATUSES.inProgress:
      icon = 'star-circle';
      break;
    case TIMELINE_STAGE_STATUSES.skipped:
      icon = 'x-circle-f';
      break;
    case TIMELINE_STAGE_STATUSES.onHold:
      icon = 'minus-circle';
      break;
    case TIMELINE_STAGE_STATUSES.complete:
      icon = 'check-circle-f';
      break;
  }
  return icon;
};

export { getIconForStatus as g };
