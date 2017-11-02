//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
//save bookmark
function saveBookmark(e){
	//get values
	var siteName =document.getElementById('siteName').value;
var webUrl =document.getElementById('webUrl').value;
if(!siteName || !webUrl){
	alert('Please Fill Out Form');
	return false;
}
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!webUrl.match(regex)){
	alert('please use valid url');
	return false;
}
var bookmark= {
	name: siteName, url: webUrl
}
//local storage test
//localStorage.setItem('test','hello world');
//test if bookmark null
if (localStorage.getItem('bookmarks')=== null){
//init array
var bookmarks = [];
//add to array
bookmarks.push(bookmark);
//set to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
	//get from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//add bookmark to array
bookmarks.push(bookmark);
//reset
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
//clear form
document.getElementById('myForm').reset();
//refetch bookmarks
fetchBookmarks();

//prevent form submit
e.preventDefault();
}
//delete
function deleteBookmark(url){
	//get bookmark from local storage
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookmarks
	for (var i=0; i< bookmarks.length;i++){
		if (bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i,1);
		}
	}
	//reset to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//refetch bookmarks
fetchBookmarks();
}
// fetch bookmarks
function fetchBookmarks(){
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
console.log(bookmarks);
//get output id
var bookmarksResults= document.getElementById('bookmarksResults');
//output
bookmarksResults.innerHTML ='';
for (var i = 0; i<bookmarks.length; i++) {
var  name = bookmarks[i].name;
var url = bookmarks[i].url
bookmarksResults.innerHTML += '<div class="well">'+                     
                                     '<h3>'+name+
                                     '<a class="btn btn-primary" target="_blank" href="'+url+'">Go !</a>'+
                                     '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">delete</a>'+
                                     '</h3>'+
                                     '</div>';
}


};