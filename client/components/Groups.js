import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMyGroups} from '../store/groups'
import {
  Container,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import EventForm from './EventForm'

class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    this.props.getMyGroups(this.props.userId)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  render() {
    if (!this.props.myGroups) {
      this.props.myGroups = []
    }
    console.log('AYO', this.state.modal)
    return (
      <Container>
        <Col s="auto">
          <h1 className="title">My Groups</h1>
          {this.props.myGroups.map(group => (
            <div key={group.id}>
              <h1 className="header">Group: </h1>
              <Link to={`/groups/${group.id}`}>
                <img src={group.image} width="150" />
                <p>{group.name}</p>
              </Link>

              <Button onClick={this.toggle}>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Add An Event!</ModalHeader>
                  <ModalBody>
                    <EventForm groupId={group.id} />
                  </ModalBody>
                </Modal>
              </Button>
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
