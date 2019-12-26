import React from 'react'
import { Card } from 'react-bootstrap'

export default class Legal extends React.Component {

  render() {

    return (
        <div className="smallContainer">
            <div className="pageTitle">Legal Disclaimers</div>
            <Card><Card.Body>
                <p>
                    Information and interactive calculators are made available to you only as self-help tools for your independent use. We do not guarantee their applicability or accuracy in regards to your individual circumstances.
                </p>
                <p>
                    Kim's Finance will not be liable for any losses or damages arising from any errors or omissions in any information or results, or any action or decision made by you in reliance on any information or results.
                </p>
            </Card.Body></Card>
        </div>
    )
  }

}
