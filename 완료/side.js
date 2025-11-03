(function(){
  function setup(menu){
    if(!menu) return;
    var scope = menu.getAttribute('data-scope') || 'side';
    var KEY = 'side.clean.activeIndex.' + scope;
    var links = function(){ return Array.prototype.slice.call(menu.querySelectorAll('a')); };

    function setActive(a){
      var current = menu.querySelector('.side-choice');
      if(current && current !== a){
        current.classList.remove('side-choice');
        current.classList.add('side');
        current.removeAttribute('aria-current');
      }
      a.classList.remove('side');
      a.classList.add('side-choice');
      a.setAttribute('aria-current','page');
    }

    // restore saved active
    try{
      var saved = localStorage.getItem(KEY);
      if(saved !== null){
        var idx = parseInt(saved,10);
        var items = links();
        if(items[idx]) setActive(items[idx]);
      }
    }catch(e){ /* ignore storage errors */ }

    // click: prevent jump for # / empty, toggle active, persist
    menu.addEventListener('click', function(e){
      var a = e.target.closest('a'); if(!a || !menu.contains(a)) return;
      var href = (a.getAttribute('href')||'').trim();
      if(href === '' || href === '#') e.preventDefault();
      setActive(a);
      try{
        var idx = links().indexOf(a);
        if(idx > -1) localStorage.setItem(KEY, String(idx));
      }catch(e){ /* ignore */ }
    });

    // keyboard: Enter/Space to activate
    menu.addEventListener('keydown', function(e){
      var a = e.target.closest('a'); if(!a) return;
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        a.click();
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.sideMenu').forEach(setup);
  });
})();