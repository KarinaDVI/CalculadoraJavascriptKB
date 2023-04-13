class Calculadora{
    
    constructor(){

        this.cadenaCalculo = ""
        this.numeros=["1","2","3","4","5","6","7","8","9","0"]

        this.operations =["+","-","/",".","(",")","x","n!","x^2","x^3","10^x","sin","cos","tan","x^-1",
        "sqrt","log","ln","e","π","%"]

        this.fancy=["x","n!","^2","^3","10^","sin","cos","tan","^(-1)",
    "^(1/2)","log","ln","e","π","%"]

        this.changer=["*","this.nFactorial","**2","**3","10**","Math.sin",
        "Math.cos","Math.tan","**(-1)","**(1/2)","Math.log10","Math.log",
        "Math.E","Math.PI","*(1/100)"]

        this.commands =["CE","C","M+","M-","Del","=","MC","MR","MS","ANS","ON"]
        this.positionKeys =["▲","▼","◄","►"]
        this.button = document.querySelector("button")
        this.display=document.getElementById("displayBox");
        this.displayC=document.getElementById("displayCalc");
        this.displayInfo=document.getElementById("displayInfo");
        this.cont=this.displayC.value.length
        this.solved=0;
        this.memoryChain=0
        this.pos=0;
        this.calcStore=[]
        this.ansStore=[]

    }

   
    //Identifica la tecla clickada y almacena en un String la cadena de cálculo
    //Devuelve un mensaje a la consola
    //Muestra en el display la cadena de texto que se va formando.
    //Si es un comando deriva a otras funciones de ejecución de comando


    identificarTecla(text){
        let message=""
        if(this.numeros.includes(text)){
           
            this.displayC.value = this.insert(text);

            /* this.escribir("displayC.value en identificarTecla: "+this.displayC.value)
            message="es numero" */
        }
        else if(this.operations.includes(text)){
            this.tipoOperacion(text)
            /* message="es operacion" */
        }
        else if(this.commands.includes(text)){
            this.tipoComando(text);
           /*  message="es comando" */
        }
        else if(this.positionKeys.includes(text)){
            this.tipoPosition(text)
            /* message="cambia cursor de lugar" */
        }
        else{
            message="error"
        }
        this.displayC.focus()
        this.displayC.setSelectionRange(this.cont, this.cont)
        return message
        }
//Inserta valores en la cadena del display
        insert(char) {

            let added =char//text
            let start = this.cont
            let end = this.displayC.value.length
            
            let chain1 = this.displayC.value.substring(0, start)
            let chain2 = this.displayC.value.substring(start, end)
            this.displayC.value = chain1 + added + chain2
             
            /* this.escribir("chain1: "+chain1+" added: "+added+" "+" chain2: "+chain2 + " cont value: "+this.cont+ " added length "+added.length) */           
            this.cont+=added.length
            return this.displayC.value
          } 
    /*Cambia los values de las teclas por expresiones matematicas y las inserta
    en la cadena de calculo*/
          changeElement(texto) {
            /* this.escribir(texto) */
            for (let i = 0; i < this.fancy.length; i++) {
                let busqueda = this.fancy[i];
                texto = texto.replace(busqueda, this.changer[i]);
                /* this.escribir("changeElement "+i+" cadena: "+texto) */
              }
              /* this.escribir("changeElement cadena: "+texto) */
              return texto;
            }
        

    //Calcula evaluando la cadena de calculo
        calcular(){
             try { 
                //this.cadenaCalculo = this.displayC.value
                
                this.cadenaCalculo=this.changeElement(this.displayC.value.toString())
                //this.cadenaCalculo="2*2-1"
                let result= parseFloat(eval(this.cadenaCalculo == "" ? 0 :this.cadenaCalculo));
                this.ansStore.push(result)
                this.calcStore.push(this.display.value)
                this.display.value = "";
                this.display.value = result;
                this.solved = result;
                for(let calc in this.calcStore){
                    this.escribir(calc)
                }
                for(let ans in this.ansStore){
                    this.escribir(ans)
                }
                /* this.escribir(result) */
             return result
            } catch (error) {
                return this.display.value="Error"

            } 
        }

    tipoComando(text){
        switch(text){
            case "=":
                this.calcular();
                break

            case "CE":
                this.display.value="";
                this.cadenaCalculo="";
                break

            case "C":
                this.display.value="";
                this.cadenaCalculo="";
                this.displayC.value="";
                this.displayInfo.value=""
                this.cont=0;
                this.up=0;
                this.down=0;
                this.calcStore=[];
                this.ansStore=[];
                break

            case "Del":
                this.erase()
                
                break

            case "M+":
                this.memoryChain+=this.calcular()
                this.displayInfo.value="M+"
                break

            case "M-":
                this.memoryChain-=this.calcular()
                this.displayInfo.value="M-"
                break

            case "MR":
                this.display.value=this.memoryChain;
                this.displayInfo.value="MR"
                break

            case "MC":
                this.memoryChain=0;
                this.displayInfo.value=""
                break

            case "MS":
                this.memoryChain=this.display.value;
                this.displayInfo.value="MS"
                break
            case "ANS":
                this.displayC.value+=this.solved
                this.solved==""?this.display.value=0:this.display.value=this.solved
                break
            default:
                this.display.value="0";
            
        }
    }
    tipoOperacion(text){
        switch(text){
            case "":
                this.cadenaCalculo=this.display.value
                break
            case "x^2":
                this.displayC.value=this.insert(`^2`)
                break

            case "x^3":
                this.displayC.value=this.insert(`^3`)
                break

            case "10^x":
                this.displayC.value=this.insert("10^")
                break

    /**/    case "sin":
                this.displayC.value=this.insert(`sin`)
                this.displayInfo.value+="RAD"
            break

            case "cos":
                this.displayC.value=this.insert(`cos`)
                this.displayInfo.value+="RAD"
                break

            case "tan":
                this.displayC.value=this.insert(`tan`)
                this.displayInfo.value+="RAD"
                break 
                
            case "x^-1":
                this.displayC.value=this.insert("^(-1)")
                break

            case "sqrt":
                this.displayC.value=this.insert(`^(1/2)`)
                break

            default:
                this.displayC.value=this.insert(text)
            
        }
    }
    tipoPosition(text){
        switch(text){
            case "◄":
                this.toLeft();
            break
            case "►":
                this.toRight();
            break
            case "▼":
                this.toBottom();
            break
            case "▲":
                this.toUp();
            break
        }
        /* this.escribir(this.cadenaCalculo) */
    }
     erase(){
         let start = this.cont
        let end = this.displayC.value.length
        let chain1 
        let chain2 
        let chain3  

        if(this.cont===this.displayC.value.length){
            this.displayC.value =this.displayC.value.slice(0,-1)
        }
        else if(this.cont===0){
            this.displayC.value =this.displayC.value
            this.displayC.value.length==1?this.cont=1:this.cont=0
            /* this.escribir("cont value: "+this.cont) */

        }else{
            chain1 = this.displayC.value.substring(0, (start-1))
            chain2 = this.displayC.value.substring(start-1, (start))
            chain3 = this.displayC.value.substring(start,end)
            this.displayC.value = chain1 + chain3
            /* this.escribir("chain1: "+chain1+" chain2: "+chain2+" "+"chain3: "+chain3+" cont: "+this.cont) */
        
        } 
        this.cont>0?this.cont--:this.cont=0
        this.displayC.focus()
        this.displayC.setSelectionRange(this.cont, this.cont)
        
        return this.displayC.value
    } 


     //Al hacer click posiciona el cursor a la izquierda
    /* Falta la funcionalidad de insertar numeros en la posición en la función
    de this.identificarTecla y this.calcular, ver métodos setRangeText() y
    setSelectionRange() */
    toLeft(){
        this.displayC.focus()
        this.cont<0?this.cont=0:this.cont--;
        this.displayC.setSelectionRange(this.cont, this.cont);

        /* return this.escribir("izquierda"+" cont: "+this.cont) */
    }

     //Al hacer click posiciona el cursor a la derecha
     //Idem funcionalidad a toLeft()
    toRight(){
        this.displayC.focus()
        this.cont>=this.displayC.value.length?this.cont=this.displayC.value.length:this.cont++
        this.displayC.setSelectionRange(this.cont, this.cont);
        /*return this.escribir("derecha"+" cont: "+this.cont)*/
    }
    //Arreglar Este. Enlaza desde calcular()
    toUp(){
        
        if(this.pos>-1 && this.pos<=this.calcStore.length){
            
            !this.calcStore[this.pos]==undefined?this.displayC.value=this.calcStore[this.pos]:this.displayC.value=0;
            !this.ansStore[this.pos]==undefined?this.display.value=this.ansStore[this.pos]:this.display.value=0
            this.pos++;
            this.escribir(this.pos)
        }else{
            this.pos=0;
            this.escribir(this.pos)
        }
    }
    //Arreglar este. Enlaza desde calcular()
    toBottom(){
        
        if(this.pos>0 && this.pos<=this.calcStore.length){
            !this.calcStore[this.pos]==undefined?this.displayC.value=this.calcStore[this.pos]:this.displayC.value=0;
            !this.ansStore[this.pos]==undefined?this.display.value=this.ansStore[this.pos]:this.display.value=0
            this.pos--;
            this.escribir(this.pos) 
        }
    }

    //Factorial
    nFactorial(n){
        if(n==1 || n==0){
            return 1 
        }else{
            return n*this.nFactorial(n-1)
        }
    }

    //Función para escribir mensajes
    escribir(texto){
        return console.log("operacion en : "+texto);
    }
    //Se ejecuta cuando la calculadora es "encendida"
    active(cond){
        
        this.display.value="";
        this.cadenaCalculo="";
        this.displayC.value="";
        this.displayInfo.value=""
        this.cont=0;
        this.solved="";
        this.memoryChain=0;
        let nodes=document.querySelectorAll("thead,thead tr,thead tr th, input")
        cond==true?
        nodes[0].classList.add("thead-active"):
        nodes[0].classList.remove("thead-active")
        nodes.forEach((node) => {
           cond==true?
           node.classList.add("displayActive"):
           node.classList.remove("displayActive");
           

    });
        
    }

   
    
}

const calculadora = new Calculadora();

window.addEventListener('load', function() {
    let switcher=false
    calculadora.active(switcher)
document.addEventListener("click",(e)=>{
    
    if(e.target.textContent=="ON"){
        switcher==false?switcher=true:switcher=false
        calculadora.active(switcher)
    }
    if(switcher==true && e.target.tagName==='BUTTON' && e.target.textContent!==undefined){
        let tecla=e.target
        calculadora.identificarTecla(tecla.textContent)

    }else{(calculadora.escribir("no es tecla"))
    }

    })
})
