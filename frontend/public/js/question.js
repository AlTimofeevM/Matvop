function getAnswers () {
  var xhr = new XMLHttpRequest()
  let url = window.location.href
  let id = url.slice(url.indexOf('question/') + 9,55)
  console.log(id)
  xhr.open('GET', '/question=' + id, true)

  xhr.onload = function () {
    let data = JSON.parse(xhr.responseText)
    console.log(data)
    let question = '', answer = ''
    question += '<h4><div class="title">' + data.Question.title + '</div></h4>'
    question += '<div class="desription">' + data.Question.description + '</div>'
    question += '<br/>'

    answer += '<form method="post" action="/answer=' + data.Question._id + '">'
    answer += '<h4><label for="exampleInputTitle1">Ваш ответ:</label></h4>'
    answer += '<div class="form-group"><textarea rows="10" class="form-control" name="description" required></textarea></div>'
    answer += '<button type="submit" class="btn btn-primary">Ответить</button>'
    answer += '</form>'

    document.getElementById('question').innerHTML = question
    document.getElementById('answer').innerHTML = answer
  }
  xhr.send()
};

getAnswers()