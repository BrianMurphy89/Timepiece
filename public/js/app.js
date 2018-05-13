const app = angular.module('watchApp', ['ngRoute']);


app.controller('mainController', ['$http', function($http){

    this.allWatches = [];
    this.formData = {};
    this.indexOfEditFormToShow = null;
    this.editing = false;
    this.showing = true;
    this.isShowing = false;
    this.singleWatch = [];

    this.toggleEdit = () => {
        this.editing = !this.editing;
    }

    this.toggleShow = () => {
        this.showing = !this.showing;
        this.isShowing = !this.isShowing;
    }

    this.currentPage = 'home'
    this.showHome = () => {
        this.currentPage = 'home'
    }

    this.showLogin = () => {
        this.currentPage = 'login'
    }

    this.showSignUp = () => {
        this.currentPage = 'signup'
    }

    this.showProfile = () => {
        this.currentPage = 'profile'
    }


    this.getWatches = () => {
        $http({
            method:'GET',
            url:'/timepiece'
        }).then((response) => {
            this.allWatches = response.data
            this.singleWatch = []
        }, error => {
            console.error(error);
        }).catch(err => console.error('Catch', err))
    }

    this.getWatches();

    this.getSingleWatch = (id) => {
        $http({
            method:'GET',
            url:'/timepiece/' + id
        }).then((res) => {
            this.singleWatch = res.data
            console.log(this.singleWatch);
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch', err))
    }

    this.createWatch = () => {
        $http({
            method:'POST',
            url:'/timepiece',
            data: this.formData
        }).then((res) => {
            console.log(res);
            this.formData = {};
            this.allWatches.push(res.data);
            this.getWatches();
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch', err))
    }

    this.editWatch = (id) => {
        console.log(id);
        $http({
            method:'PUT',
            url:'/timepiece/' + id,
            data: {
                brand: this.editedBrand,
                model: this.editedModel,
                image: this.editedImage,
                description: this.editedDescription
            }
        }).then((res) => {
            console.log(res.data);
            this.indexOfEditFormToShow = null;
            this.getWatches();
            this.toggleEdit();
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch', err))
    }

    this.deleteWatch = (id) => {
        console.log(id);
        $http({
            method:'DELETE',
            url:'/timepiece/' + id
        }).then((res) => {
            const removeByIndex =
            this.allWatches.findIndex(watch => watch._id === id);
            this.allWatches.splice(removeByIndex, 1);
            this.toggleShow();
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch', err))
    }

}])
