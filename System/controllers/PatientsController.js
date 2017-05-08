
app.controller("PatientsController", function ($scope, $http, $route) {

    //$("#example1").DataTable();
    var jsonHeaderObject = {headers: {'Content-Type': 'application/json'}};

    $scope.patients = [];

    $http.get("/patients").then(function (response) {
        $scope.patients = response.data;
    }), function (response) {

    };

    $scope.addPatient = function () {
        var addingPatient = {
            patientId: "P" + Date.now(),
            age: $scope.patient_age,
            name: $scope.patient_name,
            firstDate: $scope.first_date.toISOString().substring(0, 10)
        };

        console.log(addingPatient);

        $http.post("/patients", addingPatient, jsonHeaderObject).then(function (response) {
            $scope.neglect();
        }, function (response) {

        });
    };

    $scope.removePatient = function (pId) {
        if (confirm("Are you sure to delete this patient?") == true) {
            $http.delete("/patients/" + pId).then(function (response) {
                alert("Patient Deleted !");
                $scope.neglect();
            }, function (response) {

            });
        }

    };

    $scope.neglect = function () {
        $route.reload();
    };
});