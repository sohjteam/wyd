import React, {Component} from 'react'
import {connect} from 'react-redux'
import groups, {getMyGroups} from '../store/groups'
import {Container, Row, Col} from 'reactstrap'

class Groups extends Component {
  componentDidMount() {
    this.props.getMyGroups(this.props.userId)
  }

  render() {
    if (!this.props.myGroups) {
      this.props.myGroups = []
    }

    return (
      <Container>
        <Col s="auto">
          <h1 className="title">My Groups</h1>
          {this.props.myGroups.map(group => (
            <div key={group.id}>
              <h1 className="header">Group: </h1>
              <img src={group.image} width="150" />
              <p>{group.name}</p>
            </div>
          ))}
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  myGroups: state.groups.groups
})

const mapDispatchToProps = dispatch => ({
  getMyGroups: userId => dispatch(getMyGroups(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
