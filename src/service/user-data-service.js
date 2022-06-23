export default class userDataService {
  setUserData(data) {
    console.log(data);
  }

  checkZipCode(data) {
    if (data) {
      return fetch(`https://viacep.com.br/ws/${data}/json/`)
    }
  }
}
