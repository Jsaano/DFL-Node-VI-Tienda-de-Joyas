const {Pool} = require('pg');
const format = require('pg-format');

const pool = new Pool({

    host : 'localhost',
    user : 'postgres',
    password : 'admin',
    database : 'joyas',
    port : '5433'
});

const getInventario = async ({limits = 5 , orderBy = "id_asc", page = 1 }) => {
   try{ 
    if (page <= 0) {
        page = 1;
    }
    const [campo, orden] = orderBy.split("_");
    const offset = (page - 1) * limits;
    const consulta = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, orden, limits, offset);
    const {row : inventario } = await pool.query(consulta);
    return inventario;
}
    catch (error) {
    console.log(error);
    res.send(error.message);
}
};

const getInventarioFiltros = async ({precio_max , precio_min , caterogia, metal}) => {
    try{
    let filtro = [];
    if (precio_max) {
        filtro.push(format('precio <= %s', precio_max));
    }
    if (precio_min) {
        filtro.push(format('precio >= %s', precio_min));
    }
    if (categoria) {
        filtro.push(format('categoria = %s', categoria));
    }
    if (metal) {
        filtro.push(format('metal = %s', metal));
    }
    const consulta = format('SELECT * FROM inventario WHERE %s', filtro.join(' AND '));
    const {rows : inventario} = await pool.query(consulta);
    return inventario;
}
    catch (error) {
    console.log(error);
    res.send(error.message);
}
};


module.exports = { getInventario , getInventarioFiltros};
