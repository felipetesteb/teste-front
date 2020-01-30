import React from 'react'

const CulturaList = ({culturas,addCultura,removeCultura,change}) =>{
    if(culturas.length > 1)
    {
        return culturas.map(cultura=>{
            return(
                // <div className="row">       
                    <div className="col input-field s4 " key={cultura.id}>
                            <div className=" col s10 offset-s1">
                                <select className="" onChange={change} id={cultura.id} defaultValue={cultura.value} >
                                    <option defaultValue="0"  >Escolha uma cultura</option>    
                                    <option defaultValue="Soja">Soja</option>
                                    <option defaultValue="Milho">Milho</option>
                                    <option defaultValue="Algodão">Algodão</option>
                                    <option defaultValue="Café">Café</option>
                                    <option defaultValue="Cana de Açucar">Cana de Açucar</option>
                                </select>
                            </div>
                            <div className="col s1">
                                <a onClick={addCultura} className="btn-floating waves-effect waves-light black ">
                                    <i className="material-icons">add</i>
                                </a>
                                <a onClick={()=>{removeCultura(cultura.id)}} className="btn-floating waves-effect waves-light red  ">
                                    <i className="material-icons">remove</i>
                                </a>
                            </div>
                    </div>
                // </div>
            )
        })
    }else{
        return  culturas.map(cultura=>{
            return(
                // <div className="row">       
                    <div className="col s4" key={cultura.id}>
                            <div className=" col s10 ">
                                <select onChange={change} id={cultura.id} defaultValue={cultura.value} >
                                    <option defaultValue="0"   >Escolha uma cultura</option>
                                    <option defaultValue="Soja">Soja</option>
                                    <option defaultValue="Milho">Milho</option>
                                    <option defaultValue="Algodão">Algodão</option>
                                    <option defaultValue="Café">Café</option>
                                    <option defaultValue="Cana de Açucar">Cana de Açucar</option>
                                </select>
                            </div>
                            <div className="input-field col s1">
                                <a onClick={addCultura} className="btn-floating waves-effect waves-light black left">
                                    <i className="material-icons">add</i>
                                </a>
                            </div>
                    </div>
                // </div>
            )
        }) 
    }

}

export default CulturaList