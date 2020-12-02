import React, { Component } from 'react';

class Calculator extends Component {
  state = {
    newValue: 0,
    tempValue: 0,
    operation: '',
    clear: 'C'
  }

  handleInput = (e) => {
    const { newValue } = this.state;

    const { value } = e.target;

    if (value === '.' && newValue.length > 0) {
      const digits = newValue.split('');

      if (digits.find(digit => digit === '.')) {
        return;
      }
    } else if (value === '0') {
      if (newValue === 0) {
        return;
      }
    }

    this.setState({
      newValue: newValue === 0 ? value : newValue + value,
    });
  }

  handleResult(operation) {
    this.setState({ operation: '' });

    const { tempValue, newValue } = this.state;

    switch (operation) {
      case '+':
        this.setState({
          tempValue: 0,
          newValue: Number(tempValue) + Number(newValue),
        });
        break;

      case '-':
        this.setState({
          tempValue: 0,
          newValue: Number(tempValue) - Number(newValue),
        });
        break;

      case 'x':
        this.setState({
          tempValue: 0,
          newValue: Number(tempValue) * Number(newValue),
        });
        break;

      case '/':
        this.setState({
          tempValue: 0,
          newValue: tempValue ? Number(tempValue) / Number(newValue) : '',
        });
        break;

      case '%':
        this.setState({
          tempValue: 0,
          newValue: Number(tempValue) === 0 ?
          newValue : (Number(tempValue) / 100) * Number(newValue)
        });
        break;

      default:
        break;
    }
  }

  handleOperation = e => {
    const { newValue, tempValue, operation } = this.state;

    const { value } = e.target;

    switch (value) {
      case 'C':
        this.setState({ newValue: 0, tempValue: 0, });
        break;

      case 'CE':
        this.setState({
          newValue: 0,
          tempValue: 0,
          operation: '',
          clear: 'C'
        });
        break;

      case '+':
        this.setState({
          tempValue: Number(tempValue) + Number(newValue),
          newValue: 0,
          operation: '+',
          clear: 'CE'
        });
        break;

      case '-':
        this.setState({
          tempValue: Number(tempValue) + Number(newValue),
          newValue: 0,
          operation: '-',
          clear: 'CE'
        });
        break;

      case '*':
        this.setState({
          newValue: 0,
          operation: 'x',
          clear: 'CE',
          tempValue: Number(tempValue) === 0 ?
            newValue : Number(tempValue) * Number(newValue),
        });
        break;

      case '/':
        this.setState({
          newValue: 0,
          operation: '/',
          clear: 'CE',
          tempValue: Number(tempValue) === 0 ?
            newValue : Number(tempValue) / Number(newValue),
        });
        break;

      case '+-':
        this.setState({
          newValue: newValue * (-1),
          clear: 'CE',
        });
        break;

      case '%':
        this.setState({
          newValue: 0,
          operation: '%',
          clear: 'CE',
          tempValue: Number(tempValue) === 0 ?
            newValue : (Number(tempValue) / 100) * Number(newValue),
        });
        break;

      default:
        if (newValue === 0) {
          return this.setState({
            newValue: tempValue,
            tempValue: '',
            operation: '',
          });
        }
        this.handleResult(operation);
        break;
    }
  }

  render() {
    const { tempValue, operation, newValue, clear } = this.state;

    return (
      <div className="calculator-container">
        <header>React Calculator</header>

        <div className="calculator">

          <div className="calculator-screen">
            <input id="secondary-screen" type="text" readOnly value={tempValue} />
            <div id="primary-screen">
              <label id="operation-label">{operation}</label>
              <input type="text" readOnly value={newValue} />
            </div>
          </div>

          <div className="calculator-body">
            <div className="row">
              <button className="operation" value={clear} onClick={this.handleOperation}>{clear}</button>
              <button className="operation" value="+-" onClick={this.handleOperation}>&plusmn;</button>
              <button className="operation" value="%" onClick={this.handleOperation}>%</button>
              <button className="operation" value="/" onClick={this.handleOperation}>&divide;</button>
            </div>
            <div className="row">
              <button value="7" className="number" onClick={this.handleInput}>7</button>
              <button value="8" className="number" onClick={this.handleInput}>8</button>
              <button value="9" className="number" onClick={this.handleInput}>9</button>
              <button className="operation" value="*" onClick={this.handleOperation}>x</button>
            </div>
            <div className="row">
              <button value="4" className="number" onClick={this.handleInput}>4</button>
              <button value="5" className="number" onClick={this.handleInput}>5</button>
              <button value="6" className="number" onClick={this.handleInput}>6</button>
              <button className="operation" value="-" onClick={this.handleOperation}>-</button>
            </div>
            <div className="row">
              <button value="1" className="number" onClick={this.handleInput}>1</button>
              <button value="2" className="number" onClick={this.handleInput}>2</button>
              <button value="3" className="number" onClick={this.handleInput}>3</button>
              <button className="operation" value="+" onClick={this.handleOperation}>+</button>
            </div>
            <div className="row">
              <button value="0" className="number" onClick={this.handleInput}>0</button>
              <button value="." className="number" onClick={this.handleInput}>.</button>
              <button className="operation" value="=" onClick={this.handleOperation}>=</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;