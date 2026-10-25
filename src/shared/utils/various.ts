const getDateAsYYYYMMDD = (date: Date): string => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

const getDataSize = (data: object): number => {
  return new TextEncoder().encode(JSON.stringify(data)).byteLength
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

export { formatFileSize, getDataSize, getDateAsYYYYMMDD }
