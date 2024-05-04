const functionHelper = (() => {
  function formattedDate (dateString) {
    const dateObj = new Date(dateString)

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const formattedDate = dateObj.toLocaleDateString('id-ID', options)

    return formattedDate
  }

  function limitedText (text) {
    return text.slice(0, 220) + '...'
  }

  function stringToHtml (html) {
    const tempElement = document.createElement('div')
    tempElement.innerHTML = html
    return tempElement.innerText
  }

  function formatTimeAgo (dateString) {
    const date = new Date(dateString)
    const now = new Date()

    const seconds = Math.floor((now - date) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days} hari lalu`
    } else if (hours > 0) {
      return `${hours} jam lalu`
    } else if (minutes > 0) {
      return `${minutes} menit lalu`
    } else {
      return `${seconds + 1} detik lalu`
    }
  }

  function countLength (arr) {
    return arr.length
  }

  return {
    stringToHtml,
    formatTimeAgo,
    formattedDate,
    countLength,
    limitedText
  }
})()

export default functionHelper
