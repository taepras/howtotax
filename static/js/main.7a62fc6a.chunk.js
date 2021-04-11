(this.webpackJsonptaxvisualizer=this.webpackJsonptaxvisualizer||[]).push([[0],{115:function(t,e,n){},120:function(t,e,n){},121:function(t,e,n){"use strict";n.r(e);var a,c,i,r,s,l,o,x,j,m,b,u,d,f,h,O,p,g,y,v=n(1),N=n.n(v),w=n(32),I=n.n(w),k=(n(115),n(5)),M=n(2),S=n(4),R=n(33),A=n(3),C=n(0),B=A.b.div(a||(a=Object(M.a)(["\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n"]))),F=A.b.div(c||(c=Object(M.a)(["\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 20%;\n    background: linear-gradient(to bottom, #222, #2220);\n"]))),T=A.b.svg(i||(i=Object(M.a)(["\n    & > g text {\n        transform: scale(1, -1);\n    }\n"]))),z=function(t){var e=t.income,n=t.expense,a=t.allowance,c=t.taxBrackets,i=t.padding,r=void 0===i?{left:35,right:0,top:0,bottom:30}:i,s=t.isPullTax,l=void 0!==s&&s,o=t.isActivateTax,x=void 0===o||o,j=t.setPullTax,m=void 0===j?function(t){}:j,b=t.transitionTime,u=void 0===b?500:b,d=t.enableTransition,f=void 0===d||d,h=Object(R.a)({onResize:function(t){var e=t.observe,n=t.unobserve;t.width,t.height,t.entry;n(),e()}}),O=h.observe,p=(h.unobserve,h.width),g=h.height,y=(h.entry,Object(v.useMemo)((function(){return f?u:0}),[f,u])),N=Object(v.useRef)(null),w=Object(v.useMemo)((function(){return n<e-a?+n:+Math.max(0,e-a)}),[e,n]),I=Object(v.useMemo)((function(){return a<e?+a:+e}),[e,a]),k=Object(v.useMemo)((function(){return Math.max(e-n-a,0)}),[e,n,a]),M=Object(v.useCallback)(S.f().domain([0,Math.max(3e5,1.4*e)]).range([0,g-r.bottom]),[g,e,r]),A=Object(v.useMemo)((function(){return p-(r.left+r.right)}),[p,r]),z=Object(v.useCallback)(S.f().domain([0,1]).range([0,A]),[e,p]),G=Object(v.useMemo)((function(){return S.b(M).tickFormat(S.d(".3s"))}),[M]),P=Object(v.useMemo)((function(){return S.c(M)}),[M]),L=Object(v.useMemo)((function(){return S.a(z).tickFormat(S.d(".0%"))}),[z]),E=function(t){var e="M 0 0 ";return e+=c.map((function(t){return""+"L ".concat(z(t.taxRate)," ").concat(M(t.minNetIncome)," ")+"L ".concat(z(t.taxRate)," ").concat(M(t.maxNetIncome)," ")})).join(""),e+="L 0 ".concat(M(c[c.length-1].maxNetIncome)," "),e+="Z"};return Object(v.useLayoutEffect)((function(){if(N.current){var t=S.g(N.current);t.select("g.container").attr("transform","translate(".concat(r.left,", ").concat(r.bottom,")")),t.select("rect.net-income").attr("width",A).transition().duration(y).style("fill","#08f").attr("height",Math.max(0,M(k))),t.select("rect.net-income-mask").attr("width",A).transition().duration(y).attr("height",Math.max(0,M(k))),console.log("netIncome + cleanedAllowance",k+I,I,M(I)),t.select("rect.expense").attr("width",A).transition().duration(y).style("fill","#135").attr("y",M(k+I)).attr("height",Math.max(0,M(w))),t.select("rect.allowance").attr("width",A).transition().duration(y).style("fill","#147").attr("y",M(k)).attr("height",Math.max(0,M(I))),t.select("text.net-income-text").text("\u0e40\u0e07\u0e34\u0e19\u0e44\u0e14\u0e49\u0e2a\u0e38\u0e17\u0e18\u0e34").attr("x",A/2).attr("y",-M(k/2)),t.select("text.net-expense-text").text("\u0e04\u0e48\u0e32\u0e25\u0e14\u0e2b\u0e22\u0e48\u0e2d\u0e19").attr("x",A/2).attr("y",-M(k+I/2)),t.select("text.net-allowance-text").text("\u0e04\u0e48\u0e32\u0e43\u0e0a\u0e49\u0e08\u0e48\u0e32\u0e22").attr("x",A/2).attr("y",-M(e-n/2)),t.select("path.tax-stairs-camouflage").attr("fill","#222").transition().duration(y).attr("opacity",x?1:0).attr("d",E),t.select("path.tax-stairs").attr("fill","#f80").transition().duration(y).attr("d",E).attr("transform",l?"translate(".concat(-50,", 0)"):"translate(0, 0)").style("opacity",x&&!l?1:0);var a=t.select("g.tax-lines").selectAll("g").data(c),i=a.enter().append("g").classed("bracket",!0);i.append("text").classed("bracket-rate-text",!0),i.append("text").classed("bracket-min-text",!0),i.append("rect").classed("bracket-rect",!0),i.append("line").classed("bracket-line",!0),a.merge(i).select("rect").attr("x",0).attr("width",(function(t){return z(t.taxRate)})).style("fill-opacity",0).style("stroke","#f80").style("stroke-dasharray","3, 3").transition().duration(y).attr("y",(function(t){return M(t.minNetIncome)})).attr("height",(function(t){return M(t.maxNetIncome-t.minNetIncome)})),a.merge(i).select("line").attr("x1",0).attr("x2",A).style("stroke","#f80").style("stroke-dasharray","3, 3").transition().duration(y).attr("y1",(function(t){return M(t.maxNetIncome)})).attr("y2",(function(t){return M(t.maxNetIncome)})),a.merge(i).select("text.bracket-rate-text").style("fill","#fff").style("font-size","0.75rem").style("text-anchor","end").attr("x",A-5).transition().duration(y).text((function(t){return"\u0e40\u0e23\u0e34\u0e48\u0e21\u0e04\u0e34\u0e14\u0e17\u0e35\u0e48 ".concat(t.minNetIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")," \u0e1a\u0e32\u0e17")})).style("fill-opacity",(function(t,e){return 0!=e&&M(t.maxNetIncome-t.minNetIncome)>20?1:0})).attr("y",(function(t){return-M(t.minNetIncome)-5})),a.merge(i).select("text.bracket-min-text").style("fill","#fff").style("font-size","0.75rem").attr("x",(function(t){return z(t.taxRate)+5})).transition().duration(y).text((function(t){return"\u0e20\u0e32\u0e29\u0e35 ".concat(100*t.taxRate,"%")})).style("fill-opacity",(function(t,e){return 0!=e&&M(t.maxNetIncome-t.minNetIncome)>20?1:0})).attr("y",(function(t){return-M(t.minNetIncome)-5})),S.g("g.axis-income-bottom").attr("transform","translate(0, 0)").transition().duration(y).call(G),S.g("g.axis-tax-rate").transition().duration(y).call(L)}}),[p,g,N,l,A,M,k,e,n,a,c,r,G,P,L,I,w,z]),Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)(B,{ref:O,children:[Object(C.jsx)(F,{}),Object(C.jsxs)(T,{id:"chart",className:"d3-component",width:p,height:g,ref:N,children:[Object(C.jsx)("defs",{children:Object(C.jsx)("clipPath",{id:"net-income-mask",children:Object(C.jsx)("rect",{className:"net-income-mask"})})}),Object(C.jsx)("g",{transform:"translate(0, ".concat(g,") scale(1, -1)"),children:Object(C.jsxs)("g",{className:"container",children:[Object(C.jsx)("rect",{className:"net-income"}),Object(C.jsx)("rect",{className:"expense"}),Object(C.jsx)("rect",{className:"allowance"}),Object(C.jsx)("text",{className:"net-income-text",style:{fill:"#fff",fontSize:"0.75rem",alignmentBaseline:"middle",textAnchor:"middle",fillOpacity:.4}}),Object(C.jsx)("text",{className:"net-expense-text",style:{fill:"#fff",fontSize:"0.75rem",alignmentBaseline:"middle",textAnchor:"middle",fillOpacity:.4}}),Object(C.jsx)("text",{className:"net-allowance-text",style:{fill:"#fff",fontSize:"0.75rem",alignmentBaseline:"middle",textAnchor:"middle",fillOpacity:.4}}),Object(C.jsx)("g",{className:"tax-lines"}),Object(C.jsx)("g",{className:"axis-income-top"}),Object(C.jsx)("g",{className:"axis-income-bottom"}),Object(C.jsx)("g",{className:"axis-tax-rate"}),Object(C.jsx)("path",{className:"tax-stairs-camouflage","clip-path":"url(#net-income-mask)",onClick:function(){return m(!1)}}),Object(C.jsx)("path",{className:"tax-stairs","clip-path":"url(#net-income-mask)",onClick:function(){return m(!l)}})]})})]})]})})},G=(n(120),function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}),P=n(22),L=n(37),E=A.b.div(r||(r=Object(M.a)(["\n    display: flex;\n    gap: 4px;\n"]))),X=A.b.div(s||(s=Object(M.a)(["\n    height: 2px;\n    flex-grow: 1;\n    border-radius: 999;\n    background-color: #fff;\n    transition: opacity 0.2s;\n    opacity: ",";\n"])),(function(t){return t.active?1:.4})),D=function(t){var e=t.currentStep,n=void 0===e?0:e,a=t.totalSteps,c=void 0===a?0:a,i=Object(L.a)(t,["currentStep","totalSteps"]),r=Object(v.useMemo)((function(){return S.e(c)}),[c]);return Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(E,Object(P.a)(Object(P.a)({},i),{},{children:r.map((function(t,e){return Object(C.jsx)(X,{active:e<=n})}))}))})},J=A.b.div(l||(l=Object(M.a)(["\n  /* padding: 30px; */\n  width: 100%;\n  /* height: 50vh; */\n  flex: 1;\n  position: relative;\n  transition: all 0.2s;\n"]))),U=A.b.div(o||(o=Object(M.a)(["\n  height: 180px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n\n  @media (min-width: 768px) {\n    height: auto;\n    margin-left: 80px;\n    width: 400px;\n    max-width: 40%;\n    justify-content: center;\n  }\n"]))),Z=A.b.div(x||(x=Object(M.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  flex-grow: 1;\n  transition: all 0.5s;\n\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n\n  ","\n"])),(function(t){switch(t.status){case-1:return Object(A.a)(j||(j=Object(M.a)(["\n          transform: translateX(-100px);\n          opacity: 0;\n          pointer-events: none;\n        "])));case 1:return Object(A.a)(m||(m=Object(M.a)(["\n          transform: translateX(100px);\n          opacity: 0;\n          pointer-events: none;\n        "])));default:return Object(A.a)(b||(b=Object(M.a)(["\n          /* transform: translateX(-100px):  */\n          /* opacity: 0; */\n          /* pointer-events: none; */\n        "])))}})),q=A.b.div(u||(u=Object(M.a)(["\n  /* height: 200px; */\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  flex-grow: 1;\n  position: relative;\n\n  @media (min-width: 768px) {\n    height: 240px;\n    flex-grow: 0;\n  }\n"]))),H=A.b.div(d||(d=Object(M.a)(["\n  padding: 30px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n\n  @media (min-width: 768px) {\n    flex-direction: row;\n    padding: 50px;\n  }\n"]))),K=A.b.div(f||(f=Object(M.a)(["\n  /* margin-top: 30px; */\n  display: grid;\n  grid-template-columns: auto auto 80px;\n  column-gap: 10px;\n  row-gap: 15px;\n  flex-direction: column;\n  /* margin-bottom: 30px; */\n  align-content: center;\n\n  label {\n    white-space: nowrap;\n  }\n"]))),Q=(A.b.div(h||(h=Object(M.a)(["\n  /* margin-bottom: 10px; */\n  display: flex;\n  flex-direction: column;\n"]))),A.b.button(O||(O=Object(M.a)(["\n  border: none;\n  border-radius: 4px;\n  padding: 4px 8px;\n\n  ","\n\n  ","\n"])),(function(t){return t.secondary?Object(A.a)(p||(p=Object(M.a)(["\n    border: 1px white solid;\n    background-color: transparent;\n    color: white;\n  "]))):Object(A.a)(g||(g=Object(M.a)(["\n    background-color: white;\n  "])))}),(function(t){return t.disabled&&Object(A.a)(y||(y=Object(M.a)(["\n    opacity: 0.4;\n  "])))})));var V=function(){var t=Object(v.useState)(0),e=Object(k.a)(t,2),n=e[0],a=e[1],c=Object(v.useState)(0),i=Object(k.a)(c,2),r=i[0],s=i[1],l=Object(v.useState)(0),o=Object(k.a)(l,2),x=o[0],j=o[1],m=Object(v.useState)(!0),b=Object(k.a)(m,2),u=b[0],d=b[1],f=Object(v.useState)(0),h=Object(k.a)(f,2),O=h[0],p=h[1],g=Object(v.useState)(!1),y=Object(k.a)(g,2),N=y[0],w=y[1],I=Object(v.useState)(!1),M=Object(k.a)(I,2),S=M[0],R=M[1],A=[{minNetIncome:0,maxNetIncome:15e4,taxRate:0},{minNetIncome:15e4,maxNetIncome:3e5,taxRate:.05},{minNetIncome:3e5,maxNetIncome:5e5,taxRate:.1},{minNetIncome:5e5,maxNetIncome:75e4,taxRate:.15},{minNetIncome:75e4,maxNetIncome:1e6,taxRate:.2},{minNetIncome:1e6,maxNetIncome:2e6,taxRate:.25},{minNetIncome:2e6,maxNetIncome:5e6,taxRate:.3},{minNetIncome:5e6,maxNetIncome:999999999999,taxRate:.35}],B=function(t,e,n){return Object(v.useMemo)((function(){return Math.max(0,t-e-n)}),[t,e,n])}(n,r,x),F=function(t,e){return Object(v.useMemo)((function(){var n=0,a=t;for(var c in e){var i=e[c].maxNetIncome-e[c].minNetIncome;if(n+=Math.min(a,i)*e[c].taxRate,(a-=i)<=0)break}return n}),[t,e])}(B,A),T=Object(v.useState)([Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("p",{children:"\u0e04\u0e33\u0e19\u0e27\u0e13\u0e20\u0e32\u0e29\u0e35\u0e40\u0e07\u0e34\u0e19\u0e44\u0e14\u0e49\u0e1a\u0e38\u0e04\u0e04\u0e25\u0e18\u0e23\u0e23\u0e21\u0e14\u0e32"}),Object(C.jsxs)(K,{children:[Object(C.jsx)("label",{children:"\u0e23\u0e32\u0e22\u0e44\u0e14\u0e49\u0e15\u0e48\u0e2d\u0e1b\u0e35"}),Object(C.jsx)("input",{type:"range",min:"0",max:"10000000",value:n,onChange:function(t){return a(t.target.value)},onMouseDown:function(){return d(!1)},onMouseUp:function(){return d(!0)}}),Object(C.jsx)("input",{type:"number",step:1e4,min:0,value:n,onChange:function(t){return a(t.target.value)}})]})]}),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("p",{children:"\u0e04\u0e48\u0e32\u0e25\u0e14\u0e2b\u0e22\u0e48\u0e2d\u0e19 default 100,000 \u0e1a\u0e32\u0e17"}),Object(C.jsxs)(K,{children:[Object(C.jsx)("label",{children:"\u0e04\u0e48\u0e32\u0e43\u0e0a\u0e49\u0e08\u0e48\u0e32\u0e22"}),Object(C.jsx)("input",{type:"range",min:"0",max:"1000000",value:r,onChange:function(t){return s(t.target.value)}}),Object(C.jsx)("input",{type:"number",step:1e4,min:0,value:r,onChange:function(t){return s(t.target.value)}})]})]}),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("p",{children:"\u0e04\u0e48\u0e32\u0e25\u0e14\u0e2b\u0e22\u0e48\u0e2d\u0e19 default 60,000 \u0e1a\u0e32\u0e17"}),Object(C.jsxs)(K,{children:[Object(C.jsx)("label",{children:"\u0e04\u0e48\u0e32\u0e25\u0e14\u0e2b\u0e22\u0e48\u0e2d\u0e19"}),Object(C.jsx)("input",{type:"range",min:"0",max:"1000000",value:x,onChange:function(t){return j(t.target.value)}}),Object(C.jsx)("input",{type:"number",step:1e4,min:0,value:x,onChange:function(t){return j(t.target.value)}})]})]}),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("p",{children:['"\u0e20\u0e32\u0e29\u0e35\u0e40\u0e07\u0e34\u0e19\u0e44\u0e14\u0e49\u0e1a\u0e38\u0e04\u0e04\u0e25\u0e18\u0e23\u0e23\u0e21\u0e14\u0e32" \u0e04\u0e34\u0e14\u0e08\u0e32\u0e01 "',Object(C.jsx)("span",{style:{color:"#0af"},children:"\u0e40\u0e07\u0e34\u0e19\u0e44\u0e14\u0e49\u0e2a\u0e38\u0e17\u0e18\u0e34"}),'"']}),Object(C.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(C.jsxs)("div",{style:{flexGrow:1,textAlign:"center"},children:[Object(C.jsx)("small",{children:"\u0e23\u0e32\u0e22\u0e44\u0e14\u0e49"}),Object(C.jsx)("br",{}),Object(C.jsx)("small",{children:G(n)})]}),Object(C.jsx)("div",{children:"-"}),Object(C.jsxs)("div",{style:{flexGrow:1,textAlign:"center"},children:[Object(C.jsx)("small",{children:"\u0e04\u0e48\u0e32\u0e43\u0e0a\u0e49\u0e08\u0e48\u0e32\u0e22"}),Object(C.jsx)("br",{}),Object(C.jsx)("small",{children:G(r)})]}),Object(C.jsx)("div",{children:"-"}),Object(C.jsxs)("div",{style:{flexGrow:1,textAlign:"center"},children:[Object(C.jsx)("small",{children:"\u0e25\u0e14\u0e2b\u0e22\u0e48\u0e2d\u0e19"}),Object(C.jsx)("br",{}),Object(C.jsx)("small",{children:G(x)})]}),Object(C.jsx)("div",{children:"="}),Object(C.jsxs)("div",{style:{flexGrow:1,textAlign:"center"},children:[Object(C.jsx)("small",{style:{color:"#0af"},children:"\u0e40\u0e07\u0e34\u0e19\u0e44\u0e14\u0e49\u0e2a\u0e38\u0e17\u0e18\u0e34"}),Object(C.jsx)("br",{}),Object(C.jsxs)("b",{children:[G(B)," \u0e3f"]})]})]})]}),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("p",{children:['\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e04\u0e33\u0e19\u0e27\u0e13 "\u0e40\u0e07\u0e34\u0e19\u0e44\u0e14\u0e49\u0e2a\u0e38\u0e17\u0e18\u0e34" \u0e41\u0e25\u0e49\u0e27 \u0e08\u0e30\u0e15\u0e49\u0e2d\u0e07\u0e19\u0e33\u0e44\u0e1b\u0e40\u0e02\u0e49\u0e32 "',Object(C.jsx)("span",{style:{color:"#f90"},children:"\u0e02\u0e31\u0e49\u0e19\u0e1a\u0e31\u0e19\u0e44\u0e14\u0e20\u0e32\u0e29\u0e35"}),'" \u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e04\u0e33\u0e19\u0e27\u0e13\u0e20\u0e32\u0e29\u0e35\u0e2d\u0e2d\u0e01\u0e21\u0e32']}),Object(C.jsx)("p",{children:"\u0e2a\u0e35\u0e2a\u0e49\u0e21\u0e04\u0e37\u0e2d\u0e2a\u0e31\u0e14\u0e2a\u0e48\u0e27\u0e19\u0e20\u0e32\u0e29\u0e35\u0e17\u0e35\u0e48\u0e04\u0e38\u0e13\u0e15\u0e49\u0e2d\u0e07\u0e40\u0e2a\u0e35\u0e22"}),Object(C.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(C.jsxs)("div",{style:{flexGrow:1,flexBasis:0,textAlign:"center"},children:[Object(C.jsx)("small",{style:{color:"#0af"},children:"\u0e40\u0e07\u0e34\u0e19\u0e44\u0e14\u0e49\u0e2a\u0e38\u0e17\u0e18\u0e34"}),Object(C.jsx)("br",{}),G(B)," \u0e3f"]}),Object(C.jsx)("div",{children:"\ud83e\udc16"}),Object(C.jsxs)("div",{style:{flexGrow:1,flexBasis:0,textAlign:"center"},children:[Object(C.jsx)("small",{style:{color:"#f90"},children:"\u0e20\u0e32\u0e29\u0e35"}),Object(C.jsx)("br",{}),Object(C.jsxs)("b",{children:[G(Math.ceil(F))," \u0e3f"]})]})]})]})]),P=Object(k.a)(T,2),L=P[0];return P[1],Object(v.useEffect)((function(){1==O&&0==r&&s(1e5),1==O&&0==x&&j(6e4),R(4==O)}),[O,x,r]),Object(C.jsxs)(H,{children:[Object(C.jsx)(D,{currentStep:O,totalSteps:L.length,style:{marginBottom:"20px"}}),Object(C.jsx)(J,{children:Object(C.jsx)(z,{income:n,expense:r,allowance:x,taxBrackets:A,isPullTax:N,setPullTax:w,enableTransition:u,isActivateTax:S})}),Object(C.jsxs)(U,{children:[Object(C.jsx)(q,{children:L.map((function(t,e){return Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(Z,{status:Math.sign(e-O),children:t})})}))}),Object(C.jsxs)("div",{style:{display:"flex",marginTop:"20px",gap:"20px"},children:[Object(C.jsx)(Q,{style:{flexGrow:1,flexBasis:0,textAlign:"center"},onClick:function(){return p(Math.max(O-1,0))},disabled:0===O,secondary:!0,children:"\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a"}),Object(C.jsx)(Q,{style:{flexGrow:1,flexBasis:0,textAlign:"center"},onClick:function(){return p(Math.min(O+1,L.length-1))},disabled:O===L.length-1,children:"\u0e15\u0e48\u0e2d\u0e44\u0e1b"})]})]})]})},W=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,123)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,i=e.getLCP,r=e.getTTFB;n(t),a(t),c(t),i(t),r(t)}))};I.a.render(Object(C.jsx)(N.a.StrictMode,{children:Object(C.jsx)(V,{})}),document.getElementById("root")),W()}},[[121,1,2]]]);
//# sourceMappingURL=main.7a62fc6a.chunk.js.map