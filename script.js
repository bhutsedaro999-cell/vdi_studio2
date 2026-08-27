const anime = [
  {
    title: "Solo Leveling",
    genre: "Action",
    icon: "SL",
    episodes: [
      {
        number: 1,
        video: "video1/video1.mp4"
      },
      {
        number: 2,
        video: "videos/episode-2.mp4"
      },
      {
        number: 3,
        video: "videos/episode-3.mp4"
      }
    ]
  }
];

const grid = document.getElementById("animeGrid");
const count = document.getElementById("count");
const search = document.getElementById("search");
const modal = document.getElementById("modal");

let currentList = anime;

function render(list) {
  currentList = list;

  grid.innerHTML = list.map((a, i) => `
    <article class="card" data-index="${i}">
      <img class="poster" src="IMG_20260827_064013.jpg" alt="${a.title}">

      <div class="card-body">
        <h3>${a.title}</h3>
        <div class="meta">
          ${a.genre} • ${a.episodes.length} Episodes
        </div>
      </div>
    </article>
  `).join("");

  count.textContent = `${list.length} titles`;

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      openAnime(Number(card.dataset.index), currentList);
    });
  });
}

function openAnime(index, list) {
  const a = list[index];

  document.getElementById("modalTitle").textContent = a.title;

  document.getElementById("modalInfo").textContent =
    `${a.genre} • ${a.episodes.length} Episodes`;

  const player = document.querySelector(".player");

  player.innerHTML = `
    <div class="episode-buttons">
      ${a.episodes.map((ep, i) => `
        <button onclick="playEpisode(${i}, ${JSON.stringify(a.episodes).replace(/"/g, '&quot;')})">
          Episode ${ep.number}
        </button>
      `).join("")}
    </div>

    <video id="videoPlayer" controls width="100%">
      <source src="${a.episodes[0].video}" type="video/mp4">
      Your browser does not support video.
    </video>
  `;

  modal.classList.remove("hidden");
}

function playEpisode(index, episodes) {
  const video = document.getElementById("videoPlayer");

  video.src = episodes[index].video;
  video.play();
}

document.getElementById("close").onclick = () => {
  modal.classList.add("hidden");

  const video = document.getElementById("videoPlayer");

  if (video) {
    video.pause();
    video.src = "";
  }
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
};

search.addEventListener("input", () => {
  const q = search.value.toLowerCase();

  const filtered = anime.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.genre.toLowerCase().includes(q)
  );

  render(filtered);
});

document.querySelectorAll(".chips button").forEach(btn => {
  btn.addEventListener("click", () => {
    const genre = btn.dataset.genre;

    if (genre === "All") {
      render(anime);
    } else {
      render(anime.filter(a => a.genre === genre));
    }
  });
});

render(anime);
