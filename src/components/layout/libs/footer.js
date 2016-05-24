import React from 'react'
import { Footer as FooterContainer } from './container'

class Footer extends React.Component {

  styles = {
    container: {
      position: 'absolute',
      width: '100%',
      height: 60,
      textAlign: 'center',
      padding: 10,
      bottom: 0
    }
  }

  componentWillMount() {
    document.body.style.paddingBottom = `${60}px`
  }

  render() {
    return (
      <FooterContainer style={ this.styles.container } className="clearfix">
        zhanjiaxia@163.com
      </FooterContainer>
    )
  }
}

export default Footer