import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon} from '@sanity/icons'
import BlockquoteStyle from './components/BlockquoteStyle'

/**
 * This is the schema type for block content used in the post document type.
 *
 * The `component` on the blockquote style bypasses @sanity/ui's default
 * BlockQuote renderer which nests a <div> inside a <p> — invalid HTML that
 * causes a React hydration error in the Studio editor.
 */
export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal',    value: 'normal'},
        {title: 'H1',        value: 'h1'},
        {title: 'H2',        value: 'h2'},
        {title: 'H3',        value: 'h3'},
        {title: 'H4',        value: 'h4'},
        // Custom component prevents the default @sanity/ui BlockQuote from
        // rendering a <div> inside a <p> (which would be invalid HTML).
        {title: 'Quote',     value: 'blockquote', component: BlockquoteStyle},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong',   value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
  ],
})
