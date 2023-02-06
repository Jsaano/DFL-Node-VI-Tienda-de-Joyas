const express = require('express');
const app = express();

app.listen (3000, console.log ('Server on port 3000'));

app.use ((req, res, next) => {
    const parametros = req.query;
    const url = req.url;
    console.log (
        `Se ha realizado una petición a la url ${url} con los siguientes parámetros: ${JSON.stringify(parametros)}`
    );
    next();
});

const { getInventario , getInventarioFiltros} = require('./consultas.js');

app.get ('/joyas', async (req, res) => {
    try {
        const inventario = await getInventario(req.query);
        res.json(
        {
            "Total de joyas":  + inventario.length ,
            "Resultado": inventario
        }
            );
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

app.get ('/joyas/filtros', async (req, res) => {
    try {
        const inventario = await getInventarioFiltros(req.query);
        res.json(inventario);
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    } 
});
