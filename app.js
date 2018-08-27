$(document).ready(function() {

  //create array
  var places = ["Hawaii","London","Paris","Cancun","Monaco","Bali","Morocco","Tokyo","Sydney"];	

  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < places.length; i++) {
            var dest = $('<button>');
            dest.addClass('vaca');
            dest.attr('data-name', places[i]);
            dest.text(places[i]);
            $('#buttons-view').append(dest);
          }
        }    
        renderButtons();

//on click button
$(document).on('click','.vaca', function() {

    var vacaDest = $(this).html(); 
   
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + vacaDest + "&api_key=dc6zaTOxFJmzC&limit=10";

    // AJAX Call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        $('#places-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#places-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        // Ratings
        var rating = results[j].rating;
        console.log(rating);
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#places-view').prepend(displayRated);
  } 

}); 

        //Pause gifs
        function playGif() { 
                    var away = $(this).attr('data-away');
                    console.log(away);
                 if (away == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-away', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-away', 'still');
                    }

                } 

      }); 

          //Adding new button
        $(document).on('click', '#add-place', function(){
            if ($('#place-input').val().trim() == ''){
              alert('Where would you like to go?');
           }
           else {
            var movies = $('#place-input').val().trim();
            places.push(movies);
            $('#place-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        });

