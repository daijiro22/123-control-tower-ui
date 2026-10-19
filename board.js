/* 123 control-tower: 状況ボードの表示部品（キャラ: トウ × 組み立て: 吹き出し＋カード）。データは持たない。 */
(function () {
const root = document.getElementById('cx-root');
if (!root || root.dataset.ready) return;
root.dataset.ready = '1';
const style = document.createElement('style');
style.textContent = ".cx{font-size:14px;color:var(--text-primary)}\n.cx button{font:inherit;color:inherit;height:auto}\n.cx-row{display:flex;flex-wrap:wrap;gap:8px}\n.cx-pill{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 16px;border-radius:var(--cx-r,999px);border:0.5px solid var(--border-strong);background:var(--surface-2);cursor:pointer;white-space:nowrap}\n.cx-pill:hover{background:var(--surface-1)}\n.cx-pill.on{background:var(--text-primary);color:var(--surface-2);border-color:var(--text-primary)}\n.cx-pill i{font-size:18px}\n.cx-dot{width:10px;height:10px;border-radius:50%;flex:0 0 10px}\n.cx-chip{font-size:12px;padding:3px 10px;border-radius:999px;white-space:nowrap}\n.cx-muted{font-size:12px;color:var(--text-secondary)}\n.cx-clamp{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.cx-detail{animation:cx-in .18s ease-out}\n.cx-full{font-size:14px;line-height:1.7;color:var(--text-secondary);margin:0 0 10px}\n.cx-say{display:flex;gap:8px;margin:10px 0 0}\n.cx-say input{flex:1;min-width:0;height:44px;border-radius:var(--cx-r,22px);padding:0 16px}\n.cx-send{flex:0 0 44px;width:44px;height:44px;padding:0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer}\n.cx-err{font-size:12px;color:var(--text-danger);margin:6px 0 0 16px}\n.cx-err:empty{display:none}\n.cx-old p{font-size:13px;color:var(--text-secondary);margin:6px 6px 0}\n.cx-chara{padding:0;border:0;background:none;border-radius:50%;cursor:pointer}\n.cx-hopw,.cx-bobw{display:block;width:100%;height:100%;transform-origin:50% 100%}\n.cx-hopw.hop{animation:cx-hop .5s ease-out}\n.cx-bobw{animation:cx-bob 3.4s ease-in-out infinite}\n#cx-img{display:block;width:100%;height:100%;object-fit:contain;transition:transform .25s ease-out;pointer-events:none}\n.cx-hopg{transform-box:fill-box;transform-origin:50% 100%}\n.cx-hopg.hop{animation:cx-hop .5s ease-out}\n.cx-bob{animation:cx-bob 3.4s ease-in-out infinite}\n.cx-deco{animation:cx-bob 1.8s ease-in-out infinite}\n.cx-blink{animation:cx-blink 4.6s infinite;transform-box:fill-box;transform-origin:center}\n.cx-ping{transform-box:fill-box;transform-origin:center;animation:cx-ping 2.4s ease-out infinite}\n.cx-ping.d2{animation-delay:1.2s}\n.cx-spin{display:inline-block;animation:cx-spin 1.6s linear infinite}\n.cx-wob{transform-box:fill-box;transform-origin:50% 100%;animation:cx-wob 1.4s ease-in-out infinite}\n@keyframes cx-bob{50%{transform:translateY(-3px)}}\n@keyframes cx-hop{30%{transform:translateY(-12px)}55%{transform:translateY(0) scale(1.05,.93)}75%{transform:scale(.98,1.02)}}\n@keyframes cx-blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}\n@keyframes cx-ping{from{transform:scale(1);opacity:.7}to{transform:scale(3.2);opacity:0}}\n@keyframes cx-spin{to{transform:rotate(360deg)}}\n@keyframes cx-wob{0%,100%{transform:rotate(0)}25%{transform:rotate(-6deg)}75%{transform:rotate(6deg)}}\n@keyframes cx-in{from{opacity:0;transform:translateY(-4px)}}\n@media (prefers-reduced-motion:reduce){.cx *{animation:none!important}}\n\n.tw-hero{display:flex;gap:12px;align-items:flex-end;margin:4px 0 16px}\n.tw-hero .cx-chara{flex:0 0 112px;width:112px;height:112px}\n.tw-bubble{flex:1;min-width:0;background:var(--surface-1);border-radius:22px 22px 22px 6px;padding:12px 16px 14px;margin-bottom:22px}\n.tw-hi{font-size:12px;color:var(--text-secondary);margin:0 0 2px}\n.tw-main{font-size:17px;font-weight:500;line-height:1.55;margin:0;min-height:1.55em}\n.tw-sub{font-size:13px;color:var(--text-secondary);line-height:1.6;margin:4px 0 0}\n.tw-bubble .cx-row{margin:12px 0 0}\n.tw-fh{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-secondary);margin:20px 6px 8px}\n.tw-card{background:var(--surface-2);border:0.5px solid var(--border);border-radius:20px;margin:0 0 8px;overflow:hidden}\n.tw-head{display:flex;gap:12px;align-items:center;width:100%;min-height:68px;padding:12px 14px;border:0;border-radius:0;background:none;text-align:left;cursor:pointer}\n.tw-head:hover{background:var(--surface-1)}\n.tw-ava{flex:0 0 42px;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px}\n.tw-mid{flex:1;min-width:0;display:block}\n.tw-t,.tw-n{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.tw-t{font-size:15px;font-weight:500}\n.tw-n{font-size:13px;color:var(--text-secondary);margin-top:2px}\n.tw-meta{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:6px}\n.tw-card .cx-detail{padding:0 14px 14px 68px}\n.tw-talk{margin:20px 0 0}\n@media (max-width:520px){.tw-hero .cx-chara{flex-basis:84px;width:84px;height:84px}.tw-main{font-size:16px}.tw-card .cx-detail{padding-left:14px}}\n";
document.head.appendChild(style);
root.innerHTML = "<div class=\"cx\">\n<div class=\"tw-hero\">\n<button class=\"cx-chara\" id=\"cx-chara\" aria-label=\"トウをなでる\">\n<svg id=\"cx-svg\" viewBox=\"0 0 120 120\" width=\"100%\" height=\"100%\" aria-hidden=\"true\">\n<ellipse cx=\"60\" cy=\"114\" rx=\"27\" ry=\"4\" fill=\"var(--border)\"/>\n<g class=\"cx-hopg\" id=\"cx-hop\"><g class=\"cx-bob\">\n<g id=\"cx-ping\" style=\"display:none\"><circle class=\"cx-ping\" cx=\"60\" cy=\"12\" r=\"6\" fill=\"none\" stroke=\"#1D9E75\" stroke-width=\"2\"/><circle class=\"cx-ping d2\" cx=\"60\" cy=\"12\" r=\"6\" fill=\"none\" stroke=\"#1D9E75\" stroke-width=\"2\"/></g>\n<path d=\"M60 30V17\" stroke=\"#7F77DD\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n<circle id=\"cx-lamp\" cx=\"60\" cy=\"12\" r=\"6\" fill=\"#1D9E75\"/>\n<ellipse cx=\"19\" cy=\"82\" rx=\"7\" ry=\"10\" fill=\"#AFA9EC\"/><ellipse cx=\"101\" cy=\"82\" rx=\"7\" ry=\"10\" fill=\"#AFA9EC\"/>\n<path d=\"M60 28C89 28 102 50 102 75C102 99 85 109 60 109C35 109 18 99 18 75C18 50 31 28 60 28Z\" fill=\"#CECBF6\"/>\n<ellipse cx=\"60\" cy=\"99\" rx=\"21\" ry=\"8\" fill=\"#EEEDFE\"/>\n<g id=\"cx-look\"><g class=\"cx-blink\" id=\"cx-eyes\"><ellipse cx=\"46\" cy=\"66\" rx=\"6\" ry=\"8\" fill=\"#26215C\"/><ellipse cx=\"74\" cy=\"66\" rx=\"6\" ry=\"8\" fill=\"#26215C\"/><circle cx=\"48.2\" cy=\"62.5\" r=\"2.2\" fill=\"#fff\"/><circle cx=\"76.2\" cy=\"62.5\" r=\"2.2\" fill=\"#fff\"/></g>\n<g id=\"cx-zz\" style=\"display:none\" fill=\"none\" stroke=\"#26215C\" stroke-width=\"2.6\" stroke-linecap=\"round\"><path d=\"M40 66q6 5 12 0\"/><path d=\"M68 66q6 5 12 0\"/></g></g>\n<ellipse cx=\"35\" cy=\"80\" rx=\"6.5\" ry=\"3.8\" fill=\"#ED93B1\" opacity=\".75\"/><ellipse cx=\"85\" cy=\"80\" rx=\"6.5\" ry=\"3.8\" fill=\"#ED93B1\" opacity=\".75\"/>\n<path id=\"cx-mouth\" d=\"M52 83Q60 91 68 83\" fill=\"none\" stroke=\"#26215C\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<g id=\"cx-deco\" class=\"cx-deco\"></g>\n</g></g>\n</svg>\n</button>\n<div class=\"tw-bubble\" aria-live=\"polite\">\n<p class=\"tw-hi\" id=\"cx-hi\"></p>\n<p class=\"tw-main\" id=\"cx-main\"></p>\n<p class=\"tw-sub\" id=\"cx-sub\"></p>\n<div class=\"cx-row\" id=\"cx-chips\"></div>\n</div>\n</div>\n<div class=\"cx-row\" id=\"cx-filters\"></div>\n<div id=\"cx-list\"></div>\n<div class=\"cx-old\" id=\"cx-old\"></div>\n<div class=\"tw-talk\" id=\"cx-talk\"></div>\n<p class=\"cx-muted\" id=\"cx-foot\" style=\"margin:10px 6px 0\"></p>\n</div>\n";
const D = JSON.parse(document.getElementById('cx-data').textContent);
const $ = id => document.getElementById(id);
const S = {
  wait: {l: 'あなた待ち', bg: 'var(--bg-warning)', fg: 'var(--text-warning)', ic: 'ti-message-dots', o: 0},
  error: {l: 'エラー', bg: 'var(--bg-danger)', fg: 'var(--text-danger)', ic: 'ti-alert-triangle', o: 1},
  run: {l: '動いてる', bg: 'var(--bg-success)', fg: 'var(--text-success)', ic: 'ti-loader-2', o: 2},
  done: {l: '終わった', bg: 'var(--surface-1)', fg: 'var(--text-secondary)', ic: 'ti-check', o: 3}
};
const FILTERS = [['all', 'すべて'], ['wait', 'あなた待ち'], ['error', 'エラー'], ['run', '動いてる'], ['done', '終わった'], ['nolog', 'ログまだ']];
const LOG_ASK = '作業ログを記録してください（/wrap-up の手順。記録することは施主の了承済み）';
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let filter = 'all', home = ['', ''], mood = 'happy', typeT = 0, petN = 0;
function el(tag, attrs, text) {
  const e = document.createElement(tag);
  for (const k in (attrs || {})) {
    if (k === 'style') e.style.cssText = attrs[k];
    else if (k === 'class') e.className = attrs[k];
    else e.setAttribute(k, attrs[k]);
  }
  if (text != null) e.textContent = text;
  return e;
}
function icon(name, cls) { return el('i', {class: 'ti ' + name + (cls ? ' ' + cls : ''), 'aria-hidden': 'true'}); }
function short(t, n) { t = String(t || ''); return t.length > n ? t.slice(0, n) + '…' : t; }
function folderOf(cwd) {
  if (!cwd) return 'フォルダなし';
  let p = String(cwd).replace(/\//g, '\\');
  const w = p.toLowerCase().indexOf('\\.claude\\worktrees\\');
  if (w >= 0) p = p.slice(0, w);
  p = p.replace(/\\+$/, '');
  if (/^[A-Za-z]:$/.test(p) || /scratch-workspaces/i.test(p)) return 'フォルダなし';
  return p.split('\\').pop();
}
function ago(iso) {
  const m = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (!isFinite(m)) return '';
  if (m < 1) return 'たった今';
  if (m < 60) return m + '分前';
  const h = Math.round(m / 60);
  return h < 48 ? h + '時間前' : Math.round(h / 24) + '日前';
}
function ymd(iso) {
  const d = new Date(iso);
  if (!isFinite(d)) return '';
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function stKey(s) { return S[s.state] ? s.state : 'done'; }
function logInfo(s) {
  const k = stKey(s), ok = {bg: 'var(--bg-success)', fg: 'var(--text-success)'}, warn = {bg: 'var(--bg-warning)', fg: 'var(--text-warning)'}, plain = {bg: 'var(--surface-1)', fg: 'var(--text-secondary)'};
  if (!s.log) {
    const need = k === 'done' || k === 'error';
    return Object.assign({chip: 'ログまだ', full: 'ログ: まだ書いていない', need}, need ? warn : plain);
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})_?(.*)$/.exec(s.log);
  if (!m) return Object.assign({chip: 'ログあり', full: 'ログ: ' + s.log, need: false}, ok);
  const md = Number(m[2]) + '/' + Number(m[3]), last = ymd(s.last);
  if (!s.logFresh && last && m[1] + '-' + m[2] + '-' + m[3] < last) {
    return Object.assign({chip: 'ログ ' + md + ' まで', full: 'ログ: ' + md + ' の分まで（その後の作業は未記録）· ' + m[4], need: k !== 'run'}, warn);
  }
  return Object.assign({chip: 'ログ ' + md, full: 'ログ: ' + md + ' ' + m[4], need: false}, ok);
}
function hit(s, f) { return f === 'all' || (f === 'nolog' ? logInfo(s).need : stKey(s) === f); }
function count(f) { return D.sessions.filter(s => hit(s, f)).length; }
function names(f) {
  const l = D.sessions.filter(s => hit(s, f));
  return l.slice(0, 2).map(s => '『' + short(s.title, 12) + '』').join('') + (l.length > 2 ? ' ほか ' + (l.length - 2) + ' 件' : '');
}
function byRank(a, b) { return S[stKey(a)].o - S[stKey(b)].o || (Date.parse(b.last) || 0) - (Date.parse(a.last) || 0); }
function shown() { return D.sessions.filter(s => hit(s, filter)); }
function groups(list) {
  const g = {};
  list.forEach(s => { const f = folderOf(s.cwd); (g[f] = g[f] || []).push(s); });
  const rank = l => Math.min(...l.map(s => S[stKey(s)].o));
  const recent = l => Math.max(...l.map(s => Date.parse(s.last) || 0));
  return Object.keys(g).sort((a, b) => rank(g[a]) - rank(g[b]) || recent(g[b]) - recent(g[a])).map(f => [f, g[f].sort(byRank)]);
}
let ART = '', artBack = 0, hold = '';
function face(name, ms) {
  const img = $('cx-img');
  if (!img || !ART) return;
  clearTimeout(artBack);
  img.src = ART + name + (V.ext || '.png');
  if (ms) artBack = setTimeout(() => face(mood), ms);
}
function useArt() {
  const c = $('cx-chara');
  if (!ART || !c) return;
  c.textContent = '';
  const hw = el('span', {class: 'cx-hopw', id: 'cx-hop'}), bw = el('span', {class: 'cx-bobw'});
  const img = el('img', {id: 'cx-img', alt: '', draggable: 'false'});
  img.onerror = () => { img.style.visibility = 'hidden'; };
  bw.appendChild(img);
  hw.appendChild(bw);
  c.appendChild(hw);
  ['happy', 'call', 'worry', 'hmm', 'sleep', 'talk', 'wave', 'go', 'joy'].forEach(n => { const p = new Image(); p.src = ART + n + (V.ext || '.png'); });
  if ($('cx-svgchar')) $('cx-svgchar').remove();
}
function mouth(d, fill) {
  const p = $('cx-mouth');
  if (!p || !d) return;
  p.setAttribute('d', d);
  p.setAttribute('fill', fill || 'none');
}
function setMood(m) {
  mood = m;
  const c = MOOD[m] || {};
  if ($('cx-lamp') && c.lamp) $('cx-lamp').setAttribute('fill', c.lamp);
  if ($('cx-deco')) $('cx-deco').innerHTML = c.deco || '';
  if ($('cx-eyes')) $('cx-eyes').style.display = c.sleep ? 'none' : '';
  if ($('cx-zz')) $('cx-zz').style.display = c.sleep ? '' : 'none';
  if ($('cx-ping')) $('cx-ping').style.display = count('run') ? '' : 'none';
  mouth(c.mouth, c.fill);
  face(m);
  if (V.mood) V.mood(m, c);
}
function hop() {
  const g = $('cx-hop');
  if (!g) return;
  g.classList.remove('hop');
  g.getBoundingClientRect();
  g.classList.add('hop');
}
function type(mEl, sEl, main, sub, done) {
  clearInterval(typeT);
  const c = MOOD[mood] || {};
  if (sEl) sEl.textContent = '';
  const after = () => { face(hold || mood, hold ? 1600 : 0); hold = ''; };
  if (still || !mEl) {
    if (mEl) mEl.textContent = main;
    if (sEl) sEl.textContent = sub || '';
    after();
    if (done) done();
    return;
  }
  let i = 0;
  mEl.textContent = '';
  face('talk');
  typeT = setInterval(() => {
    i++;
    mEl.textContent = main.slice(0, i);
    if (OPEN && i % 3 === 0) mouth(i % 6 ? OPEN[0] : c.mouth, i % 6 ? OPEN[1] : c.fill);
    if (i >= main.length) {
      clearInterval(typeT);
      mouth(c.mouth, c.fill);
      after();
      if (sEl) sEl.textContent = sub || '';
      if (done) done();
    }
  }, 24);
}
function say(main, sub) { if (V.say) return V.say(main, sub); type($('cx-main'), $('cx-sub'), main, sub); }
function act(line, s, prompt) {
  hold = 'go';
  say(line, s ? '『' + short(s.title, 18) + '』' : '');
  hop();
  setTimeout(() => sendPrompt(prompt), 450);
}
function pill(ic, label, fn, on) {
  const b = el('button', {class: 'cx-pill' + (on ? ' on' : '')});
  if (ic) b.appendChild(typeof ic === 'string' ? icon(ic) : ic);
  b.appendChild(el('span', null, label));
  b.onclick = fn;
  return b;
}
function sayBox(ph, label, fn) {
  const w = el('div'), f = el('div', {class: 'cx-say'});
  const inp = el('input', {type: 'text', placeholder: ph, 'aria-label': label});
  const go = el('button', {class: 'cx-send', 'aria-label': '送る'});
  const err = el('p', {class: 'cx-err', role: 'alert'});
  go.appendChild(icon('ti-send'));
  const send = () => {
    const t = inp.value.trim();
    if (!t) { err.textContent = '書いてから送ってね'; return; }
    if (V.echo) V.echo(t);
    inp.value = '';
    fn(t);
  };
  inp.oninput = () => { err.textContent = ''; };
  inp.onkeydown = e => { if (e.key === 'Enter' && !e.isComposing) send(); };
  go.onclick = send;
  f.append(inp, go);
  w.append(f, err);
  return w;
}
function status() {
  const e = count('error'), w = count('wait'), n = count('nolog'), r = count('run');
  if (e) return ['worry', '止まっちゃったのが ' + e + ' 件あるよ。先に見てあげて', '止まってる: ' + names('error')];
  if (w) return ['call', 'あなたの返事を待ってるのが ' + w + ' 件あるよ', '待ってる: ' + names('wait')];
  if (n) return ['hmm', '終わったのにログがまだなのが ' + n + ' 件', 'ログまだ: ' + names('nolog')];
  if (r) return ['happy', 'いま ' + r + ' 件が動いてるよ。順調だね', ''];
  return ['sleep', 'みんな静かだね。新しく何か始める？', ''];
}
function choose(k) {
  filter = k;
  if ($('cx-filters')) filterBar($('cx-filters'));
  V.render();
  const label = FILTERS.find(x => x[0] === k)[1];
  if (k === 'all') say(home[0], home[1]);
  else say(label + 'は ' + count(k) + ' 件だよ', count(k) ? names(k) : '');
}
function filterBar(box) {
  box.textContent = '';
  FILTERS.forEach(([k, label]) => {
    const n = count(k);
    if (k === 'error' && !n) return;
    const mark = k === 'nolog' ? icon('ti-notebook') : k === 'all' ? null : el('span', {class: 'cx-dot', style: 'background:' + S[k].fg});
    const b = pill(mark, label, () => choose(k), filter === k);
    b.appendChild(el('span', {style: 'font-weight:500'}, String(n)));
    b.setAttribute('aria-pressed', String(filter === k));
    box.appendChild(b);
  });
}
function chips(box) {
  box.textContent = '';
  if (count('wait')) box.appendChild(pill(el('span', {class: 'cx-dot', style: 'background:var(--text-warning)'}), '待ってるのを見る', () => choose('wait')));
  if (count('nolog')) box.appendChild(pill('ti-notebook', 'ログまだを見る', () => choose('nolog')));
  box.appendChild(pill('ti-refresh', 'ボード更新 ↗', () => act('最新の様子を見てくるね', null, 'ボード更新')));
}
function detail(s) {
  const li = logInfo(s), b = el('div', {class: 'cx-detail'});
  if (s.note) b.appendChild(el('p', {class: 'cx-full'}, s.note));
  b.appendChild(el('p', {class: 'cx-full', style: 'font-size:13px'}, li.full));
  const acts = el('div', {class: 'cx-row'});
  acts.appendChild(pill('ti-search', '詳しく ↗', () => act('くわしく見てくるね', s, '詳しく → ' + s.title + ' (' + s.id + ')')));
  if (li.need) acts.appendChild(pill('ti-notebook', 'ログを書かせる ↗', () => act('ログを書くよう頼んでくるね', s, '指示 → ' + s.title + ' (' + s.id + ')\n' + LOG_ASK)));
  b.appendChild(acts);
  b.appendChild(sayBox(V.ph || 'このセッションに伝えること', s.title + ' への指示', t => act('「' + short(s.title, 12) + '」に伝えてくるね', s, '指示 → ' + s.title + ' (' + s.id + ')\n' + t)));
  return b;
}
function talkAbout(s) { say(s.note || S[stKey(s)].l, '『' + short(s.title, 18) + '』のこと'); }
function toggle(wrap, head, s) {
  let body = null;
  head.setAttribute('aria-expanded', 'false');
  head.onclick = () => {
    if (body) { body.remove(); body = null; head.setAttribute('aria-expanded', 'false'); say(home[0], home[1]); return; }
    body = detail(s);
    wrap.appendChild(body);
    head.setAttribute('aria-expanded', 'true');
    talkAbout(s);
  };
}
function oldList(box) {
  const old = D.old || [];
  if (!old.length) return;
  const total = D.oldTotal || old.length;
  const ul = el('div', {style: 'display:none;margin:4px 0 0'});
  old.forEach(s => ul.appendChild(el('p', null, folderOf(s.cwd) + ' · ' + s.title + ' · ' + ago(s.last) + (s.log ? '' : ' · ログなし'))));
  const b = pill('ti-archive', 'しばらく動きのないもの ' + total + ' 件', () => {
    const open = ul.style.display === 'none';
    ul.style.display = open ? 'block' : 'none';
    b.classList.toggle('on', open);
  });
  b.style.marginTop = '16px';
  box.append(b, ul);
}
function tips() {
  const t = ['えへへ、くすぐったい', '押すと、そのセッションのことを話すね', 'いちばん下の欄から、直接話しかけてもいいよ', '『ボード更新』で最新の様子にするね'];
  if (count('nolog')) t.splice(2, 0, 'ログまだの子は『ログを書かせる』で頼めるよ');
  return t;
}
function pet() {
  hop();
  if (mood === 'sleep') {
    if ($('cx-eyes')) $('cx-eyes').style.display = '';
    if ($('cx-zz')) $('cx-zz').style.display = 'none';
    hold = 'wave';
    say('ん…おきてるよ', '');
    setTimeout(() => setMood('sleep'), 2400);
    return;
  }
  const t = tips();
  hold = petN % 2 ? 'joy' : 'wave';
  say(t[petN++ % t.length], '');
}
function wire() {
  if ($('cx-chara')) { $('cx-chara').onclick = () => (V.pet || pet)(); $('cx-chara').setAttribute('aria-label', V.name + 'をなでる'); }
  let raf = 0;
  document.addEventListener('pointermove', e => {
    if ($('cx-img')) {
      const r = $('cx-img').getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / 300));
      $('cx-img').style.transform = 'translateX(' + (dx * 3).toFixed(1) + 'px) rotate(' + (dx * 5).toFixed(1) + 'deg)';
      return;
    }
    if (raf || !$('cx-look') || !$('cx-svg')) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const r = $('cx-svg').getBoundingClientRect(), k = V.look || 1;
      const dx = Math.max(-3.5, Math.min(3.5, (e.clientX - r.left - r.width / 2) / 50)) * k;
      const dy = Math.max(-2.5, Math.min(2.5, (e.clientY - r.top - r.height * 0.55) / 60)) * k;
      $('cx-look').setAttribute('transform', 'translate(' + dx.toFixed(2) + ' ' + dy.toFixed(2) + ')');
    });
  });
  document.addEventListener('pointerleave', () => { if ($('cx-look')) $('cx-look').removeAttribute('transform'); });
  if ($('cx-talk')) $('cx-talk').appendChild(sayBox(V.name + 'に話しかける（例: 返事待ちを順番に見せて）', V.name + 'に話しかける', t => act('聞いてみるね', null, t)));
}
function boot() {
  const at = new Date(D.at), hr = isFinite(at) ? at.getHours() : new Date().getHours();
  const greet = hr < 5 ? '夜ふかしだね' : hr < 10 ? 'おはよう' : hr < 17 ? 'おつかれさま' : 'こんばんは';
  const hm = isFinite(at) ? at.toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'}) : '';
  if (window.__NAME) V.name = window.__NAME;
  ART = window.__NOART ? '' : (window.__ART || D.art || V.art || '');
  useArt();
  wire();
  const st = status();
  home = [D.say || st[1], st[2]];
  setMood(st[0]);
  if ($('cx-filters')) filterBar($('cx-filters'));
  if ($('cx-chips')) chips($('cx-chips'));
  V.render();
  if ($('cx-old')) oldList($('cx-old'));
  if ($('cx-hi')) $('cx-hi').textContent = V.name + ' · ' + greet + (hm ? ' · ' + hm + ' の様子' : '');
  if ($('cx-foot')) $('cx-foot').textContent = '48 時間以内 ' + D.sessions.length + ' 件' + (hm ? ' · ' + hm + ' 取得' : '');
  say(home[0], home[1]);
}

