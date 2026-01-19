import { Usuario } from './usuarios.js';


export class UsuarioLista { 
    private lista: Usuario[] = []


    constructor (){}


    //tododo dentro de el constructor son metodos que se utilizan para obtener los datos


    //Agrega un Usuario osea que guarda el usuario 
    public agregar( usuario: Usuario){

        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string){

        for( let usuario of this.lista){
            if ( usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('====== actualizando usuario =====');
        console.log( this.lista);

    }
    
    //Obtener lista de usuarios
    public getLista(){
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
    }

    //Obtener un Usuario
    public getUsuario(id: string){
        return this.lista.find( usuario => usuario.id === id);
    }

    //obtener usuario en una sala en particular
    public getUsuariosEnSala ( sala: string ){
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    //Borrar Usuario
    public borrarUsuario( id: string){
        const tempUser = this.getUsuario( id);

        this.lista = this.lista.filter( Usuario =>Usuario.id !== id );


        return tempUser;
    }

}


