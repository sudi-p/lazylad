import getClient from './lib/api';

export default {
    getDishes(cook_id, callback) {
        return (
            getClient()
            .get('/dishes/dishes/', {
                params: {cook_id: cook_id,},
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    addDish(new_dish, callback) {
        return (
            getClient()
            .post('/dishes/add-dish/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                new_dish
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    getDish(dish_id, callback) {
        return (
            getClient()
            .get('/restaurants/dish/'+dish_id+'/', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    addDishInfo(dish_id, dish_info, callback) {
        let dish_info_url = '/dishes/dish/'+dish_id+'/dish-info/';
        return (
            getClient()
            .post(dish_info_url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                dish_info
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    checkCustomer(new_customer, callback) {
        return (
            getClient()
            .post('/customers/check-customer/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                new_customer
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    addCustomer(new_customer, callback) {
        return (
            getClient()
            .post('/customers/add-customer/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                new_customer
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    getPlans(params, callback) {
        return (
            getClient()
            .get('/restaurants/get-plans/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                params
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    getThreeDaysPlans(params, callback) {
        return (
            getClient()
            .get('/restaurants/get-threedaysplans/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                params
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    getFiveDaysPlans(params, callback) {
        return (
            getClient()
            .get('/restaurants/get-fivedaysplans/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                params
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        );
    },
    getPlan(plan_id,callback){
        return (
            getClient()
            .get('/restaurants/get-plan/'+plan_id+'/', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => callback(res, null))
            .catch((res) => callback(null, res))
        )
    }
}