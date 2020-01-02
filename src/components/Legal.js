import React from 'react'
import { Card } from 'react-bootstrap'

export default class Legal extends React.Component {

  render() {

    return (
        <div className="smallContainer">
            <p className="pageTitle">Disclaimers & Privacy Policy</p>

            <Card><Card.Body>
                <p className="fontRailway"><b>Disclaimer</b></p>
                <p>
                    Information and interactive calculators are made available to you only as self-help tools for your independent use. We do not guarantee their applicability or accuracy in regards to your individual circumstances.
                </p>
                <p>
                    We will not be liable for any losses or damages arising from any action or decision made by you in reliance on any information or results.
                </p>

                <p className="fontRailway"><b>Privacy Policy</b></p>
                <p>
                    This web site uses Google Analytics to analyze how users use the site. Google Analytics use cookies which has information about how long you used the site and what type of device was used, etc.
                </p>
            </Card.Body></Card>
        </div>
    )
  }

}
