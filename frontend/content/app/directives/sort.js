angular.module('ti').directive('mySortable',function(){
  return {
    link:function(scope,el,attrs){
      el.sortable({
        revert: true
      });
      el.disableSelection();
      
      el.on( "sortdeactivate", function( event, ui ) { 
        var from = angular.element(ui.item).scope().$index;
        var to = el.children().index(ui.item);
        if(to>=0){
          scope.$apply(function(){
            if(from>=0){
              scope.$emit('my-sorted', {from:from,to:to});
            }else{
              scope.$emit('my-created', {to:to, name:ui.item.text()});
              ui.item.remove();
            }
          })
        }
      } );
    }
  }
})