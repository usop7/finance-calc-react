import React from 'react'
import { CardDeck, Card, Button, Image } from 'react-bootstrap'

class Home extends React.Component {

  render() {
    return (
      <div>
        <h1>Easy to use, but Powerful</h1>
        <p className="fontLato center">
          Finance Calculators help you make smart financial decisions
        </p>
        <CardDeck>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/mortgage.png")}/>
            <Card.Body>
              <Card.Title><b>Mortgage Calculator</b></Card.Title>
              <Card.Text>
                It calculates your estimated mortgage payment amount and amortization schedule.
              </Card.Text>
              <Button variant="warning" href="/mortgage">Calculate</Button>
              <div>
                <a href='https://play.google.com/store/apps/details?id=com.kimsfinance.mortgagecalculator&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='blank'>
                <Image src={require("../assets/images/google-play-badge.png")} className="appImage" /></a>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/car.png")}/>
            <Card.Body>
              <Card.Title><b>Loan Calculator</b></Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
                content.{' '}
              </Card.Text>
              <Button variant="warning" href="/loan">Calculate</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/saving.png")}/>
            <Card.Body>
              <Card.Title><b>Savings Calculator</b></Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
              </Card.Text>
              <Button variant="warning" href="/mortgage">Calculate</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/images/retirement.png")}/>
            <Card.Body>
              <Card.Title><b>RRSP Calculator</b></Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
              </Card.Text>
              <Button variant="warning" href="/mortgage">Calculate</Button>
            </Card.Body>
          </Card>
        </CardDeck>

      </div>
    )
  }
  
}

export default Home
