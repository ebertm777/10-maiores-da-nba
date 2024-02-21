import $ from 'jquery'
import 'whatwg-fetch'
import initEvents from './assets/js/events'
import { insertResultFromFacebook } from './assets/components/card-player/card-player'
import initBtsShare from './assets/components/bts-compartilhar/bts-compartilhar'
import './assets/scss/main.scss'
import dataUrl, { appData } from './assets/js/constants'

function getQueryParameterByName(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

document.addEventListener('DOMContentLoaded', function() {
  initBtsShare()

  fetch(dataUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      appData.players = data.itens

      if (getQueryParameterByName('players')) {
        insertResultFromFacebook(JSON.parse(getQueryParameterByName('players')))
      } else {
        initEvents(data)
      }

      $(document).on('click', '.call-to-vote', (e) => {
        e.preventDefault()

        initEvents(data)
      })

      document
        .querySelector('.modal-warning-container')
        .classList.add('show-container')
    })
    .catch(err => {
      console.log('err', err)
    })
})
