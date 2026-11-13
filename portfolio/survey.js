'use strict';
// In-memory only. No network requests or persistent browser storage.
function surveyT(ar, english) { return typeof t==='function' ? t(ar, english) : document.documentElement.lang==='en' ? english : ar; }
const surveyState = { step: 0, answers: {}, complete: false };
const surveyQuestions = [
 ['stage','هل عندك مشروع حاليًا؟','Do you already have a business?', [['idea','لا، عندي فكرة وأبغى أبدأ','No, I have an idea and want to start'],['existing','نعم، وأبغى أطور مشروعي','Yes, and I want to improve it'],['exploring','لسه أبحث عن فكرة','I am still exploring ideas']]],
 ['activity','وش مجال مشروعك؟','What is your business about?', [['food','أكل ومشروبات','Food and drinks'],['fashion','ملابس وإكسسوارات','Clothing and accessories'],['beauty','عناية وعطور','Care products and perfumes'],['gifts','هدايا ومنتجات منزلية','Gifts and home products'],['education','تعليم ومحتوى','Education and content'],['services','خدمات وأعمال','Services']]],
 ['kind','وش بتقدّم لعملائك؟','What will you offer your customers?', [['physical','منتجات توصل للعميل، مثل العطور والملابس','Physical products, such as perfumes or clothing'],['digital','ملفات أو محتوى رقمي، مثل الكتب والقوالب','Digital files or content, such as books or templates'],['service','خدمة، مثل التصميم أو التدريب','A service, such as design or training'],['mixed','أكثر من نوع','More than one type']]],
 ['need','وش أكثر شيء تحتاج مساعدتنا فيه؟','What do you need the most help with?', [['idea','ترتيب فكرة المشروع','Shaping my business idea'],['website','موقع أو متجر إلكتروني','A website or online store'],['packaging','تغليف وطريقة تقديم المنتج','Packaging and product presentation'],['advertising','إعلان للمشروع أو المنتج','An ad for my business or product'],['complete','أحتاج مساعدة من البداية','Help getting started from scratch']]],
 ['name','هل اخترت اسم لمشروعك؟','Have you chosen a business name?', [['yes','نعم، عندي اسم','Yes, I have a name'],['choosing','عندي أفكار ولسه أختار','I have ideas and am still choosing'],['no','لا، أحتاج أفكار للاسم','No, I need name ideas']]]
];
function escapeSurvey(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function surveyHTML() {
 const s = surveyState;
 if(s.complete) return `<div id="survey" class="survey card card-body"><h3 tabindex="-1" id="survey-heading">${surveyT('ملخص فكرة مشروعك','Your project brief')}</h3><p>${surveyT('هذا ملخص إجاباتك، وليس عرض سعر أو طلبًا مرسلًا. لم تُرسل الإجابات إلى إيلان.','This is your answer summary, not a quote or submitted request. Your answers have not been sent to EILAN.')}</p><dl>${surveyQuestions.map(q=>{const a=s.answers[q[0]]||{};const option=[...q[3],['other','إجابة أخرى','Other'],['unsure','لسه ما أعرف','Not sure yet']].find(o=>o[0]===a.choice);return `<dt>${surveyT(q[1],q[2])}</dt><dd>${option?escapeSurvey(surveyT(option[1],option[2])):surveyT('لم تتم الإجابة','Skipped')}${a.choice==='other'&&a.note?`<p class="survey-note" dir="auto">${escapeSurvey(a.note)}</p>`:''}</dd>`;}).join('')}</dl><div class="actions"><button type="button" class="btn primary" id="survey-download">${surveyT('تنزيل ملخص الإجابات','Download answer summary')}</button><button type="button" class="btn" id="survey-edit">${surveyT('تعديل الإجابات','Edit answers')}</button><button type="button" class="btn" id="survey-reset">${surveyT('مسح الإجابات والبدء من جديد','Clear answers and restart')}</button></div></div>`;
 const q=surveyQuestions[s.step], a=s.answers[q[0]]||{};
 return `<div id="survey" class="survey card card-body"><div class="eyebrow" role="status">${surveyT('السؤال','Question')} ${s.step+1} / ${surveyQuestions.length}</div><progress value="${s.step+1}" max="${surveyQuestions.length}" aria-label="${surveyT('تقدم الاستبيان','Survey progress')}"></progress><fieldset><legend id="survey-heading" tabindex="-1">${surveyT(q[1],q[2])}</legend><p id="survey-help">${surveyT('اختَر الإجابة الأقرب، أو اختَر «أخرى» واكتب إجابتك. كل الأسئلة اختيارية.','Choose the closest option, or select Other to write your own answer. All questions are optional.')}</p><div class="survey-options">${[...q[3],['unsure','لسه ما أعرف، أحتاج مساعدة','Not sure yet, I need help'],['other','أخرى','Other']].map(o=>`<label class="survey-option"><input type="radio" name="survey-choice" value="${o[0]}" ${a.choice===o[0]?'checked':''} aria-describedby="survey-help"><span>${surveyT(o[1],o[2])}</span></label>`).join('')}</div><div id="survey-other" ${a.choice==='other'?'':'hidden'}><label class="survey-label" for="survey-note">${surveyT('اكتب إجابتك (اختياري)','Write your answer (optional)')}</label><textarea id="survey-note" ${a.choice==='other'?'':'disabled'} rows="4" maxlength="2000" dir="auto" placeholder="${surveyT('اكتب بالطريقة اللي تناسبك… بدون معلومات شخصية أو حساسة.','Write in your own words… without personal or sensitive information.')}">${escapeSurvey(a.note||'')}</textarea></div></fieldset><div class="actions">${s.step?`<button class="btn" type="button" id="survey-back">${surveyT('السابق','Back')}</button>`:''}<button class="btn primary" type="button" id="survey-next">${s.step===surveyQuestions.length-1?surveyT('مراجعة إجاباتي','Review my answers'):surveyT('التالي / تخطي','Next / skip')}</button><button class="btn" type="button" id="survey-reset">${surveyT('مسح الإجابات','Clear answers')}</button></div><p class="survey-privacy">${surveyT('إجاباتك مؤقتة في هذه الصفحة فقط وتُمسح عند تحديثها أو مغادرتها. لا تُرسل تلقائيًا. لا تكتب اسمًا أو رقم جوال أو معلومات حساسة.','Answers stay temporarily in this page and are lost on refresh or departure. Nothing is sent automatically. Do not enter names, phone numbers or sensitive information.')}</p></div>`;
}
function mountSurvey() {
 const root=document.getElementById('survey'); if(!root) return;
 const redraw=()=>{root.outerHTML=surveyHTML();mountSurvey();document.getElementById('survey-heading').focus();document.getElementById('survey').scrollIntoView({block:'start'});};
 const on=(id,fn)=>{const el=document.getElementById(id);if(el)el.onclick=fn;};
 on('survey-reset',()=>{if(!confirm(surveyT('مسح كل الإجابات؟','Clear all answers?')))return;surveyState.answers={};surveyState.step=0;surveyState.complete=false;redraw();});
 on('survey-edit',()=>{surveyState.complete=false;surveyState.step=0;redraw();});
 on('survey-download',()=>{
 const text=[surveyT('ملخص فكرة مشروعي — إيلان دول','My project brief — EILAN DOLL'),surveyT('لم يُرسل إلى إيلان.','Not submitted to EILAN.'),...surveyQuestions.map(q=>{const a=surveyState.answers[q[0]]||{};const o=[...q[3],['other','إجابة أخرى','Other'],['unsure','لسه ما أعرف','Not sure yet']].find(o=>o[0]===a.choice);return `${surveyT(q[1],q[2])}\n${o?surveyT(o[1],o[2]):surveyT('لم تتم الإجابة','Skipped')}\n${a.choice==='other'?(a.note||''):''}`;})].join('\n\n');
 const u=URL.createObjectURL(new Blob(['\uFEFF',text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='eilan-project-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);
 });
 if(surveyState.complete)return;
 const key=surveyQuestions[surveyState.step][0];
 document.querySelectorAll('[name="survey-choice"]').forEach(input=>input.onchange=()=>{
  surveyState.answers[key]={...surveyState.answers[key],choice:input.value};
  const other=input.value==='other';
  document.getElementById('survey-other').hidden=!other;
  document.getElementById('survey-note').disabled=!other;
  if(other)document.getElementById('survey-note').focus();
 });
 document.getElementById('survey-note').oninput=e=>{surveyState.answers[key]={...surveyState.answers[key],note:e.target.value};};
 on('survey-back',()=>{surveyState.step--;redraw();});
 on('survey-next',()=>{if(surveyState.step<surveyQuestions.length-1)surveyState.step++;else surveyState.complete=true;redraw();});
}
