import axios from "axios";

class registerApi {
  async add({
    student_name,
    student_image,
    student_birthday,
    student_class,
    student_brother_number,
    student_brother_rank,
    is_staying_with_his_fathers,
    student_staying_with,
    father_degree,
    father_jop,
    mother_degree,
    mother_jop,
    past_Kindergarten,
    school_name,
    past_school_reason,
    address,
    address_m,
    address_z,
    address_d,
    nearest_landmark,
    father_phone,
    mother_phone,
  }) {
    return axios
      .post("https://api.jasmine-k.com/api/web/school/register", {
        student_name,
        student_image,
        student_birthday,
        student_class,
        student_brother_number,
        student_brother_rank,
        is_staying_with_his_fathers,
        student_staying_with,
        father_degree,
        father_jop,
        mother_degree,
        mother_jop,
        past_Kindergarten,
        school_name,
        past_school_reason,
        address,
        address_m,
        address_z,
        address_d,
        nearest_landmark,
        father_phone,
        mother_phone,
      })
      .then((Response) => Response)
      .catch((error) => {
        console.log("error", error);

        return error.response;
      });
  }

  async addKindergarten({
    name,
    image,
    birthday,
    currentStage,
    brotherNumbers,
    mothersStudy,
    mothersJob,
    fathersStudy,
    fathersJob,
    previouslyKindergartenName,
    reasonSchoolName,
    address,
    reason,
    nearestPoint,
    fatherPhone,
    motherPhone,
    liveWithParents,
    liveWithOneOfParents,
    sequence,
    alley,
    house,
    locality,
    is_allergic,
    allergic,
    diseases,
  }) {
    return axios
      .post("https://api.jasmine-k.com/api/web/kindergarten/register", {
        name,
        image,
        birthday,
        currentStage,
        brotherNumbers,
        mothersStudy,
        mothersJob,
        fathersStudy,
        fathersJob,
        previouslyKindergartenName,
        reasonSchoolName,
        motherPhone,
        reason,
        nearestPoint,
        fatherPhone,
        address,
        liveWithParents,
        liveWithOneOfParents,
        sequence,
        alley,
        house,
        locality,
        is_allergic,
        allergic,
        diseases,
      })
      .then((Response) => Response)
      .catch((error) => {
        console.log("error", error);

        return error.response;
      });
  }
}

export default new registerApi();
