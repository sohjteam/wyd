import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, UserHome, Signup, Events, Groups, NotFound} from './components'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const {isLoggedIn} = this.props
    return (
      <>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          {isLoggedIn && (
            //only avaliable after user logs in
            <Switch>
              <Route exact path="/" component={UserHome} />
              <Route exact path="/userhome" component={UserHome} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          )}
          <Route exact path="*" component={Login} />
        </Switch>
      </>
    )
  }
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}
export default withRouter(connect(mapState, mapDispatch)(Routes))
