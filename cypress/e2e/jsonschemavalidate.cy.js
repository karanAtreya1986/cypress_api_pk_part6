// Install ajv library
//   npm install ajv     - command prompt/terminal

//import the library.
const Ajv=require('ajv')

//create object of ajv.
const avj=new Ajv()

describe("Schema validation",()=>{


    it("schema validatiom against response",()=>{

            cy.request(
                {  method: 'GET',
                    url :"https://fakestoreapi.com/products"

                })
                .then((response)=>{
//define the schema needed.
                    const schema = {
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Generated schema for Root",
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "number"
                            },
                            "title": {
                              "type": "string"
                            },
                            "price": {
                              "type": "number"
                            },
                            "description": {
                              "type": "string"
                            },
                            "category": {
                              "type": "string"
                            },
                            "image": {
                              "type": "string"
                            },
                            "rating": {
                              "type": "object",
                              "properties": {
                                "rate": {
                                  "type": "number"
                                },
                                "count": {
                                  "type": "number"
                                }
                              },
                              "required": [
                                "rate",
                                "count"
                              ]
                            }
                          },
                          "required": [
                            "id",
                            "title",
                            "price",
                            "description",
                            "category",
                            "image",
                            "rating"
                          ]
                        }
                      } // schema end

                      //first pass in the schema in compile method.
                     const validate= avj.compile(schema)
                     //then use the same variable and pass the actual response body.
                     //it will check if schema matches or not.
                      const isvalid=validate(response.body)
                      //assert.
                      expect(isvalid).to.be.true;

                })        

    })




})