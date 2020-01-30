import React,{Component} from 'react'
import total from '../assets/area_total.jpg'
import reserva from '../assets/reserva.jpg'
import uso from '../assets/area_uso.jpeg'
import {connect} from 'react-redux'
import M from 'materialize-css'



 class Dashboard extends Component{
     state = {
         area_total:null,
         area_uso:null,
         area_reserva:null,
         media_propriedades:null,
         media_hectares:null
     }

    componentDidMount(){
        this.calcInfos(['area_total','area_uso','area_reserva'])
        this.updateSelect()
        console.log(this.props.produtores)
    }

    updateSelect = ()=>{
        const elems = document.querySelectorAll('select');
        const instances = M.FormSelect.init(elems)
    }

    calcAvg = (tipo,valor)=>{

        let mediaProp,mediaHec
        let produtores = this.props.produtores.filter(p=>{
            return p['doc']!== null && p['doc']!==undefined 
        })

        if(tipo == 'cultura'){
            produtores.forEach(p=>{
                if(typeof p.culturas_plantadas == "string" && p.culturas_plantadas !== "Nenhuma"){
                     p.culturas_plantadas = p.culturas_plantadas.split(",")
                }
            })

            let prodFiltered = produtores.filter(prod=>{
                return  prod.culturas_plantadas !== null && prod.culturas_plantadas !== "Nenhuma"
            }).filter(p=>{
                return p.culturas_plantadas.includes(valor)
            })
            let pQtd = prodFiltered.length
            let mediaProp = pQtd > 0? Math.round((100*pQtd)/produtores.length):0
            this.setState({
                media_propriedades:mediaProp
            })

            let somaHec = {}
            if(prodFiltered.length >0){
                if(prodFiltered.length >1)
                {  
                    somaHec = prodFiltered.reduce((a,b)=>{
                    return {['area_total']:parseInt(a['area_total'])+parseInt(b['area_total'])}
                    
                })}
                else if(prodFiltered.length ==1){
                    
                    somaHec['area_total'] = prodFiltered[0]['area_total']
                }
            }
            else{
                somaHec['area_total'] = 0
            }

            let mediaHec = somaHec['area_total']/prodFiltered.length
            if(isNaN(mediaHec)) mediaHec = 0
            this.setState({
                media_hectares:mediaHec
            })
            
        }
        
        else if(tipo == 'estado'){
            let prodsFiltered = produtores.filter(p=>{return p.estado == valor})
            let pQtd = prodsFiltered.length
            let mediaProp = pQtd > 0 ? Math.round((100*pQtd)/produtores.length): 0
            this.setState({
                media_propriedades:mediaProp
            })
            
            let somaHec ={}
            if(prodsFiltered.length >0){
                if(prodsFiltered.length >1)
                {  
                    somaHec = prodsFiltered.reduce((a,b)=>{
                    return {['area_total']:parseInt(a['area_total'])+parseInt(b['area_total'])}
                    
                })}
                else if(prodsFiltered.length ==1){
                    
                    somaHec['area_total'] = prodsFiltered[0]['area_total']
                }
            }
            else{
                somaHec['area_total'] = 0
            }
            let mediaHec = somaHec['area_total']/prodsFiltered.length
            if(isNaN(mediaHec)) mediaHec = 0
            this.setState({
                media_hectares:mediaHec
            })
        }
    }

    handleCulturaChange = (e)=>{
        this.calcAvg('cultura',e.target.value)
    }

    handleEstadoChange = (e)=>{
        this.calcAvg('estado',e.target.value)
    }

    calcInfos = (properties)=>{
            setTimeout(() => {
            properties.forEach(prop=>{
                let produtores = this.props.produtores.filter(p=>{
                    return p[prop]!== null && p[prop]!==undefined
                })
                let soma 
                if(produtores.length > 0){
                    if(produtores.length>1){
                        soma = produtores.reduce((a,b)=>{
                            return {[prop]:parseInt(a[prop])+parseInt(b[prop])}
                        })
                    }
                    if(produtores.length == 1){
                        console.log("aqui")
                        soma = {[prop]:parseInt(produtores[0][prop])}
                        console.log("soma",soma)
                    }
                }
                else soma = 0
                console.log("prop",prop)
                this.setState({
                    [prop]:soma[prop]
                })
            })
            }, 100);
    }

   
     
     render(){
         return (
             <div>
               <nav className="white lighten-2 mynav">
                   <h3 className="left grey-text">Dashboard</h3>
               </nav>
               <div className="adjustLi container">
                <div className="row">
                    <div className="col s10 offset-s2">
                    <div className="col s4">
                        <div className="card myimg">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator myimg2" src={total} />
                                </div>
                                <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">Área total: {this.state.area_total}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card myimg">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator myimg2" src={reserva} />
                                </div>
                                <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">Reserva Ambiental: {this.state.area_reserva}</span>
                                </div>
                            </div>
                        </div>
                    <div className="col s4">
                        <div className="card myimg">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator myimg2" src={uso} />
                                </div>
                                <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">Área em uso: {this.state.area_uso}</span>
                                </div>
                            </div>
                    </div>

                    </div>
                </div>

                <div className="row mymargin">
                    <div className="input-field col s4 offset-s2">
                        <select onChange={this.handleCulturaChange} name="" id="">
                            <option value="0" disabled selected>Selecione a cultura</option>
                            <option value="Soja">Soja</option>
                            <option value="Milho">Milho</option>
                            <option value="Algodão">Algodão</option>
                            <option value="Café">Café</option>
                            <option value="Cana de Açucar">Cana de Açucar</option>
                        </select>
                        
                    </div>
                    <div className="col s2">
                        <h4>ou</h4>
                    </div>
                    <div className="input-field col s4 ">
                        <select onChange={this.handleEstadoChange}  id="">
                            <option value="0" disabled selected>Selecione o estado</option>
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
                    </div>
                </div>

                <div className="row mymargin2" >
                    <div className="col s4 offset-s2">
                        <h5>Média de propriedades</h5>
                    </div>
                    <div className="col s4 offset-s2">
                        <h5>Média de hectares</h5>
                    </div>
                </div>
                <div className="row">
                <div className="col s4 offset-s2">
                        <h6>{this.state.media_propriedades} %</h6>
                    </div>
                    <div className="col s4 offset-s2">
                        <h6>{this.state.media_hectares} ha</h6>
                    </div>
                </div>

               </div>
              
             </div>
         )
     }
 }

 const mapStateToProps = (state)=>{
    return {
        produtores:state.produtores
    }
 }

 export default connect(mapStateToProps)(Dashboard)