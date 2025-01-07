import{R as r}from"./index-CTjT7uj6.js";import{HeaderWorldClock as s}from"./index-CCLapdI_.js";import{H as d}from"./Header-DML8qHCS.js";import{w as u}from"./appWrappers-zuJY6Z2z.js";import"./HeaderLabel-BNlK8Pdn.js";import"./makeStyles-DyV0dNcq.js";import"./defaultTheme-BLQVRFyP.js";import"./Grid-DRKqbyUB.js";import"./hoist-non-react-statics.cjs-yZcCaz5O.js";import"./capitalize-DKydST9S.js";import"./withStyles-K20mGrhL.js";import"./Typography-Drxa_JDy.js";import"./Link-bsB8Po3b.js";import"./index-Cqve-NHl.js";import"./lodash-CoGan1YB.js";import"./index-QA7F3UF1.js";import"./index-DNAWfEOe.js";import"./ApiRef-BSBwTmJJ.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-yIvaDIOA.js";import"./useControlled-CogIeAPD.js";import"./createSvgIcon-DMq0di89.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./useAnalytics-DTrkS1Gy.js";import"./ConfigApi-DBUUc3nU.js";import"./Helmet-DPVyO7__.js";import"./index-BRV0Se7Z.js";import"./Box-CUgtRipO.js";import"./typography-CCicI0oZ.js";import"./Breadcrumbs-CqFlSzar.js";import"./react-is.production.min-D0tnNtx9.js";import"./ButtonBase-CgEmjkk8.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./Popover-FpBL0i50.js";import"./Modal-BhcLMLNB.js";import"./classCallCheck-BNzALLS0.js";import"./Portal-DHXjgkAG.js";import"./Paper-DKlVK5mw.js";import"./Grow-C52yxNn8.js";import"./useTheme-DHQwi4PO.js";import"./utils-DQjp17aO.js";import"./List-CWUfEUrU.js";import"./ListContext-DydK1sOh.js";import"./ListItem-D6an19MP.js";import"./Page-CsRAkKmT.js";import"./useMediaQuery-Cvy32R2b.js";import"./Tooltip-DpHos2o3.js";import"./Popper-DD91Ec3e.js";import"./MockTranslationApi-WfPveaUo.js";import"./index-CFaqwFgm.js";import"./inherits-BlLXsrOw.js";import"./toArray-Bh10GYTQ.js";import"./TranslationApi-eOxINumg.js";import"./WebStorage-D5Fgivzj.js";import"./useAsync-CXA3qup_.js";import"./useMountedState-DkESzBh4.js";import"./componentData-CM4hSmEF.js";import"./mapValues-r4uG88u0.js";import"./toString-C6iK1gA3.js";import"./ApiProvider-CuNQiN7Z.js";import"./CssBaseline-gcFoYqiq.js";import"./ThemeProvider-CHb3fgCH.js";import"./jsx-runtime-Cw0GR0a5.js";import"./palettes-B20oCNII.js";const _o={title:"Plugins/Home/Components/HeaderWorldClock",decorators:[o=>u(r.createElement(o,null))]},e=()=>{const o=[{label:"NYC",timeZone:"America/New_York"},{label:"UTC",timeZone:"UTC"},{label:"STO",timeZone:"Europe/Stockholm"},{label:"TYO",timeZone:"Asia/Tokyo"}],i={hour:"2-digit",minute:"2-digit",hour12:!0};return r.createElement(d,{title:"Header World Clock",pageTitleOverride:"Home"},r.createElement(s,{clockConfigs:o,customTimeFormat:i}))},t=()=>{const o=[{label:"NYC",timeZone:"America/New_York"},{label:"UTC",timeZone:"UTC"},{label:"STO",timeZone:"Europe/Stockholm"},{label:"TYO",timeZone:"Asia/Tokyo"}],i={hour:"2-digit",minute:"2-digit",hour12:!1};return r.createElement(d,{title:"24hr Header World Clock",pageTitleOverride:"Home"},r.createElement(s,{clockConfigs:o,customTimeFormat:i}))};e.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"TwentyFourHourClocks"};var m,a,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const clockConfigs: ClockConfig[] = [{
    label: 'NYC',
    timeZone: 'America/New_York'
  }, {
    label: 'UTC',
    timeZone: 'UTC'
  }, {
    label: 'STO',
    timeZone: 'Europe/Stockholm'
  }, {
    label: 'TYO',
    timeZone: 'Asia/Tokyo'
  }];
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return <Header title="Header World Clock" pageTitleOverride="Home">
      <HeaderWorldClock clockConfigs={clockConfigs} customTimeFormat={timeFormat} />
    </Header>;
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};var p,c,n;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const clockConfigs: ClockConfig[] = [{
    label: 'NYC',
    timeZone: 'America/New_York'
  }, {
    label: 'UTC',
    timeZone: 'UTC'
  }, {
    label: 'STO',
    timeZone: 'Europe/Stockholm'
  }, {
    label: 'TYO',
    timeZone: 'Asia/Tokyo'
  }];
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return <Header title="24hr Header World Clock" pageTitleOverride="Home">
      <HeaderWorldClock clockConfigs={clockConfigs} customTimeFormat={timeFormat} />
    </Header>;
}`,...(n=(c=t.parameters)==null?void 0:c.docs)==null?void 0:n.source}}};const Eo=["Default","TwentyFourHourClocks"];export{e as Default,t as TwentyFourHourClocks,Eo as __namedExportsOrder,_o as default};
