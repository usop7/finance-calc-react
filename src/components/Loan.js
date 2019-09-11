import React from 'react'
import ScrollUpButton from 'react-scroll-up-button'
import { Form, Row, Col, Button, Table, Card } from 'react-bootstrap'
import { inputNumberFormat, uncomma, comma } from '../js/comma.js'

class Loan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loanAmount: '',
      rate: 0,
      term: 1,
      option: 'monthly',
      detail: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.doCalculation = this.doCalculation.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = (name == "loanAmount") ? inputNumberFormat(event.target.value) : event.target.value;
    this.setState({ [name]: value});
  }

  doCalculation(event) {
    event.preventDefault();
    
    // Variable Declaration
    const loan = uncomma(this.state.loanAmount);
    const rate = this.state.rate;
    const year = this.state.term;
    const option = this.state.option;
    
    // Calculation
    let balance = loan;
    
    let divider = 1;
    if (option === "monthly")
      divider = 12;
    else if (option === "bi-Weekly")
      divider = 26;
    else if (option === "weekly")
      divider = 52;

    const i = rate/divider/100;
    const v = 1/(1+i);
    const n = Math.trunc(year * divider);
    const formula = (1 - Math.pow(v, n)) / i;

    let result, totalPayment, totalInterest;

    if (i === 0)
      result = loan / n;
    else
      result = loan / formula;

    totalPayment = result * n;
    totalInterest = totalPayment - loan;

    var detailArray = this.state.detail;
    for (let t = 1; t <= n; t++)
    {
      let interest = balance * i;
      let principal = result - interest;
      balance = balance - principal;

      detailArray = detailArray.concat({
                                No: t, 
                                Principal: comma(Math.round(principal, 0)), 
                                Interest: comma(Math.round(interest, 0)), 
                                Balance: comma(Math.round(balance, 0))});
      
    }

    this.setState({ detail: detailArray });

    // Display Results
    document.getElementById("loanResultDiv").style.visibility = "visible";
    document.getElementById("loanTitle").innerHTML = `Your ${option} loan payment will be `;
    document.getElementById("loanResult").innerHTML = '$' + comma(Math.round(result, 0));


  }



  render () {
    return (
      <div>
        <div className="bigFont margin"><b>Loan Calculator</b></div>
        <Form onSubmit = {this.doCalculation}>
          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Loan Amount ($)
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                type="text" 
                name = "loanAmount" 
                placeholder="Loan Amount" 
                onChange = {this.handleInputChange}
                value = {this.state.loanAmount} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Interest Rate (%)
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                  type="number" 
                  step=".01"
                  name = "rate" 
                  placeholder="rate (%)" 
                  onChange = {this.handleInputChange}
                  min = "0" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Loan years
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                  type="number" 
                  name = "term" 
                  placeholder="years" 
                  onChange = {this.handleInputChange}
                  min = "1" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Payment Option
            </Form.Label>
            <Col sm={7}>
              <Form.Control as="select" name="option" value={this.state.option} onChange={this.handleInputChange}>
                <option value="monthly">Monthly</option>
                <option value="bi-Weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </Form.Control>
            </Col>
          </Form.Group>
    
          <Form.Group as={Row}>
            <Col sm={{ span: 7, offset: 5 }}>
              <Button type="submit" block>Calculate</Button>
            </Col>
          </Form.Group>
        </Form>
        
        <div id = "loanResultDiv">
          <Card>
            <Card.Body>
              <div id = "loanTitle" className="center"></div>
              <div id = "loanResult" className="center bigFont"></div>
            </Card.Body>
          </Card>
          <br/>
          <Table responsive>
            <tbody>
              <tr>
                <td>#</td>
                <td>Principal</td>
                <td>Interest</td>
                <td>Balance</td>
              </tr>
              {this.state.detail.map((row, index) => {
                return (
                    <tr key={index}>
                      <td>{row.No}</td>
                      <td>{row.Principal}</td>
                      <td>{row.Interest}</td>
                      <td>{row.Balance}</td>
                    </tr>
                )
              })}
            </tbody>
          </Table>
        </div> 

        <ScrollUpButton />

      </div>
    );
  }
}

export default Loan
