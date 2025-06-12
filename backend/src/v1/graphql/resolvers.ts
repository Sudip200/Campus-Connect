import Schedule from "../../models/Schedule";
const resolvers = {
  Query: {
    getSchedules: async () => {
      return await Schedule.find({});
    },
  },

  Mutation: {
    createSchedule: async (_: any, { input }: any) => {
      const newSchedule = new Schedule(input);
      return await newSchedule.save();
    },
  },
};

export default resolvers;