import $ from 'jquery'
import { token, votingUrl, appData } from './../../js/constants'
import scrollWindowTo from './../../js/utils'

const hasScrollbar = function hasScroll() {
  if (typeof window.innerWidth === 'number') {
    return window.innerWidth > document.documentElement.clientWidth
  }

  const rootElem = document.documentElement || document.body

  let overflowStyle

  if (typeof rootElem.currentStyle !== 'undefined') {
    overflowStyle = rootElem.currentStyle.overflow
  }

  overflowStyle =
    overflowStyle || window.getComputedStyle(rootElem, '').overflow

  let overflowYStyle

  if (typeof rootElem.currentStyle !== 'undefined') {
    overflowYStyle = rootElem.currentStyle.overflowY
  }

  overflowYStyle =
    overflowYStyle || window.getComputedStyle(rootElem, '').overflowY
  const contentOverflows = rootElem.scrollHeight > rootElem.clientHeight
  const overflowShown =
    /^(visible|auto)$/.test(overflowStyle) ||
    /^(visible|auto)$/.test(overflowYStyle)
  const alwaysShowScroll =
    overflowStyle === 'scroll' || overflowYStyle === 'scroll'

  return (contentOverflows && overflowShown) || alwaysShowScroll
}

/**
 * Close modal
 */
export function closeModal() {
  $('.modal').fadeOut(() => {
    $('body')
      .removeClass('noscroll')
      .attr('style', '')
  })
}

/**
 * Open modal
 */
export function openModal() {
  const $body = $('body')
  if (hasScrollbar()) {
    $body.css('paddingRight', '15px')
  }
  $body.addClass('noscroll')
  $('.modal').fadeIn()
}

/**
 * Key up on document
 * @param {Object} event Event object
 */
function keyupOnDocument(event) {
  if (event.keyCode) {
    const isEscKey = event.keyCode === 27
    if (isEscKey) {
      closeModal()
    }
  } else {
    closeModal()
  }
}

/**
 *
 */
function modalEvents() {
  document
    .querySelector('.button-players-selection')
    .addEventListener('click', openModal, false)

  document
    .querySelector('.modal .close-bt')
    .addEventListener('click', closeModal, false)

  document.addEventListener('keyup', keyupOnDocument, false)
}

export function getPlayersIds(getPlayersFromResult = false) {
  const playersIds = []

  if (getPlayersFromResult) {
    $('.chosen-players-column .card-player').each(function(index) {
      playersIds.push(Number($(this).attr('data-id')))
    })
  } else {
    $('.active-card-player').each(function(index) {
      playersIds.push(Number($(this).attr('data-id')))
    })
  }

  return playersIds
}

function getTotalVotes(players) {
  let totalVotes = 0

  players.forEach(player => {
    totalVotes += player.votos
  })

  return totalVotes
}

function setPlayersVotePercentage(players, totalVotes) {
  return players.map(player => {
    return {
      ...player,
      votePercentage: Math.round((player.votos * 100) / totalVotes),
    }
  })
}

function getPlayerDetailsById(playerId) {
  return appData.players.find(player => player.id === playerId)
}

function getMostVotedPlayers(players) {
  return players
    .map((player, index) => {
      if (index < 10) {
        const playerDetails = getPlayerDetailsById(player.id)

        return /*html*/`
          <div class="card-player">
            <div class="card-player__rank">
              ${index + 1}º
            </div>
            <div class="card-player__profile">
              <div class="card-player__image-container">
                <img class="card-player__image" src="${
                  playerDetails.imagem_mobi
                }">
              </div>
              <div class="card-player__text-details">
                  <div class="card-player__name">${playerDetails.titulo}</div>
                  <div class="card-player__position">${
                    playerDetails.subtitulo
                  }</div>
              </div>
            </div>
            <div class="card-player__voting-details">
              <div class="card-player__voting-bar">
                <div class="card-player__voting-bar-fill" style="width: ${
                  player.votePercentage
                }%">
                </div>
              </div>
              ${player.votePercentage}% dos votos
            </div>
          </div>
        `
      }
    })
    .join('')
}

