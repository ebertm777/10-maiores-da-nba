import $ from 'jquery'
import 'jquery-sticky'
import initCardPlayers from './../components/card-player/card-player'
import startModal from './../components/modal/modal'

export default function initEvents(data) {
  $('.players-container').attr('data-enquete-id', data.id)

  initCardPlayers(data)
  startModal()

  $('.button-players-selection').sticky({
    topSpacing: 70,
  })
}
