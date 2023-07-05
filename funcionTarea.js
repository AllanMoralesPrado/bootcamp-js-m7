const Tarea = require("./tarea");
(async function () {
	// const tarea = new Tarea("Gym", "Ir al gimnasio con discriminacion extrema", false, 3);
	// // console.log(tarea);
	// // tarea.insert();
	// console.log(tarea.allData());
	// // // //*Buscando al tarea ID 1
	// const tarea1 = await Tarea.Find(5);
	// console.log(tarea1.allData());

	// //*Actualizando al tarea ID 2. Los valores "null" no se actualizan
	//Tarea.Actualizar(3, null, null, false, 16).then((res) => console.log(res));
    Tarea.Delete(20).then(res => console.log(res));
	//Tarea.All().then((res) => console.table(res));
})();
