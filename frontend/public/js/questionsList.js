function getQestion() {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', '/qwerty', true)
  
    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText)
        
        let content = ''
        let len = data.Quests.length
        for (let i = 0; i < len; ++i){
            content += '<h4><div class="title">' + data.Quests[i].title + '</div></h4>'
            content += '<div class="desription">' + data.Quests[i].description + '</div>'
            content += '<form method="get" action="/question/' + data.Quests[i]._id + '" class="ml-4  text-right"><button type="submit" class="btn btn-secondary mr-6">Ответить</button></form>'
            content += '<br/>'
        }
        document.getElementById('questions').innerHTML = content
    }
    xhr.send()
}




getQestion()