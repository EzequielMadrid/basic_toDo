const mission = document.getElementById("mission-name");
const allMissions = document.getElementById("missions");
const modal = document.getElementById("modal");
const editedMission = document.getElementById("edit-mission");

function addMission() {
  //console.log(mission.value);

  if (mission.value.trim() === "") {
    Swal.fire("Fatal", "Guarde con un nombre por favor.", "error");
    return;
  }

  if (mission.value.length >= 30) {
    Swal.fire(
      "Advertencia",
      "El nombre NO debe pasar los 30 dígitos.",
      "warning"
    );
    return;
  }

  const existingMissions = document.querySelectorAll("#missions p");
  //console.log(existingMissions);
  for (const x of existingMissions) {
    if (x.innerText === mission.value.trim()) {
      Swal.fire(
        "Nombre ya existente!",
        "NO puede repetir nombre de las misiones",
        "question"
      );
      return;
    }
  }

  const listMissions = document.createElement("li");
  listMissions.className = "flex flex-col p-2 border-b-2 border-indigo-300";
  const box = document.createElement("div");
  box.className = "flex items-center mb-4 space-x-2";
  box.innerHTML = `
<p id="mission-text">${mission.value}<p/>
<img src="assets/images/logo.jfif" class="w-8 h-8 rounded-full animate-spin"/>
`;
  listMissions.appendChild(box);

  const buttons = document.createElement("div");
  buttons.className = "flex mx-auto space-x-2";
  buttons.innerHTML = `
<button onclick="editMission(this)" class="p-2 rounded-full border-2 border-indigo-900 hover:bg-indigo-900 text-indigo-900 hover:text-indigo-200">Editar</button>
<button onclick="completeMission(this)" class="p-2 rounded-full border-2 border-indigo-900 hover:bg-indigo-900 text-indigo-900 hover:text-indigo-200">Completa</button>
<button onclick="removeMission(this)" class="p-2 rounded-full border-2 border-indigo-900 hover:bg-indigo-900 text-indigo-900 hover:text-indigo-200">Eliminar</button>
`;
  listMissions.appendChild(buttons);

  allMissions.appendChild(listMissions);
  mission.value = "";
}

function editMission(btn) {
  const currentMission =
    btn.parentNode.parentNode.querySelector("#mission-text");
  editedMission.value = currentMission.innerHTML;
  modal.classList.remove("hidden");
  modal.originalMission = currentMission;
}

function savedEditedMission() {
  if (editedMission.value.trim() === "") {
    Swal.fire("Fatal", "Guarde con un nombre por favor.", "error");
    return;
  }

  const existingMissions = document.querySelectorAll("#missions p");
  for (const x of existingMissions) {
    if (
      x.innerText === editedMission.value.trim() &&
      x !== modal.originalMission
    ) {
      Swal.fire(
        "Nombre ya existente!",
        "NO puede repetir nombre de las misiones",
        "question"
      );
      return;
    }
  }

  modal.originalMission.innerText = editedMission.value;
  closeModal();
}

function closeModal() {
  modal.classList.add("hidden");
}

function completeMission(btn) {
  const currentMission =
    btn.parentNode.parentNode.querySelector("#mission-text");
  //console.log(currentMission);
  currentMission.classList.toggle("line-through");
  currentMission.classList.toggle("text-green-900");

  const spinningLogo = currentMission.nextElementSibling.querySelector("img");
  //console.log(spinningLogo)
  spinningLogo.classList.toggle("animate-spin");
}

function removeMission(btn) {
  const missionSelected = btn.parentNode.parentNode;
  missionSelected.remove();
}
