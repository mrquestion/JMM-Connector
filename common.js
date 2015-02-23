(function() {
	chrome.storage.sync.get({
		URL: "error"
	}, function(d) {
		if (document.URL.match("^[a-z]+://" + d.URL)) {
			function get_size() {
				return {
					w: $(window).innerWidth(),
					h: $(window).innerHeight()
				}
			}
			function jmm_create() {
				var JMM = $(document.createElement("div"));
				JMM.prop({
					id: "JMM",
					draggable: true
				});
				JMM.addClass("button");
				JMM.css({
					position: "absolute",
					display: "inline-block",
					left: (get_size().w - 120) + "px",
					top: ($(window).scrollTop() + get_size().h - 70) + "px",
					width: "100px",
					height: "50px",
					opacity: 0.5,
					backgroundColor: "#eee",
					fontFamily: "NanumGothic, Malgun Gothic, Dotum, Arial, Gothic, Sans-serif",
					fontSize: "20px",
					fontWeight: "bold",
					textAlign: "center",
					lineHeight: "50px",
					color: "#333",
					border: "1px solid #333",
					borderRadius: "5px",
					boxShadow: "5px 5px 20px 1px rgba(0, 0, 0, 0.5)",
				});
				JMM.text("JMM");
				JMM
					.on("mousedown", jmm_mousedown)
					.on("mouseup", jmm_mouseup)
					.on("click", jmm_click);
				return JMM;
			}
			function jmm_move(e) {
				var JMM = $("#JMM.button");
				if (JMM.length == 0) {
					JMM = jmm_create();
					$("html body").append(JMM);
				}
				var args = {
					left: (get_size().w - 120) + "px",
					top: ($(window).scrollTop() + get_size().h - 70) + "px"
				};
				if (parseInt(args.left) < JMM.offset().left) {
					JMM.stop().css(args);
				}
				else if (parseInt(args.top) < JMM.offset().top) {
					if (e) {
						JMM.stop().animate(args);
					}
					else {
						JMM.stop().css(args);
					}
				}
				else {
					JMM.stop().animate(args);
				}
			}
			function jmm_mousedown(e) {
				if (e.button == 0) {
					var JMM = $(this);
					JMM.stop().animate({
						opacity: 1,
						backgroundColor: "#333",
						color: "#eee"
					}, { duration: 500, complete: function() {
						setTimeout(function() {
							JMM.stop().animate({
								opacity: 0.5,
								backgroundColor: "#eee",
								color: "#333"
							}, 500);
						}, 1000);
					}});
				}
			}
			function jmm_mouseup(e) {
				if (e.button == 0) {
					$(this).stop().animate({
						opacity: 0.5,
						backgroundColor: "#eee",
						color: "#333"
					}, 500);
				}
			}
			function jmm_click(e) {
				if (e.button == 0) {
					console.log("click!");
					/*
					console.log($.sha256("test1"));
					console.log($.sha256($.sha256("test1")));
					console.log($.sha256("test2"));
					console.log($.sha256($.sha256("test2")));
					console.log($.sha256("test3"));
					console.log($.sha256($.sha256("test3")));
					*/
					try {
						chrome.storage.sync.get({
							Account: "error",
							Password: "error"
						}, function(d) {
							$.ajax({
								type: "post",
								url: "http://jmm.sline.net/JMM/async/",
								data: {
									a: d.Account,
									p: d.Password,
									u: decodeURIComponent(document.URL)
								},
								dataType: "json",
								success: function(response, status, request) {
									if (response) {
										alert("업데이트 완료!");
									}
									else {
										alert("서버의 문제가 있거나, 한계인 10화에 도달했습니다.")
									}
								},
								error: function(a,b,c) {
									console.log(a,b,c);
								}
							});
						});
					} catch (e) {
						alert("서버와의 연결에 실패했습니다.");
					}
				}
			}

			function window_load() {
				var JMM = $("#JMM.button");
				if (JMM.length == 0) {
					JMM = jmm_create();
					$("html body").append(JMM);
				}
			}
			function window_resize() {
				jmm_move();
			}
			function window_scroll() {
				jmm_move(true);
			}
			$(window)
				.on("load", window_load)
				.on("resize", window_resize)
				.on("scroll", window_scroll);
		}
	});
})();