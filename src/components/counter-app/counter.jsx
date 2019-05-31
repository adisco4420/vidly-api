import React, { Component } from 'react';

class Counter extends Component {
    formatCount(count) {
        return  count === 0 ?  'Zero' : count
    }
    getBadgeColor(count) {
        return count === 0 ? `badge-warning`: 'badge-info'
    }
    render() { 
        return (
            <div className="p-2">
                <span className={`badge  mr-3 ${this.getBadgeColor(this.props.count.value)}`}>{this.formatCount(this.props.count.value)}</span>
                <button onClick={() => this.props.onCount(this.props.count)} className="btn btn-secondary btn-sm mr-2">+</button>
                <button disabled={this.props.count.value === 0} onClick={() => this.props.onDesc(this.props.count)} className="btn btn-secondary btn-sm">-</button>
                <button onClick={() => this.props.onDelete(this.props.count.id)} className="btn btn-danger btn-sm ml-2">Delete</button>
            </div>
          );
    }

}
 
export default Counter;