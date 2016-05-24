import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

// (
//   <Page>
//     <Header />
//     <Body>
//       <Sidebar />
//       <Main>
//         <Main.Section>1</Main.Section>
//         <Main.Section>2</Main.Section>
//       </Main>
//     </Body>
//     <Footer />
//   </Page>
// )

export class Page extends Component {
  render = () =>
    <div className="page-container">{ this.props.children }</div>
}

export class Header extends Component {
  render = () =>
    <header className="show-grid header">{ this.props.children }</header>
}

export class Body extends Component {
  render = () =>
    <Grid>
      <Row className="show-grid body">{ this.props.children }</Row>
    </Grid>
}

export class Sidebar extends Component {
  render = () =>
    <Col xs={2} className="sidebar">
      <Row>{ this.props.children }</Row>
    </Col>
}

export class Main extends Component {
  render = () =>
    <Col xs={10} className="main">
      <Row>{ this.props.children }</Row>
    </Col>
}

export class Section extends Component {
  render = () =>
    <Col xs={12} {...getProps(this.props, 'section')}>{ this.props.children }</Col>
}

Main.Section = Section

export class Footer extends Component {
  render = () =>
    <footer {...getProps(this.props, 'footer')}>{ this.props.children }</footer>
}

function getProps(props = {}, className) {
  props = { ...props }
  if (props.className)
    props.className = [className, props.className].join(' ')
  else
    props.className = className
  return props
}