import {BarterSwapDB} from '../src/mongodb/client'

let DB = new BarterSwapDB()

class StaticMem {  
    static num:number; 
    
    static disp() { 
       console.log("num : "+ StaticMem.num) 
    } 
 } 
  
 StaticMem.num = 12     //
 StaticMem.disp()       // 