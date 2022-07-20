import React, { Component } from "react";
import { Input, Form, Message, Button } from "semantic-ui-react";
import Campagin from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    buttonLoader: false,
    errorMsg: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campagin(this.props.address);
    this.setState({ buttonLoader: true, errorMsg: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
    this.setState({ buttonLoader: false, value: "" });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
        <Form.Field>
          <label>Amount To Be Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(event) => {
              this.setState({ value: event.target.value });
            }}
          />
        </Form.Field>
        <Message error header="Oops!!" content={this.state.errorMsg} />
        <Button primary loading={this.state.buttonLoader}>
          contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
