import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, UserHome, Signup} from './components'
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
        </Switch>

        {isLoggedIn && (
          //only avaliable after user logs in
          <Switch>
            <Route exact path="/userhome" component={UserHome} />
          </Switch>
        )}
      </>
    )
  }
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
