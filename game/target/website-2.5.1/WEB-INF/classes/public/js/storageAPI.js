/**
 * jquery localStorage Functions
 */
var _storageAPI = (function($) {
	
	var storage=$.localStorage;

	const GOOGLE_PLUS_ACCESS_TOKEN = 'access_token';
	const IS_PROSPECT_LOGGED_WITH_TWITTER = 'twitter_logged';
	const LOCATIONS_DB_STORE_NAME = 'provinces';
	const PROSPECTS_DB_STORE_NAME = 'prospects';
	const USER_ADDRESS_DB_STORE_NAME = 'addressInfo';
	const USER_CONTACT_DB_STORE_NAME = 'contactInfo';
	const USER_PERSONAL_DB_STORE_NAME = 'personalInfo';
	const USER_SOCIAL_PICTURE_DB_STORE_NAME = 'socialPictureInfo';
	const PRODUCT_ACTIVE_SECTION_DB_STORE_NAME = 'activeProductSection';
	const SESSION_DB_STORE_NAME = 'sessionStatus';
	
	var addProvincesData = function (data){
		
		var provincesData = {
				provinces : data
		};

		storage.set(LOCATIONS_DB_STORE_NAME, provincesData);
		console.log("Locations info added!");
	};

	var addSessionStatus = function(stts) {
		var status = stts;
		
		storage.set(SESSION_DB_STORE_NAME, status);
	}
	
	var addProspectInfo = function (name, gender, email, picture){
		var prospectData = {
				name : name,
				gender : gender,
				email : email,
				picture : picture
		};
		storage.set(PROSPECTS_DB_STORE_NAME, prospectData);
		console.log("Prospect info added!");
		/*_utils.getProspectInfo();*/
	};

	var deleteProvincesData = function(){
		storage.remove(LOCATIONS_DB_STORE_NAME);	
		console.log("Locations info deleted!");
	};

	var deleteProspectInfo = function(){
		storage.remove(PROSPECTS_DB_STORE_NAME);	
		console.log("Prospect info deleted!");
	};

	var getGooglePlusAccessToken = function(){
		return storage.get(GOOGLE_PLUS_ACCESS_TOKEN);
	};
	
	var getProvincesData = function(){
		var provincesData = storage.get(LOCATIONS_DB_STORE_NAME);
		return provincesData;
	};
	
	var getProspectInfo = function(){
		var prospectData = storage.get(PROSPECTS_DB_STORE_NAME);
		_utils.setProspectInfo(prospectData);
	};
	
	var getProspectLoggedWithTwitter = function(){
		return storage.get(IS_PROSPECT_LOGGED_WITH_TWITTER);		
	};
		
	var getUserAddressInfo = function(){
		var userData = storage.get(USER_ADDRESS_DB_STORE_NAME);
		return userData;
	};
		
	var getUserContactInfo = function(){
		var userData = storage.get(USER_CONTACT_DB_STORE_NAME);
		return userData;
	};
		
	var getUserPersonalInfo = function(){
		var userData = storage.get(USER_PERSONAL_DB_STORE_NAME);
		return userData;
	};

	var getUserSocialPicture = function(picture){
		return storage.get(USER_SOCIAL_PICTURE_DB_STORE_NAME);
	};
	
	var setGooglePlusAccessToken = function(access_token){
		storage.set(GOOGLE_PLUS_ACCESS_TOKEN, access_token);
	};
	
	var getActiveProductSection = function(){
		return storage.get(PRODUCT_ACTIVE_SECTION_DB_STORE_NAME);
	};
	var setActiveProductSection= function(section) {
		storage.set(PRODUCT_ACTIVE_SECTION_DB_STORE_NAME, section);
	}
	var setProspectLoggedWithTwitter = function(isLogged){
		storage.set(IS_PROSPECT_LOGGED_WITH_TWITTER, isLogged);
	};
	
	
	var getSessionStatusSection = function(){
		return storage.get(SESSION_DB_STORE_NAME);
	};
	var setSessionStatusSection= function(section) {
		storage.set(SESSION_DB_STORE_NAME, section);
	}
	
	var setUserAddressInfo = function(provinceIdSelected, cantonIdSelected, districtIdSelected, provinceNameSelected, cantonNameSelected, districtNameSelected){
		var userData = {
				provinceId : provinceIdSelected,
				cantonId : cantonIdSelected,
				districtId : districtIdSelected,
				provinceName : provinceNameSelected,
				cantonName : cantonNameSelected,
				districtName : districtNameSelected
		};
		storage.set(USER_ADDRESS_DB_STORE_NAME, userData);
	};
		
	var setUserContactInfo = function(email, cellphone, phone){
		var currentUserContactInfo = getUserContactInfo();
		var finalEmail = email == '' || email == undefined ? currentUserContactInfo.email : email;
		//var finalCellphone = cellphone == '' || cellphone == undefined ? currentUserContactInfo.cellphone : cellphone;
		//var finalPhone = phone == '' || phone == undefined ? currentUserContactInfo.phone : phone; 
		
		var finalCellphone = cellphone;
		var finalPhone = phone;
		
		var userData = {
				email : finalEmail,
				cellphone : finalCellphone,
				phone : finalCellphone
		};
		storage.set(USER_CONTACT_DB_STORE_NAME, userData);
	};
	
	var setUserPersonalInfo = function(name, id, gender){
		var currentUserPersonalInfo = getUserPersonalInfo();
		var finalName = name == '' || name == undefined ? currentUserPersonalInfo.name : name;
		//var finalId = id == '' || id == undefined ? currentUserPersonalInfo.id : id;
		var finalGender = gender == '' || gender == undefined ? currentUserPersonalInfo.gender : gender; 
		var finalId = id;
		
		var userData = {
				name : finalName,
				id : finalId,
				gender : finalGender
		};
		storage.set(USER_PERSONAL_DB_STORE_NAME, userData);
	};
	
	var setUserSocialPicture = function(picture){
		storage.set(USER_SOCIAL_PICTURE_DB_STORE_NAME, picture);
	};
		
	return {
		addProvincesData: addProvincesData,
		addProspectInfo: addProspectInfo,
		addSessionStatus:addSessionStatus,
		deleteProvincesData: deleteProvincesData,
		deleteProspectInfo: deleteProspectInfo,
		getGooglePlusAccessToken: getGooglePlusAccessToken,
		getProvincesData: getProvincesData,
		getProspectInfo: getProspectInfo,
    	getProspectLoggedWithTwitter: getProspectLoggedWithTwitter,
    	getActiveProductSection:getActiveProductSection,
    	getUserAddressInfo: getUserAddressInfo,
    	getUserContactInfo: getUserContactInfo,
    	getSessionStatusSection:getSessionStatusSection,
    	getUserPersonalInfo: getUserPersonalInfo,
    	getUserSocialPicture: getUserSocialPicture,
    	setGooglePlusAccessToken: setGooglePlusAccessToken,
    	setSessionStatusSection:setSessionStatusSection,
    	setProspectLoggedWithTwitter: setProspectLoggedWithTwitter,
    	setUserAddressInfo: setUserAddressInfo,
    	setUserContactInfo: setUserContactInfo,
    	setUserPersonalInfo: setUserPersonalInfo,
    	setActiveProductSection:setActiveProductSection,
    	setUserSocialPicture: setUserSocialPicture
    };
	
})(jQuery);