async function runFectch() {
  try {
    const response = await fetch("http://127.0.0.1:3000/DATA/menu.json");

    // Jika fetch gagal
    if (!response.ok) {
      throw new Error("Nertwork Response is Protblem" + response.statusText);
    }
    const data = await response.json();
    // Tampilkan semua menu saat pertama kali halaman dimuat
    await updateMenu(data.menu);

    // Event listener untuk dropdown kategori
    const categoryMenu = document.getElementById("menu-category");
    categoryMenu.addEventListener("click", async (e) => {
      const category = e.target.dataset.category;
      if (category) {
        // Ganti teks button sesuai kategori yang dipilih
        const dropDownBtn = document.querySelector(".btn-group .btn");
        dropDownBtn.textContent = e.target.textContent;
        // Jalan Function Filter Menu berdasarkan Category
        await filterMenuByCategory(data.menu, category);
      }
    });
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
  return `<div class="col-md-3 mt-3">
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

async function filterMenuByCategory(allMenu, category) {
  let filterMenu;
  if (category === "all") {
    filterMenu = allMenu;
  } else {
    filterMenu = await allMenu.filter(
      (menu) => menu.kategori.toLowerCase() === category.toLowerCase()
    );
  }
  await updateMenu(filterMenu);
}

runFectch();
