  $(function(){
      $('.delMovie').click(function(e){
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            url: '/admin/movie/list?id=' + id,
            type: 'DELETE'
        }).done(function(results){
            if(results.success === 1){;
                if(tr.length > 0){
                    tr.remove();                 
                }
            }
        })
      });
  })