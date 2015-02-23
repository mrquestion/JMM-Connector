(function() {
	function save_click() {
		var url = $("#url").val().trim();
		var account = $("#account").val().trim();
		var password = $("#password").val().trim();
		if (url.length * account.length * password.length > 0) {
			chrome.storage.sync.set({
				URL: url,
				Account: account,
				Password: $.sha256(password)
			}, function() {
				$("#log").text("Saved.");
			});
		}
		else {
			chrome.storage.sync.set({
				URL: null,
				Account: null,
				Password: null
			}, function() {
				$("#log").text("Invalid information.");
			});
		}
	}
	function test_click() {
		chrome.storage.sync.get({
			URL: "error",
			Account: "error",
			Password: "error"
		}, function(d) {
			$("#log").html("URL : " + d.URL + "<br/>" + "Account : " + d.Account);
		});
	}
	function window_load() {
		$("#save").click(save_click);
		$("#test").click(test_click);
	}
	$(window).on("load", window_load);
})();