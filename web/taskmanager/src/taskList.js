import React from 'react';
import Display from './display';
import Header from './Header';


class TaskList extends React.Component{
    render(){
        this.state.datas.map((data,i) =>{
            data.map(item => {
                console.log(item);
            })
        });
        return(<div>TaskList</div>);

    }

    componentWillMount(){
        const token = sessionStorage.getItem('myData');

        fetch('http://127.0.0.1:8000/tasks/',{
            method : 'get',
            headers: {
                "Content-Type": "application/json",
                'Authorization' : 'Token ' + token
            }
        }).then(res => {
            return(res.json());
        }).then(res => {
            console.log(res);
            this.setState({
                datas : [...this.state.datas, res]
            });
            console.log(this.state.datas);
        })

    }

}
        // return(
        //     <div className='Task'>
        //         <Header />
        //         {/*<div class="page-header">*/}
        //             {/*<h1>Task Listing </h1>*/}
        //         {/*</div>*/}
        //         <TaskForm />
        //
        //         return(
        //         {this.state.datas.map((data,i) => {
        //                 {return data.map((item) =>{}
        //                     {return (}
        //                         {<div className='displayName displayStyle' key={item.id}>*/}
        //                         {/*//     /!*<div className='displayStyle'>*!/*/}
        //                         {/*//         /!*<h6><b>{item.title}</b></h6>*!/*/}
        //                         {/*//         /!*<div className='desStyle'>{item.title}</div>*!/*/}
        //                         {/*//         /!*<div>{item.desc}</div>*!/*/}
        //                         {/*//         /!*/!*<div>DUE-DATE: {item.due_date}</div>*!/*!/*/}
        //                         {/*//         /!*<div className='desStyle'><b>Status </b> {item.status}</div>*!/*/}
        //                         {/*//         /!*<div className='desStyle'><b> Priority </b> {item.priority}</div>*!/*/}
        //                         {/*//         /!*<div className='desStyle'> <b>Created on  </b>{item.created_on}</div>*!/*/}
        //                         {/*//     /!*</div>*!/*/}
        //                         {/*// /!*</div>*!/*/}
        //                     // {/*)*/}
        //                 //
        //                 {/*})*/}
        //             }}))};
        //
        //             // {data.map((item) =>{
        //                 return (
        //                     <div className='Task displayName displayStyle' key={item.id}>
        //             //             <div className='displayStyle'>
        //             //                 <h6><b>{item.name}</b></h6>
        //             //                 <div className='desStyle'>{item.title}</div>
        //             //                 <span>{item.desc} </span>                                     																	<span className="AppLabel">development</span>
        //             //             </div>
        //             //         </div>
        //
        //
        //     </div>
        // );

export default TaskList;