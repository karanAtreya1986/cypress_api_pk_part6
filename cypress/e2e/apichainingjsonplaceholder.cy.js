describe('API chaining in Cypress', () => {
    it('should make API requests and chain them together', () => {
       cy.request(
        {
           method: 'GET',
           url: 'https://jsonplaceholder.typicode.com/posts'
        })
        .then((response) => {
          expect(response.status).to.eq(200)
          //extract the post id and store in variable.
          const postid = response.body[0].id
          //use return for request chaining.
          //this is the first then statement.
          return postid
         })
         //one request can have multiple then blocks.
         //use the postid in another response as query parameter.
         //then can also have any damn thing inside it,
         //including request.
        .then((postid) => {
          cy.request({
            method:'GET',
            url: `https://jsonplaceholder.typicode.com/comments?postId=${postid}`
          })
          .then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length(5)
          })
        })
    })
  
  
  })