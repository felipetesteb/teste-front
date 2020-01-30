import React,{Component} from 'react'
import M from 'materialize-css'
import produtorService from '../services/produtor'
import {connect} from 'react-redux'
import swal from 'sweetalert'

 class ProdutorList extends Component{
    componentDidMount(){
        produtorService.getAll().then(value=>{
            this.props.updateProdutores(value.data)
          })
    } 

     renderTable = ()=>{
        return this.props.produtores.map((produtor)=>{
            if(produtor.doc != null){
                // let culturas
                produtor.culturas_plantadas = produtor.culturas_plantadas == null? "Nenhuma":produtor.culturas_plantadas.toString()
                return(
                    <tr key={produtor.id}>
                        <td>{produtor.doc}</td>
                        <td>{produtor.nome}</td>
                        <td>{produtor.nome_fazenda}</td>
                        <td>{produtor.area_total}</td>
                        <td>{produtor.culturas_plantadas}</td>
                        <td>   <a onClick={()=>{this.editProdutor(produtor.id)}} className="btn-floating waves-effect waves-light black">
                                    <i className="material-icons">edit</i>
                                </a>
                                <a onClick={()=>{this.confirmDelete(produtor.id)}} className="btn-floating waves-effect waves-light red">
                                    <i className="material-icons">delete_forever</i>
                                </a></td>
                    </tr>
                )
            }else{
                return null
            }
        }) 
     }

     editProdutor = (id)=>{
        this.props.history.push("/produtor/".concat(id))
     }
     

     confirmDelete = (id)=>{
         swal({
             title:'Você tem certeza?',
             text:'Uma vez excluídos, você não poderá acessar estes dados novamente.',
             icon:'warning',
             buttons:true,
             dangerModel:true
         }).then((willDelete)=>{
             if(willDelete){
                produtorService.deleteP(id).then(v=>{
                    console.log("value",v)
                    produtorService.getAll().then(value=>{
                        this.props.updateProdutores(value.data)
                      })
                    swal("Registro excluído com sucesso!", {
                        icon: "success",
                      });
                }).catch(e=>{
                    console.log("error",e)
                })

             }else{

             }
         })
     }

     render(){
         if(this.props.produtores.length == 0){
             return(
                 
             <div>
                  <nav className="white lighten-2 mynav">
                   <h3 className="left grey-text">Registros</h3>
               </nav>
               <div className="row mymargin">
                    <div className=" col s8 offset-s3">
                        <h2>Nenhum Produtor Cadastrado.</h2>
                    </div>
               </div>
             </div>
             )
         }else{
             
             return (
                 <div>
                     <nav className="white lighten-2 mynav">
                       <h3 className="left grey-text">Registros</h3>
                   </nav>
                   <div className="row mymargin">
                        <div className=" col s8 offset-s3">
                            <table className="striped centered myborder myform">
                                <thead>
                                    <tr>
                                        <th>CPF/CNPJ</th>
                                        <th>Nome</th>
                                        <th>Nome da Fazenda</th>
                                        <th>Área Total</th>
                                        <th>Culturas</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTable()}
                                </tbody>
                            </table>
                        </div>
                   </div>
                   
                 </div>
             )
         }
     }
 }

 const mapStateToProps = (state)=>{
     return{
         produtores: state.produtores
     }
 }


const mapDispatchToProps = (dispatch)=>{
    return{
      updateProdutores:(data)=>{
        dispatch({
          type:'FETCH_PRODUTORES',
          data
        })
      }
    }
  }

 export default connect(mapStateToProps,mapDispatchToProps)(ProdutorList)