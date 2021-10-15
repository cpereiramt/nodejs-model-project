const searchUserHistory = async (user) => {
    const userFound = await global.crud.userCrud.findUser(user);
    const userSearchHistory = await global.crud.userCrud.getHistoryListByUser(userFound);
    if(userSearchHistory.length === 0) {
      return {message: 'history not found', status: 404} ;
    }
    else {
    return {userSearchHistory, status: 200};
   }

}

module.exports = {searchUserHistory};