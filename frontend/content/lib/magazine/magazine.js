$(function(){

// // SWITCH COLOR
// 	var switchColorText, colorSelected,
// 		mtColor = ['red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime', 'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'grey', 'blueGrey'],
// 		mtColorLength = mtColor.length,
// 		switchColorBar = $('<div/>', { class: 'switch-color' });
// 	switchColorBar.append($('<div/>', { class: 'no-color' }));
// 	for (i = 0; i < mtColorLength; i++)
// 		switchColorBar.append($('<div/>', { class: 'gear-mt gear-color ' + mtColor[i] }));

// 	var mtColorVar = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'],
// 		mtColorVarLength = mtColorVar.length,
// 		switchColorVarBar = $('<div/>', { class: 'switch-var' });
// 	for (i = 0; i < mtColorVarLength; i++)
// 		switchColorVarBar.append($('<div/>', { class: 'gear-mt gear-color gear-show' }).attr('data-color-range', mtColorVar[i]));
// 	switchColorVarBar.append($('<div/>', { class: 'arrow' }));

// 	switchColorBar.append(switchColorVarBar);
// 	// $('html').append(switchColorBar.append(switchColorVarBar))

// 	$(document).on('click', '.switch-color > *:not(.switch-var)', function(){
// 		$(this).addClass('gear-active').siblings().removeClass('gear-active');
// 		var self = $(this),
// 			switchColor = $(this).closest('.switch-color'),
// 			switchColorVar = switchColor.find('.switch-var');
// 		colorSelected = (function(){
// 			var clone = self.clone();
// 			clone.removeClass('gear-color gear-mt gear-active');
// 			return clone.attr('class');
// 		})()
// 		$('.switch-color .switch-var > *:not(.arrow)').attr('class', 'gear-mt gear-color gear-show ' + colorSelected);
// 		if (colorSelected == 'no-color') {
// 			switchColor.children('.switch-var').removeClass('gear-show').children('.gear-color').removeClass('gear-show');
// 			switchColorBar.remove();
// 			switchColorText.val('Nenhuma cor selecionada').removeClass('gear-not-empty');
// 			switchColorText.prev('.gear-icon').children('.switch-color-preview').attr('class', 'switch-color-preview gear-mt gear-color ' + colorSelected);
// 		} else {
// 			if (colorSelected == 'brown' || colorSelected == 'grey' || colorSelected == 'blueGrey')
// 				switchColor.children('.switch-var').addClass('gear-show').children('.gear-color').slice(-4).removeClass('gear-show');
// 			else
// 				switchColor.children('.switch-var').addClass('gear-show').children('.gear-color').slice(-4).addClass('gear-show');
// 			$('.switch-color > .switch-var > *[data-color-range="500"]').addClass('gear-active');
// 			$(this).siblings('.switch-var').css({ top: ($(this).offset().top - switchColor.offset().top - 50) + 'px' });
// 			$(this).siblings('.switch-var').children('.arrow').css({ marginLeft: (($(this).offset().left - switchColor.offset().left) + ($(this).width() / 2)) - 6 + 'px' });
// 		}
// 	});

// 	$(document).on('click', '.switch-color > .switch-var > *:not(.arrow)', function(){
// 		$(this).closest('.switch-var').removeClass('gear-show');
// 		switchColorText.val(rgb2hex($(this).css('background-color'))).keyup();
// 		switchColorBar.remove();
// 		switchColorText.prev('.gear-icon').children('.switch-color-preview').attr({'class': 'switch-color-preview gear-mt gear-color ' + colorSelected, 'data-color-range': $(this).attr('data-color-range')});
// 		switchColorText = undefined;
// 	});

// 	function rgb2hex(rgb) {
// 		var hexDigits = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
// 		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
// 		function hex(x) {
// 			return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
// 		}
// 		return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
// 	}

// 	$(document).on('focus', '.txt-color-switch', function(){
// 		switchColorText = $(this);
// 		$(this).parent().append(switchColorBar);
// 		$(this).prop('readonly', true);
// 	});

// 	$(document).on('focusout', '.txt-color-switch', function(){
// 		$(this).prop('readonly', false);
// 	});

// 	$(document).on('click', function(e){
// 		if (!$('.switch-color').find(e.target).length && !$(e.target).is('.switch-color') && !$(e.target).is(switchColorText)) {
// 			switchColorBar.remove();
// 			switchColorText = undefined;
// 		}
// 	});

// DATA LIST SEARCH
	// $(document).on('click', '.data-list-search li', function(){
	// 	$(this).closest('.data-list-search').hide().closest('.gear-form-group').find('input').val($(this).children('.primary-info').text());
	// });

	// $(document).on('keyup focus focusout', '.txt-data-list-search', function(e){
	// 	var textoPesquisa = $(this).val().toLowerCase(),
	// 		lista = $(this).parent().find('.data-list-search'),
	// 		searchInterval;
	// 	if (!lista.find('[data-list-search]').length) {
	// 		lista.find('li').each(function(){
	// 			$(this).attr('data-search-name', $('.primary-info', this).text().toLowerCase());
	// 		});
	// 	}
	// 	switch (e.which) {
	// 		case 38:
	// 			// Seta pra cima
	// 			var prev = lista.find('.selected').removeClass('selected').prevAll(':visible:first'),
	// 				target = prev.length ? prev : lista.find('li:visible:last');
	// 			target.addClass('selected');
	// 			break;
	// 		case 40:
	// 			// Seta pra baixo
	// 			var next = lista.find('.selected').removeClass('selected').nextAll(':visible:first'),
	// 				target = next.length ? next : lista.find('li:visible:first');
	// 			target.addClass('selected');
	// 			break;
	// 		case 13:
	// 			// Enter
	// 			if (!lista.find('.selected').length)
	// 				$(this).val('').removeClass('gear-error');
	// 			else
	// 				$(this).val(lista.find('.selected > .primary-info').text()).focusout();
	// 			lista.hide();
	// 			break;
	// 		default:
	// 			$(this).removeClass('gear-error');
	// 			if (textoPesquisa === '') {
	// 				lista.hide().find('li').removeAttr('style');
	// 				lista.find('.selected').removeClass('selected');
	// 			} else {
	// 				lista.show().find('li').removeAttr('style').hide().end().find('li[data-search-name*="' + textoPesquisa + '"]').show();
	// 				lista.show().find('li:not(:visible).selected').removeClass('selected');
	// 				if (!lista.find('li[data-search-name*="' + textoPesquisa + '"]').length) {
	// 					$(this).addClass('gear-error');
	// 					lista.hide().find('.selected').removeClass('selected');
	// 				} else {
	// 					if (!lista.find('.selected').length)
	// 						lista.find('li:visible:first').addClass('selected');
	// 				}
	// 			}
	// 	}
	// });
	// $(document).on('focusout', '.txt-data-list-search',function(){
	// 	if ($(this).is('.gear-error'))
	// 		$(this).val('').removeClass('gear-error');
	// 	else {
	// 		$(this).val($(this).parent().find('.data-list-search .selected .primary-info').text());
	// 	}
	// });
	// $(document).on('focus', 'input, select, textarea, button', function(e){
	// 	if (!$(e.target).is('.txt-data-list-search'))
	// 		$('.data-list-search').hide();
	// });
	// $(document).on('click', function(e){
	// 	if (!$(e.target).is('.txt-data-list-search, .data-list-search *'))
	// 		$('.data-list-search').hide();
	// });

// LIST VIEW
	$(document).on('click', '.list-view .switch', function(){
		$(this).closest('li').toggleClass('active');
	});
	// $(document).on('click', '.list-view .btn-deletar', function(){
	// 	$(this).closest('li').addClass('item-removed').removeClass('active');
	// });

// 404
	$(document).on('click', '#btn-get-me-outta-here', function(){
		$('#btn-main-menu').click();
	});
	$(document).on('mouseover', '.sad-face', function(){
		$(this).addClass('out');
	});
	$(document).on('transitionend', '.sad-face.out', function(){
		if ($(this).is('.right'))
			$(this).removeClass('right').addClass('left');
		else
			$(this).removeClass('left').addClass('right');
		$(this)[0].scrollHeight;
		$(this).removeClass('out');
	});

});