import React, { Component } from 'react';
import http from './service';
const API = 'https://jsonplaceholder.typicode.com/posts';

class HttpRequest extends Component {
    state = {
        data : null,
        showAddInput: false
    }
    async componentDidMount() {
         this.getPosts();
         const data = await http.getPosts(API);
        //  console.log(data);
    }
    getPosts = async ()  => {
        try {
            const res = await http.get(API);
            this.setState({data: res.data.splice(0,20)})
        } catch (error) {
            console.log(error);
        }
    }
    handleDelete = async (id) => {
        try {
          const {data: posts } =  await http.delete(`${API}/${880}/kk`);
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
            const res = await http.post(API, body);
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