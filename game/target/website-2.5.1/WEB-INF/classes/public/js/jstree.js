 var treeNodes = $.parseJSON($('#treeNodesList').val());
$('#sitemap')
	.on('changed.jstree', function( e, data ) {
		var i, j, r = [];
	    for(i = 0, j = data.selected.length; i < j; i++) {
	    	r.push(data.instance.get_node(data.selected[i]).id);
	    	r.push(data.instance.get_node(data.selected[i]).text);
	    }
	    $('#pageParentName').val(r[1]);
	    $('#sectionParentId').val(r[0]);
	    
	    $('#boxHyperlink').val(r[1]);
	    $('#sectionParentIdCasilla').val(r[0]);
	})
	.jstree({ 'core': {
		      
			'data': treeNodes,
			 "themes" : {
			      "variant" : "medium"
		}
		
	}});