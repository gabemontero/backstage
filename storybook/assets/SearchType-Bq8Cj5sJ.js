import{r as p,R as e}from"./index-CTjT7uj6.js";import{d as V}from"./ExpandMore-CRlwxBmN.js";import{i as L}from"./interopRequireDefault-Y9pwbXtE.js";import{r as R,i as D}from"./createSvgIcon-yIvaDIOA.js";import{u as j}from"./useAsync-CXA3qup_.js";import{m as v}from"./makeStyles-DyV0dNcq.js";import{u as h}from"./SearchContext-BQYqBmky.js";import{s as P}from"./api-CKDuuaL7.js";import{B as z}from"./Box-CUgtRipO.js";import{T as J}from"./Typography-Drxa_JDy.js";import{A as M,a as W,b as X}from"./AccordionDetails-V0VN_mu9.js";import{L as $}from"./List-CWUfEUrU.js";import{D as B}from"./Divider-CHL0fjlM.js";import{L as H}from"./ListItem-D6an19MP.js";import{L as O}from"./ListItemIcon-C5uCQkqj.js";import{L as A}from"./ListItemText-CEl12qRX.js";import{u as F}from"./ApiRef-BSBwTmJJ.js";import{T as U,a as G}from"./Tabs-C796bkxy.js";import{a as K}from"./FormLabel-CKsZGm0z.js";import{I as Q}from"./InputLabel-B_it_ep8.js";import{S as Y}from"./Select-amRMFpvY.js";import{C as Z}from"./Chip-sffIUbhk.js";import{M as ee}from"./MenuItem-DKlSpdKn.js";import{C as ae}from"./Checkbox-D0820NrA.js";var re=function(a){p.useEffect(a,[])},b={},te=L,ne=D;Object.defineProperty(b,"__esModule",{value:!0});var S=b.default=void 0,se=ne(p),ie=te(R()),oe=(0,ie.default)(se.createElement("path",{d:"M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"}),"FontDownload");S=b.default=oe;const le=v(a=>({icon:{color:a.palette.text.primary},list:{width:"100%"},listItemIcon:{width:"24px",height:"24px"},accordion:{backgroundColor:a.palette.background.paper},accordionSummary:{minHeight:"auto","&.Mui-expanded":{minHeight:"auto"}},accordionSummaryContent:{margin:a.spacing(2,0),"&.Mui-expanded":{margin:a.spacing(2,0)}},accordionDetails:{padding:a.spacing(0,0,1)}})),k=a=>{const n=le(),{filters:o,setPageCursor:d,setTypes:c,term:l,types:s}=h(),u=F(P),[y,t]=p.useState(!0),{defaultValue:i,name:C,showCounts:T,types:w}=a,I=()=>t(r=>!r),_=r=>()=>{c(r!==""?[r]:[]),d(void 0)};p.useEffect(()=>{i&&c([i])},[]);const f=[{value:"",name:"All",icon:e.createElement(S,null)},...w],N=s[0]||"",{value:q}=j(async()=>{if(!T)return{};const r=await Promise.all(f.map(m=>m.value).map(async m=>{const{numberOfResults:g}=await u.query({term:l,types:m?[m]:[],filters:s.includes(m)||!s.length&&!m?o:{},pageLimit:0});return[m,g!==void 0?`${g>=1e4?">10000":g} results`:" -- "]}));return Object.fromEntries(r)},[o,T,l,s]);return e.createElement(z,null,e.createElement(J,{variant:"body2",component:"h2"},C),e.createElement(M,{className:n.accordion,expanded:y,onChange:I},e.createElement(W,{classes:{root:n.accordionSummary,content:n.accordionSummaryContent},expandIcon:e.createElement(V,{className:n.icon}),IconButtonProps:{size:"small"}},y?"Collapse":f.filter(r=>r.value===N)[0].name),e.createElement(X,{classes:{root:n.accordionDetails}},e.createElement($,{className:n.list,component:"nav","aria-label":"filter by type",disablePadding:!0,dense:!0},f.map(r=>e.createElement(p.Fragment,{key:r.value},e.createElement(B,null),e.createElement(H,{selected:s[0]===r.value||s.length===0&&r.value==="",onClick:_(r.value),button:!0},e.createElement(O,null,p.cloneElement(r.icon,{className:n.listItemIcon})),e.createElement(A,{primary:r.name,secondary:q&&q[r.value]}))))))))};k.__docgenInfo={description:"",methods:[],displayName:"SearchTypeAccordion",props:{name:{required:!0,tsType:{name:"string"},description:""},types:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  name: string;
  icon: JSX.Element;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"icon",value:{name:"JSX.Element",required:!0}}]}}],raw:`Array<{
  value: string;
  name: string;
  icon: JSX.Element;
}>`},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""},showCounts:{required:!1,tsType:{name:"boolean"},description:""}}};const ce=v(a=>({tabs:{borderBottom:`1px solid ${a.palette.textVerySubtle}`},tab:{height:"50px",fontWeight:a.typography.fontWeightBold,fontSize:a.typography.pxToRem(13),color:a.palette.text.primary,minWidth:"130px"}})),x=a=>{const n=ce(),{setPageCursor:o,setTypes:d,types:c}=h(),{defaultValue:l,types:s}=a,u=(t,i)=>{d(i!==""?[i]:[]),o(void 0)};p.useEffect(()=>{l&&d([l])},[]);const y=[{value:"",name:"All"},...s];return e.createElement(U,{"aria-label":"List of search types tabs",className:n.tabs,indicatorColor:"primary",value:c.length===0?"":c[0],onChange:u},y.map((t,i)=>e.createElement(G,{key:i,className:n.tab,label:t.name,value:t.value})))};x.__docgenInfo={description:"",methods:[],displayName:"SearchTypeTabs",props:{types:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  name: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}}]}}],raw:`Array<{
  value: string;
  name: string;
}>`},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""}}};const ue=v(a=>({label:{textTransform:"capitalize"},chips:{display:"flex",flexWrap:"wrap",marginTop:a.spacing(1)},chip:{margin:2}})),E=a=>{const{className:n,defaultValue:o,name:d,values:c=[]}=a,l=ue(),{types:s,setTypes:u}=h();re(()=>{s.length||(o&&Array.isArray(o)?u(o):o&&u([o]))});const y=t=>{const i=t.target.value;u(i)};return e.createElement(K,{className:n,variant:"filled",fullWidth:!0,"data-testid":"search-typefilter-next"},e.createElement(Q,{className:l.label,margin:"dense"},d),e.createElement(Y,{multiple:!0,variant:"outlined",value:s,onChange:y,placeholder:"All Results",renderValue:t=>e.createElement("div",{className:l.chips},t.map(i=>e.createElement(Z,{key:i,label:i,className:l.chip,size:"small"})))},c.map(t=>e.createElement(ee,{key:t,value:t},e.createElement(ae,{checked:s.indexOf(t)>-1}),e.createElement(A,{primary:t})))))};E.Accordion=a=>e.createElement(k,{...a});E.Tabs=a=>e.createElement(x,{...a});E.__docgenInfo={description:"@public",methods:[{name:"Accordion",docblock:`A control surface for the search query's "types" property, displayed as a
single-select collapsible accordion suitable for use in faceted search UIs.
@public`,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
  name: string;
  types: Array<{
    value: string;
    name: string;
    icon: JSX.Element;
  }>;
  defaultValue?: string;
  showCounts?: boolean;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"types",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  name: string;
  icon: JSX.Element;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"icon",value:{name:"JSX.Element",required:!0}}]}}],raw:`Array<{
  value: string;
  name: string;
  icon: JSX.Element;
}>`,required:!0}},{key:"defaultValue",value:{name:"string",required:!1}},{key:"showCounts",value:{name:"boolean",required:!1}}]},alias:"SearchTypeAccordionProps"}}],returns:null,description:`A control surface for the search query's "types" property, displayed as a
single-select collapsible accordion suitable for use in faceted search UIs.`},{name:"Tabs",docblock:`A control surface for the search query's "types" property, displayed as a
tabs suitable for use in faceted search UIs.
@public`,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
  types: Array<{
    value: string;
    name: string;
  }>;
  defaultValue?: string;
}`,signature:{properties:[{key:"types",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  name: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"name",value:{name:"string",required:!0}}]}}],raw:`Array<{
  value: string;
  name: string;
}>`,required:!0}},{key:"defaultValue",value:{name:"string",required:!1}}]},alias:"SearchTypeTabsProps"}}],returns:null,description:`A control surface for the search query's "types" property, displayed as a
tabs suitable for use in faceted search UIs.`}],displayName:"SearchType",props:{className:{required:!1,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},values:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},defaultValue:{required:!1,tsType:{name:"union",raw:"string[] | string | null",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"string"},{name:"null"}]},description:""}}};export{E as S};
