import React, { Component } from "react";
import SidebarContents from "../SidebarContents";

class ResponsiveSidebar extends Component {
  render() {

    return (
      <div style={{
        position: "fixed",
        top: 50,
        left: 0,
        bottom: 0,
        width: 225,
        overflow: "auto", 
        background: "#2e3648"
      }} >
        <div style={{
          // position:"absolute", 
          left:0,
          right:10,
          top:0,
          bottom:0
        }}>
          <SidebarContents/>
        </div>
      </div>
    )
  }
}

export default ResponsiveSidebar;