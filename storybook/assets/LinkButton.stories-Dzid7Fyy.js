import{R as t}from"./index-CTjT7uj6.js";import{L as o}from"./LinkButton-CNHI6k1L.js";import{T as i}from"./Typography-DllAHQJn.js";import{L as E}from"./Link-DLrsDiHD.js";import{D as v}from"./Divider-Miekqy1v.js";import{u as y}from"./index-BkN7i-fW.js";import{L}from"./List-7_TU6u55.js";import{L as n}from"./ListItem-vLxI9vXl.js";import{L as l}from"./ListItemText-DILJ7l8C.js";import{B as c}from"./Button-BIQ-mITp.js";import{w as B,a as I}from"./appWrappers-C95badAO.js";import{u as g}from"./useRouteRef-ahYS9ypG.js";import"./defaultTheme-BnEhos6D.js";import"./capitalize-CuRwImtC.js";import"./withStyles-Bvq8MRoX.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./index-Cqve-NHl.js";import"./lodash-CoGan1YB.js";import"./index-QA7F3UF1.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-gVLTJlNx.js";import"./useControlled-CogIeAPD.js";import"./createSvgIcon-C2joj_qV.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./makeStyles-BU0tkW44.js";import"./useAnalytics-DTrkS1Gy.js";import"./ApiRef-BSBwTmJJ.js";import"./ConfigApi-DBUUc3nU.js";import"./ListContext-DydK1sOh.js";import"./ButtonBase-DbbECwI4.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./MockTranslationApi-CzTtvR9F.js";import"./index-CFaqwFgm.js";import"./classCallCheck-BNzALLS0.js";import"./inherits-BVfVgrgP.js";import"./toArray-FnMkMKew.js";import"./TranslationApi-eOxINumg.js";import"./WebStorage-D5Fgivzj.js";import"./useAsync-CXA3qup_.js";import"./useMountedState-DkESzBh4.js";import"./componentData-CM4hSmEF.js";import"./mapValues-r4uG88u0.js";import"./toString-C6iK1gA3.js";import"./ApiProvider-CuNQiN7Z.js";import"./index-BRV0Se7Z.js";import"./CssBaseline-Bw_LSqbM.js";import"./ThemeProvider-s1UPBsz6.js";import"./jsx-runtime-Cw0GR0a5.js";import"./palettes-B20oCNII.js";const s=I({id:"storybook.test-route"}),b=()=>{const e=y();return t.createElement("pre",null,"Current location: ",e.pathname)},yt={title:"Inputs/Button",component:o,decorators:[e=>B(t.createElement(t.Fragment,null,t.createElement(i,null,"A collection of buttons that should be used in the Backstage interface. These leverage the properties inherited from"," ",t.createElement(E,{to:"https://material-ui.com/components/buttons/"},"Material UI Button"),", but include an opinionated set that align to the Backstage design."),t.createElement(v,null),t.createElement("div",null,t.createElement("div",null,t.createElement(b,null)),t.createElement(e,null))),{mountedRoutes:{"/hello":s}})]},r=()=>{const e=g(s);return t.createElement(L,null,t.createElement(n,null,t.createElement(l,null,t.createElement(i,{variant:"h6"},"Default Button:"),"This is the default button design which should be used in most cases.",t.createElement("br",null),t.createElement("pre",null,'color="primary" variant="contained"')),t.createElement(o,{to:e(),color:"primary",variant:"contained"},"Register Component")),t.createElement(n,null,t.createElement(l,null,t.createElement(i,{variant:"h6"},"Secondary Button:"),"Used for actions that cancel, skip, and in general perform negative functions, etc.",t.createElement("br",null),t.createElement("pre",null,'color="secondary" variant="contained"')),t.createElement(o,{to:e(),color:"secondary",variant:"contained"},"Cancel")),t.createElement(n,null,t.createElement(l,null,t.createElement(i,{variant:"h6"},"Tertiary Button:"),"Used commonly in a ButtonGroup and when the button function itself is not a primary function on a page.",t.createElement("br",null),t.createElement("pre",null,'color="default" variant="outlined"')),t.createElement(o,{to:e(),color:"default",variant:"outlined"},"View Details")))},a=()=>{const e=g(s),k=()=>"Your click worked!";return t.createElement(t.Fragment,null,t.createElement(L,null,t.createElement(n,null,t.createElement(o,{to:e(),color:"default",variant:"outlined"},"Route Ref"),"  has props for both Material UI's component as well as for react-router-dom's Route object."),t.createElement(n,null,t.createElement(o,{to:"/staticpath",color:"default",variant:"outlined"},"Static Path"),"  links to a statically defined route. In general, this should be avoided."),t.createElement(n,null,t.createElement(c,{href:"https://backstage.io",color:"default",variant:"outlined"},"View URL"),"  links to a defined URL using Material UI's Button."),t.createElement(n,null,t.createElement(c,{onClick:k,color:"default",variant:"outlined"},"Trigger Event"),"  triggers an onClick event using Material UI's Button.")))};r.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"ButtonLinks"};var m,u,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
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
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const Bt=["Default","ButtonLinks"];export{a as ButtonLinks,r as Default,Bt as __namedExportsOrder,yt as default};
