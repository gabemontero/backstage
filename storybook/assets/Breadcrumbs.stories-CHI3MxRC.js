import{i as P}from"./interopRequireDefault-Y9pwbXtE.js";import{r as x,i as v}from"./createSvgIcon-gVLTJlNx.js";import{r as E,R as e}from"./index-CTjT7uj6.js";import{d as I}from"./ExpandMore-DRsw0FpY.js";import{B as a,H as C}from"./Header-e1oNn-x5.js";import{M as b}from"./index-BkN7i-fW.js";import{T as r}from"./Typography-DllAHQJn.js";import{P as B}from"./Page-DBb4Mg_D.js";import{L as t}from"./Link-DLrsDiHD.js";import{B as S}from"./Box-BlnZ3bMe.js";import{P as _}from"./Popover-BqhjDC2Q.js";import{L as w}from"./List-7_TU6u55.js";import{L as l}from"./ListItem-vLxI9vXl.js";import"./capitalize-CuRwImtC.js";import"./defaultTheme-BnEhos6D.js";import"./withStyles-Bvq8MRoX.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./useControlled-CogIeAPD.js";import"./index-QA7F3UF1.js";import"./createSvgIcon-C2joj_qV.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./Helmet-DPVyO7__.js";import"./index-BRV0Se7Z.js";import"./makeStyles-BU0tkW44.js";import"./Grid-BBk_6dks.js";import"./Breadcrumbs-96-mpcGM.js";import"./react-is.production.min-D0tnNtx9.js";import"./ButtonBase-DbbECwI4.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./Page-CC8xP4Jc.js";import"./ApiRef-BSBwTmJJ.js";import"./ConfigApi-DBUUc3nU.js";import"./useMediaQuery-BXGcSoY3.js";import"./Tooltip-DOf8SuPq.js";import"./useTheme-BywMHAxl.js";import"./Popper-DjaUCFiZ.js";import"./Portal-DHXjgkAG.js";import"./Grow-P-A83A7Q.js";import"./utils-5sYZftss.js";import"./ThemeProvider-s1UPBsz6.js";import"./index-Cqve-NHl.js";import"./lodash-CoGan1YB.js";import"./useAnalytics-DTrkS1Gy.js";import"./typography-Bw32VBWA.js";import"./Modal-BqI74ljr.js";import"./classCallCheck-BNzALLS0.js";import"./Paper-DsuWrj9f.js";import"./ListContext-DydK1sOh.js";var i={},R=P,H=v;Object.defineProperty(i,"__esModule",{value:!0});var L=i.default=void 0,M=H(E),O=R(x()),A=(0,O.default)(M.createElement("path",{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess");L=i.default=A;const Re={title:"Layout/Breadcrumbs",component:a},o=()=>e.createElement(b,null,e.createElement("h2",null,"Standard breadcrumbs"),e.createElement(r,{paragraph:!0},"Underlined pages are links. This should show a hierarchical relationship."),e.createElement(B,{themeId:"other"},e.createElement(C,{title:"Current Page",type:"General Page",typeLink:"/"}))),n=()=>{const[p,s]=e.useState(null),f=k=>{s(k.currentTarget)},T=()=>{s(null)},m=!!p;return e.createElement(b,null,e.createElement(r,{paragraph:!0},"It might be the case that you want to keep your breadcrumbs outside of the header. In that case, they should be positioned above the title of the page."),e.createElement("h2",null,"Standard breadcrumbs"),e.createElement(r,{paragraph:!0},"Underlined pages are links. This should show a hierarchical relationship."),e.createElement(a,{color:"primaryText"}),e.createElement(a,{color:"primaryText"},e.createElement(t,{to:"/"},"General Page"),e.createElement(t,{to:"/"},"Second Page"),e.createElement(r,null,"Current page")),e.createElement("h2",null,"Hidden breadcrumbs"),e.createElement(r,{paragraph:!0},"Use this when you have more than three breadcrumbs. When user clicks on ellipses, expand the breadcrumbs out."),e.createElement(a,{color:"primaryText"},e.createElement(t,{to:"/"},"General Page"),e.createElement(t,{to:"/"},"Second Page"),e.createElement(t,{to:"/"},"Third Page"),e.createElement(t,{to:"/"},"Fourth Page"),e.createElement(r,null,"Current page")),e.createElement("h2",null,"Layered breadcrumbs"),e.createElement(r,{paragraph:!0},"Use this when you want to show alternative breadcrumbs on the same hierarchical level."),e.createElement(E.Fragment,null,e.createElement(a,{color:"primaryText"},e.createElement(t,{to:"/"},"General Page"),e.createElement(t,{to:"/",onClick:f},e.createElement(S,{display:"flex",alignItems:"center"},e.createElement(r,{component:"span"},"Second Page"),m?e.createElement(L,null):e.createElement(I,null))),e.createElement(r,null,"Current page")),e.createElement(_,{open:m,onClose:T,anchorEl:p,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"}},e.createElement(w,null,e.createElement(l,{button:!0,style:{textDecoration:"underline"}},"Parallel second page"),e.createElement(l,{button:!0,style:{textDecoration:"underline"}},"Another parallel second page"),e.createElement(l,{button:!0,style:{textDecoration:"underline"}},"Yet another, parallel second page")))))};o.__docgenInfo={description:"",methods:[],displayName:"InHeader"};n.__docgenInfo={description:"",methods:[],displayName:"OutsideOfHeader"};var c,h,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => <MemoryRouter>
    <h2>Standard breadcrumbs</h2>
    <Typography paragraph>
      Underlined pages are links. This should show a hierarchical relationship.
    </Typography>

    <Page themeId="other">
      <Header title="Current Page" type="General Page" typeLink="/" />
    </Page>
  </MemoryRouter>`,...(d=(h=o.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};var u,g,y;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return <MemoryRouter>
      <Typography paragraph>
        It might be the case that you want to keep your breadcrumbs outside of
        the header. In that case, they should be positioned above the title of
        the page.
      </Typography>

      <h2>Standard breadcrumbs</h2>
      <Typography paragraph>
        Underlined pages are links. This should show a hierarchical
        relationship.
      </Typography>

      <Breadcrumbs color="primaryText" />

      <Breadcrumbs color="primaryText">
        <Link to="/">General Page</Link>
        <Link to="/">Second Page</Link>
        <Typography>Current page</Typography>
      </Breadcrumbs>

      <h2>Hidden breadcrumbs</h2>
      <Typography paragraph>
        Use this when you have more than three breadcrumbs. When user clicks on
        ellipses, expand the breadcrumbs out.
      </Typography>

      <Breadcrumbs color="primaryText">
        <Link to="/">General Page</Link>
        <Link to="/">Second Page</Link>
        <Link to="/">Third Page</Link>
        <Link to="/">Fourth Page</Link>
        <Typography>Current page</Typography>
      </Breadcrumbs>

      <h2>Layered breadcrumbs</h2>
      <Typography paragraph>
        Use this when you want to show alternative breadcrumbs on the same
        hierarchical level.
      </Typography>

      <Fragment>
        <Breadcrumbs color="primaryText">
          <Link to="/">General Page</Link>
          <Link to="/" onClick={handleClick}>
            <Box display="flex" alignItems="center">
              <Typography component="span">Second Page</Typography>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </Link>
          <Typography>Current page</Typography>
        </Breadcrumbs>
        <Popover open={open} onClose={handleClose} anchorEl={anchorEl} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }} transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}>
          <List>
            <ListItem button style={{
            textDecoration: 'underline'
          }}>
              Parallel second page
            </ListItem>
            <ListItem button style={{
            textDecoration: 'underline'
          }}>
              Another parallel second page
            </ListItem>
            <ListItem button style={{
            textDecoration: 'underline'
          }}>
              Yet another, parallel second page
            </ListItem>
          </List>
        </Popover>
      </Fragment>
    </MemoryRouter>;
}`,...(y=(g=n.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const He=["InHeader","OutsideOfHeader"];export{o as InHeader,n as OutsideOfHeader,He as __namedExportsOrder,Re as default};
