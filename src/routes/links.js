const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/add', (req, res) =>{
    res.render('links/add');
});

router.post('/add', async (req, res) =>{
    const { title, url, description } = req.body;
    // we create a object with the attributes for sql
    const newLink = {
        title,
        url,
        description
    };
    await  pool.query('insert into links set? ', [newLink]); // we insert into database passs the object
    req.flash('success', 'link agregado');
    res.redirect('/links');
});



// route for watch the links in database
router.get('/', async (req, res) => {
    const obtenido = await  pool.query('select *  from  links');
    console.log(obtenido);
    res.render('links/lista', {links:obtenido});
});


//this route make the function for delete a element in database
router.get('/delete/:id', async (req, res) => {
    console.log(req.params.id);
    await pool.query('delete from links where id = ?', [req.params.id]);
    res.redirect('/links');
});

router.get('/update/:id',  async (req, res) => {
    const {id} = req.params;
    const element = await pool.query('select * from links where id = ?', [id]);
    res.render('links/edit', {links:element[0]});
});


router.post('/editing/:id', async (req, res) =>{
    const {id} = req.params;
    const {title, url, description} = req.body;
    const editLink = {
        title,
        url,
        description
    };
    await pool.query('update links set ? where id = ?', [editLink, id]);
    res.redirect('/links');
});





module.exports = router;