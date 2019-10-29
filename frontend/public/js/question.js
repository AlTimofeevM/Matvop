function getAnswers () {
  var xhr = new XMLHttpRequest()
  let url = window.location.href
  let id = url.slice(url.indexOf('question/') + 5)
  console.log(id)
  xhr.open('GET', '/question=' + ip, true)

  xhr.onload = function () {
    let data = JSON.parse(xhr.responseText)
    console.log(data)
  }
  xhr.send()
};

getAnswers()