import{R as e}from"./index-CTjT7uj6.js";import{m as l}from"./makeStyles-DyV0dNcq.js";import{T as c}from"./Tooltip-DpHos2o3.js";import{I as p}from"./IconButton-DuROhx0p.js";import{T as m}from"./Typography-Drxa_JDy.js";import{S as u,U as d}from"./icons-CF5UnHsF.js";const g=l(()=>({icon:{color:"#f3ba37",cursor:"pointer",display:"inline-flex"},iconBorder:{color:"inherit",cursor:"pointer",display:"inline-flex"}}),{name:"BackstageFavoriteToggleIcon"});function i(t){const{isFavorite:n}=t,o=g();return e.createElement(m,{component:"span",className:n?o.icon:o.iconBorder},n?e.createElement(u,null):e.createElement(d,null))}function T(t){const{id:n,title:o,isFavorite:r,onToggle:a,...s}=t;return e.createElement(c,{id:n,title:o},e.createElement(p,{"aria-label":o,id:n,onClick:()=>a(!r),color:"inherit",...s},e.createElement(i,{isFavorite:r})))}i.__docgenInfo={description:`Icon used in FavoriteToggle component.

Can be used independently, useful when used as {@link @material-table/core#MaterialTableProps.actions} in {@link @material-table/core#MaterialTable}

@public`,methods:[],displayName:"FavoriteToggleIcon",props:{isFavorite:{required:!0,tsType:{name:"boolean"},description:""}}};T.__docgenInfo={description:`Toggle encapsulating logic for marking something as favorite,
primarily used in various instances of entity lists and cards but can be used elsewhere.

This component can only be used in as a controlled toggle and does not keep internal state.

@public`,methods:[],displayName:"FavoriteToggle",props:{id:{required:!0,tsType:{name:"string"},description:""},title:{required:!0,tsType:{name:"string"},description:""},isFavorite:{required:!0,tsType:{name:"boolean"},description:""},onToggle:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"value"}],return:{name:"void"}}},description:""}}};export{T as F};
