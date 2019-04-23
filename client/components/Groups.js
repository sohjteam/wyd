import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleGroup from './SingleGroup'
import {getMyGroups} from '../store/groups'
import {
  Container,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row
} from 'reactstrap'
import classnames from 'classnames'

class Groups extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: 'all'
    }
  }

  componentDidMount() {
    this.props.getMyGroups(this.props.userId)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    if (!this.props.myGroups) {
      this.props.myGroups = []
    }
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({active: this.state.activeTab === 'all'})}
              onClick={() => {
                this.toggle('all')
              }}
            >
              All
            </NavLink>
          </NavItem>
          {this.props.myGroups.map(group => (
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === group.id
                })}
                onClick={() => {
                  this.toggle(group.id)
                }}
              >
                {group.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={this.state.activeTab}>
            {this.state.activeTab !== 'all' ? (
              <SingleGroup groupId={this.state.activeTab} />
            ) : (
              <Container>
                <Col s="auto">
                  <h1 className="title">My Groups</h1>
                  {this.props.myGroups.map(group => (
                    <div key={group.id}>
                      <h1 className="header">Group: </h1>
                      {/* <Link to={`/groups/${group.id}`}> */}
                      <img src={group.image} width="150" />
                      <p>{group.name}</p>
                      {/* </Link> */}
                    </div>
                  ))}
                </Col>
              </Container>
            )}
          </TabPane>
        </TabContent>
      </div>
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
