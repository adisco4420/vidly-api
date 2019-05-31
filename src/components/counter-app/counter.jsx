import React, { Component } from 'react';

class Counter extends Component {
    state = { count: 0 }
    formatCount(count) {
        return  count === 0 ?  'Zero' : count
    }
    getBadgeColor(count) {
        return count === 0 ? `badge-warning`: 'badge-info'
    }
    handleCount = () => {
        this.setState({count: this.state.count + 1})
    }
    render() { 
        return (
            <div className="container p-4">
                <span className={`badge  mr-3 ${this.getBadgeColor(this.state.count)}`}>{this.formatCount(this.state.count)}</span>
                <button onClick={this.handleCount} className="btn btn-secondary btn-sm">Increment</button>
            </div>
          );
    }

}
 
export default Counter;