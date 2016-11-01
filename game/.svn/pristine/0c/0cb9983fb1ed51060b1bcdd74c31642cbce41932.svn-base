(function($) {
  function escapeRegExp(string){
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  }

  $.fn.filterThis = function() {
    console.log(this);
    return this.each(function() {
      var $this = $(this);
      var $target = $($this.data('filter-target'));
      var hideTarget = $this.data('filter-hide') || $target;
      var regEx,
          oldString,
          newString,
          input;

      $this.on('input', function(event) {
        input = event.currentTarget.value;  
        // if there is input search for and highlight string
        regEx = new RegExp(escapeRegExp(input), 'i');
        $target.each(function(iteration) {
          oldString = $.trim($(this).text());
          if (input != '') {
            newString = oldString.replace(regEx, "<span class='highlight'>"+'$&'+"</span>");
            $(this).html(newString);
            if (oldString === newString) {
              // case when no match is found on target
              $(this).closest(hideTarget).hide();
            }
            else {
              // when match if found make sure it is visible
              $(this).closest(hideTarget).show();
            }
          }
          else {
            // nothing searched: replace to clear highlight then show element
            newString = oldString.replace(regEx, '$&');
            $(this).html(newString);
            $(this).closest(hideTarget).show();
          }
        });
      });
    });
  }
}(jQuery));