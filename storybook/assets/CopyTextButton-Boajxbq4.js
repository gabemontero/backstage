import{u as b,d as T}from"./useCopyToClipboard-jmfaK3ET.js";import{r as a,R as e}from"./index-CTjT7uj6.js";import{u as x,c as h}from"./translation-67MxozS3.js";import{T as y}from"./Tooltip-DOf8SuPq.js";import{I as C}from"./IconButton-DZLTM8HP.js";import{u as k}from"./ApiRef-BSBwTmJJ.js";import{e as w}from"./TranslationApi-eOxINumg.js";function g(r){const{t:i}=x(h),{text:s,tooltipDelay:l=1e3,tooltipText:p=i("copyTextButton.tooltipText"),"aria-label":c="Copy text"}=r,o=k(w),[u,n]=a.useState(!1),[{error:t},m]=b();a.useEffect(()=>{t&&o.post(t)},[t,o]);const f=d=>{d.stopPropagation(),n(!0),m(s)};return e.createElement(e.Fragment,null,e.createElement(y,{id:"copy-test-tooltip",title:p,placement:"top",leaveDelay:l,onClose:()=>n(!1),open:u},e.createElement(C,{onClick:f,"aria-label":c},e.createElement(T,null))))}g.__docgenInfo={description:`Copy text button with visual feedback

@public
@remarks

Visual feedback takes form of:
 - a hover color
 - click ripple
 - Tooltip shown when user has clicked

@example

\`\`\`
<CopyTextButton
  text="My text that I want to be copied to the clipboard"
  arial-label="Accessible label for this button" />
\`\`\``,methods:[],displayName:"CopyTextButton",props:{text:{required:!0,tsType:{name:"string"},description:"The text to be copied"},tooltipDelay:{required:!1,tsType:{name:"number"},description:`Number of milliseconds that the tooltip is shown

@remarks

Default: 1000`},tooltipText:{required:!1,tsType:{name:"string"},description:`Text to show in the tooltip when user has clicked the button

@remarks

Default: "Text copied to clipboard"`},"aria-label":{required:!1,tsType:{name:"string"},description:`Text to use as aria-label prop on the button

@remarks

Default: "Copy text"`}}};export{g as C};
