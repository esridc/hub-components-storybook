'use strict';

const settings = require('./settings-0b8cd93b.js');

async function fetchDiscussionSettings(entityId, hubRequestOptions) {
  let discussionSettings;
  try {
    ({ settings: { discussions: discussionSettings } } = await settings.fetchSetting(Object.assign({ id: entityId }, hubRequestOptions)));
  }
  catch (e) {
    console.warn(`Failed to fetch discussion settings: ${e.message}`);
  }
  return Object.assign({ allowedChannelIds: [], allowedLocations: [] }, discussionSettings);
}

exports.fetchDiscussionSettings = fetchDiscussionSettings;
