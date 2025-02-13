// Function to get a specific cookie value by name
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null; // Return null if the cookie doesn't exist
}
export const clearCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
export const checkArrNull=(arr)=>{
  if(arr?.length == 0 ||arr == null || arr == []){
    return true
  }else{
    return false
  }
}
export function formatMoney(amount) {
  if (amount == null || isNaN(amount)) {
    return "0"; // Default for null or invalid input
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}