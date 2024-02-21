import $ from 'jquery'

export default function scrollWindowTo(element) {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: element.offset().top,
    },
    500,
  )
}
