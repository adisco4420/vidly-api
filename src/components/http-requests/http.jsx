import React, { Component } from 'react';
import axios from 'axios';

axios.interceptors.response.use(null, error => {
    const { status } = error.response;
    switch (status) {
        case 404:
            // console.log('error');
            // return Promise.reject('neddn');
            return Promise.reject('bad input')
        case 401: 
            return Promise.reject('unauthorized ')
        default:
            return Promise.reject('sorry error occured')
    }
})

const API = 'https://jsonplaceholder.typicode.com/posts';

class HttpRequest extends Component {
    state = {
        data : null,
        showAddInput: false
    }
     componentDidMount() {
         this.getPosts();
    }
    getPosts = async ()  => {
        try {
            const res = await axios.get(API);
            this.setState({data: res.data.splice(0,20)})
        } catch (error) {
            console.log(error);
        }
    }
    handleDelete = async (id) => {
        try {
          const {data: posts } =  await axios.delete(`${API}/${880}/kk`);
            // throw error;s
            const data = [...this.state.data];
            const newData = data.filter(item => item.id !== id);
            console.log(posts);
            this.setState({data: newData})
        } catch (error) {
            console.log(error);
        }
    }
    createPost = async () => {
        const id = this.state.data.length++;
        const body = {title: 'tesunghhhfgh', body: 'jhdddddddddddhhdhdjldkldkdl'};
        try {
            const res = await axios.post(API, body);
            console.log(res.data);
            const data = this.state.data;
            // this.setState({data})
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    state = {  }
    render() { 
        const { data } = this.state;
        return (<div className="row">
            <div className="col-12 mb-2">
                <button onClick={() => this.createPost()} className="btn btn-primary">Add</button>
            </div>
            <div className="col-12">
                <Table data={data} onDelete={this.handleDelete} />
            </div>
        </div> );
    }
}
 
export default HttpRequest;


const Table = ({data, onDelete}) => {
    return ( 
    <React.Fragment>
    {!data && <h6>Loading...</h6>}
    {data && <table className="table">
        <thead><tr><td colSpan="12">Total Number of Post {data.length}</td></tr></thead>
        <thead>
            <tr>
                <th>Title</th>
                <th>Body</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {!data.length && <tr><td>No data</td></tr>}
            {data.length && data.map((item, i) => (
                <tr key={i}>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td><button onClick={() => onDelete(item.id)} className="btn btn-danger btn-sm">delete</button></td>
            </tr>
            ) )
            
            }
        </tbody>
    </table>}
    </React.Fragment>);
}
 
// export default Table;