const MOOD = {
  happy: {lamp: '#1D9E75', mouth: 'M52 83Q60 91 68 83', deco: '<path d="M99 24l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FAC775"/><path d="M109 40l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#FAC775"/>'},
  call: {lamp: '#EF9F27', mouth: 'M54 84Q60 92 66 84Z', fill: '#26215C', deco: '<rect x="98" y="20" width="6" height="14" rx="3" fill="#EF9F27"/><circle cx="101" cy="40" r="3.2" fill="#EF9F27"/>'},
  worry: {lamp: '#E24B4A', mouth: 'M53 88Q60 82 67 88', deco: '<path d="M100 38c0 0-5 6-5 9.5a5 5 0 0 0 10 0c0-3.5-5-9.5-5-9.5z" fill="#85B7EB"/>'},
  hmm: {lamp: '#7F77DD', mouth: 'M54 86h12', deco: '<circle cx="96" cy="34" r="2.5" fill="#AFA9EC"/><circle cx="103" cy="26" r="3.5" fill="#AFA9EC"/><circle cx="111" cy="16" r="4.5" fill="#AFA9EC"/>'},
  sleep: {lamp: '#B4B2A9', sleep: true, mouth: 'M57 86a3 3 0 0 0 6 0a3 3 0 0 0-6 0', deco: '<path d="M94 30h8l-8 9h8M105 16h6l-6 7h6" fill="none" stroke="#888780" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'}
};
const OPEN = ['M54 84Q60 90 66 84Q60 81 54 84Z', '#26215C'];
const V = {
  name: 'トウ',
  art: 'https://cdn.jsdelivr.net/gh/daijiro22/123-control-tower-ui@v1.0.0/tou/',
  ext: '.webp',
  render() {
    const box = $('cx-list');
    box.textContent = '';
    groups(shown()).forEach(([f, list]) => {
      const h = el('div', {class: 'tw-fh'});
      h.append(icon('ti-folder'), el('span', null, f + '（' + list.length + '）'));
      box.appendChild(h);
      list.forEach(s => {
        const k = stKey(s), st = S[k], li = logInfo(s);
        const wrap = el('div', {class: 'tw-card'}), head = el('button', {class: 'tw-head'});
        const ava = el('span', {class: 'tw-ava', style: 'background:' + st.bg + ';color:' + st.fg});
        ava.appendChild(icon(s.sub ? 'ti-hourglass' : st.ic, k === 'run' && !s.sub ? 'cx-spin' : ''));
        const mid = el('span', {class: 'tw-mid'});
        mid.append(el('span', {class: 'tw-t'}, s.title), el('span', {class: 'tw-n'}, (s.sub || st.l) + (s.note ? ' · ' + s.note : '')));
        const meta = el('span', {class: 'tw-meta'});
        meta.append(el('span', {class: 'cx-muted'}, ago(s.last)), el('span', {class: 'cx-chip', style: 'background:' + li.bg + ';color:' + li.fg}, li.chip));
        head.append(ava, mid, meta);
        wrap.appendChild(head);
        toggle(wrap, head, s);
        box.appendChild(wrap);
      });
    });
    if (!box.children.length) box.appendChild(el('p', {class: 'cx-muted', style: 'margin:16px 6px'}, 'ここは空っぽだよ'));
  }
};
boot();
})();
