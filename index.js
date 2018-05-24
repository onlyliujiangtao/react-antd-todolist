import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Input, message } from 'antd';

class Todolist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todoList: [],//任务列表
            comming:0,//正在进行的任务个数
            finish:0,//已完成的任务个数
            drag:null//拖拽的任务下标
        }
    }
    // 添加                                             
    keyEnter(event) {
        const value = event.target.value;
        if(!value){
            message.warning('todo不能为空');
            return;
        }
        this.setState((prevState, props) => {
            const state = { todoList: prevState.todoList.concat({flag:false,text:value}) ,comming:++prevState.comming};
            localStorage.setItem('state',JSON.stringify(state))
            return state
        })
        event.target.value = '';
    }
    // 删除
    delItem(index){
        this.setState((prevState, props) => {
            const sub = prevState.todoList.splice(index,1);
            if(sub[0].flag){
                prevState.finish--
            }else{
                prevState.comming--
            }
            const state = { todoList: prevState.todoList,comming:prevState.comming,finish:prevState.finish };
            localStorage.setItem('state',JSON.stringify(state))
            return state
        })
    }
    // 完成未完成修改
    changeFlag(index){
        this.setState((prevState, props) => {
            prevState.todoList = prevState.todoList.map((item,i)=>{
                if(i==index){
                    item.flag = !item.flag;
                    if(item.flag){
                        prevState.comming--
                        prevState.finish++
                    }else{
                        prevState.finish--
                        prevState.comming++
                    }
                }
                return item
            })
            const state = { todoList: prevState.todoList,comming:prevState.comming,finish:prevState.finish };
            localStorage.setItem('state',JSON.stringify(state))
            return state
        })
    }
    // 拖拽
    allowDrop(ev) {
        ev.preventDefault();
    }
    // 拖
    drag(index) {
        this.setState({drag:index})
    }
    // 放
    drop(index) {
        this.setState((prevState,props)=>{
            if(prevState.todoList[index].flag==false){
                let temp = prevState.todoList[index];
                prevState.todoList[index] = prevState.todoList[this.state.drag];
                prevState.todoList[this.state.drag] = temp;
            }
            localStorage.setItem('state',JSON.stringify(prevState))
            return {todoList:prevState.todoList}
        })
    }  
    // 任务列表
    list(flag){
        return this.state.todoList.map((item, index) => {
            if (item.flag === flag) {
                return (<li key={index} className="listItem space-between" onDrop={this.drop.bind(this,index)} onDragOver={this.allowDrop} draggable={!flag} onDragStart={this.drag.bind(this,index)} >
                            <div className="center">
                                <input type="checkbox" className="checked" onChange={this.changeFlag.bind(this,index)} defaultChecked={item.flag} />
                                <span className="ml10">{item.text}</span>
                            </div>
                            <span className="del" onClick={this.delItem.bind(this,index)}></span>
                        </li>)
            }
        })
    }
    componentDidMount(){
        const state = localStorage.getItem('state')||'[]';
        this.setState(JSON.parse(state));
    }
    render() {
        return (
            <div className="todolist">
                <div className="header">
                    <div className="content space-between">
                        <h1 className="logo">ToDoList</h1>
                        <Input className="addInput" placeholder="添加ToDo" onPressEnter={this.keyEnter.bind(this)} />
                    </div>
                </div>
                <div className="comming content">
                    <div className="title space-between">
                        <h1>正在进行</h1>
                        <span className="num center">{this.state.comming}</span>
                    </div>
                    <ul>
                        {this.list(false)}
                    </ul>
                </div>
                <div className="finish content">
                    <div className="title space-between">
                        <h1>正在进行</h1>
                        <span className="num center">{this.state.finish}</span>
                    </div>
                    <ul>
                        {this.list(true)}
                    </ul>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Todolist />, document.getElementById('root'));
