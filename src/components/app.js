import React, { Component } from 'react';
import Header from './layout/libs/header'
import Footer from './layout/libs/footer'
import { Page } from './layout/libs/container'

import '../theme'

class App extends Component {
  render() {
    const { body, header, footer, children } = this.props
    if (children)
      return <Page>{ children }</Page>
    return (
      <Page>
        { header || <Header/> }
        { body }
        {/* footer || <Footer/> */}
      </Page>
    )
  }
}

export default App