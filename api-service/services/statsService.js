
const queryStatsFiveMostRequested = async (user) => {
    // checks if user is admin and so can access stats
    const userFound = await global.crud.userCrud.findUser(user);
    if(userFound.isAdmin === true) {
      const listOfStocks = await global.crud.statsCrud.getFiveMostSearchedStocks()
      return {listOfStocks, status: 200};
    } else {
      return {message: 'you are not authorized to access this resource', status: 401};
    }
}


module.exports = { queryStatsFiveMostRequested} ; 