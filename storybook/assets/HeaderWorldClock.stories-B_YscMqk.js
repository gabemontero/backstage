import{R as r}from"./index-CTjT7uj6.js";import{HeaderWorldClock as s}from"./index-DkG6x0RS.js";import{H as d}from"./Header-e1oNn-x5.js";import{w as u}from"./appWrappers-C95badAO.js";import"./HeaderLabel-5sCta0_c.js";import"./makeStyles-BU0tkW44.js";import"./defaultTheme-BnEhos6D.js";import"./Grid-BBk_6dks.js";import"./capitalize-CuRwImtC.js";import"./withStyles-Bvq8MRoX.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./Typography-DllAHQJn.js";import"./Link-DLrsDiHD.js";import"./index-Cqve-NHl.js";import"./lodash-CoGan1YB.js";import"./index-QA7F3UF1.js";import"./index-BkN7i-fW.js";import"./ApiRef-BSBwTmJJ.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-gVLTJlNx.js";import"./useControlled-CogIeAPD.js";import"./createSvgIcon-C2joj_qV.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./useAnalytics-DTrkS1Gy.js";import"./ConfigApi-DBUUc3nU.js";import"./Helmet-DPVyO7__.js";import"./index-BRV0Se7Z.js";import"./Box-BlnZ3bMe.js";import"./typography-Bw32VBWA.js";import"./Breadcrumbs-96-mpcGM.js";import"./react-is.production.min-D0tnNtx9.js";import"./ButtonBase-DbbECwI4.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./Popover-BqhjDC2Q.js";import"./Modal-BqI74ljr.js";import"./classCallCheck-BNzALLS0.js";import"./Portal-DHXjgkAG.js";import"./Paper-DsuWrj9f.js";import"./Grow-P-A83A7Q.js";import"./useTheme-BywMHAxl.js";import"./utils-5sYZftss.js";import"./List-7_TU6u55.js";import"./ListContext-DydK1sOh.js";import"./ListItem-vLxI9vXl.js";import"./Page-CC8xP4Jc.js";import"./useMediaQuery-BXGcSoY3.js";import"./Tooltip-DOf8SuPq.js";import"./Popper-DjaUCFiZ.js";import"./MockTranslationApi-CzTtvR9F.js";import"./index-CFaqwFgm.js";import"./inherits-BVfVgrgP.js";import"./toArray-FnMkMKew.js";import"./TranslationApi-eOxINumg.js";import"./WebStorage-D5Fgivzj.js";import"./useAsync-CXA3qup_.js";import"./useMountedState-DkESzBh4.js";import"./componentData-CM4hSmEF.js";import"./mapValues-r4uG88u0.js";import"./toString-C6iK1gA3.js";import"./ApiProvider-CuNQiN7Z.js";import"./CssBaseline-Bw_LSqbM.js";import"./ThemeProvider-s1UPBsz6.js";import"./jsx-runtime-Cw0GR0a5.js";import"./palettes-B20oCNII.js";const _o={title:"Plugins/Home/Components/HeaderWorldClock",decorators:[o=>u(r.createElement(o,null))]},e=()=>{const o=[{label:"NYC",timeZone:"America/New_York"},{label:"UTC",timeZone:"UTC"},{label:"STO",timeZone:"Europe/Stockholm"},{label:"TYO",timeZone:"Asia/Tokyo"}],i={hour:"2-digit",minute:"2-digit",hour12:!0};return r.createElement(d,{title:"Header World Clock",pageTitleOverride:"Home"},r.createElement(s,{clockConfigs:o,customTimeFormat:i}))},t=()=>{const o=[{label:"NYC",timeZone:"America/New_York"},{label:"UTC",timeZone:"UTC"},{label:"STO",timeZone:"Europe/Stockholm"},{label:"TYO",timeZone:"Asia/Tokyo"}],i={hour:"2-digit",minute:"2-digit",hour12:!1};return r.createElement(d,{title:"24hr Header World Clock",pageTitleOverride:"Home"},r.createElement(s,{clockConfigs:o,customTimeFormat:i}))};e.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"TwentyFourHourClocks"};var m,a,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
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
