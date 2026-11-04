import express from 'express'
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

import Especie from './models/Especie.js'
import Dinossauro from './models/Dinossauro.js'
import Paleontologo from './models/Paleontologo.js'
import req from 'express/lib/request.js';

app.get('/', (req, res) => {
    res.render("index");
})
app.post('/dinossauro/add', async (req, res) => {
    const {nome,especie,peso,altura,anoDescoberta,dieta,descricao} = req.body
     await Dinossauro.create({nome,especie,peso,altura,anoDescoberta,dieta,descricao});
    res.render("dinossauro/add");
})
app.get('/dinossauro', async (req, res) => {
    const dinossauros = await Dinossauro.find()
    res.render("dinossauro/lst", {dinossauros});
})
app.get('/dinossauro/add', async(req, res) =>{
    res.render("dinossauro/add")
})
app.get('/dinossauro/upd/:id', async (req, res) => {
const dinossauro = await Dinossauro.findById(req.params.id)
res.render("dinossauro/upd",{dinossauro})
})
app.post('/dinossauro/upd/:id', async (req,res) => {
const {nome,especie,descricao,altura,peso,dieta,anoDescoberta} = req.body
await Dinossauro.findByIdAndUpdate(req.params.id,{nome,especie,descricao,altura,peso,anoDescoberta,dieta})
const dinossauros = await Dinossauro.find()
res.render("dinossauro/lst", {dinossauros})
})
app.get('/dinossauro/del/:id', async (req,res) => {
await Dinossauro.findByIdAndDelete(req.params.id)
const dinossauros = await Dinossauro.find()
res.render("dinossauro/lst",{dinossauros})
})



//especie
app.get('/especie',  async (req, res) => {
 const especies = await Especie.find()
 res.render("especie/lst", {especies});
})
app.get('/especie/del/:id',  async (req, res) => {
 await Especie.findByIdAndDelete(req.params.id)
 const especies = await Especie.find()
 res.render("especie/lst", {especies});
})
app.get('/especie/add',  (req, res) => {
  res.render("especie/add");
})
app.get('/especie/upd/:id', async (req, res) => {
    const especie = await Especie.findById(req.params.id)
    res.render("especie/upd", {especie}); 
})
app.post('/especie/add',  async (req, res) => {
  const {nome,periodo} = req.body
 await Especie.create({nome, periodo})
  res.render("especie/add");
})
app.post('/especie/upd/:id',  async (req, res) => {
  const {nome,periodo} = req.body
 await Especie.findByIdAndUpdate(req.params.id,{nome, periodo})
 const especies = await Especie.find()
  res.render("especie/lst", {especies});
})


//paleontologo
app.get('/paleontologo', async (req, res) => {
    const paleontologos = await Paleontologo.find();
    console.log(paleontologos);
    res.render("paleontologo/lst", {paleontologos});
})
app.get('/paleontologo/add', async (req, res) => {
   res.render("paleontologo/add");
})
app.post('/paleontologo/add', async (req, res) => {
    const {nome,nascimento,descoberta} = req.body
    await Paleontologo.create({nome,nascimento,descoberta})
    res.render("paleontologo/add");
})
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});