import React, { Component } from 'react';
import './App.css';

class App extends Component {

constructor(props){
	super(props);
	this.state={
		title:"React CRUD app",
		act: 0, //0 is for new submissions, 1 is for editing existing submission
		index: '',
		datas:[]
	}
}

componentDidMount(){
	this.refs.name.focus();
}

submit = (e) =>{
	e.preventDefault();
	let datas= this.state.datas;
	let name = this.refs.name.value;
	let address = this.refs.address.value;

	if( this.state.act === 0 ){
		let data={
			name,address
		}
		datas.push(data);
	}
	else{ // So instead of creating a new one it is editing the one you clicked edit for.
		let index = this.state.index;
		datas[index].name = name;
		datas[index].address = address;
	}

	this.setState({
		datas:datas,
		act: 0
	});
	this.refs.inputForm.reset();
	this.refs.name.focus();
}

remove = (i) =>{
	let datas = this.state.datas;
	datas.splice(i,1);
	this.setState({
		datas:datas
	});
	this.refs.inputForm.reset();
	this.refs.name.focus();
}

edit = (i) =>{
	let data = this.state.datas[i];

	this.refs.name.value = data.name;
	this.refs.address.value = data.address;

	this.setState({
		act:1,
		index:i
	});
	this.refs.name.focus();
}

render(){
	let datas = this.state.datas;
	return(
	<div className="App">
		<h2>{ this.state.title }</h2>
		<form ref="inputForm" className="inputForm">
			<input type="text" ref="name" placeholder="your name" className="formField"/>
			<input type="text" ref="address" placeholder="your address" className="formField"/>
			<button onClick={ (e)=>this.submit(e) } className="inputButton">submit</button>
		</form>
		<pre>
		{ datas.map( ( data,i )=>
			<li key={i} className="list">
			{ i+1 }. {data.name}, {data.address}
			<button onClick={ ()=>this.remove(i) } className="removeButton">remove</button>
			<button onClick={ ()=>this.edit(i) } className="editButton">edit</button>

			</li>
		)}
		</pre>
	</div>
	);
}

}

export default App;
