import React, {useCallback, useState, forwardRef} from 'react'
import {Box, Button, Flex, Text, TextInput} from '@sanity/ui'
import {useFormValue, StringInputProps} from 'sanity'
import {set, unset} from 'sanity'
import {createClient} from '@sanity/client'

// Create Sanity client instance
const client = createClient({
  projectId: 'l77qopcp',
  dataset: 'production',
  apiVersion: '2024-05-03',
  useCdn: false,
})

// Define venue reference type for TypeScript
interface VenueReference {
  _ref: string
  _type: string
}

// Properly type the input props
export const EventNameInput = forwardRef<HTMLInputElement, StringInputProps>((props, ref) => {
  const {onChange, value = ''} = props
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get venue reference value and properly type it
  const venueRef = useFormValue(['venue']) as VenueReference | undefined

  const generateName = useCallback(async () => {
    // Clear any previous errors
    setError(null)

    if (!venueRef || !venueRef?._ref) {
      setError('Please select a venue first')
      return
    }

    setIsGenerating(true)

    try {
      console.log('Fetching venue with ID:', venueRef._ref)

      // Update the query to access nested address fields
      const venue = await client.fetch(`*[_id == $venueId][0]{name, address{city, state}}`, {
        venueId: venueRef._ref,
      })

      console.log('Venue with address:', venue)

      // Check for nested address properties
      if (venue?.address?.city && venue?.address?.state) {
        const suggestedName = `${venue.address.city}, ${venue.address.state}`
        // Use Sanity's patch system to update the value
        onChange(set(suggestedName))
      } else {
        setError(
          `Venue address data issue: city=${venue?.address?.city}, state=${venue?.address?.state}`,
        )
      }
    } catch (err) {
      console.error('Error fetching venue:', err)
      setError('Failed to fetch venue information')
    } finally {
      setIsGenerating(false)
    }
  }, [venueRef, onChange])

  return (
    <Box>
      <Flex gap={2} marginBottom={2}>
        <Box flex={1}>
          <TextInput
            value={value}
            onChange={(event) => {
              const newValue = event.currentTarget.value
              onChange(newValue ? set(newValue) : unset())
            }}
            ref={ref}
            disabled={isGenerating}
          />
        </Box>
        <Button
          text="Generate from venue"
          tone="primary"
          mode="ghost"
          onClick={generateName}
          disabled={isGenerating || !venueRef}
          loading={isGenerating}
        />
      </Flex>
      {error && (
        <Text size={1} style={{color: 'red'}}>
          {error}
        </Text>
      )}
      <Text size={1} muted>
        {!venueRef
          ? 'Select a venue to enable automatic name generation'
          : 'Click "Generate from venue" to create event name from venue location'}
      </Text>
    </Box>
  )
})
