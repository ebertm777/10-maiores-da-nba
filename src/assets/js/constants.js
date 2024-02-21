const token = '156d93e1ea3e4f8fd1e368886331e990a7c11c941883b89c4a403ec1a3119e12'
const votingUrl = 'https://infograficos.oglobo.globo.com/enquete/voto?mobi=1'
const dataUrl =
'https://infogbucket.s3.amazonaws.com/enquetes/enquete-10-maiores-jogadores-da-nba/enquete.json'
// const dataUrl =
  // 'https://infogbucket.s3.amazonaws.com/enquetes/enquete-dos-10-maiores-do-brasileirao/enquete.json'

const dummyUrlWithPlayers = 'http://localhost:3000?players=%5B60%2C61%2C62%2C63%2C64%2C65%2C87%2C88%2C89%2C90%5D&fbclid=IwAR2ItdUJgL_P85U4dYb_-7xbY86tXFMO8aSSDWe4QOReBVqj_ft1R0dKxAk'

const appData = {}

export default dataUrl

export { appData, token, votingUrl, dummyUrlWithPlayers }
