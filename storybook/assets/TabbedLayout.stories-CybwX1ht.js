import{r as b,R as e}from"./index-CTjT7uj6.js";import{H as g}from"./Helmet-DPVyO7__.js";import{L}from"./Link-DLrsDiHD.js";import{H as v}from"./HeaderTabs-B1gihrgO.js";import{C as x}from"./Content-dSbSstpY.js";import{e as w,f as P,m as _,M as k,R as C,a as S}from"./index-BkN7i-fW.js";import{a as $}from"./componentData-CM4hSmEF.js";import"./index-BRV0Se7Z.js";import"./index-Cqve-NHl.js";import"./lodash-CoGan1YB.js";import"./index-QA7F3UF1.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-gVLTJlNx.js";import"./capitalize-CuRwImtC.js";import"./defaultTheme-BnEhos6D.js";import"./withStyles-Bvq8MRoX.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./useControlled-CogIeAPD.js";import"./createSvgIcon-C2joj_qV.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./makeStyles-BU0tkW44.js";import"./useAnalytics-DTrkS1Gy.js";import"./ApiRef-BSBwTmJJ.js";import"./ConfigApi-DBUUc3nU.js";import"./Typography-DllAHQJn.js";import"./Box-BlnZ3bMe.js";import"./typography-Bw32VBWA.js";import"./Tabs-CABFMs7q.js";import"./ButtonBase-DbbECwI4.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./react-is.production.min-D0tnNtx9.js";import"./useTheme-BywMHAxl.js";import"./KeyboardArrowRight-FP3NuvzK.js";function q(t){var d;const a=w(),n=t.map(({path:s,children:r})=>({caseSensitive:!1,path:`${s}/*`,element:r})).sort((s,r)=>r.path.replace(/\/\*$/,"").localeCompare(s.path.replace(/\/\*$/,""))),u=P(n)??((d=t[0])==null?void 0:d.children);let m=a["*"]??"";m.startsWith("/")||(m=`/${m}`);const[p]=_(n,m)??[],i=p?t.findIndex(s=>`${s.path}/*`===p.route.path):0;return{index:i===-1?0:i,element:u,route:t[i]??t[0]}}function E(t){const{routes:a}=t,{index:o,route:n,element:u}=q(a),m=b.useMemo(()=>a.map(p=>{const{path:i,title:d,tabProps:s}=p;let r=i;return r=r.replace(/\/\*$/,""),r=r.replace(/^\//,""),{id:i,label:d,tabProps:{component:L,to:r,...s}}}),[a]);return e.createElement(e.Fragment,null,e.createElement(v,{tabs:m,selectedIndex:o}),e.createElement(x,null,e.createElement(g,{title:n==null?void 0:n.title}),u))}E.__docgenInfo={description:"",methods:[],displayName:"RoutedTabs",props:{routes:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  path: string;
  title: string;
  children: JSX.Element;
  tabProps?: TabProps<React.ElementType, { component?: React.ElementType }>;
}`,signature:{properties:[{key:"path",value:{name:"string",required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"children",value:{name:"JSX.Element",required:!0}},{key:"tabProps",value:{name:"TabProps",elements:[{name:"ReactElementType",raw:"React.ElementType"},{name:"signature",type:"object",raw:"{ component?: React.ElementType }",signature:{properties:[{key:"component",value:{name:"ReactElementType",raw:"React.ElementType",required:!1}}]}}],raw:"TabProps<React.ElementType, { component?: React.ElementType }>",required:!1}}]}}],raw:"SubRoute[]"},description:""}}};const y=()=>null;$(y,"core.gatherMountPoints",!0);function R(t){const a=e.createElement(y,{path:"",title:""},e.createElement("div",null)).type;return b.Children.toArray(t).flatMap(o=>{if(!b.isValidElement(o))return[];if(o.type===b.Fragment)return R(o.props.children);if(o.type!==a)throw new Error("Child of TabbedLayout must be an TabbedLayout.Route");const{path:n,title:u,children:m,tabProps:p}=o.props;return[{path:n,title:u,children:m,tabProps:p}]})}function l(t){const a=R(t.children);return e.createElement(E,{routes:a})}l.Route=y;l.__docgenInfo={description:`TabbedLayout is a compound component, which allows you to define a layout for
pages using a sub-navigation mechanism.

@remarks
Consists of two parts: TabbedLayout and TabbedLayout.Route

@example
\`\`\`jsx
<TabbedLayout>
  <TabbedLayout.Route path="/example" title="Example tab">
    <div>This is rendered under /example/anything-here route</div>
  </TabbedLayout.Route>
</TabbedLayout>
\`\`\``,methods:[{name:"Route",docblock:null,modifiers:["static"],params:[],returns:null}],displayName:"TabbedLayout"};const be={title:"Navigation/TabbedLayout",component:l},I=({children:t})=>e.createElement(k,null,e.createElement(C,null,e.createElement(S,{path:"/*",element:e.createElement(e.Fragment,null,t)}))),c=()=>e.createElement(I,null,e.createElement(l,null,e.createElement(l.Route,{path:"/",title:"tabbed-test-title"},e.createElement("div",null,"tabbed-test-content")),e.createElement(l.Route,{path:"/some-other-path",title:"tabbed-test-title-2"},e.createElement("div",null,"tabbed-test-content-2"))));c.__docgenInfo={description:"",methods:[],displayName:"Default"};var h,T,f;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`() => <Wrapper>
    <TabbedLayout>
      <TabbedLayout.Route path="/" title="tabbed-test-title">
        <div>tabbed-test-content</div>
      </TabbedLayout.Route>
      <TabbedLayout.Route path="/some-other-path" title="tabbed-test-title-2">
        <div>tabbed-test-content-2</div>
      </TabbedLayout.Route>
    </TabbedLayout>
  </Wrapper>`,...(f=(T=c.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};const ye=["Default"];export{c as Default,ye as __namedExportsOrder,be as default};
