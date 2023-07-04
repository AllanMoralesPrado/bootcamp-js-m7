const http = require('http')
const { getDate, insertar, consultar, editar, eliminar } = require('./querys')

http.createServer(async (req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(url.searchParams);

    if(req.url.startsWith('/tareas') && req.method == 'GET'){
        ruta = 'usuarios'
        consultar(ruta)
        // const serverInfo = await getDate();
		// res.end(JSON.stringify(serverInfo));
        
    };

    if(req.url.startsWith('/usuarios') && req.method == 'GET'){
        // const serverInfo = await getDate();
		// res.end(JSON.stringify(serverInfo));
        
    };

    if(req.url.startsWith('/') && req.method == 'POST'){

    };

    if(req.url.startsWith('/') && req.method == 'DELETE'){

    };

    if(req.url.startsWith('/') && req.method == 'UPDATE'){

    };


}).listen(3000, () => {
    console.log('Server running on port 3000');
});