import React,{Component} from 'react'
import M from 'materialize-css'
import CulturaList from '../components/CulturaList'
import {cpfIsValid,cnpjIsValid,testArea} from '../util/infoValidation'
import produtorService from '../services/produtor'
import {connect} from 'react-redux'
import { useHistory,Redirect } from "react-router-dom";
import swal from 'sweetalert'

 class Produtor extends Component{
    

    state = {
        doc:null,
        nome:null,
        nome_fazenda:null,
        area_total:null,
        cidade:null,
        area_uso:null,
        estado:null,
        area_reserva:null,
        culturas:[
            {id:1, value: 0}
        ]
    } 

    obrigatorios = ["doc","nome","nome_fazenda","area_total","cidade","area_uso","estado","area_reserva"]

    componentDidMount(){
        let id = this.props.match.params.idProd
        if(id){
            
            produtorService.getOne(parseInt(id)).then((res)=>{
                console.log("resultado",res.data.result)
                Object.keys(res.data.result).forEach(v=>{
                    if(v!=="estado")
                    this.setState({
                        [v]:res.data.result[v]
                    })
                })
                console.log("Estado",this.state)
                let culturas = res.data.result.culturas_plantadas.map(c=>{
                    return {id:Math.random(),value:c}
                })
                setTimeout(() => {
                    this.setState({
                        culturas:[]
                    })
                    this.setState({
                        culturas:culturas
                    })
                    this.setState({
                        estado:res.data.result['estado']
                    })
                    this.updateSelect()
                }, 100);
               
            }).catch(error=>{
                
            })

        }else{
            
            this.updateSelect()
        }
    }

    updateSelect = ()=>{
        setTimeout(() => {
                 const elems = document.querySelectorAll('select');
                const instances = M.FormSelect.init(elems)
                M.updateTextFields()
                console.log(this.state.esdtado)
        }, 100);
   
    }

    addCultura = ()=>{
        let todos = [...this.state.culturas,{id:Math.random(),value:'0'}]
        console.log("todos",todos)
        this.setState({
            culturas:todos
        })
        setTimeout(() => {
            this.updateSelect()
        }, 100);
    }

    removeCultura = (id)=>{
        let todos = this.state.culturas.filter((v)=>{
            return v.id != id
        })        
        setTimeout(() => {
            this.setState({
                culturas:[]
            })
            this.setState({
                culturas:todos
            })
            this.updateSelect()
        }, 20);
      
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleCulturaChange = (e)=>{
        let culturas = this.state.culturas
        let i =culturas.findIndex((c)=>{
            return c.id == e.target.id
        })
        culturas[i] = {id:culturas[i]['id'],value:e.target.value} 
    }

    handleSubmit = (e)=>{
        e.preventDefault()

        if(this.props.match.params !==undefined && this.props.match.params.idProd !== undefined){
            console.log("é para editar")
            if(this.passValidationNulls(this.obrigatorios)){
                if(this.passValidationDoc(this.state)){
                    if(this.passValidationValues(this.state)){
                    let produtor = this.state 
                    produtor['id']=this.props.match.params.idProd
                    produtor.culturas = produtor.culturas.map(v=>v.value).filter(v=>v!=0 && v!="0")
                    console.log("produtor",produtor)
                    produtorService.edit(produtor).then(value=>{
                            this.props.history.push("/produtores")

                        }).catch(error=>{
            
                                console.log("erro",error)
                    })

                    }else{
                        this.callError("ERRO_AREA")
                    }
                }else{
                    this.callError("ERRO_DOC")
                }

              
            }else{
                this.callError("ERRO_NULL")
            }  
        }else{
            if(this.passValidationNulls(this.obrigatorios)){
                if(this.passValidationDoc(this.state)){
                    if(this.passValidationValues(this.state)){
                        let produtor = this.state
                        produtor.culturas = produtor.culturas.map(v=> v.value)
                        produtorService.cad(this.state).then(value=>{
                                console.log("passou")
                                // this.props.updateProdutores(v.data)    
                                this.props.history.push("/produtores")

                                 
                        }).catch(error=>{
                            console.log("erro",error)
                        })
                    }else{
                        this.callError("ERRO_AREA")
                    }
                }else{
                    this.callError("ERRO_DOC")
                }

              
            }else{
                this.callError("ERRO_NULL")
            }  
        }
       
        
    }

    passValidationDoc = (produtor)=>{
        let doc = produtor.doc.replace(/[^\d]+/g,'') 
        if(doc.length!== 11 && doc.length !== 14){
            return false
        }else{
            if(doc.length ==11){
                if(cpfIsValid(doc))
                return true
                else return false
            }else if(doc.length == 14){
                if(cnpjIsValid(doc)) return true
                else return false
            }
        }
    }

    passValidationValues = (produtor)=>{
        if((parseInt(produtor.area_reserva) + parseInt(produtor.area_uso) ) > parseInt(produtor.area_total))
            return false        
            else return true
    }

    passValidationNulls = (props) =>{
        let ret = true
        props.forEach(p=>{
            if(this.state[p] == null || this.state[p]== "" || this.state[p]==0){
                ret =  false
            }
        })
        if(this.state.culturas.length == 1 && this.state.culturas[0].value == 0){
            ret = false
        }
        return ret

    }

    callError(type){
        switch (type) {
            case 'ERRO_NULL':
                swal({
                    title:"Atenção",
                    text:"Preencha todos os campos do cadastro!",
                    icon:"error"
                })
            break;
            case 'ERRO_DOC':
                    swal({
                        title:"Atenção",
                        text:"Você deve inserir um cpf ou cnpj válido!",
                        icon:"error"
                    })
                break;
            case 'ERRO_AREA':
                    swal({
                        title:"Atenção",
                        text:"A soma da área de uso e da área de reserva natural não pode ser maior que a área total.",
                        icon:"error"
                    })
                break;
            default:
                break;
        }
    }
    
    render(){
         return (
             <div>
                <nav className="white lighteen-2 mynav">
                    <h3 className="left grey-text">Cadastro de Produtor</h3>
                </nav> 
                <div className="container">
                    <div className="row myform mymargin">
                        <form  className="col s10 offset-s2 myborder">
                            <div className="row mymargin2">
                                <div className="col s10 offset-s1">
                                    <div className="row">
                                        <div className="row">
                                        <div className="col s4">
                                            <div className="input-field col s12">
                                                <input defaultValue={this.state.doc} onChange={this.handleChange} type="text" id="doc" className="validate active" placeholder="CPF/CNPJ"/>
                                                <label htmlFor="doc">CPF/CNPJ</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input defaultValue={this.state.nome} onChange={this.handleChange} type="text" id="nome" className="validate" placeholder="Nome"/>
                                                <label htmlFor="nome">Nome</label>
                                            </div>
                                        </div>
                                        </div>
                                     
                                    </div>
                                    <div className="row">

                                    <div className="row">
                                    <div className="col s12">
                                    <div className="input-field col s5">
                                        <input defaultValue={this.state.nome_fazenda} onChange={this.handleChange} type="text" id="nome_fazenda" className="validate" placeholder="Nome da Fazenda"/>
                                        <label htmlFor="nome_fazenda">Nome da Fazenda</label>
                                    </div>
                                    <div className="input-field col s5 offset-s1">
                                        <input defaultValue={this.state.area_total} onChange={this.handleChange} placeholder="Área total em hectares" type="number" className="validate" id="area_total"/>
                                        <label htmlFor="area_total">Área Total</label>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <div className="input-field col s5">
                                        <input defaultValue={this.state.cidade} onChange={this.handleChange} type="text" id="cidade" className="validate" placeholder="Cidade"/>
                                        <label htmlFor="cidade">Cidade</label>
                                    </div>
                                    <div className="input-field col s5 offset-s1">
                                        <input defaultValue={this.state.area_uso} onChange={this.handleChange} placeholder="Área de uso consolidado" type="number" className="validate" id="area_uso"/>
                                        <label htmlFor="area_uso">Uso Consolidado</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s12"> 
                                    <div className="input-field col s5">
                                        <select value={this.state.estado} onChange={this.handleChange} id="estado">
                                            {/* <option disabled selected>Estado</option> */}
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </select>
                                        <label htmlFor="estado">Estado</label>
                                    </div>
                                    <div onChange={this.handleChange} className="input-field col s5 offset-s1">
                                        <input defaultValue={this.state.area_reserva} placeholder="Área de Reserva Legal" type="number" className="validate" id="area_reserva"/>
                                        <label htmlFor="area_reserva">Reserva Legal</label>
                                    </div>
                                </div>
                            </div>
                            
                
                                <div className="row">
                                <CulturaList change={this.handleCulturaChange} culturas={this.state.culturas} addCultura={this.addCultura} removeCultura={this.removeCultura}></CulturaList>

                                </div>
                                <div className="row">
                                <div className="col s4 offset-s8">
                                    <a onClick={this.handleSubmit} className="waves-effect waves-light btn-large black ">
                                        Registrar
                                        <i className="material-icons right">send</i>
                                    </a>
                                </div>
                            </div>

                                    </div>

                              


                                </div>

                            </div>
                         
                           
                            
                          
                        </form>
                    </div>
                </div>
             </div>
         
         )
     }
 }

 const mapStateToProps = (state)=>{
    return{
        produtores:state.produtores
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

export default connect(mapStateToProps,mapDispatchToProps)(Produtor)