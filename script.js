const anime = [
  {title:"Shadow Warrior", genre:"Action", episodes:12, icon:"SW"},
  {title:"Sky Legends", genre:"Fantasy", episodes:24, icon:"SL"},
  {title:"Ocean Quest", genre:"Adventure", episodes:18, icon:"OQ"},
  {title:"School Days", genre:"Comedy", episodes:12, icon:"SD"},
  {title:"Dragon Realm", genre:"Action", episodes:36, icon:"DR"},
  {title:"Moon Hero", genre:"Fantasy", episodes:13, icon:"MH"}
];

const grid = document.getElementById("animeGrid");
const count = document.getElementById("count");
const search = document.getElementById("search");
const modal = document.getElementById("modal");

function render(list){
  grid.innerHTML = list.map((a,i)=>`
    <article class="card" onclick="openAnime(${i}, ${JSON.stringify(list)})">
      <div class="poster">${a.icon}</div>
      <div class="card-body">
        <h3>${a.title}</h3>
        <div class="meta">${a.genre} • ${a.episodes} Episodes</div>
      </div>
    </article>`).join("");
  count.textContent = `${list.length} titles`;
}

function openAnime(index,list){
  const a=list[index];
  document.getElementById("modalTitle").textContent=a.title;
  document.getElementById("modalInfo").textContent=`${a.genre} • ${a.episodes} episodes • Hindi Dub Demo`;
  modal.classList.remove("hidden");
}
document.getElementById("close").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};

search.addEventListener("input",()=>{
  const q=search.value.toLowerCase();
  render(anime.filter(a=>a.title.toLowerCase().includes(q)||a.genre.toLowerCase().includes(q)));
});
document.querySelectorAll(".chips button").forEach(btn=>{
  btn.onclick=()=>{
    const g=btn.dataset.genre;
    render(g==="All"?anime:anime.filter(a=>a.genre===g));
  };
});
render(anime);
