import{R as e,r as s}from"./index-CTjT7uj6.js";import{s as h,M as S}from"./api-CKDuuaL7.js";import{c as J}from"./SearchResult-CgAKCeAa.js";import{S as o}from"./SearchResultList-DitLgUyo.js";import{S as R}from"./Grid-DRKqbyUB.js";import{S as K}from"./SearchContext-BQYqBmky.js";import{L as j}from"./ListItemText-CEl12qRX.js";import{H as z}from"./DefaultResultListItem-CbIDw-Tc.js";import{C as U}from"./icons-CF5UnHsF.js";import{L as V}from"./ListItem-D6an19MP.js";import{L as X}from"./ListItemIcon-C5uCQkqj.js";import{w as Y,a as Z}from"./appWrappers-zuJY6Z2z.js";import{T as y}from"./TestApiProvider-CoiMLMhd.js";import{L as $}from"./Link-bsB8Po3b.js";import{c as ee}from"./Plugin-BnFuRug-.js";import"./ApiRef-BSBwTmJJ.js";import"./useAsync-CXA3qup_.js";import"./useMountedState-DkESzBh4.js";import"./lodash-CoGan1YB.js";import"./List-CWUfEUrU.js";import"./defaultTheme-BLQVRFyP.js";import"./hoist-non-react-statics.cjs-yZcCaz5O.js";import"./capitalize-DKydST9S.js";import"./withStyles-K20mGrhL.js";import"./ListContext-DydK1sOh.js";import"./useElementFilter-A7Mw_1pB.js";import"./componentData-CM4hSmEF.js";import"./MockTranslationApi-WfPveaUo.js";import"./index-CFaqwFgm.js";import"./classCallCheck-BNzALLS0.js";import"./inherits-BlLXsrOw.js";import"./toArray-Bh10GYTQ.js";import"./TranslationApi-eOxINumg.js";import"./useAnalytics-DTrkS1Gy.js";import"./ConfigApi-DBUUc3nU.js";import"./Progress-Cn7FkKCX.js";import"./useTheme-DHQwi4PO.js";import"./LinearProgress-fmACQw9y.js";import"./Box-CUgtRipO.js";import"./typography-CCicI0oZ.js";import"./ResponseErrorPanel-D96lJsZE.js";import"./makeStyles-DyV0dNcq.js";import"./ErrorPanel-BzVlYlFb.js";import"./WarningPanel-C6QrBg65.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-yIvaDIOA.js";import"./useControlled-CogIeAPD.js";import"./index-QA7F3UF1.js";import"./createSvgIcon-DMq0di89.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./ExpandMore-CRlwxBmN.js";import"./AccordionDetails-V0VN_mu9.js";import"./react-is.production.min-D0tnNtx9.js";import"./Paper-DKlVK5mw.js";import"./Collapse-BrA4wGBI.js";import"./utils-DQjp17aO.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./ButtonBase-CgEmjkk8.js";import"./IconButton-DuROhx0p.js";import"./Typography-Drxa_JDy.js";import"./MarkdownContent-B5jrrt6k.js";import"./index-BRV0Se7Z.js";import"./CodeSnippet-B1W_zHVE.js";import"./iframe-DhJuIX_W.js";import"../sb-preview/runtime.js";import"./extends-CUPdUbmP.js";import"./toConsumableArray-BEwiObev.js";import"./CopyTextButton-CR4ryLcU.js";import"./useCopyToClipboard--quXt9ov.js";import"./translation-67MxozS3.js";import"./Tooltip-DpHos2o3.js";import"./Popper-DD91Ec3e.js";import"./Portal-DHXjgkAG.js";import"./Grow-C52yxNn8.js";import"./Divider-CHL0fjlM.js";import"./EmptyState-BZ6FS02q.js";import"./index-DNAWfEOe.js";import"./WebStorage-D5Fgivzj.js";import"./mapValues-r4uG88u0.js";import"./toString-C6iK1gA3.js";import"./ApiProvider-CuNQiN7Z.js";import"./CssBaseline-gcFoYqiq.js";import"./ThemeProvider-CHb3fgCH.js";import"./jsx-runtime-Cw0GR0a5.js";import"./palettes-B20oCNII.js";import"./index-Cqve-NHl.js";import"./useRouteRef-D0BCYqYb.js";const te=Z({id:"storybook.search.results.list.route"}),re=new S({results:[{type:"techdocs",document:{location:"search/search-result1",title:"Search Result 1",text:"Some text from the search result 1"}},{type:"custom",document:{location:"search/search-result2",title:"Search Result 2",text:"Some text from the search result 2"}}]}),Ht={title:"Plugins/Search/SearchResultList",component:o,decorators:[t=>Y(e.createElement(y,{apis:[[h,re]]},e.createElement(R,{container:!0,direction:"row"},e.createElement(R,{item:!0,xs:12},e.createElement(t,null)))),{mountedRoutes:{"/":te}})]},n=()=>e.createElement(K,null,e.createElement(o,null)),a=()=>{const[t]=s.useState({types:["techdocs"]});return e.createElement(o,{query:t})},m=()=>{const[t]=s.useState({types:["techdocs"]});return e.createElement(y,{apis:[[h,{query:()=>new Promise(()=>{})}]]},e.createElement(o,{query:t}))},c=()=>{const[t]=s.useState({types:["techdocs"]});return e.createElement(y,{apis:[[h,{query:()=>new Promise(()=>{throw new Error})}]]},e.createElement(o,{query:t}))},u=()=>{const[t]=s.useState({types:["techdocs"]});return e.createElement(y,{apis:[[h,new S]]},e.createElement(o,{query:t}))},p=()=>{const[t]=s.useState({types:["techdocs"]});return e.createElement(y,{apis:[[h,new S]]},e.createElement(o,{query:t,noResultsComponent:e.createElement(j,{primary:"No results were found"})}))},oe=t=>{const{icon:i,result:r}=t;return e.createElement($,{to:r.location},e.createElement(V,{alignItems:"flex-start",divider:!0},i&&e.createElement(X,null,i),e.createElement(j,{primary:r.title,primaryTypographyProps:{variant:"h6"},secondary:r.text})))},l=()=>{const[t]=s.useState({types:["custom"]});return e.createElement(o,{query:t,renderResultItem:({type:i,document:r,highlight:B,rank:F})=>{switch(i){case"custom":return e.createElement(oe,{key:r.location,icon:e.createElement(U,null),result:r,highlight:B,rank:F});default:return e.createElement(z,{key:r.location,result:r})}}})},d=()=>{const[t]=s.useState({types:["techdocs"]}),r=ee({id:"plugin"}).provide(J({name:"DefaultResultListItem",component:async()=>z}));return e.createElement(o,{query:t},e.createElement(r,null))};n.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"WithQuery"};m.__docgenInfo={description:"",methods:[],displayName:"Loading"};c.__docgenInfo={description:"",methods:[],displayName:"WithError"};u.__docgenInfo={description:"",methods:[],displayName:"WithDefaultNoResultsComponent"};p.__docgenInfo={description:"",methods:[],displayName:"WithCustomNoResultsComponent"};l.__docgenInfo={description:"",methods:[],displayName:"WithCustomResultItem"};d.__docgenInfo={description:"",methods:[],displayName:"WithResultItemExtensions"};var f,g,E;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  return <SearchContextProvider>
      <SearchResultList />
    </SearchContextProvider>;
}`,...(E=(g=n.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};var I,L,q;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [query] = useState<Partial<SearchQuery>>({
    types: ['techdocs']
  });
  return <SearchResultList query={query} />;
}`,...(q=(L=a.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var P,C,w;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const [query] = useState<Partial<SearchQuery>>({
    types: ['techdocs']
  });
  return <TestApiProvider apis={[[searchApiRef, {
    query: () => new Promise<SearchResultSet>(() => {})
  }]]}>
      <SearchResultList query={query} />
    </TestApiProvider>;
}`,...(w=(C=m.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var x,A,_;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [query] = useState<Partial<SearchQuery>>({
    types: ['techdocs']
  });
  return <TestApiProvider apis={[[searchApiRef, {
    query: () => new Promise<SearchResultSet>(() => {
      throw new Error();
    })
  }]]}>
      <SearchResultList query={query} />
    </TestApiProvider>;
}`,...(_=(A=c.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};var W,v,N;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`() => {
  const [query] = useState<Partial<SearchQuery>>({
    types: ['techdocs']
  });
  return <TestApiProvider apis={[[searchApiRef, new MockSearchApi()]]}>
      <SearchResultList query={query} />
    </TestApiProvider>;
}`,...(N=(v=u.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var D,T,k;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const [query] = useState<Partial<SearchQuery>>({
    types: ['techdocs']
  });
  return <TestApiProvider apis={[[searchApiRef, new MockSearchApi()]]}>
      <SearchResultList query={query} noResultsComponent={<ListItemText primary="No results were found" />} />
    </TestApiProvider>;
}`,...(k=(T=p.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var Q,M,H;l.parameters={...l.parameters,docs:{...(Q=l.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  const [query] = useState<Partial<SearchQuery>>({
    types: ['custom']
  });
  return <SearchResultList query={query} renderResultItem={({
    type,
    document,
    highlight,
    rank
  }) => {
    switch (type) {
      case 'custom':
        return <CustomResultListItem key={document.location} icon={<CatalogIcon />} result={document} highlight={highlight} rank={rank} />;
      default:
        return <DefaultResultListItem key={document.location} result={document} />;
    }
  }} />;
}`,...(H=(M=l.parameters)==null?void 0:M.docs)==null?void 0:H.source}}};var O,b,G;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [query] = useState<Partial<SearchQuery>>({
    types: ['techdocs']
  });
  const plugin = createPlugin({
    id: 'plugin'
  });
  const DefaultSearchResultListItem = plugin.provide(createSearchResultListItemExtension({
    name: 'DefaultResultListItem',
    component: async () => DefaultResultListItem
  }));
  return <SearchResultList query={query}>
      <DefaultSearchResultListItem />
    </SearchResultList>;
}`,...(G=(b=d.parameters)==null?void 0:b.docs)==null?void 0:G.source}}};const Ot=["Default","WithQuery","Loading","WithError","WithDefaultNoResultsComponent","WithCustomNoResultsComponent","WithCustomResultItem","WithResultItemExtensions"];export{n as Default,m as Loading,p as WithCustomNoResultsComponent,l as WithCustomResultItem,u as WithDefaultNoResultsComponent,c as WithError,a as WithQuery,d as WithResultItemExtensions,Ot as __namedExportsOrder,Ht as default};
