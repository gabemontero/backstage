import{R as t}from"./index-CTjT7uj6.js";import{L as o}from"./LinkButton-BGMAveA3.js";import{T as i}from"./Typography-D5Gm01bp.js";import{L as E}from"./Link-CCke1Wzl.js";import{D as v}from"./Divider-fLtrH1nN.js";import{u as y}from"./index-BkN7i-fW.js";import{L}from"./List-B21WyO9K.js";import{L as n}from"./ListItem-CkBp7laK.js";import{L as l}from"./ListItemText-BQG6-PBZ.js";import{B as m}from"./Button-2GK6wueN.js";import{w as B,a as I}from"./appWrappers-NowpGQ8R.js";import{u as g}from"./useRouteRef-ahYS9ypG.js";import"./defaultTheme-DquFOgf8.js";import"./capitalize-BWjKmKKm.js";import"./withStyles-DWaS6n8x.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./index-Cqve-NHl.js";import"./lodash-CoGan1YB.js";import"./index-BhgyLgKK.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-4utR8_H1.js";import"./createChainedFunction-Da-WpsAN.js";import"./createSvgIcon-CL6P1I3F.js";import"./debounce-DtXjJkxj.js";import"./isMuiElement-B_4ddUuK.js";import"./ownerWindow-C3iVrxHF.js";import"./useIsFocusVisible-DdvWPq7A.js";import"./useControlled-B47E2WMp.js";import"./unstable_useId-B3Hiq1YI.js";import"./makeStyles-CRB_T0k9.js";import"./useAnalytics-DTrkS1Gy.js";import"./ApiRef-BSBwTmJJ.js";import"./ConfigApi-DBUUc3nU.js";import"./ListContext-DydK1sOh.js";import"./ButtonBase-nYwe-awX.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./MockTranslationApi-WG1gjFYw.js";import"./index-CFaqwFgm.js";import"./classCallCheck-BNzALLS0.js";import"./inherits-BBh9Yz5k.js";import"./toArray-n7tUSQe9.js";import"./TranslationApi-eOxINumg.js";import"./WebStorage-D5Fgivzj.js";import"./useAsync-CXA3qup_.js";import"./useMountedState-DkESzBh4.js";import"./componentData-CM4hSmEF.js";import"./isSymbol-C_KZXW2d.js";import"./isObject-DlTwUI3n.js";import"./toString-B79bsZRM.js";import"./ApiProvider-CuNQiN7Z.js";import"./index-BRV0Se7Z.js";import"./CssBaseline-0XN_ELQr.js";import"./ThemeProvider-iV7LyTO2.js";import"./jsx-runtime-Cw0GR0a5.js";import"./palettes-C1DVN5xY.js";const s=I({id:"storybook.test-route"}),b=()=>{const e=y();return t.createElement("pre",null,"Current location: ",e.pathname)},Tt={title:"Inputs/Button",component:o,decorators:[e=>B(t.createElement(t.Fragment,null,t.createElement(i,null,"A collection of buttons that should be used in the Backstage interface. These leverage the properties inherited from"," ",t.createElement(E,{to:"https://material-ui.com/components/buttons/"},"Material UI Button"),", but include an opinionated set that align to the Backstage design."),t.createElement(v,null),t.createElement("div",null,t.createElement("div",null,t.createElement(b,null)),t.createElement(e,null))),{mountedRoutes:{"/hello":s}})]},r=()=>{const e=g(s);return t.createElement(L,null,t.createElement(n,null,t.createElement(l,null,t.createElement(i,{variant:"h6"},"Default Button:"),"This is the default button design which should be used in most cases.",t.createElement("br",null),t.createElement("pre",null,'color="primary" variant="contained"')),t.createElement(o,{to:e(),color:"primary",variant:"contained"},"Register Component")),t.createElement(n,null,t.createElement(l,null,t.createElement(i,{variant:"h6"},"Secondary Button:"),"Used for actions that cancel, skip, and in general perform negative functions, etc.",t.createElement("br",null),t.createElement("pre",null,'color="secondary" variant="contained"')),t.createElement(o,{to:e(),color:"secondary",variant:"contained"},"Cancel")),t.createElement(n,null,t.createElement(l,null,t.createElement(i,{variant:"h6"},"Tertiary Button:"),"Used commonly in a ButtonGroup and when the button function itself is not a primary function on a page.",t.createElement("br",null),t.createElement("pre",null,'color="default" variant="outlined"')),t.createElement(o,{to:e(),color:"default",variant:"outlined"},"View Details")))},a=()=>{const e=g(s),k=()=>"Your click worked!";return t.createElement(t.Fragment,null,t.createElement(L,null,t.createElement(n,null,t.createElement(o,{to:e(),color:"default",variant:"outlined"},"Route Ref"),"  has props for both Material UI's component as well as for react-router-dom's Route object."),t.createElement(n,null,t.createElement(o,{to:"/staticpath",color:"default",variant:"outlined"},"Static Path"),"  links to a statically defined route. In general, this should be avoided."),t.createElement(n,null,t.createElement(m,{href:"https://backstage.io",color:"default",variant:"outlined"},"View URL"),"  links to a defined URL using Material UI's Button."),t.createElement(n,null,t.createElement(m,{onClick:k,color:"default",variant:"outlined"},"Trigger Event"),"  triggers an onClick event using Material UI's Button.")))};r.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"ButtonLinks"};var c,u,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const link = useRouteRef(routeRef);
  // Design Permutations:
  // color   = default | primary | secondary
  // variant = contained | outlined | text
  return <List>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Default Button:</Typography>
          This is the default button design which should be used in most cases.
          <br />
          <pre>color="primary" variant="contained"</pre>
        </ListItemText>

        <LinkButton to={link()} color="primary" variant="contained">
          Register Component
        </LinkButton>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Secondary Button:</Typography>
          Used for actions that cancel, skip, and in general perform negative
          functions, etc.
          <br />
          <pre>color="secondary" variant="contained"</pre>
        </ListItemText>

        <LinkButton to={link()} color="secondary" variant="contained">
          Cancel
        </LinkButton>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Tertiary Button:</Typography>
          Used commonly in a ButtonGroup and when the button function itself is
          not a primary function on a page.
          <br />
          <pre>color="default" variant="outlined"</pre>
        </ListItemText>

        <LinkButton to={link()} color="default" variant="outlined">
          View Details
        </LinkButton>
      </ListItem>
    </List>;
}`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,f,h;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const link = useRouteRef(routeRef);
  const handleClick = () => {
    return 'Your click worked!';
  };
  return <>
      <List>
        {
        // TODO: Refactor to use new routing mechanisms
      }
        <ListItem>
          <LinkButton to={link()} color="default" variant="outlined">
            Route Ref
          </LinkButton>
          &nbsp; has props for both Material UI's component as well as for
          react-router-dom's Route object.
        </ListItem>

        <ListItem>
          <LinkButton to="/staticpath" color="default" variant="outlined">
            Static Path
          </LinkButton>
          &nbsp; links to a statically defined route. In general, this should be
          avoided.
        </ListItem>

        <ListItem>
          <MaterialButton href="https://backstage.io" color="default" variant="outlined">
            View URL
          </MaterialButton>
          &nbsp; links to a defined URL using Material UI's Button.
        </ListItem>

        <ListItem>
          <MaterialButton onClick={handleClick} color="default" variant="outlined">
            Trigger Event
          </MaterialButton>
          &nbsp; triggers an onClick event using Material UI's Button.
        </ListItem>
      </List>
    </>;
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const wt=["Default","ButtonLinks"];export{a as ButtonLinks,r as Default,wt as __namedExportsOrder,Tt as default};
