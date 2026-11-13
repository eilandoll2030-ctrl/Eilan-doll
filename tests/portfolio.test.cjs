// Dependency-free rendering and interaction smoke tests. Run: node tests/portfolio.test.cjs
const {readFileSync, existsSync} = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = readFileSync('portfolio/app.js','utf8');
for (const page of ['gallery','survey','cafe','studio']) for (const english of [false,true]) {
 const app={innerHTML:''}, language={};
 const filters=['all','hot','cold','sweet'].map(value=>({dataset:{filter:value},setAttribute(k,v){this[k]=v;}}));
 const items=['hot','hot','cold','cold','sweet','sweet'].map(value=>({dataset:{category:value},hidden:false}));
 const document={body:{dataset:{page}},documentElement:{},getElementById:id=>id==='app'?app:id==='survey'?null:language,
 querySelectorAll:selector=>selector==='[data-filter]'?(page==='cafe'?filters:[]):selector==='[data-category]'?items:[]};
 const context={document,URL,URLSearchParams,location:{search:english?'?lang=en':'',href:'http://example.test/portfolio/index.html'},history:{replaceState(){}}};
 vm.createContext(context);
 vm.runInContext(readFileSync('portfolio/survey.js','utf8'),context);
 vm.runInContext(source,context);
 assert.equal(document.documentElement.lang,english?'en':'ar');
 assert.equal(document.documentElement.dir,english?'ltr':'rtl');
 assert.match(app.innerHTML,english?/Not for sale/:/غير متاحة للشراء/);
 assert.ok(!/<form|https?:\/\//.test(app.innerHTML));
 if(!['gallery','survey'].includes(page)) assert.ok(!/<input/.test(app.innerHTML));
 for(const match of app.innerHTML.matchAll(/(?:href|src)="([^"?#]+)/g)) {
  if(match[1].startsWith('#')) continue;
  assert.ok(existsSync('portfolio/'+match[1]),`Missing local link ${match[1]}`);
 }
 if(page==='gallery') {
  assert.match(app.innerHTML,/id="discover"/);
  assert.match(app.innerHTML,/id="concepts"/);
  assert.match(app.innerHTML,/section=projects/);
 }
 if(page==='cafe') {
  filters[1].onclick(); assert.equal(items.filter(i=>!i.hidden).length,2); assert.equal(filters[1]['aria-pressed'],'true');
  filters[3].onclick(); assert.ok(items.filter(i=>!i.hidden).every(i=>i.dataset.category==='sweet'));
  filters[0].onclick(); assert.equal(items.filter(i=>!i.hidden).length,6);
 }
 if(page==='studio') assert.equal((app.innerHTML.match(/<details>/g)||[]).length,3);
 language.onclick(); assert.equal(document.documentElement.lang,english?'ar':'en');
 console.log(`PASS ${page} ${english?'en':'ar'}: rendering, links, language, interactions`);
}

const main = readFileSync('index.html','utf8');
assert.ok(!main.includes('EILAN WEB COLLECTION'));
const start = main.indexOf('P.templates={');
assert.ok(start > 0);
assert.ok(main.includes('projects-heading'));
assert.match(main,/href="#projectSurvey"/);
assert.ok(!main.includes('iframe src="/portfolio/survey.html"'));
assert.ok(main.includes('${surveyHTML()}</section>'));
assert.ok(main.includes('mountSurvey();tpWebMount();tpVMount();'));
assert.match(main,/src="\/portfolio\/survey.js"/);
assert.match(main,/portfolio\/index.html#concepts/);
console.log('PASS shared placement inside templates, no separate homepage section');

const ctx={t:(ar,en)=>en, page:'gallery',document:{getElementById:()=>null}};
vm.createContext(ctx);vm.runInContext(readFileSync('portfolio/survey.js','utf8'),ctx);
for(let i=0;i<vm.runInContext('surveyQuestions.length',ctx);i++) {
 vm.runInContext(`surveyState.step=${i}`,ctx);
 const html=vm.runInContext('surveyHTML()',ctx);
 assert.match(html,/type="radio"/);assert.match(html,/value="other"/);assert.match(html,/value="unsure"/);assert.match(html,/<textarea/);
}
vm.runInContext(`surveyState.answers.stage={choice:'other',note:'<img src=x onerror=alert(1)>'};surveyState.complete=true`,ctx);
const summary=vm.runInContext('surveyHTML()',ctx);
assert.ok(summary.includes('&lt;img'));assert.ok(!summary.includes('<img'));assert.ok(summary.includes('Not submitted')||summary.includes('have not been sent'));
assert.match(summary,/Download answer summary/);
assert.ok(!/fetch\(|localStorage|sessionStorage|XMLHttpRequest/.test(readFileSync('portfolio/survey.js','utf8')));
console.log('PASS all survey steps, open answers, skip, escaped summary and local-only design');

// Exercise actual handlers with a lightweight DOM double, without installing packages.
const elements = Object.fromEntries(['survey','survey-heading','survey-reset','survey-edit','survey-download','survey-note','survey-other','survey-back','survey-next'].map(id=>[id,{focus(){},scrollIntoView(){}}]));
const radios=['idea','unsure','other'].map(value=>({value}));
const interaction={t:(ar,en)=>en,page:'gallery',confirm:()=>true,document:{getElementById:id=>elements[id],querySelectorAll:()=>radios}};
vm.createContext(interaction);vm.runInContext(readFileSync('portfolio/survey.js','utf8'),interaction);
const run=code=>vm.runInContext(code,interaction);
for(let step=0;step<run('surveyQuestions.length');step++) {
 run(`surveyState.step=${step};surveyState.answers={}`);
 const html=run('surveyHTML()');
 const values=[...html.matchAll(/name="survey-choice" value="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(values.at(-1),'other');
 assert.match(html,/id="survey-other" hidden/);
 assert.match(html,/id="survey-note" disabled/);
 assert.equal((html.match(/<fieldset>/g)||[]).length,1);
 run(`surveyState.answers[surveyQuestions[${step}][0]]={choice:'other',note:'My own answer'}`);
 assert.ok(!run('surveyHTML()').includes('id="survey-other" hidden'));
}
run('surveyState.step=0;surveyState.answers={};mountSurvey()');
radios[2].onchange();assert.equal(elements['survey-other'].hidden,false);assert.equal(elements['survey-note'].disabled,false);
elements['survey-note'].oninput({target:{value:'Custom project'}});
elements['survey-next'].onclick();assert.equal(run('surveyState.step'),1);
elements['survey-back'].onclick();assert.equal(run('surveyState.step'),0);assert.match(run('surveyHTML()'),/Custom project/);
radios[0].onchange();assert.equal(elements['survey-other'].hidden,true);assert.equal(elements['survey-note'].disabled,true);
run('surveyState.complete=true');assert.ok(!run('surveyHTML()').includes('Custom project'));
run('surveyState.complete=false');radios[2].onchange();assert.match(run('surveyHTML()'),/Custom project/);
elements['survey-reset'].onclick();assert.equal(run('Object.keys(surveyState.answers).length'),0);
console.log('PASS Other last, conditional text field, back/next retention, hidden answer exclusion and reset');

const projectCode=main.slice(main.indexOf('P.projects={'),main.indexOf('P.templates={'));
const projectContext={P:{},document:{documentElement:{lang:'ar'}},tpWebHTML:()=>'<section id="tpWeb">website builder</section>',TP_VIDS:[],tpVCard:()=>'',t:(ar,en)=>ar};
vm.createContext(projectContext);
vm.runInContext(readFileSync('portfolio/survey.js','utf8'),projectContext);
vm.runInContext(readFileSync('portfolio/care-guide.js','utf8'),projectContext);
vm.runInContext(projectCode,projectContext);
const nativeProject=vm.runInContext('P.projects.html()',projectContext);
assert.match(nativeProject,/id="survey"/);assert.match(nativeProject,/name="survey-choice"/);assert.match(nativeProject,/id="survey-next"/);assert.match(nativeProject,/id="tpWeb"/);
assert.ok(!nativeProject.includes('<iframe'));
const templateCode=main.slice(main.indexOf('P.templates={'),main.indexOf('function tpFilter('));
assert.ok(!templateCode.includes('surveyHTML()'));
assert.ok(!templateCode.includes('${tpWebHTML()}'));
assert.ok(templateCode.includes("TP_TPLS.filter(t=>t.cat!=='web')"));
console.log('PASS primary-site projects route renders native survey; templates exclude projects and websites');

assert.equal(run('surveyQuestions.length'),5);
assert.deepEqual(Array.from(run('surveyQuestions.map(q=>q[0])')),['stage','activity','kind','need','name']);
run('surveyState.step=4;mountSurvey()');
elements['survey-next'].onclick();assert.equal(run('surveyState.complete'),true);
console.log('PASS five concise questions, no early budget/design decisions, last step reaches summary');

const guide=vm.runInContext('careGuideHTML()',projectContext);
assert.match(guide,/id="careProject"/);
assert.match(guide,/sfda.gov.sa\/ar\/eservices\/88819/);
assert.match(guide,/free-organic-skincare-formulation-course/);
assert.match(guide,/مصنع بعلامة خاصة/);
assert.match(guide,/تعلّم التصنيع/);
assert.ok(!/<iframe|<form/.test(guide));
for(const match of guide.matchAll(/(?:href|src)="(\/[^"#]+)/g)) assert.ok(existsSync('.'+match[1]),'Missing guide asset: '+match[1]);
assert.match(guide,/rifq-soap-product\.jpg/);
assert.match(guide,/rifq-scrub-product\.jpg/);
assert.match(guide,/صور المنتج نفسه بشعار رِفق/);
assert.ok(existsSync('assets/projects/rifq-soap-product.jpg'));
assert.ok(existsSync('assets/projects/rifq-scrub-product.jpg'));
console.log('PASS care starter: both routes, learning links, official source and original local assets');

assert.match(nativeProject,/data-go="eilan:\/\/projects\/care"/);
assert.ok(!nativeProject.includes('id="careProject"'));
const detailContext={P:{},careGuideHTML:()=>guide};
vm.createContext(detailContext);
vm.runInContext(main.slice(main.indexOf('P.projectfile={'),main.indexOf('P.projects={')),detailContext);
const detail=vm.runInContext('P.projectfile.html()',detailContext);
assert.match(detail,/id="careProject"/);
assert.match(detail,/كل ملفات المشاريع/);
assert.ok(!/data-act="addcart"|data-act="buy"/.test(detail));
assert.ok(main.includes("if(page==='projects'&&id==='care')page='projectfile'"));
assert.ok(main.includes("if(p==='projects'&&parts[1]==='care')return 'eilan://projects/care'"));
assert.ok(main.includes("page==='projectfile'?'/projects/care/'"));
console.log('PASS project card opens full native project file; direct route, return link and no checkout');

assert.ok(!nativeProject.includes('EILAN PROJECTS & WEBSITES'));
assert.ok(!nativeProject.includes('PROJECT IDEAS &amp; WEBSITE CONCEPTS'));
assert.ok(nativeProject.indexOf('care-project-card') < nativeProject.indexOf('id="projectSurvey"'));
console.log('PASS simplified projects header, project cards first, no repeated intro panels');
