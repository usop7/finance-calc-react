import React from 'react'
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap'
import { inputNumberFormat, uncomma, comma } from '../js/comma.js'
import PieChart from 'react-minimal-pie-chart';

export default class Loan extends React.Component 
{

  constructor(props) 
  {
    super(props);
    this.state = {
      loan: '10,000',
      rate: 5.1,
      term: 5,
      option: 'monthly',

      showResult: false,
      result: '',
      n: 0,
      loanAmount: 0,
      totalInterest: 0,
      totalPayment: 0,
      amortization_option: 0,
      detail: [],
      detailYear: [],
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleInputChange(event) 
  {
    event.persist();
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'loan') {
        value = inputNumberFormat(value);
    }

    this.setState({
      [name]: value
    },() => {
      if (name === "option" && this.state.result !== '') {
        this.calculate(event);
      }
    });
  }

  calculate(event) 
  {
    if (event !== null)
      event.preventDefault();
    
    // Variable Declaration
    const loan = this.state.loan === '' ? 0 : parseFloat(uncomma(this.state.loan));
    const rate = this.state.rate === '' ? 0 : parseFloat(this.state.rate);
    const year = this.state.term === '' ? 0 : this.state.term;
    const option = this.state.option;

    // Validation
    let isValid = false;
    console.log(loan, rate, year, option);
    if (loan === 0) {
      alert('Please fill in the Loan Amount');
    } else if (rate < 0) {
      alert('Interest Rate can not be a negative value')
    } else if (year === 0) {
      alert('Please fill in the loan years')
    } else {
      isValid = true;
    }

    if (!isValid) {
      return;
    }
    
    // Calculation
    let balance = loan;
    
    let divider = 1;
    if (option === "monthly")
      divider = 12;
    else if (option === "bi-weekly")
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

    // Calculate details
    let interest, principal, yearInterest = 0, yearPrincipal = 0;
    var detailArray = [];
    var detailArrayYear = [];
    for (let t = 1; t <= n; t++) {
      interest = balance * i;
      yearInterest += interest;
      principal = result - interest;
      yearPrincipal += principal;
      balance = balance - principal;

      detailArray = detailArray.concat({
        No: t, 
        Payment: comma(Math.round(result, 0)),
        Principal: comma(Math.round(principal, 0)), 
        Interest: comma(Math.round(interest, 0)), 
        Balance: comma(Math.round(balance, 0))});
                                
      if (t % divider === 0) {
        detailArrayYear = detailArrayYear.concat({
            No: t / divider,
            Payment: comma(Math.round(result * t, 0)),
            Principal: comma(Math.round(yearPrincipal, 0)), 
            Interest: comma(Math.round(yearInterest, 0)), 
            Balance: comma(Math.round(balance, 0))});
      }
      
    }

    // Display Results
    this.setState({
      showResult: true,
      result: comma(Math.round(result, 0)),
      n: n,
      loanAmount: comma(loan),
      totalInterest: comma(Math.round(totalInterest, 0)),
      totalPayment: comma(Math.round(totalPayment, 0)),
      detail: detailArray,
      detailYear: detailArrayYear,
    }, () => {
      const resultDiv = document.getElementById("resultDiv");
      resultDiv.scrollIntoView();
    });
  }

  render () 
  {
    return (
      <div className="smallContainer">
        <div className="pageTitle">Loan Calculator</div>
        <p className="fontRailway marginBottom"><b>Estimate how much your loan payment amout will be and how principal and interest calculated on each payment.</b></p>
        <Form onSubmit = {this.calculate} method="get">
          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Loan Amount ($)
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                keyboardtype="number-pad"
                type="text" 
                name="loan" 
                onChange={this.handleInputChange}
                onBlur={this.calculate}
                value={this.state.loan} />
            </Col>
          </Form.Group>
    
          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Interest Rate (%)
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                  keyboardtype="decimal-pad"
                  type="number" 
                  step="any"
                  name="rate" 
                  value={this.state.rate}
                  onChange = {this.handleInputChange}
                  onBlur={this.calculate} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Loan years
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                  keyboardtype="number-pad"
                  type="number" 
                  name="term" 
                  value={this.state.term}
                  onChange={this.handleInputChange}
                  onBlur={this.calculate} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Payment Frequency
            </Form.Label>
            <Col sm={7}>
              <Form.Control as="select" name="option" value={this.state.option} onChange={this.handleInputChange}>
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </Form.Control>
            </Col>
          </Form.Group>
    
          <Form.Group as={Row}>
            <Col sm={{ span: 7, offset: 5 }}>
              <Button variant="warning" type="submit" block>Calculate</Button>
            </Col>
          </Form.Group>
        </Form>
        <br/>
        {this._renderResult()}
      </div>
    );
  }

  _renderResult() {
    if (this.state.showResult) {
      const total = this.state.totalPayment;
      const principal = this.state.loan;
      const interest = this.state.totalInterest;
      const result = this.state.result;
      const chartData = [
        { title: 'Principal', value: parseFloat(uncomma(principal)), color: '#87c0c4' },
        { title: 'Interest', value: parseFloat(uncomma(interest)), color: '#ffc74f' },
      ];
      return (
        <div id="resultDiv">
          <Card bg="light">
            <Card.Body>
              <div className="center">Your <b>{this.state.option}</b> loan payment will be</div>
              <h1 className="center">$ {result}</h1>
              <p className="center">{this.state.n} payments ({this.state.term} years)</p>
            </Card.Body>
          </Card>

          <p className="sectionTitle">Loan Analysis</p>
          <p>
            Your total payment is calculated as <b>${total}</b> (${result} x {this.state.n} payments) which consists of principal and interest.<br/>
          </p>
          <Card><Card.Body>
            <PieChart
              data={chartData}
              style={{ height: '200px' }}
              label={({ data, dataIndex }) =>
                data[dataIndex].title + " " + Math.round(data[dataIndex].percentage) + '%'
              }
              labelPosition={50}
              labelStyle={{ fill: '#000', fontSize: '7px'}}
            />
            
            <div className='divider' />

            <Container>
              <Row>
                <Col xs={6} className="text-right">Principal</Col>
                <Col xs={6}>$ {principal}</Col>
              </Row>
              <Row>
                <Col xs={6} className="text-right">Interest</Col>
                <Col xs={6}>$ {interest}</Col>
              </Row>
              <Row>
                <Col xs={6} className="text-right"><b>Total</b></Col>
                <Col xs={6}><b>$ {total}</b></Col>
              </Row>
            </Container>
          </Card.Body></Card>

          <p className="sectionTitle">Amortization Schedule</p>          
          <p>
            Your {this.state.option} payment of <b>${this.state.result}</b> consists of <b>principal</b> and <b>interest</b> which change over time.<br/>
            As you pay off the loan, interest decreases and principal increases in each payment.
          </p>
          <br/>
          <Form>
              <div key="inline-radio" className="mb-3">
                <Form.Check 
                  inline 
                  name="schedule"
                  label="Each payment" 
                  type="radio" 
                  checked={this.state.amortization_option === 0}
                  onChange={() => this.setState({amortization_option: 0})}
                  id="radio-cycle"/>
                <Form.Check 
                  inline 
                  name="schedule"
                  label="Cumulative(yearly)" 
                  type="radio" 
                  onChange={() => this.setState({amortization_option: 1})}
                  id="radio-year"/>
              </div>
          </Form>
          <table className="tableAmortization">
            <tbody>
              <tr className="trAmortization tableHeader">
                <td>#</td>
                <td>Balance</td>
                <td>Payment</td>
                <td>Principal</td>
                <td>Interest</td>
              </tr>
              {(this.state.amortization_option === 0 ? this.state.detail : this.state.detailYear).map((row, index) => {
                return (
                    <tr key={index} className="trAmortization">
                      <td>{row.No}</td>
                      <td className="fontPrimary">{row.Balance}</td>
                      <td>{row.Payment}</td>
                      <td>{row.Principal}</td>
                      <td>{row.Interest}</td>
                    </tr>
                )
              })}
            </tbody>
          </table>
          <div className='divider' />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
