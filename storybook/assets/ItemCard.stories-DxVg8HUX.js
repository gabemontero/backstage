import{R as e}from"./index-CTjT7uj6.js";import{L as f}from"./LinkButton-BGMAveA3.js";import{m as l}from"./makeStyles-CRB_T0k9.js";import{B as C}from"./Box-DU2WS7ls.js";import{c as b}from"./createStyles-Bp4GwXob.js";import{T as n}from"./Typography-D5Gm01bp.js";import{M as T}from"./index-BkN7i-fW.js";import{C as k,a as w}from"./CardContent-OuGBBiNv.js";import{C as I}from"./CardMedia-CZ3wPu6T.js";import{C as E}from"./CardActions-COEhqCRe.js";import"./Link-CCke1Wzl.js";import"./index-Cqve-NHl.js";import"./lodash-CoGan1YB.js";import"./index-BhgyLgKK.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-4utR8_H1.js";import"./capitalize-BWjKmKKm.js";import"./defaultTheme-DquFOgf8.js";import"./withStyles-DWaS6n8x.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./createChainedFunction-Da-WpsAN.js";import"./createSvgIcon-CL6P1I3F.js";import"./debounce-DtXjJkxj.js";import"./isMuiElement-B_4ddUuK.js";import"./ownerWindow-C3iVrxHF.js";import"./useIsFocusVisible-DdvWPq7A.js";import"./useControlled-B47E2WMp.js";import"./unstable_useId-B3Hiq1YI.js";import"./useAnalytics-DTrkS1Gy.js";import"./ApiRef-BSBwTmJJ.js";import"./ConfigApi-DBUUc3nU.js";import"./Button-2GK6wueN.js";import"./ButtonBase-nYwe-awX.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./typography-1q_m8518.js";import"./createStyles-yD3y8ldD.js";import"./Paper-2nKWzoda.js";const M=t=>b({root:{color:t.palette.common.white,padding:t.spacing(2,2,3),backgroundImage:t.getPageTheme({themeId:"card"}).backgroundImage,backgroundPosition:0,backgroundSize:"inherit"}}),x=l(M,{name:"BackstageItemCardHeader"});function d(t){const{title:r,subtitle:a,children:s}=t,v=x(t);return e.createElement(C,{className:v.root},a&&e.createElement(n,{variant:"subtitle2",component:"h3"},a),r&&e.createElement(n,{variant:"h6",component:"h4"},r),s)}d.__docgenInfo={description:`A simple card header, rendering a default look for "item cards" - cards that
are arranged in a grid for users to select among several options.

@remarks
This component expects to be placed within a Material UI \`<CardMedia>\`.

Styles for the header can be overridden using the \`classes\` prop, e.g.:

\`<ItemCardHeader title="Hello" classes={{ root: myClassName }} />\`

@public`,methods:[],displayName:"ItemCardHeader",props:{title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`A large title to show in the header, providing the main heading.

Use this if you want to have the default styling and placement of a title.`},subtitle:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`A slightly smaller title to show in the header, providing additional
details.

Use this if you want to have the default styling and placement of a
subtitle.`},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Custom children to draw in the header.

If the title and/or subtitle were specified, the children are drawn below
those.`}}};const S=t=>b({root:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(22em, 1fr))",gridAutoRows:"1fr",gridGap:t.spacing(2)}}),N=l(S,{name:"BackstageItemCardGrid"});function m(t){const{children:r,...a}=t,s=N(a);return e.createElement(C,{className:s.root,...a},r)}m.__docgenInfo={description:`A default grid to use when arranging "item cards" - cards that let users
select among several options.

@remarks
The immediate children are expected to be Material UI Card components.

Styles for the grid can be overridden using the \`classes\` prop, e.g.:

\`<ItemCardGrid title="Hello" classes={{ root: myClassName }} />\`

This can be useful for e.g. overriding gridTemplateColumns to adapt the
minimum size of the cells to fit the content better.

@public`,methods:[],displayName:"ItemCardGrid",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The Card items of the grid."}}};const ge={title:"Layout/Item Cards"},R="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",A=l({grid:{gridTemplateColumns:"repeat(auto-fill, 12em)"},header:{color:"black",backgroundImage:"linear-gradient(to bottom right, red, yellow)"}}),o=()=>e.createElement(T,null,e.createElement(n,{paragraph:!0},"The most basic setup is to place a bunch of cards into a large grid, leaving styling to the defaults. Try to resize the window to see how they rearrange themselves to fit the viewport."),e.createElement(m,null,[...Array(10).keys()].map(t=>e.createElement(k,{key:t},e.createElement(I,null,e.createElement(d,{title:`Card #${t}`,subtitle:"Subtitle"})),e.createElement(w,null,R.split(" ").slice(0,5+Math.floor(Math.random()*30)).join(" ")),e.createElement(E,null,e.createElement(f,{color:"primary",to:"/catalog"},"Go There!")))))),i=()=>{const t=A();return e.createElement(T,null,e.createElement(n,{paragraph:!0},"Both the grid and the header can be styled, using the"," ",e.createElement(n,{variant:"caption"},"classes")," property. This lets you for example tweak the column sizes and the background of the header."),e.createElement(m,{classes:{root:t.grid}},[...Array(10).keys()].map(r=>e.createElement(k,{key:r},e.createElement(I,null,e.createElement(d,{title:`Card #${r}`,subtitle:"Subtitle",classes:{root:t.header}})),e.createElement(w,null,R.split(" ").slice(0,5+Math.floor(Math.random()*30)).join(" ")),e.createElement(E,null,e.createElement(f,{color:"primary",to:"/catalog"},"Go There!"))))))};o.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"Styling"};var c,p,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => <MemoryRouter>
    <Typography paragraph>
      The most basic setup is to place a bunch of cards into a large grid,
      leaving styling to the defaults. Try to resize the window to see how they
      rearrange themselves to fit the viewport.
    </Typography>
    <ItemCardGrid>
      {[...Array(10).keys()].map(index => <Card key={index}>
          <CardMedia>
            <ItemCardHeader title={\`Card #\${index}\`} subtitle="Subtitle" />
          </CardMedia>
          <CardContent>
            {text.split(' ').slice(0, 5 + Math.floor(Math.random() * 30)).join(' ')}
          </CardContent>
          <CardActions>
            <LinkButton color="primary" to="/catalog">
              Go There!
            </LinkButton>
          </CardActions>
        </Card>)}
    </ItemCardGrid>
  </MemoryRouter>`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,g,y;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const classes = useStyles();
  return <MemoryRouter>
      <Typography paragraph>
        Both the grid and the header can be styled, using the{' '}
        <Typography variant="caption">classes</Typography> property. This lets
        you for example tweak the column sizes and the background of the header.
      </Typography>
      <ItemCardGrid classes={{
      root: classes.grid
    }}>
        {[...Array(10).keys()].map(index => <Card key={index}>
            <CardMedia>
              <ItemCardHeader title={\`Card #\${index}\`} subtitle="Subtitle" classes={{
            root: classes.header
          }} />
            </CardMedia>
            <CardContent>
              {text.split(' ').slice(0, 5 + Math.floor(Math.random() * 30)).join(' ')}
            </CardContent>
            <CardActions>
              <LinkButton color="primary" to="/catalog">
                Go There!
              </LinkButton>
            </CardActions>
          </Card>)}
      </ItemCardGrid>
    </MemoryRouter>;
}`,...(y=(g=i.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const ye=["Default","Styling"];export{o as Default,i as Styling,ye as __namedExportsOrder,ge as default};
