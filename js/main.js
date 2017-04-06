//listener for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);
//Save bookmark
function saveBookmark(e){
  //Get form value
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  var bookmark = {
    name : siteName,
    url : siteUrl

  }
  //Local storage test :D
  /*
  localStorage.setItem('test', 'HelloWorld');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */
 // test if bokkmarks are empty
  if(localStorage.getItem('bookmarks')=== null){
  var bookmarks = [];
  bookmarks.push(bookmark);
  // set to loacalstorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  //get bookmarks form localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Add bookmarks to array
  bookmarks.push(bookmark);
  // reset back to loacalstorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


}

  fetchBookmarks()
  //Prevent form submitting
  e.preventDefault()
}
// Delete bookmark
function deleteBookmark(url){
  //get bokmark
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop trough bookmarks
  for(var i =0; i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      //remove bookmarks
      bookmarks.splice(i, 1);
    }
  }
  // reset back to loacalstorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // re fetchBookmarks
  fetchBookmarks()

}


function fetchBookmarks(){
  //get bookmarks form localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get outpu id
  var bookmarksResult = document.getElementById('bookmarksResults');

  //build result
  bookmarksResults.innerHTML = '';
  for(var i =0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'"> Visit</a>' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" style="background-color: #f44747;border-color: #f44747;" id="danger" href="#"> Delete</a>'
                                    '</h3>'+
                                    '</div>';
  }
}
