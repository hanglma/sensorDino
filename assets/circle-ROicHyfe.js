var M=Object.defineProperty;var v=(t,s,i)=>s in t?M(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i;var c=(t,s,i)=>(v(t,typeof s!="symbol"?s+"":s,i),i);import"./style-cvTQtu5h.js";let o=document.querySelector("canvas");const Y=t=>{t.width=window.innerWidth,t.height=window.innerHeight*.9};Y(o);window.addEventListener("resize",()=>{Y(o),w(175)});o.setAttribute("style","background-color: #333333");const X=["#267365","#F2CB05","#F29F05","#F29F05","#F23030"];function y(){const t=Math.floor(Math.random()*X.length);return X[t]}const u={x:0,y:0};o.addEventListener("mousemove",t=>{u.x=t.x,u.y=t.y-window.innerHeight*.1});const g=o.getContext("2d");class F{constructor(s,i,h,n,r,e,a,m,f){c(this,"corX");c(this,"corY");c(this,"radius");c(this,"dirX");c(this,"dirY");c(this,"color");c(this,"context");c(this,"canvasWidth");c(this,"canvasHeight");this.corX=s,this.corY=i,this.radius=h,this.dirX=n,this.dirY=r,this.color=e,this.context=a,this.canvasWidth=m,this.canvasHeight=f}draw(){this.context.beginPath(),this.context.arc(this.corX,this.corY,this.radius,0,Math.PI*2,!1),this.context.fillStyle=this.color,this.context.fill(),this.context.strokeStyle="#000000",this.context.lineWidth=5,this.context.stroke()}update(){const s=u.x-this.corX,i=u.y-this.corY,h=Math.sqrt(s*s+i*i);if(h<80){const n=Math.atan2(i,s),r=Math.min(h/20,5),e=this.corX+Math.cos(n)*r,a=this.corY+Math.sin(n)*r;this.corX=e,this.corY=a}else this.corX+=this.dirX,this.corY+=this.dirY,(this.corX+this.radius>this.canvasWidth||this.corX-this.radius<0)&&(this.dirX=-this.dirX),(this.corY+this.radius>this.canvasHeight||this.corY-this.radius<0)&&(this.dirY=-this.dirY);(this.corX<0||this.corX>o.width||this.corY<0||this.corY>o.height)&&(this.corX=100,this.corY=100),this.draw()}}let l;const d=50;function w(t){l=[],l.length=0;for(let s=0;s<t;s++){const i=Math.random()*10+5,h=Math.random()*(o.width-2*i-2*d)+i+d,n=Math.random()*(o.height-2*i-2*d)+i+d,r=(Math.random()-.5)*2,e=(Math.random()-.5)*2,a=y(),m=new F(h,n,i,r,e,a,g,o.width,o.height);l.push(m)}x()}w(175);function x(){g.clearRect(0,0,o.width,o.height);for(const t of l)t.update();requestAnimationFrame(x)}
