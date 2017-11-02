//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
function saveBookmark(e){
console.log('hi');
e.preventDefault();
}