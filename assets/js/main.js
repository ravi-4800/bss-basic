const dataPath = "assets/data/branches.json";
const fallbackData = {
  schoolGroup: {
    name: "Babu Surendra Singh School Group",
    tagline: "Learning today, leading tomorrow.",
    email: "info@brightfuture.edu",
    phone: "+91 99999 10000",
    address: "Central Office, MG Road, Bengaluru"
  },
  branches: [
    {
      id: "bss-inter-college",
      name: "Babu Surendra Singh Inter College",
      shortName: "BSS Inter College",
      city: "Bengaluru",
      principal: "Mrs. Neha Sharma",
      timings: "8:00 AM - 3:00 PM",
      phone: "+91 99999 11001",
      email: "greenvalley@brightfuture.edu",
      address: "12, Green Park Main Road, Bengaluru",
      mapLink: "https://maps.google.com/?q=12+Green+Park+Main+Road+Bengaluru",
      overview: "This branch focuses on academics, science labs, co-curricular clubs, and strong teacher-student mentoring.",
      thumbnail: "assets/images/branches/green-valley/thumb.svg",
      gallery: [
        { src: "assets/images/branches/green-valley/campus-front.svg", alt: "Sample campus image for Babu Surendra Singh Inter College" },
        { src: "assets/images/branches/green-valley/science-lab.svg", alt: "Sample science lab image for Babu Surendra Singh Inter College" },
        { src: "assets/images/branches/green-valley/library.svg", alt: "Sample library image for Babu Surendra Singh Inter College" }
      ]
    },
    {
      id: "jai-maa-saraswati-public-school",
      name: "Jai Maa Saraswati Public School",
      shortName: "Jai Maa Saraswati",
      city: "Mysuru",
      principal: "Mr. Arjun Reddy",
      timings: "8:30 AM - 3:30 PM",
      phone: "+91 99999 12002",
      email: "riverdale@brightfuture.edu",
      address: "45, Lake View Street, Mysuru",
      mapLink: "https://maps.google.com/?q=45+Lake+View+Street+Mysuru",
      overview: "This branch offers digital classrooms, language labs, and active sports programs for holistic growth.",
      thumbnail: "assets/images/branches/riverdale/thumb.svg",
      gallery: [
        { src: "assets/images/branches/riverdale/campus-front.svg", alt: "Sample campus image for Jai Maa Saraswati Public School" },
        { src: "assets/images/branches/riverdale/computer-lab.svg", alt: "Sample computer lab image for Jai Maa Saraswati Public School" },
        { src: "assets/images/branches/riverdale/playground.svg", alt: "Sample playground image for Jai Maa Saraswati Public School" }
      ]
    },
    {
      id: "kinder-garten-public-school",
      name: "Kinder-Garten public school",
      shortName: "Kinder-Garten",
      city: "Hubballi",
      principal: "Mrs. Kavya Nair",
      timings: "7:45 AM - 2:45 PM",
      phone: "+91 99999 13003",
      email: "sunrise@brightfuture.edu",
      address: "8, Teachers Colony, Hubballi",
      mapLink: "https://maps.google.com/?q=8+Teachers+Colony+Hubballi",
      overview: "This branch is known for foundational learning, art activities, and parent engagement initiatives.",
      thumbnail: "assets/images/branches/sunrise/thumb.svg",
      gallery: [
        { src: "assets/images/branches/sunrise/campus-front.svg", alt: "Sample campus image for Kinder-Garten public school" },
        { src: "assets/images/branches/sunrise/art-room.svg", alt: "Sample art room image for Kinder-Garten public school" },
        { src: "assets/images/branches/sunrise/auditorium.svg", alt: "Sample auditorium image for Kinder-Garten public school" }
      ]
    }
  ]
};

async function loadData() {
  try {
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error("Unable to load branch data.");
    }
    return response.json();
  } catch (error) {
    // Fallback keeps the site functional when opened directly via file://.
    console.warn("Falling back to local branch dataset.", error);
    return fallbackData;
  }
}

