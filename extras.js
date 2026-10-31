(()=>{
let lang=store.get('dg_lang','en');
const T=(e,r,k)=>lang==='ru'?r:lang==='kk'?(k||e):e;
const css=document.createElement('style');
css.textContent=`#splash{position:fixed;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);transition:opacity .8s}#splash.out{opacity:0;pointer-events:none}#splash h1{padding:0;margin-top:8px}#garden{display:block}.sc{width:100%;height:auto;border-radius:20px;display:block}.cl{animation:drift 30s linear infinite}@keyframes drift{from{transform:translateX(-60px)}to{transform:translateX(340px)}}.bf{animation:fly 9s ease-in-out infinite alternate}@keyframes fly{to{transform:translate(70px,-26px)}}.mas{display:flex;align-items:center;gap:10px;margin:12px 0}.mas svg{flex:none;cursor:pointer}.bub{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:10px 14px;line-height:1.45;font-size:15px}.eye{transform-box:fill-box;transform-origin:center;animation:bl 5s infinite}@keyframes bl{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}.lang{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:6px 10px;font-size:13px;margin-right:6px}`;
document.head.appendChild(css);

// Splash
try{if(!sessionStorage.getItem('dg_sp')){sessionStorage.setItem('dg_sp','1');const s=document.createElement('div');s.id='splash';s.innerHTML=`<svg viewBox="0 0 80 80" width="110" height="110"><g class="spin">${[0,72,144,216,288].map(a=>`<ellipse cx="40" cy="18" rx="10" ry="16" fill="var(--acc)" opacity=".85" transform="rotate(${a} 40 40)"/>`).join('')}</g><circle cx="40" cy="40" r="9" fill="var(--sun)"/></svg><h1 class="it">Dear Girls</h1><p class="soft">a soft place</p>`;document.body.appendChild(s);setTimeout(()=>s.classList.add('out'),1500);setTimeout(()=>s.remove(),2400)}}catch(e){}

// Living scene
function scene(){const g=store.get('dg_garden',[]),h=new Date().getHours(),night=h<6||h>=20,eve=h>=17&&h<20;
const sky=night?['#2c3350','#5a4a7a']:eve?['#f6c7b8','#c9b8e6']:['#bfe0f5','#fdebc8'];
const fl=g.slice(-30).map((f,i)=>`<text x="${14+(i*53)%280}" y="${112+(i*31)%36}" font-size="${16+(i%3)*3}">${f}</text>`).join('');
$('#garden').innerHTML=`<svg class="sc" viewBox="0 0 320 170"><defs><linearGradient id="skg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs><rect width="320" height="170" fill="url(#skg)"/>${night?'<circle cx="250" cy="34" r="14" fill="#fdf3d0"/>':'<circle cx="250" cy="36" r="16" fill="#ffe6a0"/>'}<g class="cl" opacity=".85"><ellipse cx="60" cy="40" rx="26" ry="9" fill="#fff"/><ellipse cx="78" cy="34" rx="16" ry="8" fill="#fff"/></g><path d="M0 120 Q80 90 160 115 T320 108 V170 H0Z" fill="var(--sage)"/><path d="M0 140 Q100 120 200 140 T320 135 V170 H0Z" fill="var(--acc2)" opacity=".9"/>${fl}${g.length?'<text class="bf" x="120" y="80" font-size="18">🦋</text>':'<text x="80" y="152" font-size="13" fill="#8d777f">'+T('Your first flower is waiting','Твой первый цветок ждёт','Алғашқы гүлің күтіп тұр')+'</text>'}</svg>`}
window.renderGarden=scene;scene();

// Dear character
const MOUTH={Sunny:'M28 52 Q45 68 62 52',Cloudy:'M32 56 Q45 60 58 56',Rainy:'M32 60 Q45 50 58 60',Foggy:'M34 56 L56 56',Changeable:'M30 54 Q45 62 60 54',Quiet:'M34 56 Q45 60 56 56'};
const SAY={Sunny:['So happy it’s sunny in there!','Как здорово, что у тебя солнечно!','Ішің шуақты болғанына қуаныштымын!'],Cloudy:['Clouds pass. I’m right here.','Облака проходят. Я рядом.','Бұлт өтеді. Мен осындамын.'],Rainy:['Rain is allowed. Want a gentle hug?','Дождь имеет право быть. Обнять тебя?','Жаңбырға да болады. Құшақтайын ба?'],Foggy:['Not knowing is okay. We can wait for the fog to lift.','Можно не понимать. Подождём, пока туман рассеется.','Түсінбеуге болады. Тұман сейілгенше күтеміз.'],Changeable:['Many feelings at once. That’s very human.','Много чувств сразу. Это по-человечески.','Көп сезім бір мезгілде. Бұл адамға тән.'],Quiet:['Quiet is okay too. I’ll sit with you.','Тишина тоже нормальна. Я посижу рядом.','Тыныштық та жақсы. Қасыңда отырамын.']};
function greet2(){const n=store.get('dg_name',''),h=new Date().getHours();const g=h<12?T('Good morning','Доброе утро','Қайырлы таң'):h<18?T('Hi','Привет','Сәлем'):T('Good evening','Добрый вечер','Қайырлы кеш');return g+(n?', '+n:'')+'. '+T('I’m Dear. How are you today?','Я Dear. Как ты сегодня?','Мен Dearмін. Бүгін қалайсың?')}
const mas=document.createElement('div');mas.className='mas';
mas.innerHTML=`<svg id="mv" viewBox="0 0 90 90" width="86" height="86"><circle cx="45" cy="48" r="34" fill="var(--acc2)" stroke="var(--acc)" stroke-width="3"/><circle cx="30" cy="54" r="5" fill="var(--acc)" opacity=".35"/><circle cx="60" cy="54" r="5" fill="var(--acc)" opacity=".35"/><ellipse class="eye" cx="35" cy="42" rx="3.2" ry="4.4" fill="var(--ink)"/><ellipse class="eye" cx="55" cy="42" rx="3.2" ry="4.4" fill="var(--ink)"/><path id="mm" d="M28 52 Q45 68 62 52" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><path d="M45 14 Q38 4 30 10 Q38 16 45 14 Q52 4 60 10 Q52 16 45 14Z" fill="var(--acc)"/></svg><div class="bub" id="mb"></div>`;
$('#v-today .soft').insertAdjacentElement('afterend',mas);
function face(k){$('#mm').setAttribute('d',MOUTH[k]||MOUTH.Sunny);const s=k&&SAY[k];$('#mb').textContent=s?T(s[0],s[1],s[2]):greet2()}
face(null);
$('#mv').onclick=()=>face(rnd(Object.keys(SAY)));
$('#saveCheck').addEventListener('click',()=>setTimeout(()=>{if(mood)face(mood)},60));

// 7-day path
const PATH=[
['Notice','Today, simply notice how you talk to yourself. No fixing, no judging.','Write down one sentence you said to yourself today.','Замечать','Сегодня просто замечай, как ты говоришь с собой. Без исправлений и оценок.','Запиши одну фразу, которую ты сказала себе сегодня.'],
['A friend’s voice','Imagine a friend feeling what you feel. What would you tell her?','Write it, then read it as if it’s meant for you.','Голос подруги','Представь, что подруга чувствует то же. Что бы ты ей сказала?','Запиши это и прочитай так, будто это для тебя.'],
['Body as home','Your body carries you through every day. Thank it for one thing.','Finish: “Today my body helped me by…”','Тело как дом','Твоё тело несёт тебя через каждый день. Поблагодари его за одно.','Закончи: «Сегодня моё тело помогло мне тем, что…»'],
['Enough','Rest isn’t earned. You’re allowed to pause.','Take five quiet minutes with no screen.','Достаточно','Отдых не нужно заслуживать. Тебе можно остановиться.','Побудь пять тихих минут без экрана.'],
['Comparison','Feeds show highlights, not real lives. Notice who leaves you feeling smaller.','Mute one account that makes you feel worse.','Сравнение','В лентах только лучшие кадры, а не жизнь. Заметь, после кого тебе хуже.','Отключи одну страницу, после которой тебе хуже.'],
['Joy','Do one small thing only because you like it.','Pick it and do it, however small.','Радость','Сделай одну мелочь только потому, что тебе нравится.','Выбери её и сделай, пусть даже маленькую.'],
['Looking back','You showed up for yourself this week. That matters.','Write a short letter to yourself for next week.','Оглянуться','Ты была рядом с собой всю неделю. Это важно.','Напиши короткое письмо себе на следующую неделю.']];
PAN.Paths=function(){const d=store.get('dg_path',0),o=lang==='ru'?3:0;
$('#sBody').innerHTML=`<div class="card"><h3>${T('7 days of kindness to myself','7 дней доброты к себе','Өзіме 7 күн мейірім')}</h3><p class="soft">${T('One small step a day. No streaks, no pressure. Open the next day whenever you’re ready.','Один маленький шаг в день. Без серий и давления. Следующий день откроется, когда ты захочешь.','Күніне бір кішкентай қадам. Қысымсыз. Келесі күнді дайын болғанда ашасың.')}</p></div>`+PATH.map((p,i)=>i<d?`<div class="card" style="opacity:.7">✓ ${i+1}. ${p[o]}</div>`:i===d?`<div class="card"><h3>${i+1}. ${p[o]}</h3><p>${p[o+1]}</p><p class="it">${p[o+2]}</p><textarea placeholder="${T('Optional note','Заметка (по желанию)','Жазба (қалауынша)')}"></textarea><button class="btn" id="pd">${T('Done for today','Готово','Дайын')}</button></div>`:`<div class="card" style="opacity:.45">${i+1}. ${p[o]}</div>`).join('')+(d>=7?`<div class="hug">${T('You finished the path. Be proud, softly.','Ты прошла путь. Гордись собой мягко.','Жолды аяқтадың. Өзіңмен жұмсақ мақтан.')}</div>`:'');
const b=$('#pd');if(b)b.onclick=()=>{store.set('dg_path',d+1);burst(b);PAN.Paths()}};
if(!ST.includes('Paths'))ST.unshift('Paths');
st='Paths';sp();

// Languages (main screens)
const D=Object.create(null);
`Today|Сегодня|Бүгін
Calm|Спокойствие|Тыныштық
Dear|Dear|Dear
Space|Пространство|Кеңістік
Learn|Знания|Білім
Feed|Лента|Қолдау
No numbers. No calories. No judgment.|Без цифр. Без калорий. Без осуждения.|Сандарсыз. Калориясыз. Сынсыз.
Dear girl,|Дорогая,|Қымбаттым,
I need a moment to come back to myself|Мне нужна минутка, чтобы прийти в себя|Өзіме келуге бір минут керек
Look back on my week|Оглянуться на неделю|Аптама көз салу
What’s your inner weather?|Какая у тебя внутри погода?|Ішіңде қандай ауа райы?
Sunny|Солнечно|Шуақты
Cloudy|Облачно|Бұлтты
Rainy|Дождливо|Жаңбырлы
Foggy|Туманно|Тұманды
Changeable|Переменчиво|Құбылмалы
Quiet|Тихо|Тыныш
Your energy|Твоя энергия|Энергияң
Very low|Очень мало|Өте аз
Low|Мало|Аз
Okay|Нормально|Қалыпты
Good|Хорошо|Жақсы
High|Много|Көп
Check in|Отметить|Белгілеу
Your garden|Твой сад|Сенің бақшаң
A little note to yourself|Маленькая записка себе|Өзіңе кішкентай жазба
Save note|Сохранить|Сақтау
Save|Сохранить|Сақтау
New prompt|Другой вопрос|Басқа сұрақ
Calm Hub|Центр спокойствия|Тыныштық орталығы
Breathe with the circle|Дыши вместе с кругом|Шеңбермен бірге дем ал
Steady|Ровно|Тең
Long exhale|Долгий выдох|Ұзақ дем шығару
Start|Начать|Бастау
Stop|Стоп|Тоқтату
Ground yourself|Вернись в «здесь и сейчас»|Қазіргі сәтке орал
Next|Дальше|Келесі
Ride the wave|Переждать волну|Толқынды өткіз
Pop the bubbles|Лопай пузырьки|Көпіршіктерді жар
Sound room|Комната звуков|Дыбыс бөлмесі
Rain|Дождь|Жаңбыр
Ocean|Океан|Мұхит
Warm hum|Тёплый гул|Жылы гуіл
Off|Выкл|Өшіру
Anchor cards|Карточки-опоры|Тірек карточкалар
Another one|Ещё|Тағы бір
Gentle Knowledge|Мягкие знания|Жұмсақ білім
Support Feed|Лента поддержки|Қолдау лентасы
Share|Поделиться|Бөлісу
Anonymous|Аноним|Аноним
My Space|Моё пространство|Менің кеңістігім
Send|Отправить|Жіберу
Letters|Письма|Хаттар
Mirror|Зеркало|Айна
Wins|Победы|Жеңістер
Ideas|Идеи|Идеялар
Release|Отпустить|Жіберу
Plan|План|Жоспар
Cards|Карточки|Карточкалар
Unlearn|Разучить|Үйренбеу
Moodboard|Мудборд|Мудборд
Night|Ночь|Түн
Paths|Пути|Жолдар`.split('\n').forEach(l=>{const a=l.split('|');D[a[0]]=[a[1],a[2]]});
const RE=/^([^\p{L}]*)([\s\S]*?)([^\p{L}?.!)…]*)$/u,orig=new WeakMap();
function trNode(n){if(/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName))return;let o=orig.get(n);if(!o||n.data!==o.out){o={src:n.data};orig.set(n,o)}const m=o.src.match(RE);let out=o.src;if(lang!=='en'&&m&&D[m[2]])out=m[1]+D[m[2]][lang==='ru'?0:1]+m[3];o.out=out;if(n.data!==out)n.data=out}
function trAll(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),a=[];while(w.nextNode())a.push(w.currentNode);a.forEach(trNode)}
new MutationObserver(ms=>ms.forEach(m=>{m.addedNodes.forEach(a=>{if(a.nodeType===3)trNode(a);else if(a.nodeType===1)trAll(a)});if(m.type==='characterData')trNode(m.target)})).observe(document.body,{childList:true,subtree:true,characterData:true});
const lg=document.createElement('button');lg.className='lang';lg.id='lg';lg.textContent={en:'EN',ru:'RU',kk:'KZ'}[lang];
$('#theme').insertAdjacentElement('beforebegin',lg);
lg.onclick=()=>{lang=lang==='en'?'ru':lang==='ru'?'kk':'en';store.set('dg_lang',lang);lg.textContent={en:'EN',ru:'RU',kk:'KZ'}[lang];trAll(document.body);face(null);scene();if(st==='Paths')PAN.Paths()};
if(lang!=='en')trAll(document.body);
})();
