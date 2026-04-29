import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'The FABBA Show',

  projectId: 'l77qopcp',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Events list with custom ordering
            S.listItem()
              .title('Events')
              .schemaType('event')
              .child(
                S.documentList()
                  .title('Events')
                  .filter('_type == "event"')
                  .defaultOrdering([
                    {field: 'date', direction: 'desc'},
                    {field: 'time', direction: 'asc'},
                  ]),
              ),

            // Other document types
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'event'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
