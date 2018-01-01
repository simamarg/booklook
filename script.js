function displayBook(data) {
    var dataPath = data.items[0].volumeInfo;
    var dataItems = {
        title: `${dataPath.title}`,
        description: `${dataPath.description}`,
        author: `${dataPath.authors}`,
        image: `${dataPath.imageLinks.smallThumbnail}`
    };
    
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(dataItems);
    $('.book').append(newHTML);
}

var fetch = function (isbn) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
        success: function (data) {
            displayBook(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

// isbn: 0439023521

$('button').on('click', function() {
    var isbn = $(this).closest('form').find('input').val();
    fetch(isbn);
    $('input').val('');
});