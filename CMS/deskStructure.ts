import {defineConfig} from 'sanity'
import {StructureBuilder, StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = (S) =>
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

      // Other document types can be listed here
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'event'),
    ])
