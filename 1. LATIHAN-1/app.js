async function runFectch() {
  try {
    const response = await fetch("http://127.0.0.1:3000/DATA/menu.json");
    if (!response.ok) {
      throw new Error("Nertwork Response is Protblem" + response.statusText);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
runFectch();