export function insertResult(votedPlayers, topTenPlayers) {
  document.querySelector('.players-container').innerHTML = /*html*/`
    <div class="share-results-fb-button-container">
      <button class="main-button share-results-fb-button">
        <div class="button-icon">
          <svg viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9.995L10.882 0v5.987H9.823a9.76 9.76 0 0 0-6.946 2.876A9.754 9.754 0 0 0 0 15.807V20l1.75-1.917a12.559 12.559 0 0 1 9.132-4.08v5.986L20 9.995zM1.172 16.987v-1.18c0-2.31.9-4.482 2.534-6.115a8.595 8.595 0 0 1 6.117-2.533h2.231V3.024l6.36 6.97-6.36 6.971v-4.134h-1.051c-3.701 0-7.26 1.51-9.83 4.156z" fill="#FFF" fill-rule="nonzero"/>
          </svg>
        </div>
        <div class="button-label">Compartilhe a sua lista</div>
      </button>
    </div>

    <div class="chosen-players-column">
      <div class="column-title">
        <div class="column-title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.667 426.667"><path d="M213.333 0C95.518 0 0 95.514 0 213.333s95.518 213.333 213.333 213.333c117.828 0 213.333-95.514 213.333-213.333S331.157 0 213.333 0zm-39.134 322.918l-93.935-93.931 31.309-31.309 62.626 62.622 140.894-140.898 31.309 31.309-172.203 172.207z" fill="#959595"/></svg>
        </div>
        <div class="column-title-text">
          Jogadores <br>que você escolheu
        </div>
      </div>
      ${votedPlayers}
    </div>

    <div class="most-voted-players-column">
      <div class="column-title">
        <div class="column-title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.481 19.481"><path d="M10.201.758l2.478 5.865 6.344.545a.5.5 0 0 1 .285.876l-4.812 4.169 1.442 6.202a.5.5 0 0 1-.745.541l-5.452-3.288-5.452 3.288a.5.5 0 0 1-.745-.541l1.442-6.202-4.813-4.17a.5.5 0 0 1 .285-.876l6.344-.545L9.28.758a.5.5 0 0 1 .921 0z" fill="#959595" /></svg>
        </div>
        <div class="column-title-text">
          Os 10 mais votados
        </div>
      </div>
      ${topTenPlayers}
    </div>
  `
}

function setHasVotedOnLocalStorage(votedPlayers, topTenPlayers) {
  localStorage.setItem('hasVoted', true)
  localStorage.setItem('votedPlayers', votedPlayers)
  localStorage.setItem('topTenPlayers', topTenPlayers)
}

function voteInPlayers() {
  const activeCardPlayers = document.querySelectorAll('.active-card-player')
  const activeCardPlayersIds = getPlayersIds()

  document.querySelector('.players-container').innerHTML = /*html*/`
          <div class="loading"></div>
        `

  $.ajax({
    type: 'POST',
    url: votingUrl,
    data: {
      enquete: $('.players-container').attr('data-enquete-id'),
      opcao: activeCardPlayersIds,
      token,
    },
  }).done(function(data) {
    const activeCardPlayersInHTML = Array.prototype.slice
      .call(activeCardPlayers)
      .reduce((total, currValue) => (total += currValue.outerHTML), '')

    // Resultado para trabalhar localhost
    // const resultado = {
    //   msg: 'Voto(s) computado(s) com sucesso.',
    //   resultado: [
    //     { titulo: 'Joao', ordem: 1, votos: 120, id: 60 },
    //     { titulo: 'Joao Vicente Jr', ordem: 1, votos: 40, id: 61 },
    //     { titulo: 'Joao Almeida Prado', ordem: 1, votos: 39, id: 62 },
    //     { titulo: 'Luis Fernando de Almeida', ordem: 1, votos: 34, id: 63 },
    //     { titulo: 'Joao Paulo de Alcantara', ordem: 1, votos: 29, id: 64 },
    //     { titulo: 'Joao Teste ', ordem: 1, votos: 22, id: 66 },
    //     { titulo: 'Dilssinho', ordem: 1, votos: 20, id: 67 },
    //     { titulo: 'Joao', ordem: 1, votos: 16, id: 68 },
    //     { titulo: 'Joao', ordem: 1, votos: 14, id: 69 },
    //     { titulo: 'Joao', ordem: 1, votos: 13, id: 70 },
    //     { titulo: 'Joao', ordem: 1, votos: 12, id: 65 },
    //     { titulo: 'Joao', ordem: 1, votos: 6, id: 71 },
    //   ],
    // }

    const totalVotes = getTotalVotes(data.resultado)

    setHasVotedOnLocalStorage(
      activeCardPlayersInHTML,
      getMostVotedPlayers(setPlayersVotePercentage(data.resultado, totalVotes)),
    )

    insertResult(
      activeCardPlayersInHTML,
      getMostVotedPlayers(setPlayersVotePercentage(data.resultado, totalVotes)),
    )

    scrollWindowTo($('.main-title'))
  })
}

function onVoteFormSubmit() {
  $('.vote-form').on('submit', function(e) {
    e.preventDefault()
    closeModal()
    scrollWindowTo($('.main-title'))
    voteInPlayers()
  })
}

export default function startModal() {
  modalEvents()
  onVoteFormSubmit()
}
