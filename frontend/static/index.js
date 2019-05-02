function add(value) {
  var url = "/api?cmd=set&key=messages&value=" + value;
  return fetch(url).then(response => response.json());
}

function fetchAll() {
  var url = "/api?cmd=get&key=messages";
  return fetch(url).then(response => response.json());
}

function buildList(items) {
  return items.map(item => {
    var li = document.createElement("li");
    li.innerHTML = item;
    return li;
  });
}

function mountList(lis) {
  var list = document.getElementById("messages");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  lis.forEach(li => {
    list.appendChild(li);
  });
}

function displayList() {
  fetchAll()
    .then(response => {
      debugger;
      if (!response || !response.reply) return [];
      return response.reply;
    })
    .then(buildList)
    .then(mountList);
}

(function() {
  var input = document.getElementById("value");
  var button = document.getElementById("submit");

  displayList();

  button.addEventListener("click", function(event) {
    add(input.value)
      .then(displayList)
      .catch(console.log);
  });
})();
