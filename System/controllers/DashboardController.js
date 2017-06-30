app.controller("DashboardController", function ($scope, $http, $window) {

    var statService = "http://localhost:8088/api/";
    var patService = "http://localhost:8082/";
    var bulbService = "http://localhost:8086/";

    var items = [];
    var dataItems = [];

    $scope.stats = {
        totalSales: "0",
        totalStock: "0",
        totalPatients: "0",
        requestCount: "5"
    };

    $http.get(statService + "sales").then(function(response){
        $scope.stats.totalSales = response.data;
    });

    $http.get(statService + "stock").then(function(response){
        $scope.stats.totalStock = response.data;
    });

    $http.get(patService + "patients").then(function(response){
        $scope.stats.totalPatients = response.data.length;
    });

    $http.get(patService + "items").then(function(response){

        items = response.data;

        for(var i = 0; i < response.data.length; i++){
            var newObj = {
                y: '',
                a: 0
            };

            newObj.y = response.data[i].name;
            newObj.a = parseInt(response.data[i].available);

            dataItems.push(newObj);
        }
    }).finally(function(){
        console.log(dataItems);
        var bar = new Morris.Bar({
          element: 'bar-chart',
          resize: true,
          data: dataItems,
          barColors: ['#00a65a'],
          xkey: 'y',
          ykeys: ['a'],
          labels: ['Available'],
          hideHover: 'auto'
      });
    });

    


});
