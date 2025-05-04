interface Window {
  atcb_action?: (config: {
    name: string
    description: string
    startDate: string
    endDate: string
    startTime?: string
    endTime?: string
    location: string
    options: string[]
    timeZone: string
    iCalFileName: string
    trigger: string
  }) => void
}
