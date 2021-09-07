var poolingJs = (function() {
  var maxSize = 5;
  var counter = 0;

  init();

  return {
    getItem: getItem
  };

  function init() {
    var elem = document.createElement('div');
    elem.id = 'toastr-wrap';
    document.body.appendChild(elem);
    elmWrap = document.getElementById('toastr-wrap');
  }

  function canReuse() {
    var item = document.querySelector('.toastr-item.closed');
    return item ? true : false;
  }

  function getItem(type, title, content, keep) {
    counter++;
    var item = document.createElement('div');
    item.classList = `toastr-item opened toastr-${type}`;
    var markup = `
		<div class="toastr-inner">
		<div class="toastr-head">${title}</div>
		<div class="toastr-body">${content}</div>
		<span class="toastr-close"></span>
		</div>
	`;
    item.innerHTML = markup;
    elmWrap.insertBefore(item, elmWrap.firstChild);
    var items = document.getElementsByClassName('toastr-item');
    for (var i = 0; i < items.length; i++) {
      var elm = items[i];

      if (elm.getAttribute('listener') !== 'true') {
        elm.addEventListener('click', a);
        elm.addEventListener('animationend', function(e) {
          if (e.target.classList.contains('closed')) {
            e.target.remove();
          }
        });
        elm.setAttribute('listener', 'true');
      }
    }

    function a(e) {
      if (this.classList.contains('opened')) {
        this.classList.remove('opened');
        this.classList.add('closed');
      } else {
        this.classList.remove('closed');
        this.classList.add('opened');
      }
    }
  }
})();
