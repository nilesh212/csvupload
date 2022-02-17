{
  let searchByClassName = $("span").html().split(" ")[0];
  // console.log(searchByClassName);

  $(".search-box").on("keypress", function (e) {
    // console.log(this.value + e.key);
    searchInColumn(this.value + e.key);
  });

  $(".search-box").on("keydown", function (e) {
    // console.log(this.value + e.key);
    if (e.keyCode == "8") {
      let inputValue = this.value;
      if (inputValue.length != 1) {
        inputValue = inputValue.substring(0, inputValue.length - 1);
        searchInColumn(inputValue);
      } else {
        let searchBys = $(`.${searchByClassName}`);
        for (let searchBy of searchBys) {
          $(searchBy).css({
            display: "table-row",
          });
          $("td", searchBy).css({
            display: "table-cell",
          });
        }
      }
    }
  });

  $(".search-btn").on("click", function (e) {
    e.preventDefault();
    let inputValue = $(".search-box").val();
    // console.log(inputValue);
    searchInColumn(inputValue);
  });

  function searchInColumn(inputValue) {
    let searchBys = $(`.${searchByClassName}`);
    for (let searchBy of searchBys) {
      let value;
      if ($($("td", searchBy)).length <= 1) {
        value = $($("td", searchBy)[0]).attr("class");
      } else {
        value = $($("td", searchBy)[1]).attr("class");
      }
      value = value.toLowerCase();
      inputValue = inputValue.toLowerCase();
      if (!value.includes(inputValue)) {
        $("td", searchBy).css({
          display: "none",
        });
        $(searchBy).css({
          display: "none",
        });
      } else {
        $(searchBy).css({
          display: "table-row",
        });
        $("td", searchBy).css({
          display: "table-cell",
        });
      }
    }
  }
}
