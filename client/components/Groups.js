import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import SingleGroup from './SingleGroup'
import {getMyGroups} from '../store/groups'
import Events from './Events'

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
  ModalBody,
  Card,
  CardTitle,
  CardText
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
              <div id="groupevent">
                <Container>
                  <Row>
                    <Col xs="6">
                      <h3 className="header">My Groups</h3>
                      <div id="groups">
                        {this.props.myGroups.map(group => (
                          <div key={group.id}>
                            <Card body id="cardgroup">
                              <CardTitle className="subHeader">
                                {' '}
                                {group.name}
                              </CardTitle>
                              <CardText>
                                <img src={group.image} width="50" />
                              </CardText>
                            </Card>

                            {/* <Link to={`/groups/${group.id}`}> */}
                            {/* </Link> */}
                          </div>
                        ))}
                        <Button id="buttonblue" onClick={this.toggleForm}>
                          Add Group
                          <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggleForm}
                          >
                            <ModalHeader toggle={this.toggleForm}>
                              Add New Group
                            </ModalHeader>
                            <ModalBody>
                              <GroupForm groupId={this.props.groupId} />
                            </ModalBody>
                          </Modal>
                        </Button>
                      </div>
                    </Col>

                    <Col xs="6">
                      <h3 className="header" id="eventsH3">
                        My Events
                      </h3>
                      <div id="events">
                        <Events />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
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
