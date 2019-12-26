import React from 'react'
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap'
import { inputNumberFormat, uncomma, comma } from '../js/comma.js'
import PieChart from 'react-minimal-pie-chart'
import ReactTooltip from 'react-tooltip'
import { FaQuestionCircle } from "react-icons/fa"

export default class Rrsp extends React.Component 
{

  constructor(props) 
  {
    super(props);
    this.state = {
      startingAmount: '5,000',
      contribution: '200',
      rate: 3.5,
      term: 10,
      frequency: 'monthly',
      compound: 'annually',

      showResult: false,
      result: '',
      totalInterest: 0,
      totalAmount: 0,
      detail_option: 0,
      detail: [],
      detailCum: [],
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleInputChange(event) 
  {
    event.persist();
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'startingAmount' || name === 'contribution') {
        value = inputNumberFormat(value);
    }

    this.setState({
      [name]: value
    });
  }

  calculate(event) 
  {
    event.preventDefault();
    
    // Variable Declaration
    const startingAmount = this.state.startingAmount === '' ? 0 : parseFloat(uncomma(this.state.startingAmount));
    const contribution = this.state.contribution === '' ? 0 : parseFloat(uncomma(this.state.contribution));
    const rate = this.state.rate === '' ? 0 : parseFloat(this.state.rate);
    const year = this.state.term === '' ? 0 : parseInt(this.state.term);
    const frequencyStr = this.state.frequency;
    const compoundStr = this.state.compound;

    // Compound
    let compound = 1;
    if (compoundStr === "monthly")
      compound = 12;
    else if (compoundStr === "daily")
      compound = 365;
    else if (compoundStr === "quaterly")
      compound = 4;

    // Contribution
    let frequency = 1;
    if (frequencyStr === "monthly")
      frequency = 12;
    else if (frequencyStr === "weekly")
      frequency = 52;
    else if (frequencyStr === "bi-weekly")
      frequency = 26;
    else if (frequencyStr === "quaterly")
      frequency = 4;

    const i = rate/compound/100;
    const n = Math.trunc(year * compound);
    const i_f = ((Math.pow(1 + i, compound / frequency)) - 1);
    const s1 = (Math.pow(1 + i_f, frequency) - 1) / i_f * (1 + i_f);

    let result = startingAmount, totalPrincipal = startingAmount, totalInterest = 0, yearStart = 0;
    let detailArray = [];
    let detailCumArray = [];

    for (let t = 1; t <= year; t++) {
      totalPrincipal += (contribution * frequency);
      yearStart = result;
      result = result * Math.pow(1 + i, compound) + contribution * s1;
      totalInterest = result - totalPrincipal;

      detailCumArray = detailCumArray.concat({
        Year: t, 
        Principal: comma(Math.round(totalPrincipal, 0)),
        Interest: comma(Math.round(totalInterest, 0)), 
        Balance: comma(Math.round(result, 0))
      });

      detailArray = detailArray.concat({
        Year: t, 
        Principal: comma(Math.round(contribution * frequency, 0)),
        Interest: comma(Math.round(result - (contribution * frequency) - yearStart, 0)), 
        Balance: comma(Math.round(result, 0))
      });
    }

    // Display Results
    this.setState({
      showResult: true,
      result: comma(Math.round(result, 0)),
      n: n,
      totalPrincipal: comma(Math.round(totalPrincipal, 0)), 
      totalInterest: comma(Math.round(totalInterest, 0)),
      detail: detailArray,
      detailCum: detailCumArray,
    }, () => {
      const resultDiv = document.getElementById("resultDiv");
      resultDiv.scrollIntoView();
    });
  }

  render () {
    return (
      <div className="smallContainer">
        <div className="pageTitle">Savings Calculator</div>
        <p className="fontRailway marginBottom"><b>Quickly See What Your Investment Might Look Like In The Future</b></p>
        <Form onSubmit = {this.calculate} method="get">
          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Starting Amount ($)
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                keyboardtype="number-pad"
                type="text" 
                name="startingAmount" 
                onChange={this.handleInputChange}
                value={this.state.startingAmount} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Additional Contribution ($)
            </Form.Label>
            <Col>
              <Form.Control 
                keyboardtype="number-pad"
                type="text" 
                name="contribution" 
                onChange={this.handleInputChange}
                value={this.state.contribution} />
            </Col>
            <Col>
              <Form.Control as="select" name="frequency" value={this.state.frequency} onChange={this.handleInputChange}>
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
                <option value="quaterly">Quaterly</option>
                <option value="yearly">Yearly</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Years to Save
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                  keyboardtype="number-pad"
                  type="number" 
                  name="term" 
                  value={this.state.term}
                  onChange={this.handleInputChange} />
            </Col>
          </Form.Group>
    
          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Rate of Return (%) &nbsp;
              <a data-tip data-for='return'><FaQuestionCircle /></a>
              <ReactTooltip id='return' type='success' effect="solid">
                <span>The expected annual rate of return<br/> 
                for this investment or an interest rate<br/>for a savings account.</span>
              </ReactTooltip>
            </Form.Label>
            <Col sm={7}>
              <Form.Control 
                  keyboardtype="decimal-pad"
                  type="number" 
                  step="any"
                  name="rate" 
                  value={this.state.rate}
                  onChange = {this.handleInputChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={5}>
              Interest Compound&nbsp;
              <a data-tip data-for='compound'><FaQuestionCircle /></a>
              <ReactTooltip id='compound' type='success' effect="solid">
                <span>
                  It represents how often your savings<br/>
                  interest is compounded. For savings<br/>
                  accounts, it depends on your product<br/>
                  and you can check with your financial<br/>
                  institution to find it out. For stocks<br/>
                  and funds, you should usually choose<br/>
                  'Compound Annually'.</span>
              </ReactTooltip>
            </Form.Label>
            <Col sm={7}>
              <Form.Control as="select" name="compound" value={this.state.compound} onChange={this.handleInputChange}>
                <option value="annually">Compound Annually</option>
                <option value="quaterly">Compound Quaterly</option>
                <option value="monthly">Compound Monthly</option>
                <option value="daily">Compound Daily</option>
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
      const principal = this.state.totalPrincipal;
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
              <div className="center">Estimated Total Savings</div>
              <h1 className="center">$ {result}</h1>
              <p className="center">after {this.state.term} years</p>
            </Card.Body>
          </Card>

          <p className="sectionTitle">Results Summary</p>
          <p>
            Your estimated balance of <b>${result}</b> consists of principal and interest.<br/>
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
                <Col xs={6}><b>$ {result}</b></Col>
              </Row>
            </Container>
          </Card.Body></Card>

          <p className="sectionTitle">Balance by Year</p>          
          <Form>
              <div key="inline-radio" className="mb-3">
                <Form.Check 
                  inline 
                  name="schedule"
                  label="Each Year" 
                  type="radio" 
                  checked={this.state.detail_option === 0}
                  onChange={() => this.setState({detail_option: 0})}
                  id="radio-cycle"/>
                <Form.Check 
                  inline 
                  name="schedule"
                  label="Cumulative" 
                  type="radio" 
                  onChange={() => this.setState({detail_option: 1})}
                  id="radio-year"/>
              </div>
          </Form>
          <table className="tableAmortization">
            <tbody>
              <tr className="trAmortization tableHeader">
                <td>Year</td>
                <td>Balance</td>
                <td>Contribution</td>
                <td>Interest</td>
              </tr>
              <tr className="trAmortization">
                <td>Start</td>
                <td className="fontPrimary">{this.state.startingAmount}</td>
                <td>{this.state.startingAmount}</td>
                <td></td>
              </tr>
              {(this.state.detail_option === 0 ? this.state.detail : this.state.detailCum).map((row, index) => {
                return (
                    <tr key={index} className="trAmortization">
                      <td>{row.Year}</td>
                      <td className="fontPrimary">{row.Balance}</td>
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
