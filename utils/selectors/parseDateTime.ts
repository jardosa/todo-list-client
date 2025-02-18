const parseDateTime = (dateTime: string, format: 'utc' | 'iso' = 'utc') => {
    if (format === 'iso') return new Date(dateTime).toISOString()
    return new Date(dateTime).toUTCString()
}

export default parseDateTime