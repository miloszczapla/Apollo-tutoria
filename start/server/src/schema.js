import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    launches(pageSize: Int, after: String): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchIds: ID!): TripUpdateResponse!
    login(email: String): User!
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String!
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type TripUpdateResponse {
    sucess: Boolean!
    messeges: String
    launches: [Launch]
  }
`;
export default typeDefs;
// module.exports = typeDefs;
