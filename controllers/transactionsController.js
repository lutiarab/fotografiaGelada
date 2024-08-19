const db = require('../config/db');//importar a conexão com o Banco de Dados

const getAlltramsactions = (req, res) => {
    db.query('SELECT *  FROM transactions', (err, results) => {
        if(err){
            console.error('Erro ao obter transações', err)
            res.status(500).send('Erro ao obter transações');
            return;
        }
        res.json(results);
    })
}

const addTransaction = (req, res) => {
    const {email, senha} = req.body;
    
    //Verificar se a transação ja existe 

    db.query(
        'SELECT * FROM transactions where email = ? AND senha = ? ',
        [email, senha],
        (err, results) =>{
            if(err){
                console.error('Erro ao adicionar transação', err);
                res.status(500).send('Erro ao adicionar transação');
                return;
            }
            if(results.length> 0){
                //se a transação já existe
                res.status(400).send('Transação duplicada')
            }
            
            //Se a transação não existe insere 
            
            db.query(
                `INSERT INTO transactions (email, nome) values 
                (?,?)`,
                [email, senha],
                (err, results) =>{
                    if(err){
                        console.error('Erro ao adicionar transação', err);
                        results.status(500).send('Erro ao adicionar transação');
                        return;
                    }
                    res.status(201).send('Transação bem sucedida')
                }
            );
        }
    )
};

const updateTrasactionPut = (req, res) => {
    const{id} = req.params;
    const {email, nome, } = req.body;
    db.query(
        'UPDATE transactions SET email = ?, nome = ? WHERE id=?',
        [email, nome, id],
        (err,results) => {
            if(err){
                console.error('Erro ao adicionar transação', err);
                results.status(500).send('Erro ao adicionar transção');
                return;
            }

            if(results.affectedRows===0){
                res.status(404).send('Transação não encontrada');
                return;
            }

            res.send('Transação adicionada com sucesso');
        }
       
    );
};


//função para atualizar uma trasação existente (substituição completa)
const updateTrasactionPatch = (req,res) => {
    const{id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for(const[key,value] of Object.entries(fields)){
        query.push(`${key}= ?`);
        values.push(value);

    }
    values.push(id);
    db.query(
        `UPDATE transactions SET ${query.join(',')} WHERE id = ?`,
        values,
        (err,results) => {
            if(err){
                console.error('Erro ao atualizar transação', err);
                res.status(500).send('Erro ao adicionar transação');
                return;
            }

            if(results.affectedRows===0){
                res.status(404).send('Transação não encontrada');
                return;
            }

            res.send('Transação atualizada com sucesso');
        } 
    );
};

const deleteTransactions = (req,res) =>{
    const{id} = req.params;
    db.query('DELETE FROM transactions WHERE id = ?',[id],
        (err,results) => {
            if(err){
                console.error('Erro ao atualizar transação', err);
                res.status(500).send('Erro ao adicionar transação');
                return;
            }
    
            if(results.affectedRows===0){
                res.status(404).send('Transação não encontrada');
                return;
            }
    
            res.send('Transação atualizada com sucesso');
        } 
    );
    }
    

module.exports = {
    getAlltramsactions,
    addTransaction,
    updateTrasactionPut,
    updateTrasactionPatch,
    deleteTransactions
};