var whizzy = {
	whizzyData: null,
	data: {"0":{"name":"Ian Zamojc","categ":"Best in Funk-Skirt, Dancing Machine, Event Planning, Glass Wearing, #ttbt"},"1":{"name":"James Milward","categ":"Holder of the Unbroken Whizzy World Record for References to Ru Paul's Drag Race: 73 Meetings in a Row"},"2":{"name":"Chris Harris","categ":"Best Amatuer Mad Scientist in a Systems Director Role"},"3":{"name":"Mike Phan","categ":"Best Random Sing-Songs in a Producer Role"},"4":{"name":"Amir Jafarian","categ":"Best Non-Asian-Asian Tourbus Driver"},"5":{"name":"Ashley Choi","categ":"Best in Talking Nerdy Shit, While Wearing Crazy Socks, in an Exec Level Meeting with Hot-Shots"},"6":{"name":"Matt Fabb","categ":"Best Gluten-Free Cat Lady"},"7":{"name":"Ann Marie Donnelly","categ":"Most Enthused Original T-Shirt Wearing, Event Attending, Red Bull Guzzler in a Senior Developer Role"},"8":{"name":"Bryan Gislason","categ":"Best Vocal Talent, Keynote Making, Brainstorm-Leading Man, in a Creative Director Role"},"9":{"name":"Marshall Lorenzo","categ":"Best Oscar-Nominated, Emo, Small-Town Talent in a Project Manager Role"},"10":{"name":"Mark Rozeluk","categ":"Best Australian Death Metal Loving, Beer O'Clock Instigating Shorts-Maker in a Lead Developer Role"},"11":{"name":"Joanna Ong","categ":"Senor Seaweed Supplier of 'Snacks'"},"12":{"name":"Amanda Anderton","categ":"Best Quality Assured Comic Collector in a Fathership Role"},"13":{"name":"Gino Fazari","categ":"Most-Improved Runway Model for 3D-Statue Photography in a Motion Grapher Role"},"14":{"name":"Kathryn Rawson","categ":"Best 'Marty-Hair', Musically Hip Copywriter"},"15":{"name":"James Fraser","categ":"Best Asian"},"16":{"name":"Michael Ruggiero","categ":"Best Knit Sweater Wearing, Dark Horse Coffee Drinking, Cottage King Award in an Executive Producer Role"},"17":{"name":"Sara Scheuermann","categ":"Most Outstanding Corny-Award Winning, Dad-Joke-Making and Beard-Growng in a Lead Developer Role"},"18":{"name":"Heather Phenix","categ":"Best Asian in an Asian Role"},"19":{"name":"CJ Hervey","categ":"Whizzy for Style Innovation: Pioneer of the Black-T-Shirt-with-Shorts-and-Beard Developer Uniform"},"20":{"name":"Michael Kazanowski","categ":"Best iOS Developer with Awesome Hair"},"21":{"name":"John Cumming","categ":"Nearest Terrestrial Exoplanet"},"22":{"name":"Margaret O'Brien","categ":"Best Asian Who Looks Like a Different Type of Asian"},"23":{"name":"Luke Van Osch","categ":"Best Downhill Skiing, Advice Giving, Shoulder To Cry On in a Board Member"},"24":{"name":"Kyle Zborowski","categ":"The Golden Clipboard Award for Excellence in Creative Direction"},"25":{"name":"Ryan Andal","categ":"Most Straight-Edged, Clean-Cut New Dad in a Developer Role"},"26":{"name":"Noora Abu Eitah","categ":"Most Car-Obsessed Russian Guy with Hippest Design Aesthetic and Dual Citizenship in a Graphic Designer Role"},"27":{"name":"Ashlee Lougheed","categ":"Liberty Shawarma’s Most Loyal Customer and Best Motherly Life Advice Giver Award in a VP Finance and Business Affairs Role"},"28":{"name":"Shigeo Kastura-Gordon","categ":"Best Asian Wearer of Pants"},"29":{"name":"Michala Duffield","categ":"Best Shoeless Car Lover in a Systems Administrator Role"},"30":{"name":"Pietro Gagliano","categ":"Loudest Robo COOP Music Blasting, Best Illustrating German Pun-Maker with Dual Citizenship in an Art Director Role"},"31":{"name":"Sarah Nason","categ":"Hardest Working King of the Reels, and Most Tech Savvy Low-Talker in a Motionographer Role"},"32":{"name":"Eli McIlveen","categ":"Best Australian Cat-Bug Loving Producer"},"33":{"name":"Misha Frolov","categ":"Best Employee Whose Name Isn't Their Real Name"},"34":{"name":"Stefan Grambart","categ":"Beard as Fuck"},"35":{"name":"Michael Badham","categ":"Best Nature Lover in a User Experience Role"},"36":{"name":"Elva Olason","categ":"Most Laid-Back, Movable Workspace Setup and Official Office Couch Warmer Award in a VP Business Development & Strategy Role"},"37":{"name":"Dave Kristn","categ":"Best Racing Fan in a Back End Developer Role"},"38":{"name":"Josh Manricks","categ":"Best Ice-Cream-Sandwich, Mexican Fiesta Loving Boss-Man, with a Tiny Dog"},"39":{"name":"Marty Flanagan","categ":"Most Highly-Organized Daily Lunchbox Practic, with Most Elaborate Chair Customization in a Designer Role"},"40":{"name":"Gav Patel","categ":"Best Funky Pants in a Testing Role"},"41":{"name":"Sabrina Saccoccio","categ":"Best Hot Momma Producer"},"42":{"name":"Steve Miller","categ":"Best Use Of \"WHEEEEEEEE EEEEE EEEHEEEH EEEE EEEEE EEW\" in a Supervising Producer Role"}},
	arrayName: [],
	arrayCateg: [],
	random: false,

	init: function() {
		var self = this;

		if (random) {
			this.getData();
		} else {
			this.buildHandler();
		}

	},

	getData: function() {
		var self = this;
		var googleURL = "https://spreadsheets.google.com/feeds/list/";
		var googleKEY = "19n7-o_ErcGGgcwBBWIVNxV3XhvrKXOcBsQx3Sraha08";
		var googleJSON = "/od6/public/basic?hl=en_US&alt=json";

		if(localStorage.getItem('data')){
			console.log("GET FROM SESSION");
			self.data = JSON.parse(localStorage.getItem('data'));
			self.buildHandler();
			return;
		}
		$.ajax({
		  url: googleURL + googleKEY + googleJSON,
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
		var peopleURL = "http://whizzy.thesecretlocation.net.s3-website-us-west-2.amazonaws.com/asset/people/";

		html += '<section data-background="asset/mr_wizzy.png">';
		html +=   '<img id="logo" src="asset/logo.png">';
		html += '</section>';
		html += '<section data-state="small-logo" data-background="asset/host.jpg">';
		html += '</section>';

		$.each(self.data, function(i, item) {
			// console.log(item);
			// console.log(encodeURIComponent(item.name));
			var encodedName = encodeURIComponent(item.name);
			while(encodedName.indexOf('%20')!=-1)
				encodedName = encodedName.replace('%20','-').replace("'","-");

			if(i == 20){
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

$(function() { whizzy.init() });