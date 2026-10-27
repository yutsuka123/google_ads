// 表示言語（en / ja）の決定と切り替え。各ページから NyLang.init(apply) を呼ぶ。
(function () {
  function read() { try { return localStorage.getItem('nyangailab.lang'); } catch (e) { return null; } }
  function write(lang) { try { localStorage.setItem('nyangailab.lang', lang); } catch (e) {} }
  function detect() {
    const langs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || 'en'];
    for (const l of langs) {
      if (/^ja/i.test(l)) return 'ja';
    }
    return 'en';
  }

  window.NyLang = {
    init: function (apply) {
      const sel = document.getElementById('lang');
      const label = document.getElementById('label-language');
      const run = function (lang) {
        document.documentElement.lang = lang;
        if (label) label.textContent = lang === 'ja' ? '言語' : 'Language';
        write(lang);
        if (apply) apply(lang);
      };
      const saved = read();
      const initial = (saved === 'ja' || saved === 'en') ? saved : detect();
      sel.value = initial;
      run(initial);
      sel.addEventListener('change', function (e) { run(e.target.value); });
    }
  };

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
