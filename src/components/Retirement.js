import React from 'react'
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap'
import { inputNumberFormat, uncomma, comma } from '../js/comma.js'
import PieChart from 'react-minimal-pie-chart'
import { FaQuestionCircle, FaSquare } from "react-icons/fa"
import { 
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries} from 'react-vis';

export default class Retirement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startingAmount: '5,000',
      contribution: '200',
      rate: 4.5,
      term: 30,
      frequency: 'monthly',
      retirementYears: 25,
      retirementRate: 2.0,

      showResult: false,
      result: '',
      pension: '',
      totalInterest: 0,
      totalAmount: 0,
      detail_option: 0,
      savingsDetail: [],
      pensionDetail: [],
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleInputChange(event) {
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

  calculate(event) {
    event.preventDefault();
    
    // Variable Declaration
    const startingAmount = this.state.startingAmount === '' ? 0 : parseFloat(uncomma(this.state.startingAmount));
    const contribution = this.state.contribution === '' ? 0 : parseFloat(uncomma(this.state.contribution));
    const rate = this.state.rate === '' ? 0 : parseFloat(this.state.rate);
    const year = this.state.term === '' ? 0 : parseInt(this.state.term);
    const frequencyStr = this.state.frequency;
    const retirementRate = this.state.retirementRate === '' ? 0 : parseFloat(this.state.retirementRate);
    const retirementYears = this.state.retirementYears === '' ? 0 : parseFloat(this.state.retirementYears);

    // Compound
    let compound = 1;

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
    const i_f = ((Math.pow(1 + i, compound / frequency)) - 1);
    const s1 = (Math.pow(1 + i_f, frequency) - 1) / i_f;

    let result = startingAmount, totalPrincipal = startingAmount, totalInterest = 0, yearStart = 0;
    let savingsDetail = [];
    for (let t = 1; t <= year; t++) {
      totalPrincipal += (contribution * frequency);
      yearStart = result;
      result = result * Math.pow(1 + i, compound) + contribution * s1;
      totalInterest = result - totalPrincipal;

      savingsDetail = savingsDetail.concat({
        Year: t, 
        Principal: comma(Math.round(contribution * frequency, 0)),
        Interest: comma(Math.round(result - (contribution * frequency) - yearStart, 0)), 
        Balance: comma(Math.round(result, 0))
      });
    }

    // Pension Calculation
    const i_p = retirementRate/100;
    const v_p = (1 - Math.pow(1/(1+i_p), retirementYears)) / i_p * (1+i_p);
    const pension = result/v_p;
    let balance = result;
    let interest = 0;
    let pensionDetail = [];
    for (let t = 1; t <= retirementYears; t++) {
        interest = (balance - pension) * i_p;
        balance = balance - pension + interest;
  
        pensionDetail = pensionDetail.concat({
          Year: t, 
          Principal: comma(Math.round(pension, 0)),
          Interest: comma(Math.round(interest, 0)),
          Balance: comma(Math.round(balance, 0))
        });
    }

    // Display Results
    this.setState({
        showResult: true,
        result: comma(Math.round(result, 0)),
        totalPrincipal: comma(Math.round(totalPrincipal, 0)), 
        totalInterest: comma(Math.round(totalInterest, 0)),
        pension: comma(Math.round(pension, 0)),
        savingsDetail: savingsDetail,
        pensionDetail: pensionDetail,
      }, () => {
        const resultDiv = document.getElementById("resultDiv");
        resultDiv.scrollIntoView();
      });
  }

  render () {
    return (
      <div className="smallContainer">
        <div className="pageTitle">Retirement Calculator</div>
        <p className="fontRailway marginBottom"><b>
          Estimate how much your retirement asset will be worth at retirement and how much pension income it will provide each year.
        </b></p>
        <Form onSubmit = {this.calculate} method="get">
          <Form.Group as={Row}>
            <Form.Label column sm={6}>
              Amount currently in retirement account ($)
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                keyboardtype="number-pad"
                type="text" 
                name="startingAmount" 
                onChange={this.handleInputChange}
                value={this.state.startingAmount}
                min = "0" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={6}>
              Contribution amount and frequency
            </Form.Label>
            <Col>
              <Form.Control 
                keyboardtype="number-pad"
                type="text" 
                name="contribution" 
                onChange={this.handleInputChange}
                value={this.state.contribution}
                min = "0" />
            </Col>
            <Col>
              <Form.Control as="select" name="frequency" value={this.state.frequency} onChange={this.handleInputChange}>
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
                <option value="quaterly">Quaterly</option>
                <option value="annually">Annually</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={6}>
              Number of years until retirement
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                  keyboardtype="number-pad"
                  type="number" 
                  name="term" 
                  value={this.state.term}
                  onChange={this.handleInputChange}
                  min = "0" />
            </Col>
          </Form.Group>
    
          <Form.Group as={Row}>
            <Form.Label column sm={6}>
              Rate of return before retirement (%) &nbsp;
              <span 
                onClick={() => alert("The expected annual rate of return for your retirement asset while you're working.")}
                className="bigFont"
              >
                <FaQuestionCircle />
              </span>
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                  keyboardtype="decimal-pad"
                  type="number" 
                  step="any"
                  name="rate" 
                  value={this.state.rate}
                  onChange = {this.handleInputChange}
                  min = "0" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={6}>
              Estimated number of years in retirement
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                  keyboardtype="number-pad"
                  type="number" 
                  name="retirementYears" 
                  value={this.state.retirementYears}
                  onChange={this.handleInputChange}
                  min = "0" />
            </Col>
          </Form.Group>
    
          <Form.Group as={Row}>
            <Form.Label column sm={6}>
              Rate of return while retired (%) &nbsp;
              <span 
                onClick={() => alert("The expected annual rate of return for your retirement account after retirement, while receiving pension.")}
                className="bigFont"
              >
                <FaQuestionCircle />
              </span>
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                  keyboardtype="decimal-pad"
                  type="number" 
                  step="any"
                  name="retirementRate" 
                  value={this.state.retirementRate}
                  onChange = {this.handleInputChange}
                  min = "0" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 6, offset: 6 }}>
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
      const retirementYear = this.state.term;
      const endYear = retirementYear + this.state.retirementYears;
      const numResult = parseFloat(Math.round(uncomma(result)/1000, 0));
      const chartData = [
        { title: 'Principal', value: parseFloat(uncomma(principal)), color: '#87c0c4' },
        { title: 'Interest', value: parseFloat(uncomma(interest)), color: '#ffc74f' },
      ];
      return (
        <div id="resultDiv">
          <p className="sectionTitle">Results</p>
          <p>
            At retirement, your retirement savings will be worth <b>${result}</b>, which will provide an annual pension of <b>${this.state.pension}</b> for {this.state.retirementYears} years of your retirement.
          </p>
          <Card bg="light">
            <Card.Body>
            <Container>
                <Row>
                    <Col sm={6}>
                        <div className="center marginTop">Total retirement savings at retirement</div>
                        <h1 className="center">$ {result}</h1>
                    </Col>
                    <Col sm={6}>
                        <div className="center marginTop">Annual pension income</div>
                        <h1 className="center">$ {this.state.pension}</h1>
                    </Col>
                </Row>
            </Container>
            </Card.Body>
          </Card>

          <p className="sectionTitle">Retirement Savings</p>
          <p>
            Your estimated savings balance of <b>${result}</b> consists of principal and interest.<br/>
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

          <Card><Card.Body>
            <p className="marginTop marginBottom">
              <span className="fontPrimary"><FaSquare /></span> Working phase &nbsp; <span className="fontYellow"><FaSquare /></span> Retirement phase
            </p>
            <XYPlot width={300} height={250}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis title="Total Amount($K)"/>
              <AreaSeries
                className="area-elevated-series-1"
                color="#5CA4A9"
                data={[
                  {x: 0, y: 0},
                  {x: retirementYear, y: numResult}
                ]}
              />
              <AreaSeries
                className="area-elevated-series-2"
                color="#ffc74f"
                data={[
                  {x: retirementYear, y: numResult},
                  {x: endYear, y: 0}
                ]}
              />
          </XYPlot>
        </Card.Body></Card>
        <div className="divider" />
          
          <Form>
              <div key="inline-radio" className="mb-3">
                <Form.Check 
                  inline 
                  name="schedule"
                  label="Before Retirement" 
                  type="radio" 
                  checked={this.state.detail_option === 0}
                  onChange={() => this.setState({detail_option: 0})}
                  id="radio-cycle"/>
                <Form.Check 
                  inline 
                  name="schedule"
                  label="After Retirement" 
                  type="radio" 
                  onChange={() => this.setState({detail_option: 1})}
                  id="radio-year"/>
              </div>
          </Form>
          <table className="tableAmortization">
            <tbody>
              <tr className="trAmortization tableHeader">
                <td>Year</td>
                <td>{this.state.detail_option === 0 ? "Contribution" : "Pension"}</td>
                <td>Interest</td>
                <td>Balance</td>
              </tr>
              <tr className="trAmortization">
                <td>Start</td>
                <td>{this.state.detail_option === 0 ?  this.state.startingAmount : ""}</td>
                <td></td>
                <td className="fontPrimary">{this.state.detail_option === 0 ? this.state.startingAmount : result}</td>
              </tr>
              {(this.state.detail_option === 0 ? this.state.savingsDetail : this.state.pensionDetail).map((row, index) => {
                return (
                    <tr key={index} className="trAmortization">
                      <td>{row.Year}</td>
                      <td>{row.Principal}</td>
                      <td>{row.Interest}</td>
                      <td className="fontPrimary">{row.Balance}</td>
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
