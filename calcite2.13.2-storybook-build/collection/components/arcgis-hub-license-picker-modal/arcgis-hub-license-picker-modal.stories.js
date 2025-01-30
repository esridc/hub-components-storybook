export default {
  title: 'Search/License Picker Modal',
  component: 'arcgis-hub-license-picker-modal',
  parameters: {
    withAuth: {
      components: ['arcgis-hub-license-picker-modal']
    },
    actions: {
      handles: ['arcgisHubLicensePickerModalApply', 'arcgisHubLicensePickerModalCancel']
    }
  },
};
const defaultArgs = {
  licenseInfo: "CC BY",
  modalIsOpen: true,
  wasCustomLicense: false,
  wasStructuredLicense: true,
};
export const Default = args => `
    <arcgis-hub-license-picker-modal
        license-info="${args.licenseInfo}"
        modal-is-open=${args.modalIsOpen}
        was-custom-license=${args.wasCustomLicense}
        was-structured-license=${args.wasStructuredLicense}
    ></>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'License Picker Modal';
