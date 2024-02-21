import { getVotingButton } from './../button/button'
import { appData } from './../../js/constants'

export function getCardPlayer(player) {
  return /*html*/`
    <div class="card-player" data-id="${player.id}">
      <div class="card-player__profile">
        <div class="card-player__image-container">
          <img class="card-player__image" src="${player.imagem_desk}">
        </div>
        <div class="card-player__text-details">
            <div class="card-player__name">${player.titulo}</div>
            <div class="card-player__position">${player.subtitulo}</div>
        </div>
      </div>
      <div class="card-player__checkbox"></div>
    </div>
  `
}

function insertCardPlayers(players) {
  let playersDom = ''
  const isHalfPlayers = players.length / 2

  players.forEach((player, index) => {
    if (index === 0 || index === isHalfPlayers) {
      playersDom += '</div><div class="players-column">'
    }

    playersDom += getCardPlayer(player)
  })

  playersDom += `</div>${getVotingButton()}`

  document.querySelector('.players-container').innerHTML = playersDom
}

export default function initCardPlayers(data) {
  insertCardPlayers(data.itens)

  let cardPlayersArray = document.querySelectorAll('.card-player')

  cardPlayersArray.forEach(function(elem) {
    elem.addEventListener('click', function() {
      const isActive = elem.classList.contains('active-card-player')
      const buttonPlayersSelection = document.querySelector(
        '.button-players-selection',
      )
      const activeCardPlayers = document.querySelectorAll('.active-card-player')
        .length

      if (isActive) {
        elem.classList.remove('active-card-player')
        buttonPlayersSelection.disabled = true
      } else {
        if (activeCardPlayers === 9) {
          buttonPlayersSelection.disabled = false
          elem.classList.add('active-card-player')
        } else if (activeCardPlayers < 10) {
          elem.classList.add('active-card-player')
        } else {
          document.querySelector('.mask').classList.add('active')

          window.setTimeout(() => {
            document.querySelector('.mask').classList.remove('active')
          }, 1500)
        }
      }
    })
  })
}

function getCardsForResult(votedPlayersArrayOfIds) {
  const cardPlayersObjects = votedPlayersArrayOfIds.map(playerId => {
    return appData.players.find(playerInnerId => {
      return playerInnerId.id === playerId
    })
  })

  let playersResult = ''

  cardPlayersObjects.forEach(playerObject => {
    playersResult += getCardPlayer(playerObject)
  })

  return playersResult
}

export function insertResultFromFacebook(votedPlayersArrayOfIds) {
  document.querySelector('.players-container').innerHTML = /*html*/`
    <div class="chosen-players-column players-result-fb">
      <a class="main-button call-to-vote" href="#">
        <div class="button-label">Faça a sua lista também</div>
      </a>

      <div class="column-title">
        <div class="column-title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.667 426.667"><path d="M213.333 0C95.518 0 0 95.514 0 213.333s95.518 213.333 213.333 213.333c117.828 0 213.333-95.514 213.333-213.333S331.157 0 213.333 0zm-39.134 322.918l-93.935-93.931 31.309-31.309 62.626 62.622 140.894-140.898 31.309 31.309-172.203 172.207z" fill="#959595"/></svg>
        </div>
        <div class="column-title-text">
          Jogadores escolhidos
        </div>
      </div>
      ${getCardsForResult(votedPlayersArrayOfIds)}
    </div>
  `
}
