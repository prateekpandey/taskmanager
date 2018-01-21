import React from 'react';
import Display from './display';
import Header from './Header';

class TaskList extends React.Component{
    constructor(props){
      super(props);
      this.state = {datas : [], 'title' : '', 'Description' :'' ,'Status' : '', 'Priority' : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
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

        // })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.title,this.state.Description);
        const token = sessionStorage.getItem('myData');
        // console.log(token);
            let post_data = {
                title: this.state.title,
                description: this.state.Description,
                status : this.state.Status,
                priority : this.state.Priority,
            };
            fetch('http://127.0.0.1:8000/tasks/',{
                method:'post',
                body: JSON.stringify(post_data),
                headers:{
                    "Content-Type": "application/json",
                    'Authorization' : 'Token ' + token
                }
            })
                .then(data => {
                    console.log(data.status);
                    if(data.status == 201){
                        window.location.reload();
                    }
                    else{
                        alert('In Correct Data, Please use choices!!!!!');
                    }
                }).catch(error => {
                    console.log(error);

            })
        }

    render(){

         this.state.datas.map((data,i) =>{
            data.map(item => {
                 console.log(item);
             })
         })
        return(
            <div className='taskStyle'>
                <Header />
                {/*<div class="page-header">*/}
                    {/*<h1>Task Listing </h1>*/}
                {/*</div>*/}
                <form onSubmit={this.handleSubmit}>

                    <div className="login-input-item">
                        <input className="login-user-input"
                               id="title"
                               placeholder="Title"
                               onChange={e => this.setState({title : e.target.value})}
                        />
                    </div>

                    <div className="login-input-item">
                        <input className="login-user-input"
                               id="Description"
                               placeholder="Description"
                               onChange={e => this.setState({Description : e.target.value})}
                        />
                    </div>

                    <div className="login-input-item">
                        <input
                               className="login-user-input"
                               id="Status"
                               aria-describedby="emailHelp"
                               placeholder="Status Choices: Initiated Completed Deferred Ignored"
                               onChange={e => this.setState({Status : e.target.value})}
                        />
                    </div>

                    <div className="login-input-item">
                        <input
                               className="login-user-input-password login-user-input"
                               id="Priority"
                               placeholder="Priority Choices: Low Medium High"
                               onChange={e => this.setState({Priority : e.target.value})}
                        />
                    </div>

                    <button type="submit" className="buttonStyle" onSubmit={e => e.preventDefault()}>Add Task</button>

                </form>

                {this.state.datas.map((data,i) => {
                    return data.map((item) =>{
                         return (
                             <div className='displayName displayStyle' key={item.id}>
                                 <div className='displayStyle'>
                                     <h6><b>{item.title}</b></h6>
                                     <div className='desStyle'>{item.title}</div>
                                     <div>{item.desc}</div>
                                     {/*<div>DUE-DATE: {item.due_date}</div>*/}
                                     <div className='desStyle'><b>Status </b> {item.status}</div>
                                     <div className='desStyle'><b> Priority </b> {item.priority}</div>
                                     <div className='desStyle'> <b>Created on  </b>{item.created_on}</div>
                                 </div>
                             </div>
                         )

                    })
                })}
            </div>
        );
    }
}

export default TaskList;