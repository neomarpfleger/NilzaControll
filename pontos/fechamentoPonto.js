const btnFecharPonto = document.querySelector(".btnFecharPonto");
const controlePonto = document.getElementById("controlePonto");

btnFecharPonto.addEventListener("click", function() {
    controlePonto.innerHTML = `
    <div id="fechamentoPonto">
      <div id="inputDates">
        <button type="button" id="btnConsultar">Consultar Atestados</button>
        <div class="date">
          <label type="text" for="inicioDaBusca">Inicio</label>
          <input type="date" name="inicioDaBusca" id="inicioDaBusca" />
        </div>
        <div class="date">
          <label type="text" for="inicioDaBusca">Final</label>
          <input type="date" name="finalDaBusca" id="finalDaBusca" />
        </div>
    </div>
  `
})