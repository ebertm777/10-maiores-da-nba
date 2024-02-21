export default function loadFacebookApi() {
  // this loads the Facebook API
  ;(function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')

  window.fbAsyncInit = function() {
    var appId = '2480323085385483'
    FB.init({
      appId: appId,
      xfbml: true,
      version: 'v3.3',
    })
  }
}
