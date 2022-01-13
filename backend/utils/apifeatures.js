const { json } = require("express");

class ApiFeatures {
  
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            //Mongo db property regex
            $regex: this.querystr.keyword,
            $options: "i", //case inssensiteve agr small i ni likhuga to bo sirf capital wale seacrch krga//
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const querycopy = { ...this.querystr };
    console.log("querycopy", querycopy);

    //Removing some feild for catergory

    const removeField = ["keyword", "page", "limit"];

    // console.log("querycopy...remove before",querycopy) //remove before

    removeField.forEach((key) => delete querycopy[key]);

    console.log("querycopy ..remove after",querycopy)//remove after

    //Filter for price and Rating

    let querystr = JSON.stringify(querycopy); //convert to string

    // console.log('querystr...befaore',querystr)

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    console.log(JSON.parse(querystr), "jfdksa")

    this.query = this.query.find(JSON.parse(querystr)); //convert to obj i think

    // console.log('querystr..after',querystr)

    return this;
  }

  pagination(resultperpage) {
    const currentpage = Number(this.querystr.page) || 1;

    const skip = resultperpage * (currentpage - 1);

    this.query = this.query.limit(resultperpage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
