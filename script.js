function displayBook(data) {
    var dataItems = data.items;
    var booksObject = {books: []};
    for (i=0; i < dataItems.length; i++) {
        var dataPath = dataItems[i].volumeInfo;
        var bookObject = {
            id: i,
            title: dataPath.title,
            description: dataPath.description,
            author: dataPath.authors,
            image: dataPath.imageLinks.smallThumbnail
        };
        booksObject.books.push(bookObject);
    }
    
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(booksObject);
    $('.books').append(newHTML);
}

var fetch = function (title) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title,
        success: function (data) {
            console.log(data);
            displayBook(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

$('button').on('click', function() {
    var userInput = $(this).closest('form').find('input').val();
    fetch(userInput);
    $('input').val('');
});

$('.books').on('click', '.book', function() {
    $clickedBook = $(this);
    $('.books').empty();
    $('.books').append($clickedBook);
});