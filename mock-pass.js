import bcrypt from "bcrypt";
import {Constantes} from "./utils/Constantes.js";

const constantes=new Constantes();
const hashed=await bcrypt.hash("root", constantes.SALT_ROUNDS);
console.log(hashed);