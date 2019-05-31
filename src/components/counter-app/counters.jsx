import React, { Component } from "react";
import Counter from "./counter";
import Navbar from "./navbar";

class Counters extends Component {
  state = {
    counters: [{ id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 }]
  };
  handleDelete = counterId => {
    const counters = this.state.counters.filter(
      count => count.id !== counterId
    );
    this.setState({ counters });
  };
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  handleIncrement = count => {
    let index = this.state.counters.findIndex(val => val.id === count.id);
    let counters = this.state.counters;
    const newCounters = { ...count, value: count.value + 1 };
    counters[index] = newCounters;
    this.setState({ counters: counters });
  };
  handleDecrement = count => {
    let index = this.state.counters.findIndex(val => val.id === count.id);
    let counters = this.state.counters;
    const newCounters = { ...count, value: count.value - 1 };
    counters[index] = newCounters;
    this.setState({ counters: counters });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar counterLength={this.state.counters.length} />
        <div className="container p-2">
          <button
            onClick={this.handleReset}
            className="btn btn-primary btn-sm m-"
          >
            Reset
          </button>
          {this.state.counters.map(count => (
            <Counter
              key={count.id}
              onCount={this.handleIncrement}
              onDelete={this.handleDelete}
              onDesc={this.handleDecrement}
              count={count}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Counters;
