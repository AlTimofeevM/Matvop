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

    let answers = ''
    console.log(data.Ans)
    let len = data.Ans.length
    for (let i = 0; i < len; ++i){
      answers += '<h4><div class="title">' + data.Ans[i].answer + '</div></h4>'
      answers += '<form method="post" action="/upscore>'
      answers += '<button type="submit">&and;</button>'
      answers += '</form>'
      answers += '<div class="score">' + data.Ans[i].score + '</div>'
      answers += '<form method="post" action="/downscore">'
      answers += '<button type="submit">&or;</button>'
      answers += '</form>'
      answers += '<br/>'
    }

    document.getElementById('question').innerHTML = question
    document.getElementById('answers').innerHTML = answers
    document.getElementById('answer').innerHTML = answer
  }
  xhr.send()
};

getAnswers()