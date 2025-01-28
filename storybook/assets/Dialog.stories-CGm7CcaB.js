import{R as e}from"./index-CTjT7uj6.js";import{d as m}from"./Close-CiVTzqlb.js";import{D as s,a as p,b as u,c as y}from"./DialogTitle-CTRVyY9E.js";import{m as g}from"./makeStyles-BU0tkW44.js";import{I as d}from"./IconButton-DZLTM8HP.js";import{T as t}from"./Typography-DllAHQJn.js";import{B as a}from"./Button-BIQ-mITp.js";import{c as h}from"./createStyles-Bp4GwXob.js";import"./interopRequireDefault-Y9pwbXtE.js";import"./createSvgIcon-gVLTJlNx.js";import"./capitalize-CuRwImtC.js";import"./defaultTheme-BnEhos6D.js";import"./withStyles-Bvq8MRoX.js";import"./hoist-non-react-statics.cjs-DzIEFHQI.js";import"./useControlled-CogIeAPD.js";import"./index-QA7F3UF1.js";import"./createSvgIcon-C2joj_qV.js";import"./isMuiElement-Cb6QZSLO.js";import"./unstable_useId-B3Hiq1YI.js";import"./Modal-BqI74ljr.js";import"./classCallCheck-BNzALLS0.js";import"./Portal-DHXjgkAG.js";import"./Backdrop-DqBUeUQS.js";import"./useTheme-BywMHAxl.js";import"./utils-5sYZftss.js";import"./TransitionGroupContext-BtzQ-Cv7.js";import"./Paper-DsuWrj9f.js";import"./ButtonBase-DbbECwI4.js";import"./createStyles-yD3y8ldD.js";const U={title:"Layout/Dialog",component:s},T=g(o=>h({closeButton:{position:"absolute",right:o.spacing(1),top:o.spacing(1),color:o.palette.grey[500]}})),n={args:{open:!0},render:({open:o})=>{const c=T();return e.createElement(s,{"aria-labelledby":"dialog-title","aria-describedby":"dialog-description",open:o},e.createElement(p,{id:"dialog-title"},"Dialog Box Title",e.createElement(d,{"aria-label":"close",className:c.closeButton},e.createElement(m,null))),e.createElement(u,null,e.createElement(t,null,"This component is used whenever confirmation of some sort is needed, such as:"),e.createElement("ul",null,e.createElement("li",null,e.createElement(t,null,"Consent to sensitive matters like GDPR, access, etc;")),e.createElement("li",null,e.createElement(t,null,"Save, submit, cancel after a form is completed;")),e.createElement("li",null,e.createElement(t,null,"Alert message;")),e.createElement("li",null,e.createElement(t,null,"Buttons are optional."))),e.createElement(t,null,"The color for the secondary button is the same as the primary.")),e.createElement(y,null,e.createElement(a,{color:"primary"},"Secondary action"),e.createElement(a,{color:"primary"},"Primary action")))}};var r,l,i;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    open: true
  },
  render: ({
    open
  }: {
    open: boolean;
  }) => {
    const classes = styles();
    return <Dialog aria-labelledby="dialog-title" aria-describedby="dialog-description" open={open}>
        <DialogTitle id="dialog-title">
          Dialog Box Title
          <IconButton aria-label="close" className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            This component is used whenever confirmation of some sort is needed,
            such as:
          </Typography>
          <ul>
            <li>
              <Typography>
                Consent to sensitive matters like GDPR, access, etc;
              </Typography>
            </li>
            <li>
              <Typography>
                Save, submit, cancel after a form is completed;
              </Typography>
            </li>
            <li>
              <Typography>Alert message;</Typography>
            </li>
            <li>
              <Typography>Buttons are optional.</Typography>
            </li>
          </ul>
          <Typography>
            The color for the secondary button is the same as the primary.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Secondary action</Button>
          <Button color="primary">Primary action</Button>
        </DialogActions>
      </Dialog>;
  }
}`,...(i=(l=n.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const V=["Default"];export{n as Default,V as __namedExportsOrder,U as default};
