class Calculadora{
    
    constructor(){

        this.cadenaCalculo = ""
        this.numeros=["1","2","3","4","5","6","7","8","9","0"]
        this.operations =["+","-","x","/",".","(",")","n!",
                            "x^2","x^3","10^x","sin","cos","tan","x^-1",
                        "sqrt","log","ln","e","π"]
        this.commands =["CE","C","M+","M-","Del","=","MC","MR","MS"]
        this.positionKeys =["<=","=>"]
        this.button = document.querySelector("button")
        this.display=document.getElementById("displayBox");
        this.displayC=document.getElementById("displayCalc");
        this.displayInfo=document.getElementById("displayInfo");
        this.cont=this.displayC.value.length+1

        this.memoryChain=0

    }

   
    //Identifica la tecla clickada y almacena en un String la cadena de cálculo
    //Devuelve un mensaje a la consola
    //Muestra en el display la cadena de texto que se va formando.
    //Si es un comando deriva a otras funciones de ejecución de comando


    identificarTecla(text){
        let message=""
        if(this.numeros.includes(text)){
            this.cadenaCalculo.lenght==0?display.value="":this.display.value;
            this.display.value+=text;
            this.cadenaCalculo+=text;
            this.displayC.value+=text;
            
            this.escribir(this.cadenaCalculo)
            message="es numero"
        }
        else if(this.operations.includes(text)){
            this.tipoOperacion(text)
            message="es operacion"
        }
        else if(this.commands.includes(text)){
            this.tipoComando(text);
            message="es comando"
        }
        else if(this.positionKeys.includes(text)){
            this.tipoPosition(text)
            message="cambia posicion"
        }
        else{
            message="error"
        }
        
        return message
        }

        calcular(){
            
            try {
                let result= parseFloat(eval(this.cadenaCalculo == "" ? "" :this.cadenaCalculo));
                this.display.value="";
                this.display.value=result;
                this.escribir(result)
                //this.cadenaCalculo=result;
                
                
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
                break

            case "Del":

                let temporal =  this.cadenaCalculo.slice(0, -1);
                //this.display.value=temporal
                this.display.value=""
                this.displayC.value=temporal
                this.cadenaCalculo=temporal
                this.escribir(this.cadenaCalculo)
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
            default:
                this.display.value="0";
            
        }
    }
    tipoOperacion(text){
        switch(text){
            case "":
                this.cadenaCalculo+=this.display.value
                break
            case "π":
                this.cadenaCalculo+=Math.PI;
                this.display.value+="π"
                this.displayC.value+="π"
            break
            case "log":
                this.cadenaCalculo+="Math.log10(";
                this.display.value+="log("
                this.displayC.value+="log("
            break
            case "ln":
                this.cadenaCalculo+="Math.log(";
                this.display.value+="ln("
                this.displayC.value+="ln("
            break

            case "e":
                this.cadenaCalculo+="Math.E";
                this.display.value+="e"
                this.displayC.value+="e"
            break

            case "n!":
                
                this.cadenaCalculo+="this.nFactorial(";
                this.display.value+="n!("
                this.displayC.value+="n!("
            break

            case "x":
                
                this.cadenaCalculo+="*"
                this.display.value+=text
                this.displayC.value+=text
                this.escribir(this.cadenaCalculo)
                break
            case ".":
               
                this.display.value+=text
                this.displayC.value+=text
                this.cadenaCalculo+=text;
                break

            case "(":
               
                this.cadenaCalculo+="("
                this.display.value+="("
                this.displayC.value+="(";
                break

            case "x^2":
                this.cadenaCalculo+="**2"
                this.display.value+=`^2`
                this.displayC.value+=`^2`
                //Para insertar la función
                break

            case "x^3":
                this.cadenaCalculo+="**3"
                this.display.value+=`^3`
                this.displayC.value+=`^3`
                break

            case "10^x":
                this.cadenaCalculo+="10**("
                this.display.value+="10^("
                this.displayC.value+="10^("
                break

            case "sin":
                this.cadenaCalculo+="Math.sin("
                this.display.value+=`sin(`
                this.displayC.value+=`sin(`
                break

            case "cos":
                this.cadenaCalculo+="Math.cos("
                this.display.value+=`cos(`
                this.displayC.value+=`cos(`
                break

            case "tan":
                this.cadenaCalculo+="Math.tan("
                this.display.value+=`tan(`
                this.displayC.value+=`tan(`
                break
                
            case "x^-1":
               
                this.cadenaCalculo+="**(-1)"
                
                this.display.value+="^(-1)";
                this.displayC.value+="^(-1)";
                this.escribir(this.cadenaCalculo)
                break

            case "sqrt":
                this.cadenaCalculo+="**(1/2)"
                this.display.value+=`^(1/2)`
                this.displayC.value+=`^(1/2)`
                break

            default:
                this.cadenaCalculo+=text;
                this.display.value+=text;
                this.displayC.value+=text;
            
        }
        this.escribir(this.cadenaCalculo)
    }
    tipoPosition(text){
        switch(text){
            case "<=":
                this.toLeft();

            break
            case "=>":
                this.toRight();
            break
        }
        this.escribir(this.cadenaCalculo)
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
        return console.log("ingresado "+texto);
    }

    //Al hacer click posiciona el cursor a la izquierda
    /* Falta la funcionalidad de insertar numeros en la posición en la función
    de this.identificarTecla y this.calcular, ver métodos setRangeText() y
    setSelectionRange() */
    toLeft(){
        this.displayC.focus()
        this.cont>0?this.cont--:this.cont
        this.displayC.setSelectionRange(this.cont, this.cont);


        return this.escribir(this.cont)
    }
     //Al hacer click posiciona el cursor a la derecha
     //Idem funcionalidad a toLeft()
    toRight(){
        this.displayC.focus()
        this.cont++
        this.displayC.setSelectionRange(this.cont, this.cont);
        return this.escribir(this.cont)
    }
    

    onFocusValue () {
      this.setSelectionRange(0, 0);
    }
}

const calculadora = new Calculadora();


document.addEventListener("click",(e)=>{
    if(e.target.tagName==='BUTTON'&& e.target.textContent!==undefined){
        let tecla=e.target
        calculadora.identificarTecla(tecla.textContent)
    }else(calculadora.escribir("no es tecla"))

})
