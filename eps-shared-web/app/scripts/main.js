//var apiUrl = "http://localhost:8080/";
var apiUrl = "http://api.spiritofborepaire.fr/";

function loadAds(){
  $("#content").text("loading...");

  $.get( apiUrl+"api/articles/")
  .done(function( articles ) {
    $("#content").empty();
    if(articles.length  > 0){
      articles.forEach(function(article) {
        var template = $($("#article-template").html());
        $("h2", template).html(article.title);
        $("div", template).html(article.describe);
        $("#content").append(template);
      });
    }else{
      $("#content").text("no article");
    }
  });
};

function activeNavigationLink(){
  $("nav a").click(function(){
    var idPage=$(this).attr("link");
    $(".page").css("display", "none");
     $(".page#"+idPage).css("display", "");
  });
};

function submitCreateForm(){
  $("#create form").submit(function(e){    
    e.preventDefault();
    var article = {};
    $("input, textarea", this).each(function(){
      var field= $(this).attr("name");
      var value= $(this).val();
      article[field] = value;
    });
    $.ajax({
        url: apiUrl+"api/articles/",
        type: 'POST',
        data: JSON.stringify(article),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function(msg) {
          $("input, textarea", this).val("");
           loadAds();
           $("nav a[link=content]").click();
        }
    });
  });
};
$( document ).ready(function() {
  activeNavigationLink();
  loadAds();
  submitCreateForm();
});