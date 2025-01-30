// Ideally we'll add other helpers here for easy mocking, like getServerByItemId()
function downloadRemoteFile(url, fileName) {
  const downloadLink = document.createElement('a');
  downloadLink.style.display = 'none';
  downloadLink.setAttribute('href', url);
  if (fileName) {
    downloadLink.download = fileName;
  }
  document.body.appendChild(downloadLink);
  // For some reason, this function will not run any lines after `downloadLink.click()`
  // if chrome's native download ui is triggered. However, the anchor's onclick listener
  // always seems to fire (which is why we decided to put DOM cleanup logic there).
  downloadLink.onclick = () => {
    document.body.removeChild(downloadLink);
  };
  downloadLink.click();
}
function getFormatIcon(format) {
  const formatToIcon = {
    csv: 'file-csv',
    excel: 'file-excel',
    featureCollection: 'files',
    filegdb: 'file-data',
    geojson: 'file-code',
    geoPackage: 'package',
    json: 'file-code',
    shapefile: 'file-zip',
    sqlite: 'file-sqlite',
  };
  return formatToIcon[format] || 'file';
}

export { downloadRemoteFile as d, getFormatIcon as g };
