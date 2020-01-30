import React,{Component} from 'react'
import M from 'materialize-css'
import {Link,NavLink} from 'react-router-dom'
import logo from '../assets/0.png'
import bg from '../assets/background.jpeg'

export default class Header extends Component{
    componentDidMount(){
        const elems = document.querySelectorAll('.sidenav');
        const instances = M.Sidenav.init(elems);
    }
    render(){
        return(
             <div>
                <ul id="slide-out" className="sidenav sidenav-fixed">
                    <li>
                        <div className="user-view">
                            <div className="background myimg">
                                <img className="myimg" src={bg} />
                            </div>
                            <a><img className="circle" src={logo}/></a>

                        </div>
                    </li>
                    <div className="adjustLi">
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/produtores">Registros</NavLink></li>
                        <li><NavLink to="/produtor">Cadastro</NavLink></li>
                    </div>
                
                </ul>
            </div>
            
        )
    }
}