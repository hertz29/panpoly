import React, { Component } from 'react';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    scheduleCycle: 'single',
    jobType: 'A',
    executionTime: 10,
    cleanUp : 'none',
    results : []
  };

  
  handleSubmit = async e => {
    e.preventDefault();

    // if(this.state.executionTime.match(/^[0-9]+$/) === null){
    //   this.setState({ responseToPost: 'Try Again - execution time is not a number' });
    //   return
    // }

    try{
      const response = await fetch('http://localhost:5000/jobs/createJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job:{
            type : this.state.jobType,
            schedule : this.state.scheduleCycle,  
            executionTime : this.state.executionTime,
            cleanUp : this.state.cleanUp
          } 
        }),
      });
      const body = await response.text();
      this.setState({ responseToPost: body });
  }catch(err){
      console.log('errr');
  }
  };

  handleGetJobLogger = async e => {
    e.preventDefault();

    try{
      const response = await fetch('http://localhost:5000/jobs/getLogs', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.text();
      let logs = body.split(',');
      this.setState({ results : logs });
  }catch(err){
      console.log(`err is ${err.toString()}`);
  }
  };

render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <p>
            <label>Job Type</label>
            <select value={this.state.scheduleCycle} onChange={ e => this.setState({jobType: e.target.value})}>
              <option defaultValue='A'>Type A</option>
              <option value='B'>Type B</option>
              <option value='C'>Type C</option>
              <option value='D'>Type D</option>      
            </select>
          </p>
          <p>
            <label>Job Schedule</label>
            <select value={this.state.scheduleCycle} onChange={ e => this.setState({scheduleCycle: e.target.value})}>
              <option defaultValue='single'>None</option>
              <option value='1'>1 Hour</option>
              <option value='2'>2 Hours</option>
              <option value='6'>6 Hours</option>
              <option value='12'>12 Hours</option>
            </select>
          </p>
          <p>
            <label>Exection Time</label>
           <input type='text' value={this.state.executionTime} onChange=
              {e =>{
                  console.log(e.target.value.length);
                  var lastChar = e.target.value.substr(e.target.value.length - 1);
                  if(lastChar >= '0' && lastChar <= '9'){
                    this.setState({executionTime: e.target.value});
                    this.setState({responseToPost: ''});

                  }else{
                    this.setState({executionTime: ''});
                    this.setState({responseToPost: 'Invalid charcter, please try again'});
                  }
                }
              } 
            />
          </p>
          <p>
          <label>Clean Process</label>
            <select value={this.state.cleanUp} onChange={ e => this.setState({cleanUp: e.target.value})}>
              <option defaultValue='none'>None</option>
              <option value='Perform'>Perform</option>
            </select>
          </p>
          <button type="submit">Submit</button>
          <br></br>
          <p>{this.state.responseToPost}</p>
        </form>

        <button type="submit" onClick={
          e => {
            this.handleGetJobLogger(e);
        }}>Click Here To Receive Jobs Logger</button>
        <p> {this.state.results} </p>
      </div>
    );
  }
}

export default App;