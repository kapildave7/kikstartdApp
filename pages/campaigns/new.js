import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMsg: "",
    buttonLoader: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ buttonLoader: true, errorMsg: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/"); //redirect to home page
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
    this.setState({ buttonLoader: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campagin</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="Wei"
              labelPosition="right"
              placeholder="please add amount in wie"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!!" content={this.state.errorMsg} />
          <Button primary loading={this.state.buttonLoader}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
