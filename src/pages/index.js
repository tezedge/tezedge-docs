import React from 'react'
import { Redirect } from '@reach/router'
// import Layout from '../components/Layout'
// import Button from 'antd/lib/button'
// import 'antd/lib/button/style/css'
// import { Link } from "gatsby"

const IndexPage = () => 
  <Redirect noThrow={true} to={`/get-started/quick-start`} />

// {
//   return (
//     <Layout>
//       <div>
//         <div align="center">
//         <br/>
//           <h2>Documentation</h2>
//           <h2>TezEdge</h2>
//           <br/>
//           <Link to="/get-started/introduction">
//             <Button size="large" icon="right-circle" style={{marginRight: 10}}>Get Started</Button>
//           </Link>
//           <Button size="large" icon="github" href="https://github.com/simplestaking/tezedge">Github</Button>
//         </div>
//       </div>
//     </Layout>
//   )
// }

export default IndexPage