import React from 'react'; 
import ReactDOM from 'react-dom';

class temp extends React.Component{
    constructor(props){
        console.log('constructor');
        // 执行时间：组件被加载前最先调用，并且仅调用一次
        super(props);
        this.state = {
            content:null
        }
    }
    componentWillMount(){
        console.log('componentWillMount');
        // 执行时间：组件初始渲染（render()被调用前）前调用，并且仅调用一次
    }
    componentDidMount(){
        console.log('componentDidMount');
        // 执行时间：render之后被调用，并且仅调用一次
    }
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        // 执行时间：组件渲染后，当组件接收到新的props时被调用；
        // 这个函数接收一个object参数（新的props）；
        // props是父组件传递给子组件的。
        // 父组件发生render的时候子组件就会调用
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        // 执行时间：组件挂载后（即执行完render），接收到新的state或props时被调用，即每次执行setstate都会执行该函数，来判断是否重新render组件，默认返回true；接收两个参数：第一个是心的props，第二个是新的state。
    }
    componentWillUpdate(){
        console.log('componentWillUpdate');
        // 执行时间：在接收到新的props 或者 state，重新渲染 之前立刻调用，在初始化渲染的时候该方法不会被调用
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
        // 执行时间：重新渲染后调用，在初始化渲染的时候该方法不会被调用
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
        // 执行时间：组件被卸载前调用，
    }
    render(){
        console.log('render');
        return <div>你好</div>
    }
}
ReactDOM.render(<temp />,document.getElementById('root'))