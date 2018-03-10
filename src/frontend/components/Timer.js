import React from 'react'

const Timer = props => (
  <section className='section timer'>
    <p className='text timer__text'>
      { props.display }
    </p>
  </section>
)

export default Timer
