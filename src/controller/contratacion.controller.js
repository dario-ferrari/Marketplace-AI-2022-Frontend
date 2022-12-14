import urlWebServices from './webServices.js';

export const crearContratacionNueva = async function(contratacion)
{
    //url webservices
    let url = urlWebServices.crearContrataciones;
    //console.log("url",url);
    //console.log("token",WebToken.webToken);
    const formData = new URLSearchParams();
    formData.append('estado', contratacion.estado)
    formData.append('isValorada', contratacion.isValorada)
    formData.append('telefono', contratacion.telefono)
    formData.append('email', contratacion.email)
    formData.append('rating', contratacion.rating)
    formData.append('horarioRef', contratacion.horarioRef)
    formData.append('mensaje', contratacion.mensaje)
    formData.append('alumno', contratacion.alumno)
    formData.append('profesor', contratacion.profesor)
    formData.append('clase', contratacion.clase)

    try
    {
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                //'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body:formData
        });
        let rdo = response.status;
        let dataBack = await response.json();
        switch(rdo){
            case 201:
            {                    
                return ({rdo:0,dataBack});//correcto
            }
            default:
            {
                //otro error
                return ({rdo:1,mensaje:dataBack.message});                
            }
        }
    }
    catch(error)
    {
        console.log("error",error);
        return false;
    };
}

export const listadoContrataciones = async function()
{

    let url = urlWebServices.obtenerContrataciones;
    
    try
    {
        let response = await fetch(url,{
            method: 'GET', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                //'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            //body:formData
        });
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 200:
                {
                    return ({rdo:0, contratacion:data.data});
                }
                default:
                {
                    return ({rdo:1,mensaje:data.message});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const buscarContratacionPorId = async function(id)
{
    let url = urlWebServices.obtenerContratacionesPorId;
    const formData = new URLSearchParams();
    formData.append('_id', id);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
               // 'x-access-token': WebToken.webToken,
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 200:
                {
                    return ({rdo:0, Contratacion:data.data});
                }
                default:
                {
                    return ({rdo:1,mensaje:data.message});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };

}

export const updateContratacion = async function(contratacion){
    console.log("llego al controller actualizar",contratacion)
    let url = urlWebServices.actualizarContrataciones;


    //armo json con datos
    //console.log("dato",formData);
    //console.log("url",url);

    console.log("esto voy a pasar",JSON.stringify(contratacion))
    try{
        let response = await fetch(url,{
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contratacion),
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 200:
                {
                    return ({rdo:0, contratacion:data.data});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:data.message});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const eliminadorContrataciones = async function(id)
{
    console.log("esto recibe el front controller")
    let url = urlWebServices.borrarContratacion;
    const formData = new URLSearchParams();
    formData.append('_id', id)
    try
    {
        let response = await fetch(url,{
            method: 'DELETE', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                //'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body:formData
        });
        let rdo = response.status;
        console.log(response)
        switch(rdo){
            case 200:
            {                    
                return ({rdo:0,mensaje:"Se elimino"});
            }
            default:
            {
                return ({rdo:1,mensaje:"No se elimino"});                
            }
        }
    }
    catch(error)
    {
        console.log("error",error);
        return false;
    };
}
