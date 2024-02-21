import $ from 'jquery'
import loadFacebookApi from './facebook-api'
import { getPlayersIds } from './../modal/modal'

export default function initBtsShare() {
  loadFacebookApi()

  $(document).on('click', '.share-results-fb-button', function(event) {
    event.preventDefault()
    event.stopImmediatePropagation()

    const playerId = $('.active-card-player').attr('data-id')
    const FBLink = `https://infograficos.oglobo.globo.com/esportes/10-maiores-da-nba.html?players=${JSON.stringify(
      getPlayersIds(true),
    )}`

    FB.ui({
      method: 'share',
      href: FBLink,
      quote: 'Este é meu TOP 10 da história da NBA. Qual é o seu?',
      display: 'popup',
    })
  })

  $('.generic-share-fb').on('click', function(event) {
    event.preventDefault()
    event.stopImmediatePropagation()

    const FBLink =
      'https://infograficos.oglobo.globo.com/esportes/10-maiores-da-nba.html'

    FB.ui({
      method: 'share',
      href: FBLink,
      display: 'popup',
    })
  })
}
