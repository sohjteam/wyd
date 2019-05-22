import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import SingleGroup from './SingleGroup'
import {getMyGroups} from '../store/groups'
import {
  Container,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import classnames from 'classnames'
import GroupForm from './GroupForm'

const barStyle = {
  backgroundColor: 'white',
  fontFamily: ''
}

const linkStyle = {
  color: '#b7d1e1'
}

class Groups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'all',
      modal: false
    }
    this.toggle = this.toggle.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
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

  toggleForm() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    if (!this.props.myGroups) {
      this.props.myGroups = []
    }
    return (
      <div>
        <Nav tabs style={barStyle}>
          <NavItem>
            <NavLink
              style={linkStyle}
              href="#"
              className={classnames({active: this.state.activeTab === 'all'})}
              onClick={() => {
                this.toggle('all')
              }}
            >
              All
            </NavLink>
          </NavItem>
          {this.props.myGroups.map(group => (
            <NavItem key={group.id}>
              <NavLink
                style={linkStyle}
                href="#"
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
        <Button onClick={this.toggleForm}>
          Add Group
          <Modal isOpen={this.state.modal} toggle={this.toggleForm}>
            <ModalHeader toggle={this.toggleForm}>Add New Group</ModalHeader>
            <ModalBody>
              <GroupForm groupId={this.props.groupId} />
            </ModalBody>
          </Modal>
        </Button>
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
