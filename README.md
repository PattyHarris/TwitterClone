# Twitter Clone

This project creates a very simple Twitter clone server.  The application is built using a combination of the expressJS framework, the Apollo Server, GraphQL, Typescript, and mongodb.  The server supports the following services:
1. Create user
2. Create user tweets
3. Create user followers
4. Retrieve user(s)
5. Retrieve tweets.  Here, the tweets for a user's followers are included and sorted by creation date.
   
As this is a GraphQL project, some of the queries and mutations available are listed below.  Instructions also include running the GraphQL queries using PostMan.  The GraphQL Sandbox will show all the queries and mutations that are not addressed in this `readme`.

# Prerequisites

- Node.JS v16+
- Package manager(npm or yarn)
- Mongodb

# Starting the app

Note: The commands below can be used with the equivalents on yarn

- After cloning the application, `cd` into the `server` folder and run `npm install`.
- Create a `.env` file following the format of the `.env.example` file and populate with your own values or use the values available in the `.env.example` file.  Only the port value is used at this time.  The port value is currently set to 9000.
- Run `npm run build` to build the application.
- Run `npm run start` to start the application

# Technologies used

The app is built on node js, using express+GraphQL as the framework of choice (e.g. MERNG stack). The database used for the project is mongoDB.

# Thought Process

This initial entry uses the MERNG stack, and provides a starting point for further development.  There is room for improvement in this starting point.  The schema design includes a separate schema for the followers of a given user.  There might be a better GraphQL-way for finding the tweets from a the user's followers, but the current schema works for now.

# Project Structure

The project is setup using the following structure:
- database: sets the connection to the database.  It currently assumes that you have a .env file present as indicated above.  The .env file simply includes the port, but could be expanded to include login credentials if the server were to connected to a mongodb on Atlas, for example.
- graphql: the resolvers for the users, tweets and followers.  Also includes the schema for these entities.  
- lib: contains the types specifications for the mongodb collections.

# GraphQL Queries and Mutations

Build and run the project.  Then head over to http://localhost:9000/api in your browser.  This will bring up the GraphQL Sandbox.  

1. Create a user:
```
   mutation {
        createUser(userName: "JD", firstName: "John", lastName: "Doe") {
            id
        }
    }
```
Ideally, GraphQL would return the created user, but unfortunately does not.

2. Show the users
   
   To see the list of users in the collection (here the id and userName are returned):
```
   query {
        users {
            id,
            userName
        }
   }
```
   Since we've created a single user:
```
   {
  "data": {
    "users": [
      {
        "id": "61a9513828de6b040c5bc5a2",
        "userName": "JD"
      }
    ]
  }
}
```

3. Create a tweet for this user:

```
mutation {
  createTweet(authorId: "61a9513828de6b040c5bc5a2", tweet: "John Doe's first tweet") {
    id
  }
}
```

4. Query John's tweets:

```
query {
  user(id: "61a9513828de6b040c5bc5a2") {
    id,
    userName,
    tweets {
      id,
      tweet
    }
  }
}
```

The output shows that John has a single tweet:

```
{
  "data": {
    "user": {
      "id": "61a9513828de6b040c5bc5a2",
      "userName": "JD",
      "tweets": [
        {
          "id": "61a955cd28de6b040c5bc5a3",
          "tweet": "John Doe's first tweet"
        }
      ]
    }
  }
}
```

5. To show the tweets of the users that John is following, we need to create a second user, create a tweet from that second user, and add that user to the followers collection:
   
- Create a user "JS":
  
```
mutation {
  createUser(userName: "JS", firstName: "Jane", 
             lastName: "Smith") {
               id
             }
}
```

- Create a tweet for JS:
  
```
mutation {
  createTweet(authorId: "61a9574528de6b040c5bc5a4", tweet: "Jane Smith's first tweet") {
    id
  }
}
```
- Add John as following Jane (meaning that John should also see Jane's tweets):
  
```
mutation {
  createFollower(followerId: "61a9574528de6b040c5bc5a4",
                 followingId: "61a9513828de6b040c5bc5a2" ) {
    id
  }
}
```

- Show John's tweets - run the query for John as above and now we see that John see's 2 tweets:

```
{
  "data": {
    "user": {
      "id": "61a9513828de6b040c5bc5a2",
      "userName": "JD",
      "tweets": [
        {
          "id": "61a957c528de6b040c5bc5a5",
          "tweet": "Jand Smith's first tweet"
        },
        {
          "id": "61a955cd28de6b040c5bc5a3",
          "tweet": "John Doe's first tweet"
        }
      ]
    }
  }
}
```
  
# Using PostMan

GraphQL requests are all sent using the POST method.  For detailed information on using PostMan with GraphQL, visit https://learning.postman.com/docs/sending-requests/supported-api-frameworks/graphql/

For example, following the instructions in the above blog, add the following the the POST body (under the GraphQL type):

```
query Query {
  users {
    id,
    userName
  }
}
```
This will output the list of all users.

To create a new user, we need to add variables to the createUser query:

```
mutation {
  createUser(userName: "JS", firstName: "Jane", 
             lastName: "Smith") {
               id
             }
}
```

  
