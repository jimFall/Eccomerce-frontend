const { json } = require("express")

class ApiFeatures {

    constructor(query, querystr) {

        this.query = query
        this.querystr = querystr
    }
    search() {


        const keyword = this.querystr.keyword


            //ternary oprater//
            ? {
                name: {
                    //Mongo db property regex
                    $regex: this.querystr.keyword,
                    $options: "i",  //case inssensiteve agr small i ni likhuga to bo sirf capital wale seacrch krga// 

                },

            } : {}
        // console.log(keyword)
        this.query = this.query.find({ ...keyword })

        return this;
    }

    filter() {

        const querycopy = { ...this.querystr }
        //Removing some feild for catergory
        const removeField = ["keyword", "page", "limit"]

        // console.log(querycopy) //remove before

        removeField.forEach((key) => delete querycopy[key])

        // console.log(querycopy)//remove after


        //Filter for price and Rating

        // console.log(querycopy)

        let querystr = JSON.stringify(querycopy); //convert to string

        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)



        this.query = this.query.find(JSON.parse(querystr)) //convert to obj i think

        // console.log(querystr)

        return this
    }


    pagination(resultperpage) {
        const currentpage = Number(this.querystr.page) || 1

        const skip = resultperpage * (currentpage - 1)

        this.query = this.query.limit(resultperpage).skip(skip)

        return this;
    }


}

module.exports = ApiFeatures


