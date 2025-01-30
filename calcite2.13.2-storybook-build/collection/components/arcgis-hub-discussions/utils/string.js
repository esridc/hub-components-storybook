export function copyLinkToPost(channelId, postId, parentId) {
  const params = { channelId, postId, discussions: true };
  if (parentId) {
    params.replyId = postId;
    params.postId = parentId;
  }
  const url = new URL(globalThis.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString());
  });
  navigator.clipboard.writeText(url.toString());
}
