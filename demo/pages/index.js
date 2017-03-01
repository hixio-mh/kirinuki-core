import Head from "katatema/head";
import React from "react";
import MicroContainer from "react-micro-container";
const kirinuki = require("../lib/kirinuki.standalone");
import Previewer from "../components/previewer";
import JsonEditor from "../components/json-editor";
import HtmlEditor from "../components/html-editor";
import { heroNews } from "../examples/mock-html";
import {
  defaultSchema,
  nameRuleSchema,
  unfoldRuleSchema,
  rootRuleSchema
} from '../examples/mock-schema'

import { Header, Container, Button, Grid } from "semantic-ui-react";
import Style from "./main.scss";

export default class Index extends MicroContainer {
  constructor(props, context) {
    super(props, context);
    this.state = {
      json: JSON.stringify(defaultSchema, null, 4),
      result: {},
      html: heroNews,
      loading: false
    }
  }

  componentDidMount() {
    this.subscribe({
      updateJson: this.updateJson,
      updateHtml: this.updateHtml,
    });
  }

  updateJson(str) {
    this.setState({ json: str });
  }

  updateHtml(str) {
    this.setState({ html: str });
  }

  querySchema() {
    try {
      return JSON.parse(this.state.json)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  updateNameRuleSchema () {
    this.updateSchema(nameRuleSchema)
  }

  updateUnfoldRuleSchema () {
    this.updateSchema(unfoldRuleSchema)
  }

  updateRootRuleSchema () {
    this.updateSchema(rootRuleSchema)
  }

  updateSchema (schma) {
    this.setState({json: JSON.stringify(schma, null, 4) })
  }

  parse() {
    const result = kirinuki(this.querySchema(), this.state.html)
    console.table(result)
    this.setState({ result: result })
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
          <link rel="stylesheet" href="http://esironal.github.io/cmtouch/lib/codemirror.css" />
          <link rel="stylesheet" href="http://esironal.github.io/cmtouch/addon/hint/show-hint.css" />
        </Head>
        <Style />

        <Container text>
          <Header as='h1'>Kirinuki</Header>
          <p>
            Kirinuki is a library that convert any html to JSON using CSS selectors.
          </p>
          <Header as='h2'>features</Header>

          <p>
            * Kirinuki is automatically convert data type by query key naming rules.(singular form or a plural form)
            <br />
            <a onClick={this.updateNameRuleSchema.bind(this)}>try it!</a>
          </p>
          <p>
            * Support nesting schema. if schema has '_unfold' property unfold a plain object with array of value into a array with plain object
            <br />
            <a onClick={this.updateUnfoldRuleSchema.bind(this)}>try it!</a>
          </p>
          <p>
            * root path
            <br />
            <a onClick={this.updateRootRuleSchema.bind(this)}>try it!</a>
          </p>

        </Container>

        <Container>
          <Header as='h2'>Demo</Header>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3"> Query Schema </Header>
                <JsonEditor dispatch={this.dispatch} json={this.state.json} />
                <hr />
                <Header as="h3"> Target HTML </Header>
                <HtmlEditor dispatch={this.dispatch} html={this.state.html} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3"> Result view (Please open the developer console) </Header>
                <Previewer dispatch={this.dispatch} json={this.state.result} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
              <Grid.Column width={16} textAlign={"center"}>
                <Button fluid primary loading={this.state.loading} onClick={this.parse.bind(this)}>parse</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}
