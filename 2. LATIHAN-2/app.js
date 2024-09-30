async function runFectch() {
  try {
    const response = await fetch("http://127.0.0.1:3000/DATA/menu.json");
    if (!response.ok) {
      throw new Error("Nertwork Response is Protblem" + response.statusText);
    }
    const data = await response.json();
    await updateMenu(data.menu);
  } catch (err) {
    console.log(err);
  }
}

function updateMenu(allMenu) {
  let cards = "";
  allMenu.forEach((menu) => {
    cards += menuData(menu);
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = cards;
  });
}

function menuData(menu) {
  const origin = "http://127.0.0.1:3000";
  return `<div class="col-md-4">
            <div class="card">
              <img src="${origin}${menu.gambar}" class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">${menu.nama}</h5>
                  <h6 class="card-title">Rp. ${menu.harga}</h6>
                    <p class="card-text">
                      ${menu.deskripsi}
                    </p>
                </div>
              </div>
            </div>`;
}

runFectch();