function setActiveNav() {
  const page = globalThis.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === page) {
      link.classList.add("active");
    }
  });
}

function branchCard(branch) {
  return `
    <article class="card reveal">
      <img src="${branch.thumbnail}" alt="${branch.name} building photo" loading="lazy">
      <div class="card-body">
        <h3>${branch.name}</h3>
        <p class="meta">${branch.city}</p>
        <p>${branch.overview}</p>
        <a class="btn btn-outline" href="branch.html?id=${branch.id}">View Details</a>
      </div>
    </article>
  `;
}

function renderBranches(branches, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  container.innerHTML = branches.map(branchCard).join("");
}

function renderHomeHighlights(branches) {
  const highlights = branches.slice(0, 3);
  renderBranches(highlights, "homeBranchCards");
}

function renderBranchPage(branches) {
  const params = new URLSearchParams(globalThis.location.search);
  const branchId = params.get("id");
  const contentEl = document.getElementById("branchPageContent");
  if (!contentEl) return;

  const branch = branches.find((item) => item.id === branchId) || branches[0];
  if (!branch) {
    contentEl.innerHTML = "<p>No branch data found.</p>";
    return;
  }

  const gallery = branch.gallery
    .map(
      (image) => `
      <figure class="reveal">
        <img src="${image.src}" alt="${image.alt}" loading="lazy">
        <figcaption>${image.alt}</figcaption>
      </figure>
    `
    )
    .join("");

  contentEl.innerHTML = `
    <section>
      <div class="container branch-header">
        <article>
          <h1>${branch.name}</h1>
          <p class="section-subtitle">${branch.overview}</p>
          <a class="btn btn-primary" href="${branch.mapLink}" target="_blank" rel="noopener noreferrer">Open Map</a>
        </article>
        <aside class="branch-details">
          <h2>Branch Information</h2>
          <ul>
            <li><strong>City:</strong> ${branch.city}</li>
            <li><strong>Principal:</strong> ${branch.principal}</li>
            <li><strong>Timings:</strong> ${branch.timings}</li>
            <li><strong>Phone:</strong> <a href="tel:${branch.phone.replaceAll(" ", "")}">${branch.phone}</a></li>
            <li><strong>Email:</strong> <a href="mailto:${branch.email}">${branch.email}</a></li>
            <li><strong>Address:</strong> ${branch.address}</li>
          </ul>
        </aside>
      </div>
    </section>
    <section>
      <div class="container">
        <h2 class="section-title">Campus Gallery</h2>
        <div class="gallery">${gallery}</div>
      </div>
    </section>
  `;

  document.title = `${branch.shortName} | Babu Surendra Singh School Group`;
}

function renderFooterInfo(schoolGroup) {
  const footerText = document.getElementById("footerSchoolText");
  if (footerText) {
    footerText.textContent = `${schoolGroup.name} | ${schoolGroup.phone} | ${schoolGroup.email}`;
  }
}

function fillBranchSelect(branches) {
  const select = document.getElementById("branchSelect");
  if (!select) return;

  const options = branches
    .map((branch) => `<option value="${branch.id}">${branch.name}</option>`)
    .join("");
  select.insertAdjacentHTML("beforeend", options);
}

function enableRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

async function init() {
  setActiveNav();

  try {
    const { schoolGroup, branches } = await loadData();
    renderFooterInfo(schoolGroup);
    renderBranches(branches, "branchCards");
    renderHomeHighlights(branches);
    renderBranchPage(branches);
    fillBranchSelect(branches);
    enableRevealAnimations();
  } catch (error) {
    console.error("Unable to initialize site data.", error);
    const errorBlocks = document.querySelectorAll("[data-error-target]");
    errorBlocks.forEach((el) => {
      el.textContent = "Could not load school data. Please try again later.";
      el.classList.remove("hidden");
    });
  }
}

init().catch((error) => {
  console.error("Unexpected initialization error.", error);
});
