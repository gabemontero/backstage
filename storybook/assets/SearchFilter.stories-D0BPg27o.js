import{r as M,R as t}from"./index-CTjT7uj6.js";import{s as de,M as pe}from"./api-CKDuuaL7.js";import{l as fe}from"./lodash-CoGan1YB.js";import{a as ge}from"./useAsync-CXA3qup_.js";import{u as ve}from"./useDebounce-4fqASXX_.js";import{u as N,S as ye}from"./SearchContext-BQYqBmky.js";import{A as be}from"./Autocomplete-B8p2n2EJ.js";import{T as he}from"./TextField-BrqOlVRS.js";import{C as we}from"./Chip-ILZXFD96.js";import{m as ke}from"./makeStyles-BU0tkW44.js";import{a as oe,F as Se}from"./FormLabel-wOM7qHEc.js";import{F as qe}from"./FormControlLabel-BOB-aZsJ.js";import{C as Ae}from"./Checkbox-0n-7fLy6.js";import{S as De}from"./Select-Bziw3qHz.js";import{S as $}from"./Grid-BBk_6dks.js";import{P as w}from"./Paper-DsuWrj9f.js";import{T as Ee}from"./TestApiProvider-CoiMLMhd.js";import"./ApiRef-BSBwTmJJ.js";import"./useMountedState-DkESzBh4.js";import"./useAnalytics-DTrkS1Gy.js";import"./ConfigApi-DBUUc3nU.js";import"./defaultTheme-BnEhos6D.js";import"./clsx.m-CH7BE6MN.js";import"./Close-BbgUw1pN.js";import"./createSvgIcon-C2joj_qV.js";import"./capitalize-CuRwImtC.js";import"./withStyles-Bvq8MRoX.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./unstable_useId-B3Hiq1YI.js";import"./useControlled-CogIeAPD.js";import"./index-QA7F3UF1.js";import"./isMuiElement-Cb6QZSLO.js";import"./IconButton-DZLTM8HP.js";import"./ButtonBase-DbbECwI4.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./Popper-DjaUCFiZ.js";import"./Portal-DHXjgkAG.js";import"./ListSubheader-TCe4q-gr.js";import"./InputLabel-CNoW4QMV.js";import"./formControlState-ByiNFc8I.js";import"./useFormControl-F4cJWIkJ.js";import"./Select-CM4DSTB5.js";import"./react-is.production.min-D0tnNtx9.js";import"./useTheme-BywMHAxl.js";import"./Popover-BqhjDC2Q.js";import"./Modal-BqI74ljr.js";import"./classCallCheck-BNzALLS0.js";import"./Grow-P-A83A7Q.js";import"./utils-5sYZftss.js";import"./List-7_TU6u55.js";import"./ListContext-DydK1sOh.js";import"./Typography-DllAHQJn.js";import"./SwitchBase-FcKG2_0S.js";import"./createStyles-Bp4GwXob.js";import"./createStyles-yD3y8ldD.js";import"./Box-BlnZ3bMe.js";import"./typography-Bw32VBWA.js";import"./MenuItem-ga6dDcPT.js";import"./ListItem-vLxI9vXl.js";import"./ApiProvider-CuNQiN7Z.js";import"./index-BRV0Se7Z.js";const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function Fe(e,n=0){return(s[e[n+0]]+s[e[n+1]]+s[e[n+2]]+s[e[n+3]]+"-"+s[e[n+4]]+s[e[n+5]]+"-"+s[e[n+6]]+s[e[n+7]]+"-"+s[e[n+8]]+s[e[n+9]]+"-"+s[e[n+10]]+s[e[n+11]]+s[e[n+12]]+s[e[n+13]]+s[e[n+14]]+s[e[n+15]]).toLowerCase()}let j;const Te=new Uint8Array(16);function Pe(){if(!j){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");j=crypto.getRandomValues.bind(crypto)}return j(Te)}const Ce=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),B={randomUUID:Ce};function Ie(e,n,l){var r;if(B.randomUUID&&!n&&!e)return B.randomUUID();e=e||{};const a=e.random??((r=e.rng)==null?void 0:r.call(e))??Pe();if(a.length<16)throw new Error("Random bytes length must be >= 16");return a[6]=a[6]&15|64,a[8]=a[8]&63|128,Fe(a)}const R=(e,n,l=[],a=250)=>{const r=M.useRef({}),o=e||(()=>Promise.resolve([])),[v,c]=ge(o,[n],{loading:!0});if(ve(()=>{r.current[n]===void 0&&(r.current[n]=c(n).then(m=>(r.current[n]=m,m)))},a,[c,n]),l.length)return{loading:!1,value:l};const p=r.current[n];return Array.isArray(p)?{loading:!1,value:p}:v},O=(e,n)=>{const{setFilters:l}=N();M.useEffect(()=>{n&&[n].flat().length>0&&l(a=>({...a,[e]:n}))},[])},ue=e=>{const{className:n,defaultValue:l,name:a,values:r,valuesDebounceMs:o,label:v,filterSelectedOptions:c,limitTags:p,multiple:m}=e,[k,y]=M.useState("");O(a,l);const S=typeof r=="function"?r:void 0,q=typeof r=="function"?void 0:r,{value:A,loading:u}=R(S,k,q,o),{filters:h,setFilters:d}=N(),D=h[a]||(m?[]:null),x=(f,g)=>{d(_=>{const{[a]:U,...W}=_;return g?{...W,[a]:g}:{...W}})},b=f=>t.createElement(he,{...f,name:"search",variant:"outlined",label:v,fullWidth:!0}),V=(f,g)=>f.map((_,U)=>t.createElement(we,{label:_,color:"primary",...g({index:U})}));return t.createElement(be,{filterSelectedOptions:c,limitTags:p,multiple:m,className:n,id:`${m?"multi-":""}select-filter-${a}--select`,options:A||[],loading:u,value:D,onChange:x,onInputChange:(f,g)=>y(g),renderInput:b,renderTags:V})};ue.__docgenInfo={description:"@public",methods:[],displayName:"AutocompleteFilter",props:{className:{required:!1,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},values:{required:!1,tsType:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}]},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},defaultValue:{required:!1,tsType:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}]},description:""},valuesDebounceMs:{required:!1,tsType:{name:"number"},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`},filterSelectedOptions:{required:!1,tsType:{name:"boolean"},description:""},limitTags:{required:!1,tsType:{name:"number"},description:""},multiple:{required:!1,tsType:{name:"boolean"},description:""}}};const xe=ke({label:{textTransform:"capitalize"},checkboxWrapper:{display:"flex",alignItems:"center",width:"100%"},textWrapper:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}),ce=e=>{const{className:n,defaultValue:l,label:a,name:r,values:o=[],valuesDebounceMs:v}=e,c=xe(),{filters:p,setFilters:m}=N();O(r,l);const k=typeof o=="function"?o:void 0,y=typeof o=="function"?void 0:o,{value:S=[],loading:q}=R(k,"",y,v),A=u=>{const{target:{value:h,checked:d}}=u;m(D=>{const{[r]:x,...b}=D,V=(x||[]).filter(g=>g!==h),f=d?[...V,h]:V;return f.length?{...b,[r]:f}:b})};return t.createElement(oe,{className:n,disabled:q,fullWidth:!0,"data-testid":"search-checkboxfilter-next"},a?t.createElement(Se,{className:c.label},a):null,S.map(u=>t.createElement(qe,{key:u,classes:{root:c.checkboxWrapper,label:c.textWrapper},label:u,control:t.createElement(Ae,{color:"primary",inputProps:{"aria-labelledby":u},value:u,name:u,onChange:A,checked:(p[r]??[]).includes(u)})})))},me=e=>{const{className:n,defaultValue:l,label:a,name:r,values:o,valuesDebounceMs:v}=e;O(r,l);const c=typeof o=="function"?o:void 0,p=typeof o=="function"?void 0:o,{value:m=[],loading:k}=R(c,"",p,v),y=M.useRef(Ie()),S={value:y.current,label:"All"},{filters:q,setFilters:A}=N(),u=d=>{A(D=>{const{[r]:x,...b}=D;return d!==y.current?{...b,[r]:d}:b})},h=[S,...m.map(d=>({value:d,label:d}))];return t.createElement(oe,{disabled:k,className:n,variant:"filled",fullWidth:!0,"data-testid":"search-selectfilter-next"},t.createElement(De,{label:a??fe.capitalize(r),selected:q[r]||y.current,onChange:u,items:h}))},i=e=>{const{component:n,...l}=e;return t.createElement(n,{...l})};i.Checkbox=e=>t.createElement(i,{...e,component:ce});i.Select=e=>t.createElement(i,{...e,component:me});i.Autocomplete=e=>t.createElement(i,{...e,component:ue});ce.__docgenInfo={description:"@public",methods:[],displayName:"CheckboxFilter",props:{className:{required:!1,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},values:{required:!1,tsType:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}]},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},defaultValue:{required:!1,tsType:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}]},description:""},valuesDebounceMs:{required:!1,tsType:{name:"number"},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}}};me.__docgenInfo={description:"@public",methods:[],displayName:"SelectFilter",props:{className:{required:!1,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},values:{required:!1,tsType:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}]},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},defaultValue:{required:!1,tsType:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}]},description:""},valuesDebounceMs:{required:!1,tsType:{name:"number"},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}}};i.__docgenInfo={description:"@public",methods:[{name:"Checkbox",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`Omit<SearchFilterWrapperProps, 'component'> &
SearchFilterComponentProps`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`SearchFilterComponentProps & {
  component: (props: SearchFilterComponentProps) => ReactElement;
  debug?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}},{name:"signature",type:"object",raw:`{
  component: (props: SearchFilterComponentProps) => ReactElement;
  debug?: boolean;
}`,signature:{properties:[{key:"component",value:{name:"signature",type:"function",raw:"(props: SearchFilterComponentProps) => ReactElement",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}},name:"props"}],return:{name:"ReactElement"}},required:!0}},{key:"debug",value:{name:"boolean",required:!1}}]}}]},{name:"literal",value:"'component'"}],raw:"Omit<SearchFilterWrapperProps, 'component'>"},{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}}]}}],returns:null},{name:"Select",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`Omit<SearchFilterWrapperProps, 'component'> &
SearchFilterComponentProps`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`SearchFilterComponentProps & {
  component: (props: SearchFilterComponentProps) => ReactElement;
  debug?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}},{name:"signature",type:"object",raw:`{
  component: (props: SearchFilterComponentProps) => ReactElement;
  debug?: boolean;
}`,signature:{properties:[{key:"component",value:{name:"signature",type:"function",raw:"(props: SearchFilterComponentProps) => ReactElement",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}},name:"props"}],return:{name:"ReactElement"}},required:!0}},{key:"debug",value:{name:"boolean",required:!1}}]}}]},{name:"literal",value:"'component'"}],raw:"Omit<SearchFilterWrapperProps, 'component'>"},{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}}]}}],returns:null},{name:"Autocomplete",docblock:`A control surface for a given filter field name, rendered as an autocomplete
textfield. A hard-coded list of values may be provided, or an async function
which returns values may be provided instead.

@public`,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`SearchFilterComponentProps & {
  filterSelectedOptions?: boolean;
  limitTags?: number;
  multiple?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}},{name:"signature",type:"object",raw:`{
  filterSelectedOptions?: boolean;
  limitTags?: number;
  multiple?: boolean;
}`,signature:{properties:[{key:"filterSelectedOptions",value:{name:"boolean",required:!1}},{key:"limitTags",value:{name:"number",required:!1}},{key:"multiple",value:{name:"boolean",required:!1}}]}}],alias:"SearchAutocompleteFilterProps"}}],returns:null,description:`A control surface for a given filter field name, rendered as an autocomplete
textfield. A hard-coded list of values may be provided, or an async function
which returns values may be provided instead.`}],displayName:"SearchFilter",props:{className:{required:!1,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},values:{required:!1,tsType:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}]},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},defaultValue:{required:!1,tsType:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}]},description:""},valuesDebounceMs:{required:!1,tsType:{name:"number"},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`},component:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: SearchFilterComponentProps) => ReactElement",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  className?: string;
  name: string;
  label?: string;
  /**
   * Either an array of values directly, or an async function to return a list
   * of values to be used in the filter. In the autocomplete filter, the last
   * input value is provided as an input to allow values to be filtered. This
   * function is debounced and values cached.
   */
  values?: string[] | ((partial: string) => Promise<string[]>);
  defaultValue?: string[] | string | null;
  /**
   * Debounce time in milliseconds, used when values is an async callback.
   * Defaults to 250ms.
   */
  valuesDebounceMs?: number;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"name",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"values",value:{name:"union",raw:"string[] | ((partial: string) => Promise<string[]>)",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"unknown"}],required:!1},description:`Either an array of values directly, or an async function to return a list
of values to be used in the filter. In the autocomplete filter, the last
input value is provided as an input to allow values to be filtered. This
function is debounced and values cached.`},{key:"defaultValue",value:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}],required:!1}},{key:"valuesDebounceMs",value:{name:"number",required:!1},description:`Debounce time in milliseconds, used when values is an async callback.
Defaults to 250ms.`}]}},name:"props"}],return:{name:"ReactElement"}}},description:""},debug:{required:!1,tsType:{name:"boolean"},description:""}}};const Wn={title:"Plugins/Search/SearchFilter",component:i,decorators:[e=>t.createElement(Ee,{apis:[[de,new pe]]},t.createElement(ye,null,t.createElement($,{container:!0,direction:"row"},t.createElement($,{item:!0,xs:4},t.createElement(e,null)))))]},E=()=>t.createElement(w,{style:{padding:10}},t.createElement(i.Checkbox,{name:"Search Checkbox Filter",values:["value1","value2"]})),F=()=>t.createElement(w,{style:{padding:10}},t.createElement(i.Select,{label:"Search Select Filter",name:"select_filter",values:["value1","value2"]})),T=()=>t.createElement(w,{style:{padding:10}},t.createElement(i.Select,{label:"Asynchronous Values",name:"async_values",values:async()=>(await(await fetch("https://swapi.dev/api/planets")).json()).results.map(l=>l.name)})),P=()=>t.createElement(w,{style:{padding:10}},t.createElement(i.Autocomplete,{name:"autocomplete",label:"Single-Select Autocomplete Filter",values:["value1","value2"]})),C=()=>t.createElement(w,{style:{padding:10}},t.createElement(i.Autocomplete,{multiple:!0,name:"autocomplete",label:"Multi-Select Autocomplete Filter",values:["value1","value2"]})),I=()=>t.createElement(w,{style:{padding:10}},t.createElement(i.Autocomplete,{multiple:!0,name:"starwarsPerson",label:"Starwars Character",values:async e=>e===""?[]:(await(await fetch(`https://swapi.dev/api/people?search=${encodeURIComponent(e)}`)).json()).results.map(a=>a.name)}));E.__docgenInfo={description:"",methods:[],displayName:"CheckBoxFilter"};F.__docgenInfo={description:"",methods:[],displayName:"SelectFilter"};T.__docgenInfo={description:"",methods:[],displayName:"AsyncSelectFilter"};P.__docgenInfo={description:"",methods:[],displayName:"Autocomplete"};C.__docgenInfo={description:"",methods:[],displayName:"MultiSelectAutocomplete"};I.__docgenInfo={description:"",methods:[],displayName:"AsyncMultiSelectAutocomplete"};var L,z,G;E.parameters={...E.parameters,docs:{...(L=E.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  return <Paper style={{
    padding: 10
  }}>
      <SearchFilter.Checkbox name="Search Checkbox Filter" values={['value1', 'value2']} />
    </Paper>;
}`,...(G=(z=E.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var H,J,K;F.parameters={...F.parameters,docs:{...(H=F.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  return <Paper style={{
    padding: 10
  }}>
      <SearchFilter.Select label="Search Select Filter" name="select_filter" values={['value1', 'value2']} />
    </Paper>;
}`,...(K=(J=F.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  return <Paper style={{
    padding: 10
  }}>
      <SearchFilter.Select label="Asynchronous Values" name="async_values" values={async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json: {
        results: Array<{
          name: string;
        }>;
      } = await response.json();
      return json.results.map(r => r.name);
    }} />
    </Paper>;
}`,...(Y=(X=T.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ne;P.parameters={...P.parameters,docs:{...(Z=P.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  return <Paper style={{
    padding: 10
  }}>
      <SearchFilter.Autocomplete name="autocomplete" label="Single-Select Autocomplete Filter" values={['value1', 'value2']} />
    </Paper>;
}`,...(ne=(ee=P.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,ae,re;C.parameters={...C.parameters,docs:{...(te=C.parameters)==null?void 0:te.docs,source:{originalSource:`() => {
  return <Paper style={{
    padding: 10
  }}>
      <SearchFilter.Autocomplete multiple name="autocomplete" label="Multi-Select Autocomplete Filter" values={['value1', 'value2']} />
    </Paper>;
}`,...(re=(ae=C.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var se,le,ie;I.parameters={...I.parameters,docs:{...(se=I.parameters)==null?void 0:se.docs,source:{originalSource:`() => {
  return <Paper style={{
    padding: 10
  }}>
      <SearchFilter.Autocomplete multiple name="starwarsPerson" label="Starwars Character" values={async partial => {
      if (partial === '') return [];
      const response = await fetch(\`https://swapi.dev/api/people?search=\${encodeURIComponent(partial)}\`);
      const json: {
        results: Array<{
          name: string;
        }>;
      } = await response.json();
      return json.results.map(r => r.name);
    }} />
    </Paper>;
}`,...(ie=(le=I.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};const $n=["CheckBoxFilter","SelectFilter","AsyncSelectFilter","Autocomplete","MultiSelectAutocomplete","AsyncMultiSelectAutocomplete"];export{I as AsyncMultiSelectAutocomplete,T as AsyncSelectFilter,P as Autocomplete,E as CheckBoxFilter,C as MultiSelectAutocomplete,F as SelectFilter,$n as __namedExportsOrder,Wn as default};
