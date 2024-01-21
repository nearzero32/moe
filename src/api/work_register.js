import axios from "axios";

class work_register_api {
  async add({
    name,
    image,
    birthday,
    degree,
    college,
    year_graduate,
    phone1,
    phone2,
    social_status,
    last_work,
    nearest_landmark,
    address,
    address_m,
    address_d,
    address_z,
  }) {
    return axios
      .post("https://api.jasmine-k.com/api/web/school/work_register", {
        name,
        image,
        birthday,
        degree,
        college,
        year_graduate,
        phone1,
        phone2,
        social_status,
        last_work,
        nearest_landmark,
        address,
        address_m,
        address_d,
        address_z,
      })
      .then((Response) => Response)
      .catch((error) => {
        console.log("error", error);

        return error.response;
      });
  }
}

export default new work_register_api();
