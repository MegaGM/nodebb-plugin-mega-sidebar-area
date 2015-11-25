$(document).on('ready', function (e) {

	require(['../../plugins/nodebb-plugin-mega-sidebar-area/static/js/vendor/perfect-scrollbar', '../../plugins/nodebb-plugin-mega-sidebar-area/static/js/vendor/js.cookie'], function (pScroll, Cookies) {

		pScroll.initialize(document.getElementById('sidebar-area'));
		var clientOptions = JSON.parse(Cookies.get('client-options') || 'false');

		if (clientOptions && clientOptions['sidebar-always-opened'] && 'lg' === utils.findBootstrapEnvironment()) {
			openSidebar();
		}

		function openSidebar() {
			$('#sidebar-area').finish().show().animate({
				left: 0
			}, {
				duration: 300,
				complete: function (event) {
					pScroll.update(document.getElementById('sidebar-area'));
				}
			});
		}

		function closeSidebar() {
			$('#sidebar-area').finish().animate({
				left: -550
			}, {
				duration: 300,
				complete: function () {}
			});
		}

		function closeSidebarOnClient(event) {
			var clientOptions = JSON.parse(Cookies.get('client-options') || '{}');
			if (clientOptions && !clientOptions['sidebar-always-opened'] && $(event.target).closest('.ts-client').data('userlink')) {
				closeSidebar();
			}
		}

		function toggleOptions() {
			$('.sidebar-area__open-options').toggleClass('--pressed');

			$('#sidebar-area__options').finish().slideToggle({
					duration: 300
				})
				.animate({
					'background-color': '#FFF'
				}, {
					duration: 500
				});
		}

		function populateOptions(event) {
			var clientOptions = JSON.parse(Cookies.get('client-options') || 'false');
			if (!clientOptions) return;

			Object.keys(clientOptions).forEach(function (clientOption) {
				if (!clientOptions[clientOption]) return;
				return $('#' + clientOption).prop('checked', Boolean(clientOptions[clientOption]));
			});
		}

		function updateOptions(event) {
			var clientOptions = JSON.parse(Cookies.get('client-options') || '{}');
			clientOptions[$(event.target).prop('id')] = Boolean($(event.target).prop('checked'));
			Cookies.set('client-options', JSON.stringify(clientOptions), {
				expires: 28
			});
		}

		function buttonPingPong(el, first, second) {
			$(el).animate({
				left: 20
			}, {
				duration: 250,
				complete: function () {
					$(this).animate({
						left: -15
					}, {
						duration: 150
					})
				}
			});
		}

		$(document).on('click', '.options__checkboxes', updateOptions);
		$(document).on('click', '.sidebar-area__open-sidebar', openSidebar);
		$(document).on('click', '.sidebar-area__close-sidebar', closeSidebar);
		$(document).on('click', '.sidebar-area__open-options', toggleOptions);
		$(document).on('click', '#mega-teamspeak .ts-client', closeSidebarOnClient);

		$('.sidebar-area__open-sidebar').hover(function (event) {
			$('.sidebar-area__open-sidebar').toggleClass('--hovered');
		});

		buttonPingPong('.sidebar-area__open-sidebar');
		populateOptions();

	});

});
