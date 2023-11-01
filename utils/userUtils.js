
//get user from local storage
export const getUser = () => {
  let user = null;
  if(typeof window !== 'undefined'){
    user = JSON.parse(localStorage.getItem('user'));
  }

  return user;
}
