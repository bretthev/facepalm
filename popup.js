const button = document.querySelector('.get-tabs')
const page = document.querySelector('#container')
const title = document.querySelector('.title')
const background = chrome.extension.getBackgroundPage()

chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.query({}, (tabs) => {
    const localTitles = filterTabTitlesByUrl(tabs, 'localhost', true)
    const notLocalTitles = filterTabTitlesByUrl(tabs, 'localhost', false)
    if (checkForDuplicates(localTitles, notLocalTitles)) {
      alert('You have a dev AND production window open.')
    }
  })
}) 

function filterTabTitlesByUrl(tabUrls, devUrl, includes) {
  return includes ? tabUrls.filter((tab) => tab.url.includes(devUrl)).map(localTab => localTab.title) : tabUrls.filter((tab) => tab.url.indexOf(devUrl) === -1).map(tab => tab.title)
}

function checkForDuplicates(localTitles, notLocalTitles) {
  return localTitles.map(title => notLocalTitles.includes(title)).includes(true)
}
