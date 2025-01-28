import{R as s,r as i}from"./index-CTjT7uj6.js";import{u as f}from"./useAsync-CXA3qup_.js";import{l as R}from"./lodash-CoGan1YB.js";import{s as E}from"./api-CKDuuaL7.js";import{H as y}from"./DefaultResultListItem-jz-PsWrS.js";import{L as g}from"./ListItem-vLxI9vXl.js";import{L as k}from"./List-7_TU6u55.js";import{a as x}from"./Plugin-CuVBUtJY.js";import{u as I}from"./useElementFilter-Bp0EYaR-.js";import{g as L}from"./componentData-CM4hSmEF.js";import{u as C,A as q}from"./useAnalytics-DTrkS1Gy.js";import{u as w}from"./SearchContext-BQYqBmky.js";import{P as A}from"./Progress-DLU_c_4-.js";import{R as _}from"./ResponseErrorPanel-CEcv0qNJ.js";import{u as T}from"./ApiRef-BSBwTmJJ.js";import{E as N}from"./EmptyState-D7ocrkXG.js";const m="search.results.list.items.extensions.v1",P=(n,t)=>{for(const e of n){if(!i.isValidElement(e))continue;const r=L(e,m);if(r!=null&&r(t))return i.cloneElement(e,{rank:t.rank,highlight:t.highlight,result:t.document,...e.props})}return null},p=n=>{const{rank:t,result:e,noTrack:r,children:a,alignItems:o="flex-start",...l}=n,c=C(),u=i.useCallback(()=>{r||e&&c.captureEvent("discover",e.title,{attributes:{to:e.location},value:t})},[t,e,r,c]);return s.createElement(g,{divider:!0,alignItems:o,onClickCapture:u,...l},a)},$=n=>{const{name:t,component:e,predicate:r=()=>!0}=n;return x({name:t,component:{lazy:()=>e().then(a=>o=>s.createElement(p,{rank:o.rank,result:o.result,noTrack:o.noTrack},i.createElement(a,o)))},data:{[m]:r}})},b=n=>{const t=I(n,e=>e.selectByComponentData({key:m}).getElements(),[n]);return i.useCallback((e,r)=>{const a=P(t,e);return s.createElement(i.Fragment,{key:r},a??s.createElement(p,{rank:e.rank,result:e.document},s.createElement(y,{rank:e.rank,highlight:e.highlight,result:e.document})))},[t])},h=n=>{const{results:t,children:e,...r}=n,a=b(e);return s.createElement(k,{...r},t.map(a))};p.__docgenInfo={description:`@internal
Extends children with extension capabilities.
@param props - see {@link SearchResultListItemExtensionProps}.`,methods:[],displayName:"SearchResultListItemExtension"};h.__docgenInfo={description:`@public
Render results using search extensions.
@param props - see {@link SearchResultListItemExtensionsProps}`,methods:[],displayName:"SearchResultListItemExtensions",props:{results:{required:!0,tsType:{name:"Array",elements:[{name:"Result",elements:[{name:"SearchDocument"}],raw:"Result<SearchDocument>"}],raw:"SearchResult[]"},description:"Search result list."}}};const D=n=>{const{children:t}=n,e=w(),{result:r,...a}=e;return t(r,a)},X=n=>{const{query:t,children:e}=n,r=T(E),a=f(()=>{const{term:o="",types:l=[],filters:c={},...u}=t;return r.query({...u,term:o,types:l,filters:c})},[t]);return e(a,t)},d=n=>{const{query:t,children:e}=n;return t?s.createElement(X,{query:t},e):s.createElement(D,null,e)},S=n=>{const{query:t,children:e,noResultsComponent:r=s.createElement(N,{missing:"data",title:"Sorry, no results were found"}),...a}=n;return s.createElement(d,{query:t},({loading:o,error:l,value:c})=>o?s.createElement(A,null):l?s.createElement(_,{title:"Error encountered while fetching search results",error:l}):c!=null&&c.results.length?R.isFunction(e)?e(c):s.createElement(h,{...a,results:c.results},e):r)},J=n=>s.createElement(q,{attributes:{pluginId:"search",extension:"SearchResult"}},s.createElement(S,{...n}));d.__docgenInfo={description:`Call a child render function passing a search state as an argument.
@remarks By default, results are taken from context, but when a "query" prop is set, results are requested from the search api.
@param props - see {@link SearchResultStateProps}.
@example
Consuming results from context:
\`\`\`
<SearchResultState>
  {({ loading, error, value }) => (
    <List>
      {value?.map(({ document }) => (
        <DefaultSearchResultListItem
          key={document.location}
          result={document}
        />
      ))}
    </List>
  )}
</SearchResultState>
\`\`\`
@example
Requesting results using the search api:
\`\`\`
<SearchResultState query={{ term: 'documentation' }}>
  {({ loading, error, value }) => (
    <List>
      {value?.map(({ document }) => (
        <DefaultSearchResultListItem
          key={document.location}
          result={document}
        />
      ))}
    </List>
  )}
</SearchResultState>
\`\`\`
@public`,methods:[],displayName:"SearchResultState",props:{children:{required:!0,tsType:{name:"signature",type:"function",raw:`(
  state: AsyncState<SearchResultSet>,
  query: Partial<SearchQuery>,
) => JSX.Element | null`,signature:{arguments:[{type:{name:"AsyncState",elements:[{name:"ResultSet",elements:[{name:"SearchDocument"}],raw:"ResultSet<SearchDocument>"}],raw:"AsyncState<SearchResultSet>"},name:"state"},{type:{name:"Partial",elements:[{name:"SearchQuery"}],raw:"Partial<SearchQuery>"},name:"query"}],return:{name:"union",raw:"JSX.Element | null",elements:[{name:"JSX.Element"},{name:"null"}]}}},description:"A child function that receives an asynchronous result set and returns a react element."}}};S.__docgenInfo={description:`Renders results from a parent search context or api.
@remarks default components for loading, error and empty variants are returned.
@param props - see {@link SearchResultProps}.
@public`,methods:[],displayName:"SearchResultComponent",props:{children:{required:!1,tsType:{name:"union",raw:"ReactNode | ((resultSet: SearchResultSet) => JSX.Element)",elements:[{name:"ReactNode"},{name:"unknown"}]},description:""},noResultsComponent:{required:!1,tsType:{name:"JSX.Element"},description:""}}};J.__docgenInfo={description:`A component returning the search result from a parent search context or api.
@param props - see {@link SearchResultProps}.
@public`,methods:[],displayName:"SearchResult",props:{children:{required:!1,tsType:{name:"union",raw:"ReactNode | ((resultSet: SearchResultSet) => JSX.Element)",elements:[{name:"ReactNode"},{name:"unknown"}]},description:""},noResultsComponent:{required:!1,tsType:{name:"JSX.Element"},description:""}}};export{d as S,J as a,$ as c,b as u};
