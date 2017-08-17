describe('dataAcess service', function() {
    var personData = [{ "id": 2, "firstName": "Allan", "lastName": "Border", "age": 56, "ageGroup": "Kinda old" }, { "id": 4, "firstName": "Banyan", "lastName": "Tree", "age": 69873, "ageGroup": "Kauri tree" }, { "id": 1, "firstName": "Boben", "lastName": "Antony", "age": 37, "ageGroup": "Very adult" }, { "id": 8, "firstName": "Christiano", "lastName": "Ronaldo", "age": 1999, "ageGroup": "Vampire" }, { "id": 6, "firstName": "Erick", "lastName": "Pittman Costa Rica", "age": 780, "ageGroup": "Vampire" }, { "id": 3, "firstName": "James", "lastName": "Bond", "age": 700, "ageGroup": "Vampire" }, { "id": 9, "firstName": "Messi", "lastName": "Goldcost", "age": 9990, "ageGroup": "Kauri tree" }];
	var dataService = {};
    var $httpBackend;
    searchEntity = {
        firstName: '',
        lastName: ''
    };

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

        var expectedUrl = 'http://localhost:53738/api/persons';

        //Mocking the backend Http Get request and responds with OK response
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

    //test checking whether the dataService.getPersons() returns a critical error
    it('should handle error', function () {
        var response;

        //Mocking the backend Http Get request and responds with OK response
        $httpBackend.expect('GET', 'http://localhost:53738/api/persons')
            .respond(500);

        //calls the function in the data service but gets the error only after  '$httpBackend.flush()'
        dataService.getPersons(searchEntity, 'READ')
            .then(function (data) {
                response = data;
            })
            .catch(function () {
                response = 'Error!';
            });

        $httpBackend.flush();

        expect(response).toEqual('Error!');
    });

});