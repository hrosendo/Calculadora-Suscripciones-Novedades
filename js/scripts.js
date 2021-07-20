moment.locale('es-es');

const agregarDias = (fecha, dias)=>{   
    let fechaProcesada = new Date(fecha);    
    fechaProcesada.setDate(fechaProcesada.getDate() + dias);    
    return fechaProcesada;
} 

const muestraDiasContratados = ( dias, libre = false ) =>{
    let fechaInicioGMT = new Date($fechaInicio.value+"T00:00"); 
    let fechaFinGMT = new Date($fechaFin.value+"T00:00")  ;   
    let fechaFinal = libre ? fechaFinGMT: agregarDias(fechaInicioGMT, dias-1);     
    let fechaInicialMoment = moment(fechaInicioGMT);
    let fechaFinalMoment = moment(fechaFinal);
    let diferenciaDias =fechaFinalMoment.diff(fechaInicialMoment, 'days')+1;  
    nTotalDias.innerHTML = `<strong> ${diferenciaDias} dias </strong>`;
    nFechaExtendida.innerHTML = ""; 
    nFechaInicio.innerHTML = ""; 
    return {fechaFinal,diferenciaDias};
}

const obtenerDiasSinDomingos = (fechaInicial, fechaFinal) =>{ 
    let diasSinDomingos = 0;
    var fechaInicial = new Date(fechaInicial+"T00:00");
    var finalDate = new Date(fechaFinal+"T00:00");     
    while (fechaInicial <= finalDate) {  
        if (fechaInicial.getDay() !== 0) { 
            diasSinDomingos++; 
        }
        fechaInicial = agregarDias(fechaInicial,1);
    }
    return diasSinDomingos;    
}  

const d = document

//Elementos DOM
$fechaInicio = d.getElementById("fechaInicio");
$fechaFin = d.getElementById("fechaFin") 
$muestraFechaFinalizacion = d.getElementById("fechaLibreFin")
$periodoSeleccionado = d.getElementById("periodoSeleccionado")
$btnCalcular = d.getElementById("btnCalcular")
$nTotalDias = d.getElementById("nTotalDias")
$nFechaExtendida = d.getElementById("nFechaExtendida")
$periodoSeleccionado.innerHTML = "Periodo seleccionado: <b>Ninguno</b>";
$fechaInicio.value= moment().format('YYYY-MM-DD') 
$fechaFin.value  = moment().format('YYYY-MM-DD')

//Variables
let fechaFinalProcesada;
let diasPeriodo; 

d.addEventListener("click",e=>{ 
 
    if(e.target.matches("#btnLibre")){       
        $muestraFechaFinalizacion.classList.toggle("hidden");    
        $periodoSeleccionado.innerHTML = "Periodo seleccionado: <b>Libre</b>";
        fechaFinalProcesada = muestraDiasContratados(0,true);   
        diasPeriodo = 0 ; 
        nFechaInicio.innerHTML = ""; 
        nFechaExtendida.innerHTML = ""; 
    } 
    
    if(e.target.matches("#btnUnMeses")){       
        $muestraFechaFinalizacion.classList.add("hidden");
        $periodoSeleccionado.innerHTML = "Periodo seleccionado: <b>1 Mes</b>";  
        diasPeriodo = 31 ;
        fechaFinalProcesada = muestraDiasContratados(diasPeriodo);
    }

    if(e.target.matches("#btnTresMeses")){       
        $muestraFechaFinalizacion.classList.add("hidden");
        $periodoSeleccionado.innerHTML = "Periodo seleccionado: <b>3 Meses</b>";      
        diasPeriodo = 91 ;          
        fechaFinalProcesada = muestraDiasContratados(diasPeriodo);
    }

    if(e.target.matches("#btnSeisMeses")){       
        $muestraFechaFinalizacion.classList.add("hidden");
        $periodoSeleccionado.innerHTML = "Periodo seleccionado: <b>6 Meses</b>";
        diasPeriodo = 184 ;          
        fechaFinalProcesada = muestraDiasContratados(diasPeriodo);
    }

    if(e.target.matches("#btnUnAnio")){       
        $muestraFechaFinalizacion.classList.add("hidden");
        $periodoSeleccionado.innerHTML = "Periodo seleccionado: <b>1 año</b>"; 
        diasPeriodo = 365 ;          
        fechaFinalProcesada = muestraDiasContratados(diasPeriodo);
    }

    //boton calcular    
    if(e.target.matches("#btnCalcular")){   
        e.preventDefault()   
       if(fechaFinalProcesada){
            let fechaFin = moment(fechaFinalProcesada.fechaFinal).format('YYYY-MM-DD');
            let fechaFinalPivote = new Date(fechaFin+"T00:00"); 
            let diasSinDomingos = obtenerDiasSinDomingos($fechaInicio.value,fechaFin);
            let totalDias = fechaFinalProcesada.diferenciaDias;
            let totalDiasSumar = totalDias - diasSinDomingos; 
            let index = 1;  
            while (index <= totalDiasSumar){               
                fechaFinalPivote = agregarDias(fechaFinalPivote,1);                 
                if (fechaFinalPivote.getDay() !== 0) { 
                    index++;
                }else{ 
                    index = index;
                } 
            }
            let fechaInicioFormato =   moment($fechaInicio.value).format('DD-MMMM-YYYY'); 
            let fechaFinFormato =   moment(fechaFinalPivote).format('DD-MMMM-YYYY'); 
            nFechaInicio.innerHTML = `<strong>${fechaInicioFormato}</strong>`; 
            nFechaExtendida.innerHTML = `<strong>${fechaFinFormato}</strong>`; 
        }else{
            nTotalDias.innerHTML = "<strong>Error: seleccione un periodo</strong>";
            nFechaInicio.innerHTML = "<strong>Error: seleccione un periodo</strong>";
            nFechaExtendida.innerHTML = "<strong>Error: seleccione un periodo</strong>"; 
        }  
    }
 
});

$fechaFin.addEventListener('change',function(){
    fechaFinalProcesada = muestraDiasContratados(0,true);      
}); 

$fechaInicio.addEventListener('change',function(){
    fechaFinalProcesada = diasPeriodo ?  muestraDiasContratados(diasPeriodo) : muestraDiasContratados(0,true); 
}); 