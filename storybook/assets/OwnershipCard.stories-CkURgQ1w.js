var Z=Object.defineProperty;var ee=(e,t,i)=>t in e?Z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var L=(e,t,i)=>ee(e,typeof t!="symbol"?t+"":t,i);import{c as te,g as U,R as l,r as C}from"./index-CTjT7uj6.js";import{r as ne,w as D}from"./appWrappers-C95badAO.js";import{c as ie}from"./_commonjs-dynamic-modules-TDtrdbi3.js";import{u as ae}from"./useAsync-CXA3qup_.js";import{q as re}from"./index-Dj_lShYJ.js";import{l as J}from"./lodash-CoGan1YB.js";import{c as F}from"./api-D73ioj2B.js";import"./toString-C6iK1gA3.js";import"./mapValues-r4uG88u0.js";import{D as I,p as se,s as w}from"./ref-8pKZtiZi.js";import{g as B,R as oe,a as le,u as ce,E as K}from"./useEntity-hAAFt0wK.js";import{u as ue}from"./ApiRef-BSBwTmJJ.js";import{m as M}from"./makeStyles-BU0tkW44.js";import{c as de}from"./createStyles-Bp4GwXob.js";import{S as $}from"./Grid-BBk_6dks.js";import{B as P}from"./Box-BlnZ3bMe.js";import{T as A}from"./Typography-DllAHQJn.js";import{u as me}from"./useRouteRef-ahYS9ypG.js";import{P as pe}from"./Progress-DLU_c_4-.js";import{R as he}from"./ResponseErrorPanel-CEcv0qNJ.js";import{O as fe}from"./OverflowTooltip-CjeqFI5W.js";import{L as ge}from"./Link-DLrsDiHD.js";import{L as ye}from"./List-7_TU6u55.js";import{L as ve}from"./ListItem-vLxI9vXl.js";import{L as be}from"./ListItemText-DILJ7l8C.js";import{L as we,S as $e}from"./Switch-BatYoqjp.js";import{T as ke}from"./Tooltip-DOf8SuPq.js";import{I as Te}from"./InfoCard-BDSaDvlJ.js";import{a as xe}from"./TestApiProvider-CoiMLMhd.js";import{A as V}from"./ApiProvider-CuNQiN7Z.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-gVLTJlNx.js";import"./capitalize-CuRwImtC.js";import"./defaultTheme-BnEhos6D.js";import"./withStyles-Bvq8MRoX.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./useControlled-CogIeAPD.js";import"./index-QA7F3UF1.js";import"./createSvgIcon-C2joj_qV.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./MockTranslationApi-CzTtvR9F.js";import"./index-CFaqwFgm.js";import"./classCallCheck-BNzALLS0.js";import"./inherits-BVfVgrgP.js";import"./toArray-FnMkMKew.js";import"./TranslationApi-eOxINumg.js";import"./ConfigApi-DBUUc3nU.js";import"./useAnalytics-DTrkS1Gy.js";import"./WebStorage-D5Fgivzj.js";import"./componentData-CM4hSmEF.js";import"./index-BkN7i-fW.js";import"./CssBaseline-Bw_LSqbM.js";import"./ThemeProvider-s1UPBsz6.js";import"./jsx-runtime-Cw0GR0a5.js";import"./palettes-B20oCNII.js";import"./useMountedState-DkESzBh4.js";import"./createStyles-yD3y8ldD.js";import"./typography-Bw32VBWA.js";import"./useTheme-BywMHAxl.js";import"./LinearProgress-CCTwuaRq.js";import"./ErrorPanel-D4hDgQp2.js";import"./WarningPanel-DtCoasWz.js";import"./ExpandMore-DRsw0FpY.js";import"./AccordionDetails-DuFjvSz5.js";import"./react-is.production.min-D0tnNtx9.js";import"./Paper-DsuWrj9f.js";import"./Collapse-CVdVLxjO.js";import"./utils-5sYZftss.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./ButtonBase-DbbECwI4.js";import"./IconButton-DZLTM8HP.js";import"./MarkdownContent-h599ex28.js";import"./index-BRV0Se7Z.js";import"./CodeSnippet-B1_4fsF1.js";import"./iframe-CuNir4og.js";import"../sb-preview/runtime.js";import"./objectWithoutProperties-C_MEUZXD.js";import"./toConsumableArray-BEwiObev.js";import"./CopyTextButton-Boajxbq4.js";import"./useCopyToClipboard-jmfaK3ET.js";import"./translation-67MxozS3.js";import"./Divider-Miekqy1v.js";import"./index-Cqve-NHl.js";import"./ListContext-DydK1sOh.js";import"./SwitchBase-FcKG2_0S.js";import"./useFormControl-F4cJWIkJ.js";import"./Popper-DjaUCFiZ.js";import"./Portal-DHXjgkAG.js";import"./Grow-P-A83A7Q.js";import"./CardActions-Dp1NLdNv.js";import"./CardContent-DuGDnaC5.js";import"./ErrorBoundary-CWw1Oczf.js";import"./LinkButton-CNHI6k1L.js";import"./Button-BIQ-mITp.js";import"./CardHeader-w8GSsbOu.js";import"./BottomLink-B2rxUlQf.js";import"./ArrowForward-CorrRUEw.js";var j;j=ne;class Ee{constructor(t,i,a,r){L(this,j,"external");this.id=t,this.params=i,this.optional=a,this.defaultTarget=r}toString(){return`routeRef{type=external,id=${this.id}}`}getDefaultTarget(){return this.defaultTarget}}function Re(e){return new Ee(e.id,e.params??[],!!e.optional,e==null?void 0:e.defaultTarget)}function Ae(e,t){const i=t==null?void 0:t.defaultKind;let a,r,o;return"metadata"in e?(a=e.kind,r=e.metadata.namespace,o=e.metadata.name):(a=e.kind,r=e.namespace,o=e.name),(r===void 0||r==="")&&(r=I),(t==null?void 0:t.defaultNamespace)!==void 0?(t==null?void 0:t.defaultNamespace)===r&&(r=void 0):r===I&&(r=void 0),a=a.toLocaleLowerCase("en-US"),a=i.toLocaleLowerCase("en-US")===a?void 0:a,`${a?`${a}:`:""}${r?`${r}/`:""}${o}`}const q=Re({id:"catalog-index",optional:!0,defaultTarget:"catalog.catalogIndex"});var W={exports:{}};(function(e,t){(function(i,a){typeof ie=="function"?e.exports=a():i.pluralize=a()})(te,function(){var i=[],a=[],r={},o={},c={};function u(n){return typeof n=="string"?new RegExp("^"+n+"$","i"):n}function m(n,s){return n===s?s:n===n.toLowerCase()?s.toLowerCase():n===n.toUpperCase()?s.toUpperCase():n[0]===n[0].toUpperCase()?s.charAt(0).toUpperCase()+s.substr(1).toLowerCase():s.toLowerCase()}function p(n,s){return n.replace(/\$(\d{1,2})/g,function(v,f){return s[f]||""})}function h(n,s){return n.replace(s[0],function(v,f){var g=p(s[1],arguments);return m(v===""?n[f-1]:v,g)})}function y(n,s,v){if(!n.length||r.hasOwnProperty(n))return s;for(var f=v.length;f--;){var g=v[f];if(g[0].test(s))return h(s,g)}return s}function x(n,s,v){return function(f){var g=f.toLowerCase();return s.hasOwnProperty(g)?m(f,g):n.hasOwnProperty(g)?m(f,n[g]):y(g,f,v)}}function b(n,s,v,f){return function(g){var k=g.toLowerCase();return s.hasOwnProperty(k)?!0:n.hasOwnProperty(k)?!1:y(k,k,v)===k}}function d(n,s,v){var f=s===1?d.singular(n):d.plural(n);return(v?s+" ":"")+f}return d.plural=x(c,o,i),d.isPlural=b(c,o,i),d.singular=x(o,c,a),d.isSingular=b(o,c,a),d.addPluralRule=function(n,s){i.push([u(n),s])},d.addSingularRule=function(n,s){a.push([u(n),s])},d.addUncountableRule=function(n){if(typeof n=="string"){r[n.toLowerCase()]=!0;return}d.addPluralRule(n,"$0"),d.addSingularRule(n,"$0")},d.addIrregularRule=function(n,s){s=s.toLowerCase(),n=n.toLowerCase(),c[n]=s,o[s]=n},[["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["passerby","passersby"]].forEach(function(n){return d.addIrregularRule(n[0],n[1])}),[[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|t[lm]as|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/\b((?:tit)?m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach(function(n){return d.addPluralRule(n[0],n[1])}),[[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/\b((?:tit)?m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,"$1"],[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach(function(n){return d.addSingularRule(n[0],n[1])}),["adulthood","advice","agenda","aid","aircraft","alcohol","ammo","analytics","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","firmware","flounder","fun","gallows","garbage","graffiti","hardware","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","mud","manga","news","only","personnel","pike","plankton","pliers","police","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","software","species","staff","swine","tennis","traffic","transportation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/pok[eé]mon$/i,/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(d.addUncountableRule),d})})(W);var qe=W.exports;const Le=U(qe);class Ce{constructor(t){this.value=t,this.next=void 0}}let Ie=class{constructor(){this.clear()}enqueue(t){const i=new Ce(t);this._head?(this._tail.next=i,this._tail=i):(this._head=i,this._tail=i),this._size++}dequeue(){const t=this._head;if(t)return this._head=this._head.next,this._size--,t.value}clear(){this._head=void 0,this._tail=void 0,this._size=0}get size(){return this._size}*[Symbol.iterator](){let t=this._head;for(;t;)yield t.value,t=t.next}};var Pe=Ie;const je=Pe,Se=e=>{if(!((Number.isInteger(e)||e===1/0)&&e>0))throw new TypeError("Expected `concurrency` to be a number from 1 and up");const t=new je;let i=0;const a=()=>{i--,t.size>0&&t.dequeue()()},r=async(u,m,...p)=>{i++;const h=(async()=>u(...p))();m(h);try{await h}catch{}a()},o=(u,m,...p)=>{t.enqueue(r.bind(null,u,m,...p)),(async()=>(await Promise.resolve(),i<e&&t.size>0&&t.dequeue()()))()},c=(u,...m)=>new Promise(p=>{o(u,p,...m)});return Object.defineProperties(c,{activeCount:{get:()=>i},pendingCount:{get:()=>t.size},clearQueue:{value:()=>{t.clear()}}}),c};var Oe=Se;const _e=U(Oe),Ge=_e(5),Ne=(e,t)=>{const{kind:i,type:a}=t,r=e.map(c=>Ae(se(c),{defaultKind:"group"})),o={kind:i.toLocaleLowerCase("en-US"),type:a,owners:r,user:"all"};return re.stringify({filters:o},{arrayFormat:"repeat"})},ze=e=>[...B(e,oe,{kind:"Group"}).map(({kind:a,namespace:r,name:o})=>w({kind:a,namespace:r,name:o})),w(e)],Ue=e=>e!==void 0,Q=async(e,t,i=[])=>{const a=B(e,le,{kind:"Group"}),r=a.length>0,o=w(e);if(r){const c=a.map(y=>w(y)),p=(await Ge(()=>t.getEntitiesByRefs({fields:["kind","metadata.namespace","metadata.name","relations"],entityRefs:c}))).items.filter(Ue).filter(y=>!i.includes(w(y))),h=(await Promise.all(p.map(y=>Q(y,t,[...i,o])))).flatMap(y=>y);return J.uniq([...h,o])}return[o]},De=async(e,t,i)=>{const a=e.kind==="Group",r=t==="aggregated",o=e.kind==="User";return r&&a?Q(e,i):r&&o?ze(e):[w(e)]},Je=e=>new Promise(t=>setTimeout(t,e)),Fe=async(e,t,i,a=100,r=100)=>{const o=[];for(let c=0;c<e.length;c+=a){const u=e.slice(c,c+a),m=await i.getEntities({filter:[{kind:t,"relations.ownedBy":u}],fields:["kind","metadata.name","metadata.namespace","spec.type","relations"]});o.push(...m.items),c+a<e.length&&await Je(r)}return J.uniqBy(o,w)};function Be(e,t,i,a=6){const r=ue(F),o=i??["Component","API","System"],{loading:c,error:u,value:m}=ae(async()=>{const p=await De(e,t,r);return(await Fe(p,o,r)).reduce((b,d)=>{var s,v;const n=b.find(f=>{var g;return f.kind===d.kind&&f.type===((g=d.spec)==null?void 0:g.type)});return n?n.count+=1:b.push({kind:d.kind,type:(v=(s=d.spec)==null?void 0:s.type)==null?void 0:v.toString(),count:1}),b},[]).sort((b,d)=>d.count-b.count).slice(0,a).map(b=>({counter:b.count,type:b.type,kind:b.kind,queryParams:Ne(p,b)}))},[r,e,t]);return{componentsWithCounters:m,loading:c,error:u}}const Ke=M(e=>de({card:{border:`1px solid ${e.palette.divider}`,boxShadow:e.shadows[2],borderRadius:"4px",padding:e.spacing(2),transition:`${e.transitions.duration.standard}ms`,"&:hover":{boxShadow:e.shadows[4]},height:"100%"},bold:{fontWeight:e.typography.fontWeightBold},smallFont:{fontSize:e.typography.body2.fontSize},entityTypeBox:{background:t=>e.getPageTheme({themeId:t.type}).backgroundImage,color:t=>e.getPageTheme({themeId:t.type}).fontColor}})),Me=({counter:e,type:t,kind:i,url:a})=>{const r=Ke({type:t??i}),o=t??i,c=o.length>10,u=l.createElement(P,{className:`${r.card} ${r.entityTypeBox}`,display:"flex",flexDirection:"column",alignItems:"center"},l.createElement(A,{className:r.bold,variant:"h6"},e),l.createElement(P,{sx:{width:"100%",textAlign:"center"}},l.createElement(A,{className:`${r.bold} ${c&&r.smallFont}`,variant:"h6"},l.createElement(fe,{text:Le(o.toLocaleUpperCase("en-US"),e)}))),t&&l.createElement(A,{variant:"subtitle1"},i));return a?l.createElement(ge,{to:a,variant:"body2"},u):u},H=({className:e,entity:t,relationsType:i,relationAggregation:a,entityFilterKind:r,entityLimit:o=6})=>{const c=me(q);if(!i&&!a)throw new Error("The relationAggregation property must be set as an EntityRelationAggregation type.");const{componentsWithCounters:u,loading:m,error:p}=Be(t,a??i,r,o);return m?l.createElement(pe,null):p?l.createElement(he,{error:p}):l.createElement($,{container:!0,className:e},u==null?void 0:u.map(h=>l.createElement($,{item:!0,xs:6,md:6,lg:4,key:h.type??h.kind},l.createElement(Me,{counter:h.counter,kind:h.kind,type:h.type,url:c&&`${c()}/?${h.queryParams}`}))))};H.__docgenInfo={description:"",methods:[],displayName:"ComponentsGrid",props:{className:{required:!1,tsType:{name:"string"},description:""},entity:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  /**
   * The version of specification format for this particular entity that
   * this is written against.
   */
  apiVersion: string;

  /**
   * The high level entity type being described.
   */
  kind: string;

  /**
   * Metadata related to the entity.
   */
  metadata: EntityMeta;

  /**
   * The specification data describing the entity itself.
   */
  spec?: JsonObject;

  /**
   * The relations that this entity has with other entities.
   */
  relations?: EntityRelation[];
}`,signature:{properties:[{key:"apiVersion",value:{name:"string",required:!0},description:`The version of specification format for this particular entity that
this is written against.`},{key:"kind",value:{name:"string",required:!0},description:"The high level entity type being described."},{key:"metadata",value:{name:"intersection",raw:`JsonObject & {
  /**
   * A globally unique ID for the entity.
   *
   * This field can not be set by the user at creation time, and the server
   * will reject an attempt to do so. The field will be populated in read
   * operations. The field can (optionally) be specified when performing
   * update or delete operations, but the server is free to reject requests
   * that do so in such a way that it breaks semantics.
   */
  uid?: string;

  /**
   * An opaque string that changes for each update operation to any part of
   * the entity, including metadata.
   *
   * This field can not be set by the user at creation time, and the server
   * will reject an attempt to do so. The field will be populated in read
   * operations. The field can (optionally) be specified when performing
   * update or delete operations, and the server will then reject the
   * operation if it does not match the current stored value.
   */
  etag?: string;

  /**
   * The name of the entity.
   *
   * Must be unique within the catalog at any given point in time, for any
   * given namespace + kind pair. This value is part of the technical
   * identifier of the entity, and as such it will appear in URLs, database
   * tables, entity references, and similar. It is subject to restrictions
   * regarding what characters are allowed.
   *
   * If you want to use a different, more human readable string with fewer
   * restrictions on it in user interfaces, see the \`title\` field below.
   */
  name: string;

  /**
   * The namespace that the entity belongs to.
   */
  namespace?: string;

  /**
   * A display name of the entity, to be presented in user interfaces instead
   * of the \`name\` property above, when available.
   *
   * This field is sometimes useful when the \`name\` is cumbersome or ends up
   * being perceived as overly technical. The title generally does not have
   * as stringent format requirements on it, so it may contain special
   * characters and be more explanatory. Do keep it very short though, and
   * avoid situations where a title can be confused with the name of another
   * entity, or where two entities share a title.
   *
   * Note that this is only for display purposes, and may be ignored by some
   * parts of the code. Entity references still always make use of the \`name\`
   * property, not the title.
   */
  title?: string;

  /**
   * A short (typically relatively few words, on one line) description of the
   * entity.
   */
  description?: string;

  /**
   * Key/value pairs of identifying information attached to the entity.
   */
  labels?: Record<string, string>;

  /**
   * Key/value pairs of non-identifying auxiliary information attached to the
   * entity.
   */
  annotations?: Record<string, string>;

  /**
   * A list of single-valued strings, to for example classify catalog entities in
   * various ways.
   */
  tags?: string[];

  /**
   * A list of external hyperlinks related to the entity.
   */
  links?: EntityLink[];
}`,elements:[{name:"signature",type:"object",raw:"{ [key in string]?: JsonValue }",signature:{properties:[{key:{name:"string",required:!1},value:{name:"union",raw:"JsonObject | JsonArray | JsonPrimitive",elements:[{name:"JsonObject"},{name:"JsonArray"},{name:"union",raw:"number | string | boolean | null",elements:[{name:"number"},{name:"string"},{name:"boolean"},{name:"null"}]}]}}]},required:!1},{name:"signature",type:"object",raw:`{
  /**
   * A globally unique ID for the entity.
   *
   * This field can not be set by the user at creation time, and the server
   * will reject an attempt to do so. The field will be populated in read
   * operations. The field can (optionally) be specified when performing
   * update or delete operations, but the server is free to reject requests
   * that do so in such a way that it breaks semantics.
   */
  uid?: string;

  /**
   * An opaque string that changes for each update operation to any part of
   * the entity, including metadata.
   *
   * This field can not be set by the user at creation time, and the server
   * will reject an attempt to do so. The field will be populated in read
   * operations. The field can (optionally) be specified when performing
   * update or delete operations, and the server will then reject the
   * operation if it does not match the current stored value.
   */
  etag?: string;

  /**
   * The name of the entity.
   *
   * Must be unique within the catalog at any given point in time, for any
   * given namespace + kind pair. This value is part of the technical
   * identifier of the entity, and as such it will appear in URLs, database
   * tables, entity references, and similar. It is subject to restrictions
   * regarding what characters are allowed.
   *
   * If you want to use a different, more human readable string with fewer
   * restrictions on it in user interfaces, see the \`title\` field below.
   */
  name: string;

  /**
   * The namespace that the entity belongs to.
   */
  namespace?: string;

  /**
   * A display name of the entity, to be presented in user interfaces instead
   * of the \`name\` property above, when available.
   *
   * This field is sometimes useful when the \`name\` is cumbersome or ends up
   * being perceived as overly technical. The title generally does not have
   * as stringent format requirements on it, so it may contain special
   * characters and be more explanatory. Do keep it very short though, and
   * avoid situations where a title can be confused with the name of another
   * entity, or where two entities share a title.
   *
   * Note that this is only for display purposes, and may be ignored by some
   * parts of the code. Entity references still always make use of the \`name\`
   * property, not the title.
   */
  title?: string;

  /**
   * A short (typically relatively few words, on one line) description of the
   * entity.
   */
  description?: string;

  /**
   * Key/value pairs of identifying information attached to the entity.
   */
  labels?: Record<string, string>;

  /**
   * Key/value pairs of non-identifying auxiliary information attached to the
   * entity.
   */
  annotations?: Record<string, string>;

  /**
   * A list of single-valued strings, to for example classify catalog entities in
   * various ways.
   */
  tags?: string[];

  /**
   * A list of external hyperlinks related to the entity.
   */
  links?: EntityLink[];
}`,signature:{properties:[{key:"uid",value:{name:"string",required:!1},description:`A globally unique ID for the entity.

This field can not be set by the user at creation time, and the server
will reject an attempt to do so. The field will be populated in read
operations. The field can (optionally) be specified when performing
update or delete operations, but the server is free to reject requests
that do so in such a way that it breaks semantics.`},{key:"etag",value:{name:"string",required:!1},description:`An opaque string that changes for each update operation to any part of
the entity, including metadata.

This field can not be set by the user at creation time, and the server
will reject an attempt to do so. The field will be populated in read
operations. The field can (optionally) be specified when performing
update or delete operations, and the server will then reject the
operation if it does not match the current stored value.`},{key:"name",value:{name:"string",required:!0},description:`The name of the entity.

Must be unique within the catalog at any given point in time, for any
given namespace + kind pair. This value is part of the technical
identifier of the entity, and as such it will appear in URLs, database
tables, entity references, and similar. It is subject to restrictions
regarding what characters are allowed.

If you want to use a different, more human readable string with fewer
restrictions on it in user interfaces, see the \`title\` field below.`},{key:"namespace",value:{name:"string",required:!1},description:"The namespace that the entity belongs to."},{key:"title",value:{name:"string",required:!1},description:`A display name of the entity, to be presented in user interfaces instead
of the \`name\` property above, when available.

This field is sometimes useful when the \`name\` is cumbersome or ends up
being perceived as overly technical. The title generally does not have
as stringent format requirements on it, so it may contain special
characters and be more explanatory. Do keep it very short though, and
avoid situations where a title can be confused with the name of another
entity, or where two entities share a title.

Note that this is only for display purposes, and may be ignored by some
parts of the code. Entity references still always make use of the \`name\`
property, not the title.`},{key:"description",value:{name:"string",required:!1},description:`A short (typically relatively few words, on one line) description of the
entity.`},{key:"labels",value:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>",required:!1},description:"Key/value pairs of identifying information attached to the entity."},{key:"annotations",value:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>",required:!1},description:`Key/value pairs of non-identifying auxiliary information attached to the
entity.`},{key:"tags",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1},description:`A list of single-valued strings, to for example classify catalog entities in
various ways.`},{key:"links",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The url to the external site, document, etc.
   */
  url: string;

  /**
   * An optional descriptive title for the link.
   */
  title?: string;

  /**
   * An optional semantic key that represents a visual icon.
   */
  icon?: string;

  /**
   * An optional value to categorize links into specific groups
   */
  type?: string;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0},description:"The url to the external site, document, etc."},{key:"title",value:{name:"string",required:!1},description:"An optional descriptive title for the link."},{key:"icon",value:{name:"string",required:!1},description:"An optional semantic key that represents a visual icon."},{key:"type",value:{name:"string",required:!1},description:"An optional value to categorize links into specific groups"}]}}],raw:"EntityLink[]",required:!1},description:"A list of external hyperlinks related to the entity."}]}}],required:!0},description:"Metadata related to the entity."},{key:"spec",value:{name:"signature",type:"object",raw:"{ [key in string]?: JsonValue }",signature:{properties:[{key:{name:"string",required:!1},value:{name:"union",raw:"JsonObject | JsonArray | JsonPrimitive",elements:[{name:"JsonObject"},{name:"JsonArray"},{name:"union",raw:"number | string | boolean | null",elements:[{name:"number"},{name:"string"},{name:"boolean"},{name:"null"}]}]}}]},required:!1},description:"The specification data describing the entity itself."},{key:"relations",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The type of the relation.
   */
  type: string;

  /**
   * The entity ref of the target of this relation.
   */
  targetRef: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0},description:"The type of the relation."},{key:"targetRef",value:{name:"string",required:!0},description:"The entity ref of the target of this relation."}]}}],raw:"EntityRelation[]",required:!1},description:"The relations that this entity has with other entities."}]}},description:""},relationsType:{required:!1,tsType:{name:"union",raw:"'direct' | 'aggregated'",elements:[{name:"literal",value:"'direct'"},{name:"literal",value:"'aggregated'"}]},description:"@deprecated Please use relationAggregation instead"},relationAggregation:{required:!1,tsType:{name:"union",raw:"'direct' | 'aggregated'",elements:[{name:"literal",value:"'direct'"},{name:"literal",value:"'aggregated'"}]},description:""},entityFilterKind:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},entityLimit:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}}}};const Ve=M(e=>({card:{maxHeight:"100%"},cardContent:{display:"flex",flexDirection:"column",overflow:"hidden"},list:{[e.breakpoints.down("xs")]:{padding:"0 0 12px"}},listItemText:{[e.breakpoints.down("xs")]:{paddingRight:0,paddingLeft:0}},listItemSecondaryAction:{[e.breakpoints.down("xs")]:{width:"100%",top:"auto",right:"auto",position:"relative",transform:"unset"}},grid:{overflowY:"auto",marginTop:0}})),R=e=>{const{variant:t,entityFilterKind:i,hideRelationsToggle:a,entityLimit:r=6}=e,o=e.relationAggregation??e.relationsType,c=a===void 0?!1:a,u=Ve(),{entity:m}=ce(),p=m.kind==="User"?"aggregated":"direct",[h,y]=C.useState(o??p);return C.useEffect(()=>{o||y(p)},[y,p,o]),l.createElement(Te,{title:"Ownership",variant:t,className:u.card,cardClassName:u.cardContent},!c&&l.createElement(ye,{dense:!0},l.createElement(ve,{className:u.list},l.createElement(be,{className:u.listItemText}),l.createElement(we,{className:u.listItemSecondaryAction},"Direct Relations",l.createElement(ke,{placement:"top",arrow:!0,title:`${h==="direct"?"Direct":"Aggregated"} Relations`},l.createElement($e,{color:"primary",checked:h!=="direct",onChange:()=>{y(h==="direct"?"aggregated":"direct")},name:"pin",inputProps:{"aria-label":"Ownership Type Switch"}})),"Aggregated Relations"))),l.createElement(H,{className:u.grid,entity:m,entityLimit:r,relationAggregation:h,entityFilterKind:i}))};R.__docgenInfo={description:"@public",methods:[],displayName:"OwnershipCard",props:{variant:{required:!1,tsType:{name:"union",raw:"'flex' | 'fullHeight' | 'gridItem'",elements:[{name:"literal",value:"'flex'"},{name:"literal",value:"'fullHeight'"},{name:"literal",value:"'gridItem'"}]},description:""},entityFilterKind:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},hideRelationsToggle:{required:!1,tsType:{name:"boolean"},description:""},relationsType:{required:!1,tsType:{name:"union",raw:"'direct' | 'aggregated'",elements:[{name:"literal",value:"'direct'"},{name:"literal",value:"'aggregated'"}]},description:"@deprecated Please use relationAggregation instead"},relationAggregation:{required:!1,tsType:{name:"union",raw:"'direct' | 'aggregated'",elements:[{name:"literal",value:"'direct'"},{name:"literal",value:"'aggregated'"}]},description:""},entityLimit:{required:!1,tsType:{name:"number"},description:""}}};const Kn={title:"Plugins/Org/Ownership Card",component:R},Y={apiVersion:"backstage.io/v1alpha1",kind:"Group",metadata:{name:"team-a",description:"Team A"},spec:{profile:{displayName:"Team A",email:"team-a@example.com",picture:"https://api.dicebear.com/7.x/identicon/svg?seed=Fluffy&backgroundType=solid,gradientLinear&backgroundColor=ffd5dc,b6e3f4"},type:"group",children:[]}},We=({type:e,name:t})=>({apiVersion:"backstage.io/v1alpha1",kind:"Component",metadata:{name:t},spec:{type:e},relations:[{type:"ownedBy",targetRef:"group:default/team-a",target:{namespace:"default",kind:"group",name:"team-a"}}]}),Qe=["service","website","api","playlist","grpc","trpc","library"],He=Qe.map((e,t)=>We({type:e,name:`${e}-${t}`})),Ye={getEntities:()=>Promise.resolve({items:He})},X=xe.from([F,Ye]),T=()=>D(l.createElement(V,{apis:X},l.createElement(K,{entity:Y},l.createElement($,{container:!0,spacing:4},l.createElement($,{item:!0,xs:12,md:6,style:{maxHeight:320,overflow:"hidden"}},l.createElement(R,null))))),{mountedRoutes:{"/catalog":q}}),E={argTypes:{entityLimit:{control:{type:"number"}}},render:({entityLimit:e})=>D(l.createElement(V,{apis:X},l.createElement(K,{entity:Y},l.createElement($,{container:!0,spacing:4},l.createElement($,{item:!0,xs:12,md:6},l.createElement(R,{entityLimit:e}))))),{mountedRoutes:{"/catalog":q}})};T.__docgenInfo={description:"",methods:[],displayName:"Default"};var S,O,_;T.parameters={...T.parameters,docs:{...(S=T.parameters)==null?void 0:S.docs,source:{originalSource:`() => wrapInTestApp(<ApiProvider apis={apis}>
      <EntityProvider entity={defaultEntity}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} style={{
        maxHeight: 320,
        overflow: 'hidden'
      }}>
            <OwnershipCard />
          </Grid>
        </Grid>
      </EntityProvider>
    </ApiProvider>, {
  mountedRoutes: {
    '/catalog': catalogIndexRouteRef
  }
})`,...(_=(O=T.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var G,N,z;E.parameters={...E.parameters,docs:{...(G=E.parameters)==null?void 0:G.docs,source:{originalSource:`{
  argTypes: {
    entityLimit: {
      control: {
        type: 'number'
      }
    }
  },
  render: ({
    entityLimit
  }: {
    entityLimit: number;
  }) => wrapInTestApp(<ApiProvider apis={apis}>
        <EntityProvider entity={defaultEntity}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <OwnershipCard entityLimit={entityLimit} />
            </Grid>
          </Grid>
        </EntityProvider>
      </ApiProvider>, {
    mountedRoutes: {
      '/catalog': catalogIndexRouteRef
    }
  })
}`,...(z=(N=E.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};const Mn=["Default","WithVariableEntityList"];export{T as Default,E as WithVariableEntityList,Mn as __namedExportsOrder,Kn as default};
