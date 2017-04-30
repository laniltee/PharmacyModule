
app.controller("UserController", function ($scope, $http, $route) {

    //$("#example1").DataTable();

    $scope.users = [];
    $scope.functionHeader = "Add New";


    $http.get("/users").then(function (response) {
        $scope.users = response.data;
    }), function (response) {

    };

    $scope.editUser = function (username) {
        $scope.functionHeader = "Update";
        $("#username").val($("#username_td_" + username).text());
        $("#email").val($("#email_td_" + username).text());
        $("#full_name").val($("#name_td_" + username).text());
        $("#department").val($("#department_td_" + username).text());
        $("#user_type").val($("#user_type_td_" + username).text()).change();
    };

    $scope.removeUser = function (username) {
        if (confirm("Do You Really Want To Delete " + username) === true) {
            $http.delete("/users/" + username).then(function (response) {
                $route.reload();
            }), function (response) {

            };
        }

    };

    $scope.addUser = function () {
        var newUser = {
            username: $scope.username,
            name: $scope.full_name,
            password: $scope.password,
            email: $scope.email,
            type: $scope.user_type,
            department: $scope.department
        };

        if ($scope.functionHeader === "Add New") {
            $http.post("/users", newUser).then(function (response) {
                $route.reload();
            }), function (response) {

            };
        } else {
            $http.put("/users/" + $("#username").val(), newUser).then(function (response) {
                console.log("Updating: " + $("#username").val());
                console.log(newUser);
                $route.reload();
            }), function (response) {

            };
        }


    };

    $scope.neglect = function () {
        $route.reload();
    };
});