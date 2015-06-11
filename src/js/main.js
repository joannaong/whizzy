var whizzy = {
	whizzyData: null,
	arrayName: [],
	arrayCateg: [],
	data: [],

	// if true, will grab from dynamic json
	dynamic: true,

	// json files
	json: {
		y2014: {
			dynamic: "https://spreadsheets.google.com/feeds/list/1_syR_zHNkECXocpZzKtpUNx2oAIEZ53BUapjl7mHbKI/od6/public/basic?hl=en_US&alt=json",
			static: "asset/2014/data2014.json"
		} ,
		y2015: {
			dynamic: "https://spreadsheets.google.com/feeds/list/1_syR_zHNkECXocpZzKtpUNx2oAIEZ53BUapjl7mHbKI/od6/public/basic?hl=en_US&alt=json",
			static: "asset/2014/data2015.json"
		}
	},

	init: function() {
		var self = this;
		this.getData();
	},

	getData: function() {
		var self = this;
		var year = "y"+new Date().getFullYear();
		var state = self.dynamic ? "dynamic" : "static";

		// stored in localstorage, if ever we need to refresh
		if(localStorage.getItem('data')){
			console.log("GET FROM SESSION");
			self.data = JSON.parse(localStorage.getItem('data'));
			self.buildHandler();
			return;
		}

		// get data
		$.ajax({
		  url: self.json[year][state],
		  xhrFields: { withCredentials: true },
			crossDomain: true,
			dataType: 'jsonp',
		}).done(function(data) {
			self.whizzyData = data.feed.entry;
			self.toArray();
			self.buildHandler();
		});
	},

	buildHandler: function() {
		var self = this;
		var html = '';
		var peopleURL = "http://whizzy.thesecretlocation.net.s3-website-us-west-2.amazonaws.com/2015/asset/people/";

		html += '<section data-background="asset/mr_wizzy.png">';
		html +=   '<img id="logo" src="asset/logo.png">';
		html += '</section>';
		html += '<section data-state="small-logo" data-background="asset/host.jpg">';
		html += '</section>';

		$.each(self.data, function(i, item) {
			var encodedName = encodeURIComponent(item.name);
			while(encodedName.indexOf('%20')!=-1)
				encodedName = encodedName.replace('%20','-').replace("'","-");

			if(i == 35){
				html += '<section>';
				html += '<video controls><source src="asset/DanceMan.mp4" type="video/mp4"></video>'
				html += '</section>';
			}
			html += '<section data-state="small-logo" data-background="asset/mr_wizzy.png">';
			html +=   '<div class="categ">'+item.categ+'</div>';
			html += '</section>';
			html += '<section data-state="small-logo" class="picpic" data-background="'+peopleURL+encodedName+'.jpg">';
			html +=   '<div class="name">'+item.name+'</div>';
			html +=   '<div class="categ">'+item.categ+'</div>';
			html += '</section>';
		});

		html += '<section>';
		html += '<h1>FIN</h1>';
		html += '</section>';
		
		$(".slides").html(html);
		

		Reveal.initialize({
			controls: true,
			progress: true,
			history: true,
			center: true,
			theme: Reveal.getQueryHash().theme,
			transition: Reveal.getQueryHash().transition || 'default',
			backgroundTransition: 'cube',
			parallaxBackgroundImage: "asset/bg_big.jpg",
			parallaxBackgroundSize: '2100px 1024px'
		});

		Reveal.addEventListener( 'small-logo', function() {
			$("#logo-small").addClass("show");
		}, false);
	},

	toArray: function() {
		var self = this;

		// push data into name and desc array
		$.each(self.whizzyData, function(i, item){
			self.arrayName.push(item["title"]["$t"]);
			self.arrayCateg.push(item["content"]["$t"].replace("awarddescription: ",""));
		});

		while(self.arrayName.length){
			//random name index
			var ranIndex = Math.round(Math.random()*(self.arrayName.length-1));
			//random category index
			var ranIndex2 = Math.round(Math.random()*(self.arrayName.length-1));
			//name & category values
			var name = self.arrayName[ranIndex];
			var categ = self.arrayCateg[ranIndex2];
			//pushed into the end of the array working backwords
			self.data[self.arrayName.length-1] = {"name":name, "categ":categ};
			//removing used data from array
			self.arrayName.splice(ranIndex, 1);
			self.arrayCateg.splice(ranIndex2, 1);
		}
		localStorage.setItem('data', JSON.stringify(self.data))
	}
}

$(function() { 
	whizzy.init();
});