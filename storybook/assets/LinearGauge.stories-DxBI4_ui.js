import{r as f,R as r}from"./index-CTjT7uj6.js";import{b as Q,_ as U}from"./defaultTheme-BLQVRFyP.js";import{_ as S}from"./objectSpread2--PwPGVt5.js";import{c as X}from"./index-Cqve-NHl.js";import{d as Y,u as Z,g as ee}from"./Gauge-C6hi-vYD.js";import{u as re}from"./useTheme-DHQwi4PO.js";import{T as ne}from"./Tooltip-DpHos2o3.js";import{T as te}from"./Typography-Drxa_JDy.js";import"./makeStyles-DyV0dNcq.js";import"./Box-CUgtRipO.js";import"./typography-CCicI0oZ.js";import"./hoist-non-react-statics.cjs-yZcCaz5O.js";import"./index-QA7F3UF1.js";import"./capitalize-DKydST9S.js";import"./withStyles-K20mGrhL.js";import"./useControlled-CogIeAPD.js";import"./unstable_useId-B3Hiq1YI.js";import"./Popper-DD91Ec3e.js";import"./Portal-DHXjgkAG.js";import"./Grow-C52yxNn8.js";import"./utils-DQjp17aO.js";import"./TransitionGroupContext-BtzQ-Cv7.js";var ae=["className","percent","prefixCls","strokeColor","strokeLinecap","strokeWidth","style","trailColor","trailWidth","transition"],ie=function(c){var e=S(S({},Y),c),k=e.className,o=e.percent,n=e.prefixCls,i=e.strokeColor,t=e.strokeLinecap,a=e.strokeWidth,M=e.style,A=e.trailColor,O=e.trailWidth,R=e.transition,h=Q(e,ae);delete h.gapPosition;var H=Array.isArray(o)?o:[o],v=Array.isArray(i)?i:[i],V=Z(),y=a/2,$=100-a/2,w="M ".concat(t==="round"?y:0,",").concat(y,`
         L `).concat(t==="round"?$:100,",").concat(y),z="0 0 100 ".concat(a),C=0;return f.createElement("svg",U({className:X("".concat(n,"-line"),k),viewBox:z,preserveAspectRatio:"none",style:M},h),f.createElement("path",{className:"".concat(n,"-line-trail"),d:w,strokeLinecap:t,stroke:A,strokeWidth:O||a,fillOpacity:"0"}),H.map(function(x,b){var m=1;switch(t){case"round":m=1-a/100;break;case"square":m=1-a/2/100;break;default:m=1;break}var F={strokeDasharray:"".concat(x*m,"px, 100px"),strokeDashoffset:"-".concat(C,"px"),transition:R||"stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear"},J=v[b]||v[v.length-1];return C+=x,f.createElement("path",{key:b,className:"".concat(n,"-line-path"),d:w,strokeLinecap:t,stroke:J,strokeWidth:a,fillOpacity:"0",ref:function(K){V[b]=K},style:F})}))};function s(q){const{value:c,getColor:e=ee,width:k="thick"}=q,{palette:o}=re();if(isNaN(c))return null;let n=Math.round(c*100*100)/100;n>100&&(n=100);const i=k==="thick"?4:1,t=e({palette:o,value:n,inverse:!1,max:100});return r.createElement(ne,{title:`${n}%`},r.createElement(te,{component:"span"},r.createElement(ie,{percent:n,strokeWidth:i,trailWidth:i,strokeColor:t})))}s.__docgenInfo={description:"",methods:[],displayName:"LinearGauge",props:{value:{required:!0,tsType:{name:"number"},description:"Progress value between 0.0 - 1.0."},width:{required:!1,tsType:{name:"union",raw:"'thick' | 'thin'",elements:[{name:"literal",value:"'thick'"},{name:"literal",value:"'thin'"}]},description:""},getColor:{required:!1,tsType:{name:"signature",type:"function",raw:"(args: GaugePropsGetColorOptions) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  palette: BackstagePalette;
  value: number;
  inverse?: boolean;
  max?: number;
}`,signature:{properties:[{key:"palette",value:{name:"intersection",raw:"MuiPalette & BackstagePaletteAdditions",elements:[{name:"MuiPalette"},{name:"signature",type:"object",raw:`{
  status: {
    ok: string;
    warning: string;
    error: string;
    pending: string;
    running: string;
    aborted: string;
  };
  border: string;
  textContrast: string;
  textVerySubtle: string;
  textSubtle: string;
  highlight: string;
  errorBackground: string;
  warningBackground: string;
  infoBackground: string;
  errorText: string;
  infoText: string;
  warningText: string;
  linkHover: string;
  link: string;
  gold: string;
  navigation: {
    background: string;
    indicator: string;
    color: string;
    selectedColor: string;
    navItem?: {
      hoverBackground: string;
    };
    submenu?: {
      background: string;
    };
  };
  tabbar: {
    indicator: string;
  };
  /**
   * @deprecated The entire \`bursts\` section will be removed in a future release
   */
  bursts: {
    fontColor: string;
    slackChannelText: string;
    backgroundColor: {
      default: string;
    };
    gradient: {
      linear: string;
    };
  };
  pinSidebarButton: {
    icon: string;
    background: string;
  };
  banner: {
    info: string;
    error: string;
    text: string;
    link: string;
    closeButtonColor?: string;
    warning?: string;
  };
  code?: {
    background?: string;
  };
}`,signature:{properties:[{key:"status",value:{name:"signature",type:"object",raw:`{
  ok: string;
  warning: string;
  error: string;
  pending: string;
  running: string;
  aborted: string;
}`,signature:{properties:[{key:"ok",value:{name:"string",required:!0}},{key:"warning",value:{name:"string",required:!0}},{key:"error",value:{name:"string",required:!0}},{key:"pending",value:{name:"string",required:!0}},{key:"running",value:{name:"string",required:!0}},{key:"aborted",value:{name:"string",required:!0}}]},required:!0}},{key:"border",value:{name:"string",required:!0}},{key:"textContrast",value:{name:"string",required:!0}},{key:"textVerySubtle",value:{name:"string",required:!0}},{key:"textSubtle",value:{name:"string",required:!0}},{key:"highlight",value:{name:"string",required:!0}},{key:"errorBackground",value:{name:"string",required:!0}},{key:"warningBackground",value:{name:"string",required:!0}},{key:"infoBackground",value:{name:"string",required:!0}},{key:"errorText",value:{name:"string",required:!0}},{key:"infoText",value:{name:"string",required:!0}},{key:"warningText",value:{name:"string",required:!0}},{key:"linkHover",value:{name:"string",required:!0}},{key:"link",value:{name:"string",required:!0}},{key:"gold",value:{name:"string",required:!0}},{key:"navigation",value:{name:"signature",type:"object",raw:`{
  background: string;
  indicator: string;
  color: string;
  selectedColor: string;
  navItem?: {
    hoverBackground: string;
  };
  submenu?: {
    background: string;
  };
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}},{key:"indicator",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"selectedColor",value:{name:"string",required:!0}},{key:"navItem",value:{name:"signature",type:"object",raw:`{
  hoverBackground: string;
}`,signature:{properties:[{key:"hoverBackground",value:{name:"string",required:!0}}]},required:!1}},{key:"submenu",value:{name:"signature",type:"object",raw:`{
  background: string;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}}]},required:!1}}]},required:!0}},{key:"tabbar",value:{name:"signature",type:"object",raw:`{
  indicator: string;
}`,signature:{properties:[{key:"indicator",value:{name:"string",required:!0}}]},required:!0}},{key:"bursts",value:{name:"signature",type:"object",raw:`{
  fontColor: string;
  slackChannelText: string;
  backgroundColor: {
    default: string;
  };
  gradient: {
    linear: string;
  };
}`,signature:{properties:[{key:"fontColor",value:{name:"string",required:!0}},{key:"slackChannelText",value:{name:"string",required:!0}},{key:"backgroundColor",value:{name:"signature",type:"object",raw:`{
  default: string;
}`,signature:{properties:[{key:"default",value:{name:"string",required:!0}}]},required:!0}},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  linear: string;
}`,signature:{properties:[{key:"linear",value:{name:"string",required:!0}}]},required:!0}}]},required:!0},description:"@deprecated The entire `bursts` section will be removed in a future release"},{key:"pinSidebarButton",value:{name:"signature",type:"object",raw:`{
  icon: string;
  background: string;
}`,signature:{properties:[{key:"icon",value:{name:"string",required:!0}},{key:"background",value:{name:"string",required:!0}}]},required:!0}},{key:"banner",value:{name:"signature",type:"object",raw:`{
  info: string;
  error: string;
  text: string;
  link: string;
  closeButtonColor?: string;
  warning?: string;
}`,signature:{properties:[{key:"info",value:{name:"string",required:!0}},{key:"error",value:{name:"string",required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"link",value:{name:"string",required:!0}},{key:"closeButtonColor",value:{name:"string",required:!1}},{key:"warning",value:{name:"string",required:!1}}]},required:!0}},{key:"code",value:{name:"signature",type:"object",raw:`{
  background?: string;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}}]},required:!1}}]}}],required:!0}},{key:"value",value:{name:"number",required:!0}},{key:"inverse",value:{name:"boolean",required:!1}},{key:"max",value:{name:"number",required:!1}}]}},name:"args"}],return:{name:"string"}}},description:""}}};const p={width:300},Be={title:"Data Display/LinearGauge",component:s},u=()=>r.createElement("div",{style:p},r.createElement(s,{value:.8})),l=()=>r.createElement("div",{style:p},r.createElement(s,{value:.5})),g=()=>r.createElement("div",{style:p},r.createElement(s,{value:.2})),d=()=>r.createElement("div",{style:p},r.createElement(s,{getColor:()=>"#f0f",value:.5}));u.__docgenInfo={description:"",methods:[],displayName:"Default"};l.__docgenInfo={description:"",methods:[],displayName:"MediumProgress"};g.__docgenInfo={description:"",methods:[],displayName:"LowProgress"};d.__docgenInfo={description:"",methods:[],displayName:"StaticColor"};var P,T,_;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`() => <div style={containerStyle}>
    <LinearGauge value={0.8} />
  </div>`,...(_=(T=u.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var B,L,E;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={containerStyle}>
    <LinearGauge value={0.5} />
  </div>`,...(E=(L=l.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var j,N,W;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`() => <div style={containerStyle}>
    <LinearGauge value={0.2} />
  </div>`,...(W=(N=g.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var G,D,I;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`() => <div style={containerStyle}>
    <LinearGauge getColor={() => '#f0f'} value={0.5} />
  </div>`,...(I=(D=d.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};const Le=["Default","MediumProgress","LowProgress","StaticColor"];export{u as Default,g as LowProgress,l as MediumProgress,d as StaticColor,Le as __namedExportsOrder,Be as default};
