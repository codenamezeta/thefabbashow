// components/AddToCalendarButton.tsx
'use client'
import { EventType } from '@/lib/sanityQueries'
import Script from 'next/script'
import { FaCalendarPlus } from 'react-icons/fa'
import Button from './Button'
import { PortableTextBlock } from '@portabletext/react'

function portableTextToPlainText(blocks: PortableTextBlock[] = []): string {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map((block) => {
      // Handle basic text blocks
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child) => {
            // Check if this is a span with text property
            if ('text' in child) {
              return child.text || ''
            }
            return ''
          })
          .join('')
      }

      // Handle other block types if needed
      return ''
    })
    .join('\n\n')
}

export default function AddToCalendarButton({ event }: { event: EventType }) {
  if (!event.date) return null

  // Format dates
  const dateInfo = event.date ? new Date(event.date) : new Date()
  const endDate = new Date(dateInfo)
  endDate.setHours(dateInfo.getHours() + 3) // Assume 3 hour event duration

  const startDate = dateInfo.toISOString().split('T')[0]
  const endDateStr = endDate.toISOString().split('T')[0]

  // const startTime = event.time ? event.time.split('-')[0]?.trim() : '19:00'
  // const endTime =
  //   event.time && event.time.includes('-')
  //     ? event.time.split('-')[1]?.trim()
  //     : '22:00'

  // Location string
  const location = event.venue
    ? [
        event.venue.name,
        event.venue.address?.street,
        event.venue.address?.lineTwo,
        `${event.venue.address?.city}, ${event.venue.address?.state} ${event.venue.address?.zip}`,
      ]
        .filter(Boolean)
        .join(', ')
    : ''

  // Format Description
  const plainTextDescription = event.description
    ? portableTextToPlainText(event.description)
    : 'Join us for The fABBA Show!'

  // Direct window.atcb_action call
  const handleAddToCalendarClick = () => {
    if (typeof window !== 'undefined' && window.atcb_action) {
      window.atcb_action({
        name: event.eventName || 'The FABBA Show',
        description: plainTextDescription,
        startDate,
        endDate: endDateStr,
        location,
        options: ['Google', 'Apple', 'Microsoft365', 'Outlook.com', 'Yahoo'],
        timeZone: 'America/New_York',
        iCalFileName: 'fabba-show-event',
        trigger: 'click',
      })
    }
  }

  return (
    <Button onClick={handleAddToCalendarClick} variant='primary' size='lg'>
      <Script
        src='https://cdn.jsdelivr.net/npm/add-to-calendar-button@2'
        strategy='afterInteractive'
      />
      <FaCalendarPlus /> Add to Calendar
    </Button>
  )
}
