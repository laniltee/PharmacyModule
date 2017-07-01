/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller("SuppliersController", function ($scope, $http) {
    
 //adding a new supplier
    $scope.addSupplier = function () {
        var newSupplier = {
            name: $scope.supName,
            email: $scope.supEmail,
            address:$scope.supAddress,
            contact:$scope.supContact
        };
        var exp = /^[a-zA-z]+$/;
        var atpos = newSupplier.email.indexOf("@");
        var dotpos = newSupplier.email.indexOf(".");
        var numberExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (newSupplier.name != null && newSupplier.email != null && newSupplier.address != null && newSupplier.contact != null) {
            if(newSupplier.name.match(exp)){
                if (atpos < 1 || dotpos + 2 >= newSupplier.email.length || atpos + 2 > dotpos){
                    alert("Enter A Valid Email Address !")
                
                }
                    else{
                        if(newSupplier.contact.match(numberExp)){
                            $http.post("http://localhost:8090/suppliers", newSupplier).then(function (response) {
                alert("New Supplier Added !");
                refreshSuppliers();
                
            }, function (response) {
                alert("New Supplier Adding Failed !");
            });
                        }
                        else{
                            alert("Enter A Valid Contact Number !");
                        }
                    }
            }
            else {
            alert("Enter only text as the Supplier !");
        }
    }       
           
        else {
            alert("Inputs are not valid !");
        }
    
    }
    
    ///VIEWING THE SUPPLIERS
    $scope.suppliers = [];
   

    $http.get("http://localhost:8090/suppliers").then(function (response) {
        $scope.suppliers = response.data;
    });

    function refreshSuppliers() {
        $http.get("http://localhost:8090/suppliers").then(function (response) {
            $scope.suppliers = response.data;
        });
    }
    
    
    /**VIEW BUTTON FUNCTION**/
    
    
    $scope.viewAll = function(){
    $scope.suppliers = [];
   

    $http.get("http://localhost:8090/suppliers").then(function (response) {
        $scope.suppliers = response.data;
    });

    
               
        
    document.write("<p id=demo></p>");
    document.getElementById("demo").innerHTML= $scope.suppliers;
    
    
    
    
    var  i;


text = "<ul>";
for (i = 0; i < 12; i++) {
    text += "<li>" + $scope.suppliers[i]+ "</li>";
}
text += "</ul>";
document.getElementById("demo").innerHTML = text;
    
    }
    
            /////delete a supplier
        
    
    $scope.deleteSupplier = function (supNamee) {
            
        

      //  if (delSupplier != null ) {
            $http.delete("http://localhost:8090/suppliers/" + supNamee).then(function (response) {
                alert("Supplier Deleted !");
                refreshSuppliers();
                
            }, function (response) {
                alert("Supplier Deleting Failed !")
            });
   //     } else {
    //        alert("Inputs are not valid !");
    //    }
    }
    
    
    
    
    //UPDATE A SUPPLIER//
        $scope.name = [];

        $scope.updateSupplier = function (oldName,upName,upEmail,upAddress,upContact) {
            $http.get("http://localhost:8090/suppliers").then(function (response) {
                $scope.name = response.data;

            });
            var name = oldName;
            var newEmail = upEmail;

             if(upEmail != null){
                $http.put("http://localhost:8090/suppliers/" + oldName + "/" + upEmail).then(function (response) {

                    alert("Updated!");
                    refreshSuppliers();
                },
              function (response) {
                    alert("Updating Failed!")
                })
            }
            if(upName != null){
                $http.put("http://localhost:8090/suppliers/" + oldName + "/" + upName).then(function (response) {

                    alert("Updated!");
                    refreshSuppliers();
                },
              function (response) {
                    alert("Updating Failed!")
                })
            }
        
        
        }
            
        

      
  //  };
    
    
    
    
    
    
});
