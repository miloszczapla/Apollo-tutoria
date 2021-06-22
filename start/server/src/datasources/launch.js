import { RESTDataSource } from 'apollo-datasource-rest';

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  async getAllLaunches() {
    const res = await this.get('launches');
    return Array.isArray(res)
      ? res.map((launch) => this.launchReducer(launch))
      : [];
  }

  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

  async getLaucheById({ launchId }) {
    const res = await this.get('lauches', { flight_number: launchId });
    return this.launchReducer(res[0]);
  }

  getLunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map((launchId) => this.launchReducer({ launchId }))
    );
  }
}

export default LaunchAPI;
