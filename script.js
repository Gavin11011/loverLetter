(function () {
  'use strict';

  // 结婚纪念日：2016-10-21
  var WEDDING = new Date(2016, 9, 21);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var cover = document.getElementById('cover');
  var envelope = document.getElementById('envelope');
  var body = document.body;

  // 相伴天数
  function updateDays() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var days = Math.round((today - WEDDING) / 86400000);
    // 纪念日当天或之后显示真实天数；之前也显示，不出现负数
    document.getElementById('days').textContent = Math.max(days, 0);
  }
  updateDays();

  // 拆信
  var opened = false;
  function openLetter() {
    if (opened) return;
    opened = true;
    cover.classList.add('open');
    var wait = reduce ? 100 : 2200;
    setTimeout(function () {
      body.classList.remove('locked');
      window.scrollTo({ top: window.innerHeight, behavior: reduce ? 'auto' : 'smooth' });
    }, wait);
  }
  envelope.addEventListener('click', openLetter);

  // 逐行浮现
  var screens = document.querySelectorAll('[data-screen]');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var items = entry.target.querySelectorAll('.line');
      items.forEach(function (el, i) {
        el.style.transitionDelay = reduce ? '0s' : (i * 0.7) + 's';
        el.classList.add('in');
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.45 });
  screens.forEach(function (s) { io.observe(s); });

  // 再读一遍
  document.getElementById('again').addEventListener('click', function () {
    window.scrollTo({ top: window.innerHeight, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
