import React from 'react';
import './App.css';
import  ProgressBar from 'react-bootstrap/ProgressBar'
import {View, Text} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


//import { interfaceDeclaration } from '@babel/types';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
//var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm

class App extends React.Component {
    constructor(props){
    super(props);
    this.state={
        list:[],
        newitem:"",
       len:0,
       gestureName: 'none',
        
    }
   this.getValue=this.getValue.bind(this)  
   this.setValue=this.setValue.bind(this)
    this.printArray=this.printArray.bind(this) 
    this.delete=this.delete.bind(this)
    this.up=this.up.bind(this)
    this.down=this.down.bind(this)
    this.setstatus=this.setstatus.bind(this)
    this.doubleclick=this.doubleclick.bind(this)


}
   
onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }
 
  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
    
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

getValue(e){
        e.preventDefault()
        this.setState({
            newitem:e.target.value
        })
        console.log(this.state.newitem)
    }
    setValue(e){
        if(this.state.newitem.trim()){
        e.preventDefault()
        var l=this.state.list
        var obj={name:this.state.newitem,status:false}
            l.push(obj)
            console.log(l)
        this.setState({
            list:l,newitem:""
        })
        console.log(this.state.list)
    }else{
        this.setState({
            newitem:""
        })
    }
        }


    delete(e){
        var id=e.target.id
        let l=this.state.list
        if(l[id].status==true){
            this.state.len-=1}
        l.splice(id,1)
        this.setState({
            list:l,newitem:""
        })
    
    }
    up(e){
        var id=e.target.id
        let l=this.state.list
       if(id!=0){
        var temp=l[id]
        console.log("id-1",id-1)
       console.log("temp",temp)
       l[id]=l[id-1]
       l[id-1]=temp}
        this.setState({
            list:l,newitem:""
        })
    }
   down(e){
    var id=e.target.id
    let l=this.state.list
    if(id!=l.length-1){
    var temp=l[id]
    console.log("id+1",id-1+2)
   console.log("temp",temp)
 l[id]=l[id-1+2]
 l[id-1+2]=temp}
    this.setState({
        list:l
    })
   }

setstatus(e){
    var id=e.target.id
    let l=this.state.list
    if(l[id].status==true){
        this.state.len-=1
      }
      else{this.state.len+=1}
    l[id].status=!l[id].status  
    this.setState({ list:l })
}

doubleclick(e){
    var id=e.target.id
    let l=this.state.list;
    [l[id],l[0]]=[l[0],l[id]];
    this.setState({
      list:l})
  }
    printArray(){
        let a=[]
        for(var i=0;i<this.state.list.length;i++){
            a.push(
                <div class ="container-fluid mb-4 ">
           <div class ="row">
               <div class="col-6">
<button onDoubleClick={this.doubleclick} onClick={this.setstatus} id={i} type="button" 
class={this.state.list[i].status?"btn btn-outline btn-block btn-success text-left ":"btn btn-outline-secondary btn-block  border  text-left "}>
         {this.state.list[i].name} </button>
         </div>
        <button class="btn btn-outline-success col-1 mr-2" onClick={this.up} id={i} >UP</button>
        <button class="btn btn-outline-warning col-1 mr-2" onClick={this.down} id={i}>DOWN</button>
         <button class="btn btn-outline-danger col-1" onClick={this.delete} id={i} >REMOVE</button>
            </div>
            </div>
         
          
        ) 
    }
       return a 
    }
    render(){
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };
      return (<div>
          <div class="container">
       <h1 class="display-1 text-center">TODO LIST</h1>
       <p class="display-4 text-center">Completed Tasks : {this.state.len}/{this.state.list.length}</p>

            

       <div class="input-group mb-3 d-flex bd-highlight row">
           <div class=" col-sm-6">
       <input class="form-control d-flex bd-highlight" placeholder="Enter task" onChange={this.getValue} value={this.state.newitem}/>
       </div>
       <div class=" col-sm-6">
       <button class="btn btn-outline-primary btn-block" type="button" onClick={this.setValue} >Add</button>
       </div>
       </div>
       <br></br>
       </div>

       <ProgressBar animated now={this.state.list.length==0?0:(this.state.len/this.state.list.length)*100}   label={`${((this.state.len/this.state.list.length)*100).toFixed(0)}%`}  />

    <br></br>
        <div class="container-fluid">
       <ul>{this.printArray()}</ul>
       </div>

       <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
        >
        <Text>{this.state.myText}</Text>
        <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
      </GestureRecognizer>

       {/* <Spring 
            from={{ opacity :0,marginTop:-500 }}
            to={{ opacity :1 ,marginTop:0}}
            >{props=>(
            <div style={props}>
                <h1>Hello</h1>
       </div>
       )}
       </Spring> */}
    
    
      </div>
      )
    }
}

export {App}


