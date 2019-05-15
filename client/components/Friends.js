import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyFriends, searchFriend} from '../store/user'
import {postNotif} from '../store/notifications'
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardGroup,
  CardTitle,
  Form,
  Label,
  Input,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'

class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      collapse: false,
      modal: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount() {
    this.props.getMyFriends(this.props.userId)
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.searchFriend(this.state.username)
  }

  toggleCollapse() {
    this.setState(prevState => ({collapse: !prevState.collapse}))
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  handleAdd() {
    this.props.postNotif({
      content: `${this.props.user.username} wants to add you as a friend`,
      invite: 'friend',
      userId: this.props.search.id,
      senderId: this.props.userId
    })
  }

  render() {
    if (!this.props.friends) {
      this.props.friends = []
    }

    return (
      <>
        <CardGroup>
          {this.props.friends.map(friend => (
            <>
              {/* <Card> */}
              <CardBody>
                <CardTitle>
                  <Button close />
                </CardTitle>
                <CardText>
                  <div className="circle_image_friend">
                    <img src={friend.image} width="100" id="friendsPic" />
                  </div>
                  <p>
                    {friend.firstName} {friend.lastName}
                  </p>
                </CardText>
              </CardBody>
              {/* </Card> */}
            </>
          ))}
        </CardGroup>
        <h3 className="header">Add Friend:</h3>
        <Form onSubmit={this.handleSubmit}>
          <Label for="friendSearch">Search:</Label>
          <Input
            id="addFriend"
            placeholder="Search Username"
            name="username"
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            onClick={this.toggleCollapse}
            outline
            color="info"
          >
            Search Friend
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <img src={this.props.search.image} width="110" />
                <p>
                  {this.props.search.firstName} {this.props.search.lastName}
                </p>
                <Button onClick={this.toggleModal}>Add Friend</Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggleModal}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggleModal}>
                    Add Friend?
                  </ModalHeader>
                  <ModalBody>
                    Do you want to add this person as a friend?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={event => {
                        this.handleAdd()
                        this.toggleModal()
                        this.toggleCollapse()
                      }}
                    >
                      Yes
                    </Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Collapse>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  search: state.user.search,
  friends: state.user.friends,
  userId: state.user.user.id,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  getMyFriends: userId => dispatch(getMyFriends(userId)),
  searchFriend: username => dispatch(searchFriend(username)),
  postNotif: newNotif => dispatch(postNotif(newNotif))
})

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
