const app = angular.module('WatchApp', ['ngRoute'])


app.controller('mainController', ['$http', function($http){

    this.allWatches = [];
    this.formData = {};
    this.indexOfEditFormToShow = null;
    this.toggleEdit = () => {
        this.editing = !this.editing;
    }

    this.currentPage = 'login'
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
        }, error => {
            console.error(error);
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
        $http({
            method:'DELETE',
            url:'/timepiece/' + id
        }).then((res) => {
            const removeByIndex =
            this.allWatches.findIndex(watch => watch._id === id);
            this.allWatches.splice(removeByIndex, 1);
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch', err))
    }

}])
