import { fetchSetting } from "@esri/hub-common";
export async function fetchDiscussionSettings(entityId, hubRequestOptions) {
  let discussionSettings;
  try {
    ({ settings: { discussions: discussionSettings } } = await fetchSetting(Object.assign({ id: entityId }, hubRequestOptions)));
  }
  catch (e) {
    console.warn(`Failed to fetch discussion settings: ${e.message}`);
  }
  return Object.assign({ allowedChannelIds: [], allowedLocations: [] }, discussionSettings);
}
