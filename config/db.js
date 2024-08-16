const mysql = require('mysql2');//importa o pacote mysql2 para conectar ao banco de dados

const db = mysql.createConnection({
    host:process.envDB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

db.connect((err) => {
    if(err){
        console.log('Erro ao conectar o banco de dados.', err);
        return;
    }
    console.log(`Conectar ao Banco de Dados ${process.env.DB_NAME}`);
});

module.exports=db;//Exportar a conexão para ser usada em outros arquivos