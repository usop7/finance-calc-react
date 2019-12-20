import React from 'react'
import { Card } from 'react-bootstrap'

export default class Legal extends React.Component {

  render() {

    return (
        <div className="smallContainer">
            <div className="pageTitle">Legal Disclaimers</div>
            <Card><Card.Body>
                <p>
                    Calculation is based on the accuracy and completeness of the data you have entered, is for illustrative and general information purposes only, and is not intended to provide specific financial or other advice, and should not be relied upon in that regard.
                </p>
                <p>
                    Kim's Finance does not make any express or implied warranties or representations with respect to any information or results in connection with the calculator. Kim's Finance will not be liable for any losses or damages arising from any errors or omissions in any information or results, or any action or decision made by you in reliance on any information or results.
                </p>
            </Card.Body></Card>
        </div>
    )
  }

}
