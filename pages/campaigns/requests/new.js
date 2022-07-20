import react, { Component } from "react";
import Layout from "../../../components/Layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    buttonLoader: false,
    errorMsg: "",
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    this.setState({ loading: true, errorMsg: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  };
  render() {
   
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create A Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({
                  description: event.target.value,
                })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value In Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) =>
                this.setState({
                  value: event.target.value,
                })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({
                  recipient: event.target.value,
                })
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

export default RequestNew;
