    var restaurantNameElement = document.getElementById("restaurantName")
    var countryNameResElement = document.getElementById("countryNameRes")
    var cityNameResElement = document.getElementById("cityNameRes")
    var emailResElement = document.getElementById("emailRes")
    var passwordResElement = document.getElementById("passwordRes")
    var confirmPasswordResElement = document.getElementById("confirmPasswordRes")
    var userUidRes;
    var userUidCust;
    var db = firebase.firestore()
    var auth = firebase.auth()
    var storage = firebase.storage()


    function signUpRestaurant(){
        console.log(restaurantNameElement.value, countryNameResElement.value, cityNameResElement.value, emailResElement.value, passwordResElement.value, confirmPasswordResElement.value)
    return new Promise((resolve, reject)=>{
            if(passwordResElement.value === confirmPasswordResElement.value ){
                resolve("OK");
            }
            else{
                reject("Confirm Password and Password should be same!!")
            }
    })
            .then(()=>{
    firebase.auth().createUserWithEmailAndPassword(emailResElement.value, passwordResElement.value)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        userUidRes = user.uid
        // alert(userUidRes)
        // console.log(user.uid)
        // console.log(errorMessage)
        // ...

        db.collection("Restaurants").doc(userUidRes).set({
            RestaurantName : restaurantNameElement.value,
            Country: countryNameResElement.value,
            City: cityNameResElement.value,
            Email: emailResElement.value,
            UID: userUidRes
        })
        .then(() => {
            console.log("Document successfully written!");
            window.location = "restaurantDashboard.html"
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
        restaurantNameElement.value = ""
        countryNameResElement.value = ""
        cityNameResElement.value = ""
        emailResElement.value = ""
        passwordResElement.value = ""
        confirmPasswordResElement.value = ""
        document.getElementById("checkboxRes").checked = false

        window.location = "restaurantDashboard.html"
        


    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });
            })
            .catch((error)=>{
                alert(error)
            })   
    }


    // auth.onAuthStateChanged((user) => {
    //     console.log(user)
    //     let pageLocArr = window.location.href.split('/');
    //     console.log(pageLocArr)
    //     let pageName = pageLocArr[pageLocArr.length - 1];
    //     let authenticatedPages = ['restaurantDashboard.html'];
    //     if (user && authenticatedPages.indexOf(pageName) === -1) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       window.location = './restaurantDashboard.html'
    //       var uid = user.uid;
    //       console.log(uid)
    //       // ...
    //     }
    //     else if (!user && pageName == 'restaurantDashboard.html' ) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/firebase.User
    //         window.location = 'index.html'
    //         var uid = user.uid;
    //         console.log(uid)
    //     } 
    //     else {
    //       // User is signed out

    //       // ...
    //     }
    //   });


    async function signout() {
        await auth.signOut()
            .then(()=>{
                console.log("SIGN OUT SUCCESS")
                window.location = "index.html"
            })
            .catch(()=>{
                console.log("SIGN OUT UNSUCCESS")
            })
    }


    var firstNameCustElement = document.getElementById("firstNameCust")
    var lastNameCustElement = document.getElementById("lastNameCust")
    var phoneNumberCustElement = document.getElementById("phoneNumberCust")
    var emailCustElement = document.getElementById("emailCust")
    var countryNameCustElement = document.getElementById("countryNameCust")
    var cityNameCustElement = document.getElementById("cityNameCust")
    var passwordCustElement = document.getElementById("passwordCust")
    var confirmPasswordCustElement = document.getElementById("confirmPasswordCust")


    function signUpCustomer(){
        console.log(firstNameCustElement.value, lastNameCustElement.value, phoneNumberCustElement.value, emailCustElement.value, countryNameCustElement.value, cityNameCustElement.value, passwordCustElement.value, confirmPasswordCustElement.value)
        return new Promise((resolve, reject)=>{
            if(passwordCustElement.value === confirmPasswordCustElement.value ){
                resolve("OK");
            }
            else{
                reject("Confirm Password and Password should be same!!")
            }
    })
            .then(()=>{
                firebase.auth().createUserWithEmailAndPassword(emailCustElement.value, passwordCustElement.value)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        userUidCust = user.uid
        // console.log(user.uid)
        // console.log(errorMessage)
        // ...

        db.collection("Customers").doc(userUidCust).set({
            FirstName : firstNameCustElement.value,
            LastName : lastNameCustElement.value,
            Country: countryNameCustElement.value,
            City: cityNameCustElement.value,
            PhoneNumber: phoneNumberCustElement.value,
            Email: emailCustElement.value,
            UID: userUidCust
        })
        .then(() => {
            console.log("Document successfully written!");
            window.location="customerDashboard.html"
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
        firstNameCustElement.value = ""
        lastNameCustElement.value = ""
        phoneNumberCustElement.value = ""
        emailCustElement.value = ""
        countryNameCustElement.value = ""
        cityNameCustElement.value = ""
        passwordCustElement.value = ""
        confirmPasswordCustElement.value = ""
        document.getElementById("checkboxCust").checked = false
        


    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });
            })
            .catch((error)=>{
                alert(error)
            })
    }

