
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  enum Days {
     sun
     mon
     tue 
     wed 
     thus
     fri 
     sat
  }

  type Schedule {
    _id: ID!
    course_id: ID!
    day: Days!
    startTime: String!
    endTime: String!
  }

  input ScheduleInput {
    course_id: ID!
    day: Days!
    startTime: String!
    endTime: String!
  }

  type Query {
    getSchedules: [Schedule!]!
  }

  type Mutation {
    createSchedule(input: ScheduleInput!): Schedule!
  }
`;

export default typeDefs;