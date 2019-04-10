import React, {Component} from 'react'
import {connect} from 'react-redux'
import Calendar from 'react-big-calendar'

import moment from 'moment'

const localizer = Calendar.momentLocalizer(moment)

class SingleGroup extends Component {
  constructor() {
    super()
    this.state = {
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, 'days')),
          title: 'Some title'
        }
      ]
    }
  }

  render() {
    return (
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={this.state.events}
        style={{height: '100vh'}}
      />
    )
  }
}

export default SingleGroup
