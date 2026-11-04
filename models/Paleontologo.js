import conexao from "../config/conexao.js";
const PaleontologoSchema = new conexao.Schema({
  nome: { type: String,required: true},
  nascimento: {type: Date,required: true},
  descoberta:{type:String, required:false},

});
const Paleontologo = 
conexao.model("Paleontologo", PaleontologoSchema);
export default Paleontologo;