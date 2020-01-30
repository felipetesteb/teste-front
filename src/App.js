import React,{Component} from 'react';
import './App.css';
import Header from './components/Header';
import {BrowserRouter,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProdutorList from './pages/ProdutorList';
import Produtor from './pages/Produtor';
import produtorService from './services/produtor';
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount(){
      this.getProds()
  }

  getProds = ()=>{
    produtorService.getAll().then(value=>{
      this.props.updateProdutores(value.data)
    })
  }
  
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <div className="row">
            <div className="col s2">
              <Header />
            </div>
            <div className="">
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/produtores" component={ProdutorList} />
              <Route exact path="/produtor/:idProd?" component={Produtor} />
            </div>
          </div>
  
        </div>
      </BrowserRouter>
    );
  }
 
}

const mapStateToProps = (state)=>{

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

export default connect(mapStateToProps,mapDispatchToProps)(App);
