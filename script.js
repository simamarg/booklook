var books = [];

var addBook = function (data) {
    for (i=0; i < data.length; i++) {
        books.push({id: i, title: data[i].volumeInfo.title, description: data[i].volumeInfo.description, 
                    authors: data[i].volumeInfo.authors, image: data[i].volumeInfo.imageLinks.smallThumbnail});
    }
    console.log(books);
}

var displayBooks = function () {
    var booksObject = {books: books};
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
            addBook(data.items);
            displayBooks();
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