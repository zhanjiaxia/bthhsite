import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router'

class BC extends React.Component {
  
  renderWithPathList = () => {
    const pathList = this.props.pathList
    return pathList.map(path => 
      <Breadcrumb.Item active={true} key={ Math.random().toString() }>
        { path.href ? <Link to={path.href}>{path.text}</Link> : path.text }
      </Breadcrumb.Item>
    )
  }
  
  render() {
    const breadcrumbList = this.props.pathList ? this.renderWithPathList() : []
    return (
      <Breadcrumb>
        { breadcrumbList }
      </Breadcrumb>
    )
  }
}

export default BC