const db = require('./server/db')
const {Event, Notification, Group, User} = require('./server/db/models')
const Friend = db.models.friends
const GroupUser = db.models.groupUsers
const EventUser = db.models.eventUsers

const users = [
  {
    firstName: 'Bob',
    lastName: 'Smith',
    username: 'bobbyboi',
    email: 'bob@email.com',
    password: '123',
    image: 'bob.jpeg'
  },
  {
    firstName: 'Phil',
    lastName: 'Dumphy',
    username: 'pheel',
    email: 'phil@email.com',
    password: '123',
    image: 'phil.jpeg'
  },
  {
    firstName: 'Latte',
    lastName: 'Zhao',
    username: 'lattegrandepls',
    email: 'latte@email.com',
    password: '123',
    image: 'latte.jpeg'
  }
]

const friends = [
  {
    userId: 1,
    friendId: 2
  },
  {
    userId: 2,
    friendId: 1
  },
  {
    userId: 1,
    friendId: 3
  },
  {
    userId: 3,
    friendId: 1
  }
]

const groups = [
  {
    name: 'Da Business',
    password: '123',
    image: 'dabusiness.jpeg'
  },
  {
    name: 'Da Computer',
    password: '123',
    image: 'dacomputer.jpeg'
  }
]

const events = [
  {
    name: 'study with us',
    type: 'Study Group',
    link: '',
    location: 'some cafe',
    startDate: new Date(2019, 3, 12, 10, 30, 0, 0),
    endDate: new Date(2019, 3, 12, 12, 30, 0, 0),
    groupId: 1
  },
  {
    name: 'women meetup',
    type: 'Meet Up',
    link: '',
    location: 'NYC',
    groupId: 1
  },
  {
    name: 'study Group woot',
    type: 'Study Group',
    link: '',
    location: 'my house',
    startDate: new Date(2019, 3, 20, 10, 30, 0, 0),
    endDate: new Date(2019, 3, 20, 15, 30, 0, 0),
    groupId: 2
  }
]

const notifications = [
  {
    content: 'new study group created',
    userId: 1,
    invite: 'group'
  },
  {
    content: 'someone wants to add you as friend',
    userId: 3,
    invite: 'friend'
  }
]

const groupUsers = [
  {
    groupId: 1,
    userId: 2
  },
  {
    groupId: 1,
    userId: 1
  },
  {
    groupId: 2,
    userId: 1
  },
  {
    groupId: 2,
    userId: 3
  }
]

const eventUsers = [
  {
    eventId: 1,
    userId: 1
  },
  {
    eventId: 1,
    userId: 2
  },
  {
    eventId: 2,
    userId: 1
  },
  {
    eventId: 3,
    userId: 3
  },
  {
    eventId: 3,
    userId: 1
  }
]

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(friends.map(friend => Friend.create(friend)))
  await Promise.all(groups.map(group => Group.create(group)))
  await Promise.all(events.map(event => Event.create(event)))
  await Promise.all(
    notifications.map(notification => Notification.create(notification))
  )
  await Promise.all(groupUsers.map(groupUser => GroupUser.create(groupUser)))
  await Promise.all(eventUsers.map(eventUser => EventUser.create(eventUser)))

  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error('Oh noes! Something went wrong!')
  console.error(err)
  db.close()
})
