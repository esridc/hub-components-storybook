'use strict';

const IHubTimeline = require('./IHubTimeline-228e135a.js');

const getIconForStatus = (status) => {
  let icon;
  switch (status) {
    case IHubTimeline.TIMELINE_STAGE_STATUSES.notStarted:
      icon = 'circle';
      break;
    case IHubTimeline.TIMELINE_STAGE_STATUSES.inProgress:
      icon = 'star-circle';
      break;
    case IHubTimeline.TIMELINE_STAGE_STATUSES.skipped:
      icon = 'x-circle-f';
      break;
    case IHubTimeline.TIMELINE_STAGE_STATUSES.onHold:
      icon = 'minus-circle';
      break;
    case IHubTimeline.TIMELINE_STAGE_STATUSES.complete:
      icon = 'check-circle-f';
      break;
  }
  return icon;
};

exports.getIconForStatus = getIconForStatus;
