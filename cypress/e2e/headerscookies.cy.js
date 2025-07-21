describe("API testing",()=>{

    let authToken=null;

    //before hook for generating access token.
    //when multiple before blocks written, then the order in which
    //they are written, in the same order they run.

    before("creating access token",()=>{

            cy.request({
                    method: 'POST',
                    url: 'https://simple-books-api.glitch.me/api-clients/',
                    failOnStatusCode: false,
                    headers: {
                             'Content-Type': 'application/json' 
                             },
                    body:{
                            clientName: 'ABC',
                            clientEmail: Math.random().toString(5).substring(2)+"@gmail.com"
                    }
            }).then((response) =>{
                    authToken=response.body.accessToken;
            });
    });


    before("creating new order",()=>{

        cy.request({
                method: 'POST',
                url: 'https://simple-books-api.glitch.me/orders/',
                failOnStatusCode: false,
                headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+authToken
                         },
                body:{
                    "bookId": 1,
                    "customerName": "xyzabc"
                  }
        }).then((response) =>{
                
                expect(response.status).to.eq(201);
               expect(response.body.created).to.eq(true);
        });
    });



        it("Fetching the orders",()=>{

                cy.request(
                    {  method: 'GET',
                    url: 'https://simple-books-api.glitch.me/orders/',
                    failOnStatusCode: false,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+authToken
                        },
                    cookies:{ 
                          'cookieName': 'mycookie'  
                    }
                }). then((response)=>{
                    expect(response.status).to.eq(200);
                    //to check the length of json array.
                    expect(response.body).has.length(1);
                })
        })
})