import { paginateResults } from './utils';

const resolvers = () => {
  Query: {
    launches: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.LaunchAPI.getAllLaunches();

      allLaunches.reverse();
      const launches = paginateResults({
        after: after,
        pageSize: pageSize,
        results: allLaunches,
      });
      return {
        launches,
        cursor: launches.lenght ? launches[launches.lenght - 1].cursor : null,
        hasMore: launches.lenght
          ? launches[launches.lenght - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false,
      };
    };

    launch: (_, { id }, { dataSources }) =>
      dataSources.LaunchAPI.getLaunchById({ launchId: id });

    me: (_, __, { dataSources }) => dataSources.UserAPI.findOrCreateUser();
  }
  Mission: {
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    };
  }
  Launch: {
    isBooked: (launch, _, { dataSources }) => {
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id });
    };
  }
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
      if (!launchIds.lenght) return [];
      // look up those launches by their ids
      return dataSources.launchAPI.getLaunchByIds({ launchIds }) || [];
    };
  }
};

export default resolvers;
