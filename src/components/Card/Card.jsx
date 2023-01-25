import React, { useState } from 'react'
import './Card.css'
// import {AnimatedSharedLayout} from 'framer-motion'
const Card = (props) => {
    const [expanded,setExpanded] = useState(false)

  return (
     <div className="Card">
      <h1>Card</h1>
     </div>
    )
}

export default Card