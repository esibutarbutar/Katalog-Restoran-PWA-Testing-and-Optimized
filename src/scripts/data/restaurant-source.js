import API_ENDPOINTS from '../globals/api-endpoint';

class RestoDbSources {
  static async homePage() {
    const response = await fetch(API_ENDPOINTS.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINTS.DETAIL(id));
    return response.json();
  }
}

export default RestoDbSources;
