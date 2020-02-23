import React, { Component } from 'react'
import { Link } from 'gatsby';
import Menu from '../Menu';
import { getMenuState } from '../../store/selectors';
import { connect } from 'react-redux';
import Button from 'antd/lib/button'

class Header extends Component {

  render() {
    const { 
      siteTitle,
      sidebarDocked,
      menuOpen,
      nMenuItem,
    } = this.props
    
    return (
      <div
        style={{
            // position: "fixed",
            // top: 0,
          width: "100%",
          height: (menuOpen && !sidebarDocked) ? nMenuItem*32 + 50 : 50,
          // marginBottom: 20,
          background: '#ffffff',
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{
            margin: '0 auto',
            padding: '13px 22px',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{
            float: 'left',
            marginBottom: '10px',
          }}>
            <h1 style={{ margin: 0, fontSize: "1rem", borderBottom: 0,}}>
              <Link
                to="/"
                style={{
                  color: '#000000a6',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                {siteTitle}
              </Link>
            </h1>
          </div>

          <Menu sidebarDocked={sidebarDocked}/>

          <span style={{
            float: 'right',
            marginTop: -5,
          }}>      
            <a href="http://twitter.com/simplestaking" target="_blank" rel="noopener noreferrer">
              <Button icon="twitter"/>
            </a>
            <a href="http://github.com/simplestaking/tezedge" target="_blank" rel="noopener noreferrer">
              <Button icon="github"/>
            </a>
          </span>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
  }
}

export default connect(mapStateToProps) (Header);
