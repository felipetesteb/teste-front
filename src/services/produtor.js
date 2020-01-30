import axios from 'axios'

const url = "http://localhost:3002"

 const getAll = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(url.concat("/produtor/all")).then((res)=>{
            if(res.data.code ==200){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

 const getOne = (id)=>{
    return new Promise((resolve,reject)=>{
        axios.get(url.concat("/produtor/one/".concat(id))).then((res)=>{
            if(res.data.code ==200){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

 const cad = (produtor)=>{
    return new Promise((resolve,reject)=>{
        axios.post(url.concat("/produtor/cad"),produtor).then((res)=>{
            if(res.data.code ==200){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

 const edit = (produtor)=>{
    return new Promise((resolve,reject)=>{
        axios.put(url.concat("/produtor/edit"),produtor).then((res)=>{
            if(res.data.code ==200){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

 const deleteP = (id)=>{
    return new Promise((resolve,reject)=>{
        axios.delete(url.concat("/produtor/delete/".concat(id))).then((res)=>{
            if(res.data.code ==200){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
}

export default {
    getAll,
    getOne,
    cad,
    edit,
    deleteP
}