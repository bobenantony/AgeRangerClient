describe('dataAcess service', function() {
    var personData = [{ "id": 2, "firstName": "Allan", "lastName": "Border", "age": 56, "ageGroup": "Kinda old" }, { "id": 4, "firstName": "Banyan", "lastName": "Tree", "age": 69873, "ageGroup": "Kauri tree" }, { "id": 1, "firstName": "Boben", "lastName": "Antony", "age": 37, "ageGroup": "Very adult" }, { "id": 8, "firstName": "Christiano", "lastName": "Ronaldo", "age": 1999, "ageGroup": "Vampire" }, { "id": 6, "firstName": "Erick", "lastName": "Pittman Costa Rica", "age": 780, "ageGroup": "Vampire" }, { "id": 3, "firstName": "James", "lastName": "Bond", "age": 700, "ageGroup": "Vampire" }, { "id": 9, "firstName": "Messi", "lastName": "Goldcost", "age": 9990, "ageGroup": "Kauri tree" }];
	var dataService = {};
	var $httpBackend;

    //adds the module in which service resides to the beginning of each test
    beforeEach(module('common.services'));

    //injects the services in the module above to the beginning of each test
    beforeEach(inject(function (_dataService_, _$httpBackend_) {
        dataService = _dataService_;
		$httpBackend = _$httpBackend_;
	}));

    //test checking whether the dataService.getPersons() returns all the persons data
	it('should return all persons data', function() {
        var response;
        searchEntity = {
            firstName: '',
            lastName: ''
        };

        var expectedUrl = 'http://localhost:53738/api/persons';

        //Mocking the backend Http Get request
		$httpBackend.when('GET', expectedUrl)
            .respond(200, personData);

        //calls the function in the data service but the response gets the data only after  '$httpBackend.flush()'
        dataService.getPersons(searchEntity,'READ')
			.then(function(data) {
				response = data;
			});

        //flushes the backend data (as a result of Http Get request) to the response object
		$httpBackend.flush();

        //Asserts the checking condition
        expect(response.data).toEqual(personData);
	});

});