import React from 'react'
import { CardDeck, Card, Button } from 'react-bootstrap'

class Home extends React.Component {

  render() {
    return (
      <div>
        <h1>Easy to use, but Powerful</h1>
        <p className="fontLato center marginBottom">
          Finance Calculators will help you understand your financial products better.
        </p>
        <CardDeck>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/mortgage.png")}/>
            <Card.Body>
              <Card.Title><b>Mortgage Calculator</b></Card.Title>
              <Card.Text>
                Estimate how much your mortgage payment amout will be and how principal and interest calculated on each payment.
              </Card.Text>
              <Button variant="warning" href="/mortgage">Calculate</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/car.png")}/>
            <Card.Body>
              <Card.Title><b>Loan Calculator</b></Card.Title>
              <Card.Text>
                Estimate how much your loan payment amout will be and how principal and interest calculated on each payment.
              </Card.Text>
              <Button variant="warning" href="/loan">Calculate</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/saving.png")}/>
            <Card.Body>
              <Card.Title><b>Savings Calculator</b></Card.Title>
              <Card.Text>
                Estimate how much your investment will be worth after a certain period.
              </Card.Text>
              <Button variant="warning" href="/savings">Calculate</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/retirement.png")}/>
            <Card.Body>
              <Card.Title><b>Retirement Calculator</b></Card.Title>
              <Card.Text>
                Estimate how much your retirement account will be worth at retirement and how much pension income it will provide each year.
              </Card.Text>
              <Button variant="warning" href="/retirement">Calculate</Button>
            </Card.Body>
          </Card>
        </CardDeck>

      </div>
    )
  }
  
}

export default Home
