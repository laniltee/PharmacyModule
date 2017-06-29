
app.controller("PatientsController", function ($scope, $http, $route, $routeParams) {

    //$("#example1").DataTable();
    var jsonHeaderObject = {headers: {'Content-Type': 'application/json'}};
    var patientService = "http://localhost:8082/";
    var dispensionService = "http://localhost:8088/"

    $scope.patients = [];
    $scope.currentPatient = {};
    $scope.prescriptions = [];
    $scope.prescItems = [];
    $scope.searchDrugs = [];
    $scope.currentDrug = {};
    $scope.allStock = [];

    var patientId = $routeParams.id;
    $scope.currentPresc = "";
    var currentPrescTotal = 0.0;

    loadPatients();
    getMyPrescriptions();

    function loadPatients(){
        $http.get(patientService + "patients").then(function (response) {
            $scope.patients = response.data;
        }), function (response) {

        };

        $http.get(patientService + "items").then(function (response) {
            $scope.allStock = response.data;
        }), function (response) {

        };
    }

    $scope.addPatient = function () {
        var addingPatient = {
            patientId: "P" + Date.now(),
            age: $scope.patient_age,
            name: $scope.patient_name,
            firstDate: $scope.first_date
        };

        //console.log(addingPatient);

        $http.post(patientService + "patients", addingPatient).then(function (response) {
         alert("Patient Added !");
         $route.reload();
     }, function (response) {

     });
    };

    $scope.removePatient = function (pId) {
        if (confirm("Are you sure to delete this patient?") == true) {
            $http.delete(patientService + "patients/" + pId).then(function (response) {
                alert("Patient Deleted !");
                $route.reload();
            }, function (response) {

            });
        }

    };

    $scope.addPrescription = function(){
        var newPresc = {
            preId: "PRE" + Date.now(),
            createdDate: new Date().toISOString(),
            doctor: $scope.presc_doc,
            total: 0,
            patient: patientId
        };
        $http.post(patientService + "prescriptions", newPresc).then(function (response) {
         alert("Prescription Added !");
         $route.reload();
     }, function (response) {

     });
    };

    function getMyPrescriptions(){
        if(patientId != null){
            $http.get(patientService + "prescriptions/patients/" + patientId).then(function (response) {
                $scope.prescriptions = response.data;
            }), function (response) {

            };
        }
    }

    $scope.viewDrugs = function(prescId){
        $scope.currentPresc = prescId;

        $http.get(patientService + "presc_items/prescriptions/" + prescId).then(function(response){
            $scope.prescItems = response.data;
        });

    };

    $scope.addDrugToPresc = function(){
        var addingItem = {
            preId: $scope.currentPresc,
            drug: $scope.drug_name,
            dosage: $scope.drug_dose,
            quantity: parseInt($scope.drug_count),
            unitPrice: $scope.currentDrug.price,
            totalPrice: $scope.drug_count * $scope.currentDrug.price,
        };

        console.log(addingItem);

        $http.post(patientService + "presc_items", addingItem).then(function (response) {
           //alert("Item Added !");
           $scope.viewDrugs($scope.currentPresc);
           $scope.currentDrug = {};
           $scope.searchDrugs = [];
           $scope.drug_name = ''; $scope.drug_dose = null; $scope.drug_count = '';
       }, function (response) {

       });
    }

    $scope.deletePresc = function(preId){
        if(confirm("Delete prescription ?") == true){
            $http.delete(patientService + "prescriptions/" + preId).then(function(response){
                alert("Prescription deleted !");
                getMyPrescriptions();
            });
        }
    };

    $scope.releasePresc = function(preId){
        if(confirm("Dispense prescription ?") == true){
            $http.post(dispensionService + "api/dispense/" + preId).then(function(response){
                alert("Prescription deleted !");
                getMyPrescriptions();
            });
        }
    };

    $scope.changeDrug = function(){
        $http.get(patientService + "items/" + $scope.drug_name).then(function(response){
            $scope.searchDrugs = response.data;
        });
    }

    $scope.selectDrug = function(drugName){
        $http.get(patientService + "items_one/" + drugName).then(function(response){
            $scope.currentDrug = response.data;
            $scope.drug_name = drugName;
        });
    };

    $scope.neglect = function () {
        $route.reload();
    };

    $scope.isInvalidNumber = function(number){
        return isNaN(number);
    };

    function calculateCurrentPrescTotal(){
        for(var i = 0; i < $scope.prescItems.length; i++){
            currentPrescTotal += $scope.prescItems[i].totalPrice;
        }
    };
});