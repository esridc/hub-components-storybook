const formatter = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
const disabled = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle"></dl>
    <div slot="footer-start">
      <hub-download-notice file-status="disabled"></hub-download-notice>
      <calcite-button appearance="solid" color="blue" icon-position="start" scale="m" width="full" disabled="">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const cachedUpToDate = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle">
      <dt class="ltr">
        File created
      </dt>
      <dd>
      ${formatter.format(new Date(2020, 4, 11, 12))}
      </dd>
      <dt class="ltr">
        File size
      </dt>
      <dd>
        3.9 KB
      </dd>
    </dl>
    <div slot="footer-start">
      <hub-download-notice file-status="ready"></hub-download-notice>
      <calcite-button appearance="solid" color="blue" icon-position="start" scale="m" width="full">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const cachedUnknown = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle">
      <dt class="ltr">
        File created
      </dt>
      <dd>
      ${formatter.format(new Date(2020, 4, 11, 12))}
      </dd>
      <dt class="ltr">
        File size
      </dt>
      <dd>
        3.9 KB
      </dd>
    </dl>
    <div slot="footer-start">
      <hub-download-notice file-status="ready_unknown"></hub-download-notice>
      <calcite-dropdown placement="top" scale="m" type="click">
      <calcite-button appearance="solid" color="blue" icon-end="caretUp" scale="m" slot="trigger">
        Download Options
      </calcite-button>
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item role="menuitem" selection-mode="none" tabindex="0">
          <span>
            Generate new download with latest data
          </span>
        </calcite-dropdown-item>
        <calcite-dropdown-item role="menuitem" selection-mode="none" tabindex="0">
          <span>
            Download file previously generated on May 11, 2020, 12:00
          </span>
        </calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const cachedUnknownCannotExport = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle">
      <dt class="ltr">
        File created
      </dt>
      <dd>
      ${formatter.format(new Date(2020, 4, 11, 12))}
      </dd>
      <dt class="ltr">
        File size
      </dt>
      <dd>
        3.9 KB
      </dd>
    </dl>
    <div slot="footer-start">
      <hub-download-notice file-status="ready_unknown" cannot-export=""></hub-download-notice>
      <calcite-button appearance="solid" color="blue" icon-position="start" scale="m" width="full">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const cachedStale = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle">
      <dt class="ltr">
        File created
      </dt>
      <dd>
        May 11, 2020, 12:00
      </dd>
      <dt class="ltr">
        File size
      </dt>
      <dd>
        3.9 KB
      </dd>
    </dl>
    <div slot="footer-start">
      <hub-download-notice file-status="stale"></hub-download-notice>
      <calcite-dropdown placement="top" scale="m" type="click">
        <calcite-button appearance="solid" color="blue" icon-end="caretUp" scale="m" slot="trigger">
          Download Options
        </calcite-button>
        <calcite-dropdown-group selection-mode="none">
          <calcite-dropdown-item role="menuitem" selection-mode="none" tabindex="0">
            <span>
              Generate new download with latest data
            </span>
          </calcite-dropdown-item>
          <calcite-dropdown-item role="menuitem" selection-mode="none" tabindex="0">
            <span>
              Download file previously generated on May 11, 2020, 12:00
            </span>
          </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const cachedStaleInProgress = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle">
      <dt class="ltr">
        File created
      </dt>
      <dd>
        May 11, 2020, 12:00
      </dd>
      <dt class="ltr">
        File size
      </dt>
      <dd>
        3.9 KB
      </dd>
    </dl>
    <div slot="footer-start">
      <hub-download-notice file-status="updating"></hub-download-notice>
      <calcite-dropdown placement="top" scale="m" type="click">
        <calcite-button appearance="solid" color="blue" icon-end="caretUp" scale="m" slot="trigger">
          Download Options
        </calcite-button>
        <calcite-dropdown-group selection-mode="none">
          <calcite-dropdown-item hidden="" role="menuitem" selection-mode="none" tabindex="0">
            <span>
              Generate new download with latest data
            </span>
          </calcite-dropdown-item>
          <calcite-dropdown-item role="menuitem" selection-mode="none" tabindex="0">
            <span>
              Download file previously generated on May 11, 2020, 12:00
            </span>
          </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const cachedStaleFailed = `
<hub-download-card data-element="download-card">
      <mock:shadow-root>
        <calcite-card dir="ltr">
          <h3 slot="title">
            Spreadsheet
          </h3>
          <dl slot="subtitle">
            <dt class="ltr">
              File created
            </dt>
            <dd>
              May 11, 2020, 12:00
            </dd>
            <dt class="ltr">
              File size
            </dt>
            <dd>
              3.9 KB
            </dd>
          </dl>
          <div slot="footer-start">
            <hub-download-notice file-status="error_updating"></hub-download-notice>
            <calcite-dropdown placement="top" scale="m" type="click">
              <calcite-button appearance="solid" color="blue" icon-end="caretUp" scale="m" slot="trigger">
                Download Options
              </calcite-button>
              <calcite-dropdown-group selection-mode="none">
                <calcite-dropdown-item role="menuitem" selection-mode="none" tabindex="0">
                  <span>
                    Generate new download with latest data
                  </span>
                </calcite-dropdown-item>
                <calcite-dropdown-item role="menuitem" selection-mode="none" tabindex="0">
                  <span>
                    Download file previously generated on May 11, 2020, 12:00
                  </span>
                </calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </div>
        </calcite-card>
      </mock:shadow-root>
    </hub-download-card>`;
const notCached = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle"></dl>
    <div slot="footer-start">
      <hub-download-notice file-status="not_ready"></hub-download-notice>
      <calcite-button appearance="solid" color="blue" icon-position="start" scale="m" width="full">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const notCachedInProgress = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle"></dl>
    <div slot="footer-start">
      <hub-download-notice file-status="creating"></hub-download-notice>
      <calcite-button appearance="solid" color="blue" disabled="" icon-position="start" scale="m" width="full">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const notCachedFailed = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle"></dl>
    <div slot="footer-start">
      <hub-download-notice file-status="error_creating"></hub-download-notice>
      <calcite-button appearance="solid" color="blue" icon-position="start" scale="m" width="full">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const notFound = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle"></dl>
    <div slot="footer-start">
      <hub-download-notice api-error="404"></hub-download-notice>
      <calcite-button appearance="solid" color="blue" icon-position="start" scale="m" width="full">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
const apiError = `<hub-download-card data-element="download-card">
<mock:shadow-root>
  <calcite-card dir="ltr">
    <h3 slot="title">
      Spreadsheet
    </h3>
    <dl slot="subtitle"></dl>
    <div slot="footer-start">
      <hub-download-notice api-error="502"></hub-download-notice>
      <calcite-button appearance="solid" color="blue" icon-position="start" scale="m" width="full">
        Download
      </calcite-button>
    </div>
  </calcite-card>
</mock:shadow-root>
</hub-download-card>`;
export { disabled, cachedUpToDate, cachedUnknown, cachedUnknownCannotExport, cachedStale, cachedStaleInProgress, cachedStaleFailed, notCached, notCachedInProgress, notCachedFailed, notFound, apiError };