function addNewDish(element){
    
    var rightSideWindowTxt = element.parentNode.nextSibling.nextSibling
    rightSideWindowTxt.innerHTML = ""
    rightSideWindowTxt.setAttribute("class", "Padding")

    var lineBreak = document.createElement("br")
    console.log(lineBreak)
    var lineChange = document.createElement("br")

    var heading1 = document.createElement("h1")
    heading1.className = "addDishesHeading"
    var heading1Text = document.createTextNode("ADD DISHES")
    heading1.appendChild(heading1Text) 
    rightSideWindowTxt.appendChild(heading1)

    var mainDiv = document.createElement("div")
    var itemName = document.createElement("input")
    itemName.type = "text"
    itemName.id = "itemName"
    itemName.name = "item"
    itemName.placeholder = "Item Name"
    mainDiv.appendChild(itemName)

    var itemPrice = document.createElement("input")
    itemPrice.type = "text"
    itemPrice.id = "itemPrice"
    itemPrice.name = "Price"
    itemPrice.placeholder = "Item Price"
    mainDiv.appendChild(itemPrice)

    var labelForUpload = document.createElement("label")
    var labelTxt = document.createTextNode("Upload Image: ")
    labelForUpload.appendChild(labelTxt)
    mainDiv.appendChild(labelForUpload)

    var imgUploadFile = document.createElement("input")
    imgUploadFile.type = "file"
    imgUploadFile.id = "myImage"
    imgUploadFile.name = "myimg"
    imgUploadFile.className = "imgInputFile"
    mainDiv.appendChild(imgUploadFile)

    // var imgUploadBtn = document.createElement("button")
    // imgUploadBtn.setAttribute("onclick", "uploadImageToStorage()") 
    // imgUploadBtn.className = "imgUploadBtn"
    // var imgUploadBtnTxt = document.createTextNode("Upload")
    // imgUploadBtn.appendChild(imgUploadBtnTxt)
    // mainDiv.appendChild(imgUploadBtn)
    mainDiv.appendChild(lineBreak);
    mainDiv.appendChild(lineChange);
    
    var labelForCategory = document.createElement("label")
    var categoryLabelTxt = document.createTextNode("Choose a Category: ")
    labelForCategory.appendChild(categoryLabelTxt)
    mainDiv.appendChild(labelForCategory)

    var foodCategoryName = document.createElement("select")
    foodCategoryName.name = "foodCategory"
    foodCategoryName.id = "Category"
    foodCategoryName.className = "foodTypeDropDown"

    var foodCategoryOption1 = document.createElement("option")
    foodCategoryOption1.value = "Pakistani"
    var foodCategoryNameText1 = document.createTextNode("Pakistani")
    foodCategoryOption1.appendChild(foodCategoryNameText1)
    foodCategoryName.appendChild(foodCategoryOption1)

    var foodCategoryOption2 = document.createElement("option")
    foodCategoryOption2.value = "Chinese"
    var foodCategoryNameText2 = document.createTextNode("Chinese")
    foodCategoryOption2.appendChild(foodCategoryNameText2)
    foodCategoryName.appendChild(foodCategoryOption2)


    var foodCategoryOption3 = document.createElement("option")
    foodCategoryOption3.value = "Arabian"
    var foodCategoryNameText3 = document.createTextNode("Arabian")
    foodCategoryOption3.appendChild(foodCategoryNameText3)
    foodCategoryName.appendChild(foodCategoryOption3)


    var foodCategoryOption4 = document.createElement("option")
    foodCategoryOption4.value = "Italian"
    var foodCategoryNameText4 = document.createTextNode("Italian")
    foodCategoryOption4.appendChild(foodCategoryNameText4)
    foodCategoryName.appendChild(foodCategoryOption4)


    var foodCategoryOption5 = document.createElement("option")
    foodCategoryOption5.value = "French"
    var foodCategoryNameText5 = document.createTextNode("French")
    foodCategoryOption5.appendChild(foodCategoryNameText5)
    foodCategoryName.appendChild(foodCategoryOption5)
    mainDiv.appendChild(foodCategoryName)
    // mainDiv.appendChild(lineBreak)
    // mainDiv.appendChild(lineChange)

    var labelForDeliveryType = document.createElement("label")
    var DeliveryLabelTxt = document.createTextNode("Choose a Delivery Type: ")
    labelForDeliveryType.appendChild(DeliveryLabelTxt)
    mainDiv.appendChild(DeliveryLabelTxt)

    var deliveryType = document.createElement("select")
    deliveryType.name = "deliveryType"
    deliveryType.id = "deliveryType"
    deliveryType.className = "deliveryTypeDropDown"

    var deliveryTypeOption1 = document.createElement("option")
    deliveryTypeOption1.value = "Paid"
    var deliveryTypeText1 = document.createTextNode("Paid")
    deliveryTypeOption1.appendChild(deliveryTypeText1)
    deliveryType.appendChild(deliveryTypeOption1)

    var deliveryTypeOption2 = document.createElement("option")
    deliveryTypeOption2.value = "Free"
    var deliveryTypeText2 = document.createTextNode("Free")
    deliveryTypeOption2.appendChild(deliveryTypeText2)
    deliveryType.appendChild(deliveryTypeOption2)
    mainDiv.appendChild(deliveryType)
    // mainDiv.appendChild(lineChange)
    // mainDiv.appendChild(lineBreak)

    var addDishBtn = document.createElement("button")
    addDishBtn.setAttribute("onclick", "appendDishesDB()")
    // addDishBtn.onclick = "appendDishesDB()"
    addDishBtn.className = "addDishBtn"
    var addDishBtnTxt = document.createTextNode("ADD DISH")
    addDishBtn.appendChild(addDishBtnTxt)
    mainDiv.appendChild(addDishBtn)


    rightSideWindowTxt.appendChild(mainDiv)
console.log(rightSideWindowTxt)

}

