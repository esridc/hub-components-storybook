import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Metadata/Entity Metadata',
  component: 'arcgis-hub-entity-metadata',
  parameters: {
    withAuth: {
      components: ['arcgis-hub-entity-metadata']
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-entity-metadata', ($el, { args }) => {
      $el.listHeader = args.listHeader;
      $el.headingLevel = args.headingLevel;
      $el.additionalMetadata = args.additionalMetadata;
      $el.exclude = args.exclude;
      $el.entity = args.entity;
    }),
    withCenteredLayout('30%')
  ],
  argTypes: {
    listHeader: { control: { type: 'object' } },
    headingLevel: { control: { type: 'object' } },
    additionalMetadata: { control: { type: 'object' } },
    exclude: { control: { type: 'object' } },
    entity: { control: { type: 'object' } }
  }
};
const defaultArgs = {
  headingLevel: 3,
  listHeader: "Some header here!",
  additionalMetadata: [{
      title: "Example of additional metadata",
      description: {
        value: "Cool description",
        link: {
          url: "https://google.com",
          target: "_blank",
          iconEnd: "launch"
        }
      }
    }],
  exclude: ['owner'],
  entity: {
    type: 'document',
    access: 'public',
    createdDate: '2022-08-23T15:03:24.000Z',
    owner: 'mockUsername',
    updatedDate: '2022-08-30T19:26:05.000Z',
    size: '12345',
    records: 5,
    members: 500,
    license: 'CC BY-SA',
  }
};
export const Default = () => `
  <arcgis-hub-entity-metadata></arcgis-hub-entity-metadata>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Entity Metadata';
