function showPage(id){
  document.querySelectorAll(".page").forEach(p=>{
    p.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

// TYPE EFFECT
const el=document.querySelector(".type");
const text=el.textContent;
el.textContent="";
let i=0;
setInterval(()=>{
  if(i<text.length) el.textContent+=text[i++];
},60);

// LOAD JSON
fetch("data.json")
  .then(r=>r.json())
  .then(data=>{
    const grid=document.getElementById("scriptsGrid");
    data.scripts.forEach(s=>{
      const div=document.createElement("div");
      div.innerHTML=`<b>${s.name}</b><br>${s.code}`;
      grid.appendChild(div);
    });
  });

