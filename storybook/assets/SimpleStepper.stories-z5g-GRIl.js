import{R as e,r as l}from"./index-CTjT7uj6.js";import{M as G,a as J,S as K,b as Q}from"./StepLabel-DhBkk3KD.js";import{u as b,c as k}from"./translation-B-PWjP3E.js";import{m as V}from"./makeStyles-CRB_T0k9.js";import{B as j}from"./Box-DU2WS7ls.js";import{B as T}from"./Button-2GK6wueN.js";import{T as C}from"./Typography-D5Gm01bp.js";import{T as U}from"./TextField-BN8Qvr9y.js";import"./defaultTheme-DquFOgf8.js";import"./capitalize-BWjKmKKm.js";import"./withStyles-DWaS6n8x.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./Paper-2nKWzoda.js";import"./react-is.production.min-D0tnNtx9.js";import"./Collapse-BeLJ-1Ro.js";import"./utils-h0SkNxCQ.js";import"./index-BhgyLgKK.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./useTheme-0ztDbzjM.js";import"./useIsFocusVisible-DdvWPq7A.js";import"./createSvgIcon-CL6P1I3F.js";import"./TranslationApi-eOxINumg.js";import"./ApiRef-BSBwTmJJ.js";import"./typography-1q_m8518.js";import"./ButtonBase-nYwe-awX.js";import"./ownerWindow-C3iVrxHF.js";import"./FormLabel-D6jOsxCS.js";import"./formControlState-ByiNFc8I.js";import"./isMuiElement-B_4ddUuK.js";import"./useFormControl-F4cJWIkJ.js";import"./InputLabel-Rh6717bL.js";import"./Select-CU6BTQx5.js";import"./Popover-BkhZepa_.js";import"./debounce-DtXjJkxj.js";import"./createChainedFunction-Da-WpsAN.js";import"./Modal-B8CBWf6h.js";import"./classCallCheck-BNzALLS0.js";import"./Portal-BLjQd1nq.js";import"./Grow-BqP4q7YH.js";import"./List-B21WyO9K.js";import"./ListContext-DydK1sOh.js";import"./useControlled-B47E2WMp.js";const E=()=>{},Y=e.createContext({stepperLength:0,stepIndex:0,setStepIndex:E,stepHistory:[],setStepHistory:E,onStepChange:E});function g(t){const{children:r,elevated:i,onStepChange:a,activeStep:n=0}=t,[p,o]=l.useState(n),[v,x]=l.useState([0]);l.useEffect(()=>{o(n)},[n]);const u=[];let f;return l.Children.forEach(r,d=>{l.isValidElement(d)&&(d.props.end?f=d:u.push(d))}),e.createElement(e.Fragment,null,e.createElement(Y.Provider,{value:{stepIndex:p,setStepIndex:o,stepHistory:v,setStepHistory:x,onStepChange:a,stepperLength:l.Children.count(r)}},e.createElement(G,{activeStep:p,orientation:"vertical",elevation:i?2:0},u)),p>=l.Children.count(r)-1&&f)}g.__docgenInfo={description:"",methods:[],displayName:"SimpleStepper",props:{elevated:{required:!1,tsType:{name:"boolean"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(prevIndex: number, nextIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"prevIndex"},{type:{name:"number"},name:"nextIndex"}],return:{name:"void"}}},description:""},activeStep:{required:!1,tsType:{name:"number"},description:""}}};const W=V(t=>({root:{marginTop:t.spacing(3),"& button":{marginRight:t.spacing(1)}}}),{name:"BackstageSimpleStepperFooter"}),A=({text:t,handleClick:r})=>{const{t:i}=b(k);return e.createElement(T,{onClick:r},t||i("simpleStepper.reset"))},X=({text:t,handleClick:r,disabled:i,last:a,stepIndex:n})=>{const{t:p}=b(k);return e.createElement(T,{variant:"contained",color:"primary",disabled:i,"data-testid":`nextButton-${n}`,onClick:r},t||p(a?"simpleStepper.finish":"simpleStepper.next"))},Z=({text:t,handleClick:r,disabled:i,stepIndex:a})=>{const{t:n}=b(k);return e.createElement(T,{variant:"outlined",color:"primary",disabled:i,"data-testid":`skipButton-${a}`,onClick:r},t||n("simpleStepper.skip"))},ee=({text:t,handleClick:r,disabled:i,stepIndex:a})=>{const{t:n}=b(k);return e.createElement(T,{onClick:r,"data-testid":`backButton-${a}`,disabled:i},t||n("simpleStepper.back"))},w=({actions:t={},children:r})=>{const i=W(),{stepperLength:a,stepIndex:n,setStepIndex:p,stepHistory:o,setStepHistory:v,onStepChange:x}=l.useContext(Y),u=(y,I)=>{I&&I(),x&&x(n,y),p(y)},f=()=>{const y=t.nextStep?t.nextStep(n,a-1):n+1;u(y,t.onNext),v([...o,y])},d=()=>{o.pop(),u(o[o.length-1],t.onBack),v([...o])},z=()=>{u(0,t.onRestart),v([0])};return e.createElement(j,{className:i.root},[void 0,!0].includes(t.showBack)&&n!==0&&e.createElement(ee,{text:t.backText,handleClick:d,disabled:n===0,stepIndex:n}),t.showSkip&&e.createElement(Z,{text:t.skipText,handleClick:f,disabled:!!a&&n>=a||!!t.canSkip&&!t.canSkip(),stepIndex:n}),[void 0,!0].includes(t.showNext)&&e.createElement(X,{text:t.nextText,handleClick:f,disabled:!!a&&n>=a||!!t.canNext&&!t.canNext(),stepIndex:n}),t.showRestart&&n!==0&&e.createElement(A,{text:t.restartText,handleClick:z,stepIndex:n}),r)};A.__docgenInfo={description:"",methods:[],displayName:"RestartBtn",props:{text:{required:!1,tsType:{name:"string"},description:""},handleClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepIndex:{required:!0,tsType:{name:"number"},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"SimpleStepperFooter",props:{actions:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  showNext?: boolean;
  canNext?: () => boolean;
  onNext?: () => void;
  nextStep?: (current: number, last: number) => number;
  nextText?: string;

  showBack?: boolean;
  backText?: string;
  onBack?: () => void;

  showRestart?: boolean;
  canRestart?: () => boolean;
  onRestart?: () => void;
  restartText?: string;

  showSkip?: boolean;
  canSkip?: () => boolean;
  onSkip?: () => void;
  skipText?: string;
}`,signature:{properties:[{key:"showNext",value:{name:"boolean",required:!1}},{key:"canNext",value:{name:"signature",type:"function",raw:"() => boolean",signature:{arguments:[],return:{name:"boolean"}},required:!1}},{key:"onNext",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"nextStep",value:{name:"signature",type:"function",raw:"(current: number, last: number) => number",signature:{arguments:[{type:{name:"number"},name:"current"},{type:{name:"number"},name:"last"}],return:{name:"number"}},required:!1}},{key:"nextText",value:{name:"string",required:!1}},{key:"showBack",value:{name:"boolean",required:!1}},{key:"backText",value:{name:"string",required:!1}},{key:"onBack",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"showRestart",value:{name:"boolean",required:!1}},{key:"canRestart",value:{name:"signature",type:"function",raw:"() => boolean",signature:{arguments:[],return:{name:"boolean"}},required:!1}},{key:"onRestart",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"restartText",value:{name:"string",required:!1}},{key:"showSkip",value:{name:"boolean",required:!1}},{key:"canSkip",value:{name:"signature",type:"function",raw:"() => boolean",signature:{arguments:[],return:{name:"boolean"}},required:!1}},{key:"onSkip",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"skipText",value:{name:"string",required:!1}}]}},description:"",defaultValue:{value:"{}",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const te=V(t=>({end:{padding:t.spacing(3)}}),{name:"SimpleStepperStep"});function s(t){const{title:r,children:i,end:a,actions:n,...p}=t,o=te();return a?e.createElement(j,{className:o.end},e.createElement(C,{variant:"h6"},r),i,e.createElement(w,{actions:{...n||{},showNext:!1}})):e.createElement(J,{...p},e.createElement(K,null,e.createElement(C,{variant:"h6"},r)),e.createElement(Q,null,i,e.createElement(w,{actions:n})))}s.__docgenInfo={description:"",methods:[],displayName:"SimpleStepperStep",props:{title:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:""},end:{required:!1,tsType:{name:"boolean"},description:""},actions:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  showNext?: boolean;
  canNext?: () => boolean;
  onNext?: () => void;
  nextStep?: (current: number, last: number) => number;
  nextText?: string;

  showBack?: boolean;
  backText?: string;
  onBack?: () => void;

  showRestart?: boolean;
  canRestart?: () => boolean;
  onRestart?: () => void;
  restartText?: string;

  showSkip?: boolean;
  canSkip?: () => boolean;
  onSkip?: () => void;
  skipText?: string;
}`,signature:{properties:[{key:"showNext",value:{name:"boolean",required:!1}},{key:"canNext",value:{name:"signature",type:"function",raw:"() => boolean",signature:{arguments:[],return:{name:"boolean"}},required:!1}},{key:"onNext",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"nextStep",value:{name:"signature",type:"function",raw:"(current: number, last: number) => number",signature:{arguments:[{type:{name:"number"},name:"current"},{type:{name:"number"},name:"last"}],return:{name:"number"}},required:!1}},{key:"nextText",value:{name:"string",required:!1}},{key:"showBack",value:{name:"boolean",required:!1}},{key:"backText",value:{name:"string",required:!1}},{key:"onBack",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"showRestart",value:{name:"boolean",required:!1}},{key:"canRestart",value:{name:"signature",type:"function",raw:"() => boolean",signature:{arguments:[],return:{name:"boolean"}},required:!1}},{key:"onRestart",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"restartText",value:{name:"string",required:!1}},{key:"showSkip",value:{name:"boolean",required:!1}},{key:"canSkip",value:{name:"signature",type:"function",raw:"() => boolean",signature:{arguments:[],return:{name:"boolean"}},required:!1}},{key:"onSkip",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"skipText",value:{name:"string",required:!1}}]}},description:""}}};const Ae={title:"Navigation/SimpleStepper",component:g},q={elevated:!1,activeStep:0},c=t=>e.createElement(g,{...t},e.createElement(s,{title:"Step 1"},e.createElement("div",null,"This is the content for step 1")),e.createElement(s,{title:"Step 2"},e.createElement("div",null,"This is the content for step 2")),e.createElement(s,{title:"Step 3"},e.createElement("div",null,"This is the content for step 3")));c.args=q;const m=t=>{const[r,i]=l.useState(!1);return e.createElement(g,{...t},e.createElement(s,{title:"Step 1 with required field",actions:{canNext:()=>r}},e.createElement(U,{variant:"outlined",placeholder:"Required*",onChange:a=>i(!!a.target.value)})),e.createElement(s,{title:"Step 2"},e.createElement("div",null,"This is the content for step 2")),e.createElement(s,{title:"Step 3"},e.createElement("div",null,"This is the content for step 3")))};m.args=q;const S=t=>e.createElement(g,{...t},e.createElement(s,{title:"Step 1"},e.createElement("div",null,"This is the content for step 1")),e.createElement(s,{title:"Step 2"},e.createElement("div",null,"This is the content for step 2")),e.createElement(s,{title:"Success!",end:!0},e.createElement("div",null,"You've completed the Stepper")));S.args=q;const h=t=>e.createElement(g,{...t},e.createElement(s,{title:"Step 1 (Optional)",actions:{showSkip:!0}},e.createElement("div",null,"This is the content for step 1")),e.createElement(s,{title:"Step 2"},e.createElement("div",null,"This is the content for step 2")));m.args=q;c.__docgenInfo={description:"",methods:[],displayName:"Default",props:{elevated:{required:!1,tsType:{name:"boolean"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(prevIndex: number, nextIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"prevIndex"},{type:{name:"number"},name:"nextIndex"}],return:{name:"void"}}},description:""},activeStep:{required:!1,tsType:{name:"number"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"ConditionalButtons",props:{elevated:{required:!1,tsType:{name:"boolean"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(prevIndex: number, nextIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"prevIndex"},{type:{name:"number"},name:"nextIndex"}],return:{name:"void"}}},description:""},activeStep:{required:!1,tsType:{name:"number"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"CompletionStep",props:{elevated:{required:!1,tsType:{name:"boolean"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(prevIndex: number, nextIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"prevIndex"},{type:{name:"number"},name:"nextIndex"}],return:{name:"void"}}},description:""},activeStep:{required:!1,tsType:{name:"number"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"OptionalStep",props:{elevated:{required:!1,tsType:{name:"boolean"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(prevIndex: number, nextIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"prevIndex"},{type:{name:"number"},name:"nextIndex"}],return:{name:"void"}}},description:""},activeStep:{required:!1,tsType:{name:"number"},description:""}}};var N,R,B;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`(args: StepperProps) => <SimpleStepper {...args}>
    <SimpleStepperStep title="Step 1">
      <div>This is the content for step 1</div>
    </SimpleStepperStep>
    <SimpleStepperStep title="Step 2">
      <div>This is the content for step 2</div>
    </SimpleStepperStep>
    <SimpleStepperStep title="Step 3">
      <div>This is the content for step 3</div>
    </SimpleStepperStep>
  </SimpleStepper>`,...(B=(R=c.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var _,F,H;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`(args: StepperProps) => {
  const [required, setRequired] = useState(false);
  return <SimpleStepper {...args}>
      <SimpleStepperStep title="Step 1 with required field" actions={{
      canNext: () => required
    }}>
        <TextField variant="outlined" placeholder="Required*" onChange={e => setRequired(!!e.target.value)} />
      </SimpleStepperStep>
      <SimpleStepperStep title="Step 2">
        <div>This is the content for step 2</div>
      </SimpleStepperStep>
      <SimpleStepperStep title="Step 3">
        <div>This is the content for step 3</div>
      </SimpleStepperStep>
    </SimpleStepper>;
}`,...(H=(F=m.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var O,P,L;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`(args: StepperProps) => {
  return <SimpleStepper {...args}>
      <SimpleStepperStep title="Step 1">
        <div>This is the content for step 1</div>
      </SimpleStepperStep>
      <SimpleStepperStep title="Step 2">
        <div>This is the content for step 2</div>
      </SimpleStepperStep>
      <SimpleStepperStep title="Success!" end>
        <div>You've completed the Stepper</div>
      </SimpleStepperStep>
    </SimpleStepper>;
}`,...(L=(P=S.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var $,D,M;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`(args: StepperProps) => {
  return <SimpleStepper {...args}>
      <SimpleStepperStep title="Step 1 (Optional)" actions={{
      showSkip: true
    }}>
        <div>This is the content for step 1</div>
      </SimpleStepperStep>
      <SimpleStepperStep title="Step 2">
        <div>This is the content for step 2</div>
      </SimpleStepperStep>
    </SimpleStepper>;
}`,...(M=(D=h.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};const ze=["Default","ConditionalButtons","CompletionStep","OptionalStep"];export{S as CompletionStep,m as ConditionalButtons,c as Default,h as OptionalStep,ze as __namedExportsOrder,Ae as default};
