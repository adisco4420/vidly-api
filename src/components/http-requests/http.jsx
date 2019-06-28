import React, { Component } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

class HttpRequest extends Component {
    state = {
        data : null
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
    state = {  }
    render() { 
        const { data } = this.state;
        return (<div className="row">
            <div className="col-12 mb-2">
                <button className="btn btn-primary">Add</button>
            </div>
            <div className="col-12">
                <Table data={data} />
            </div>
        </div> );
    }
}
 
export default HttpRequest;


const Table = ({data}) => {
    console.log(data);
    return ( 
    <React.Fragment>
    {!data && <h6>Loading...</h6>}
    {data && <table className="table">
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
                <td><button className="btn btn-danger btn-sm">delete</button></td>
            </tr>
            ) )
            
            }
        </tbody>
    </table>}
    </React.Fragment>);
}
 
// export default Table;