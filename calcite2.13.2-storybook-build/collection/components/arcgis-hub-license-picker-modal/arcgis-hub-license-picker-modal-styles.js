/* NOTE: Define styles here. See note in `arcgis-hub-license-picker-modal.render()` for more info. */
const Host = 'arcgis-hub-license-picker-modal';
const ScopedStyles = `
    ${Host} {
      --calcite-font-size--1: 1rem;
      --calcite-font-size--2: 1rem;
    }

    ${Host} calcite-modal [slot="content"] {
      height: 50vh;
    }

    ${Host} calcite-modal calcite-tabs {
      min-height: 100%
    }

    ${Host} calcite-modal calcite-tab {
      height: auto;
    }

    ${Host} calcite-modal .custom-editor {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    ${Host} calcite-modal arcgis-hub-rich-text {
      flex-grow: 1;
    }

    ${Host} calcite-modal .ck.ck-editor {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    ${Host} calcite-modal .ck.ck-editor__main {
      flex-grow: 1;
    }

    ${Host} calcite-modal .ck.ck-editor__editable {
      height: 100%;
      min-height: 12rem;
    }

    @media screen and (max-width: 816px) {
      ${Host} calcite-modal [slot="content"] {
        height: 100%;
      }
    }
  `;
export default ScopedStyles;
