export const formatDateTimeLocal = (date) => {
  if(!date)return "Anda belum mengatur deadline"
  
  const dateTime = new Date(date)
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(dateTime)
  }