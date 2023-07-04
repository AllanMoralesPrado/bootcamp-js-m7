const Usuario = require("./usuario");
(async function () {
    // const usuario = new Usuario("Natalia", "natalypena@gmail.com");
    //console.log(usuario);
    //usuario.insert();
    // console.log(usuario.allData());
	// //*Buscando al usuario ID 1
    // const usuario1 = await Usuario.Find(1);
	// console.log(usuario1.allData());

	// //*Actualizando al usuario ID 2. Los valores "null" no se actualizan
	//Usuario.Actualizar(3, null, "asdsadsa@gmail.com").then((res) => console.log(res));

    Usuario.All().then(res => console.table(res));
})();
