document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('profiles-container');
  let allProfiles = [];
  let activeIndex = 0;
  const API_KEY = 'hbsl661b2wi59'; // replace if needed

  fetch(`https://sheetdb.io/api/v1/${API_KEY}?limit=50`)
    .then(res => res.json())
    .then(profiles => {
      allProfiles = profiles;
      renderProfiles(allProfiles);
      showProfile(activeIndex);
    });

  function renderProfiles(profiles) {
    profiles.forEach(profile => {
      const profileDiv = document.createElement('div');
      profileDiv.classList.add('profile');

      profileDiv.innerHTML = `
        <div class="slider">
          <video src="${profile.VideoIDs}" autoplay loop muted playsinline></video>
        </div>
        <div class="bio-card">
          <div class="bio-name">${profile.Name}</div>
          <div class="bio-info"><span>📍 Location:</span> ${profile.Location}</div>
          <div class="bio-info"><span>🎂 Age:</span> ${profile.Age}</div>
          <div class="bio-info"><span>💖 Orientation:</span> ${profile.Orientation}</div>
          <div class="fruit-pick">${profile.FruitPick || ''}</div>
        </div>
      `;
      container.appendChild(profileDiv);
    });
  }

  function showProfile(index) {
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });

    // send new height to parent after switching
    const height = document.body.scrollHeight;
    window.parent.postMessage({ type: "setHeight", height: height }, "*");
  }

  document.getElementById('prev-btn').addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + allProfiles.length) % allProfiles.length;
    showProfile(activeIndex);
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % allProfiles.length;
    showProfile(activeIndex);
  });
});
