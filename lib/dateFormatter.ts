/**
 ** Formats a date string into various human-readable formats
 * @param dateString Date string in YYYY-MM-DD format
 * @returns Object containing various formatted date parts
 */

export interface DateInfo {
  weekdayFull: string
  weekdayShort: string
  monthFull: string
  monthShort: string
  dayWithOrdinal: string
  day: number
  month: number
  year: number
  fullDate: string
}

const dateFormatter = (dateString: string): DateInfo | null => {
  if (!dateString) return null

  // Fix for timezone issue - parse date parts and create date in local timezone
  const [year, month, day] = dateString
    .split('-')
    .map((num) => parseInt(num, 10))
  const date = new Date(year, month - 1, day) // month is 0-indexed in JS

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th' // Handle 4th-20th
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return {
    weekdayFull: date.toLocaleDateString('en-US', { weekday: 'long' }),
    weekdayShort: date.toLocaleDateString('en-US', { weekday: 'short' }),
    monthFull: date.toLocaleDateString('en-US', { month: 'long' }),
    monthShort: date.toLocaleDateString('en-US', { month: 'short' }),
    dayWithOrdinal: `${day}${getOrdinalSuffix(day)}`,
    day,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    fullDate: `${date.toLocaleDateString('en-US', {
      month: 'long',
    })} ${day}${getOrdinalSuffix(day)}, ${date.getFullYear()}`,
  }
}

export default dateFormatter