var itemName, itemPrice, foodCategory, deliveryType, storedURL;





function appendDishesDB(){
    var uid
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          uid = user.uid;
          console.log(uid)
        } else {
          // User is signed out
          // ...
        }
        
      });
    
    var imageElement = document.getElementById("myImage")
    console.log(imageElement.files[0].name);

    var imageName = imageElement.files[0]

    let uploadPicRef = storage.ref().child("Food Dishes/" + imageName.name)

     uploadPicRef.put(imageName)
         .then(()=>{
             uploadPicRef.getDownloadURL()
                .then((url)=>{
                    // console.log(url) 
                    storedURL = url
                })
        })

    setTimeout(() => {
        itemName = document.getElementById("itemName")

        itemPrice = document.getElementById("itemPrice")

        foodCategory = document.getElementById("Category")

        deliveryType = document.getElementById("deliveryType")

        console.log(itemName.value, itemPrice.value, foodCategory.value, deliveryType.value, storedURL)

        var newDishInDB = {
            itemName: itemName.value,
            itemPrice: itemPrice.value,
            foodCategory: foodCategory.value,
            deliveryType: deliveryType.value,
            imgURL: storedURL,
            RestaurantUID:uid
        }
        console.log(newDishInDB)

        db.collection("CreatedDishes").doc(uid).set(newDishInDB)
        .then(() => {
            console.log("Document successfully written!");
        document.getElementById("foodcard1").hidden = false
            itemPrice.value = ""
            itemName.value = ""
            imageElement.files = ""

        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

        


    }, 4000);
    



    
    }